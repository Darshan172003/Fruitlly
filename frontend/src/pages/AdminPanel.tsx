import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { HiOutlinePlayCircle, HiOutlinePlus, HiOutlineQueueList } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import {
  collection,
  collectionGroup,
  deleteField,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  setDoc,
  type DocumentData,
  type DocumentReference,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';
import type { BlogPost } from '../types/blog';
import type { Product } from '../types/product';
import type { Recipe } from '../types/recipe';
import {
  AdminLogin,
  BlogFormPanel,
  BlogListPanel,
  RecipeFormPanel,
  RecipeListPanel,
  AdminShell,
  ProductFormPanel,
  ProductListPanel,
  type AdminSectionId,
  type AdminSidebarItem,
  type BlogFormState,
  type CategoryFormState,
  type CategoryOption,
  type ProductFormState,
  type RecipeFormState,
} from '../components/Admin';
import { getBlogCategoryColor, getBlogCategoryId, getBlogPlainText, getBlogReadTime, mapBlogDocument } from '../lib/blogs';
import { mapCategoryDocument, mapProductDocument, slugifyValue } from '../lib/productCatalog';
import { extractYouTubeVideoId, getRecipeThumbnail, mapRecipeDocument } from '../lib/recipes';

const emptyForm: ProductFormState = {
  categoryId: '',
  title: '',
  shortDescription: '',
  imageUrl: '',
  imagePath: '',
  moqs: [''],
};

const emptyCategoryForm: CategoryFormState = {
  name: '',
};

const emptyRecipeForm: RecipeFormState = {
  title: '',
  description: '',
  youtubeUrl: '',
  duration: '',
};

const emptyBlogForm: BlogFormState = {
  title: '',
  category: '',
  excerpt: '',
  content: '',
  imageUrl: '',
  imagePath: '',
};

const normalizeError = (message: unknown) => {
  if (message instanceof Error) {
    return message.message;
  }

  return 'Something went wrong. Please try again.';
};

const PRODUCTS_PAGE_SIZE = 6;
const RECIPES_PAGE_SIZE = 6;
const BLOGS_PAGE_SIZE = 6;

const sidebarItems: AdminSidebarItem[] = [
  {
    id: 'add-product',
    label: 'Add Product',
    description: 'Create catalog item',
    icon: <HiOutlinePlus size={18} />,
  },
  {
    id: 'catalog',
    label: 'Product Library',
    description: 'Paginated products',
    icon: <HiOutlineQueueList size={18} />,
  },
  {
    id: 'add-recipe',
    label: 'Add Recipe Video',
    description: 'Create recipe content',
    icon: <HiOutlinePlayCircle size={18} />,
  },
  {
    id: 'recipe-library',
    label: 'Recipe Library',
    description: 'Manage recipe videos',
    icon: <HiOutlineQueueList size={18} />,
  },
  {
    id: 'add-blog',
    label: 'Add Blog Post',
    description: 'Create blog content',
    icon: <HiOutlinePlus size={18} />,
  },
  {
    id: 'blog-library',
    label: 'Blog Library',
    description: 'Manage blog posts',
    icon: <HiOutlineQueueList size={18} />,
  },
];

const sectionContent: Record<AdminSectionId, { title: string; description: string }> = {
  'add-product': {
    title: 'Add Product',
    description: 'Create a new product entry for the live Fruitlly catalog.',
  },
  catalog: {
    title: 'Product Library',
    description: 'Browse products page-by-page, then edit or remove entries from the live catalog.',
  },
  'add-recipe': {
    title: 'Add Recipe Video',
    description: 'Publish recipe videos with a YouTube link, title, description, and duration.',
  },
  'recipe-library': {
    title: 'Recipe Library',
    description: 'Edit or remove the recipe videos shown on the public recipes page.',
  },
  'add-blog': {
    title: 'Add Blog Post',
    description: 'Create blog posts with cover images, excerpts, and formatted article content.',
  },
  'blog-library': {
    title: 'Blog Library',
    description: 'Edit or remove blog posts shown on the public blog page.',
  },
};

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [submittingLogin, setSubmittingLogin] = useState(false);
  const [authError, setAuthError] = useState('');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyCategoryForm);
  const [categoryError, setCategoryError] = useState('');
  const [savingCategory, setSavingCategory] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState('');
  const [productsLoading, setProductsLoading] = useState(true);
  const [libraryError, setLibraryError] = useState('');
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [savingProduct, setSavingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState('');
  const [deletingProductId, setDeletingProductId] = useState('');
  const [activeSection, setActiveSection] = useState<AdminSectionId>('add-product');
  const [selectedLibraryCategoryId, setSelectedLibraryCategoryId] = useState('all');
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCursors, setPageCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([null]);
  const [currentLastVisible, setCurrentLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [editingLocation, setEditingLocation] = useState<{ categoryId: string; productId: string } | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState('');
  const [recipePageIndex, setRecipePageIndex] = useState(0);
  const [recipeHasNextPage, setRecipeHasNextPage] = useState(false);
  const [recipePageCursors, setRecipePageCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([null]);
  const [recipeCurrentLastVisible, setRecipeCurrentLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [recipeForm, setRecipeForm] = useState<RecipeFormState>(emptyRecipeForm);
  const [recipeFormError, setRecipeFormError] = useState('');
  const [recipeFormSuccess, setRecipeFormSuccess] = useState('');
  const [savingRecipe, setSavingRecipe] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState('');
  const [deletingRecipeId, setDeletingRecipeId] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState('');
  const [blogPageIndex, setBlogPageIndex] = useState(0);
  const [blogHasNextPage, setBlogHasNextPage] = useState(false);
  const [blogPageCursors, setBlogPageCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([null]);
  const [blogCurrentLastVisible, setBlogCurrentLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlogForm);
  const [blogSelectedImage, setBlogSelectedImage] = useState<File | null>(null);
  const [blogPreviewUrl, setBlogPreviewUrl] = useState('');
  const [blogFormError, setBlogFormError] = useState('');
  const [blogFormSuccess, setBlogFormSuccess] = useState('');
  const [savingBlog, setSavingBlog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState('');
  const [deletingBlogId, setDeletingBlogId] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAdminUser(currentUser);
      setAuthError('');
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!adminUser) {
      setProducts([]);
      setCategories([]);
      setCategoriesLoading(false);
      setCategoryForm(emptyCategoryForm);
      setCategoryError('');
      setProductsLoading(false);
      setLibraryError('');
      setSelectedLibraryCategoryId('all');
      setPageIndex(0);
      setHasNextPage(false);
      setPageCursors([null]);
      setCurrentLastVisible(null);
      setRecipes([]);
      setRecipesLoading(false);
      setRecipesError('');
      setRecipePageIndex(0);
      setRecipeHasNextPage(false);
      setRecipePageCursors([null]);
      setRecipeCurrentLastVisible(null);
      setBlogs([]);
      setBlogsLoading(false);
      setBlogsError('');
      setBlogPageIndex(0);
      setBlogHasNextPage(false);
      setBlogPageCursors([null]);
      setBlogCurrentLastVisible(null);
      setBlogForm(emptyBlogForm);
      setBlogSelectedImage(null);
      setBlogPreviewUrl('');
      setBlogFormError('');
      setBlogFormSuccess('');
      setEditingBlogId('');
      setDeletingBlogId('');
      setRecipeForm(emptyRecipeForm);
      setRecipeFormError('');
      setRecipeFormSuccess('');
      setEditingRecipeId('');
      setDeletingRecipeId('');
      return;
    }

    setPageIndex(0);
    setHasNextPage(false);
    setPageCursors([null]);
    setCurrentLastVisible(null);
    setRecipePageIndex(0);
    setRecipeHasNextPage(false);
    setRecipePageCursors([null]);
    setRecipeCurrentLastVisible(null);
    setBlogPageIndex(0);
    setBlogHasNextPage(false);
    setBlogPageCursors([null]);
    setBlogCurrentLastVisible(null);
  }, [adminUser]);

  useEffect(() => {
    if (!adminUser) {
      return;
    }

    setCategoriesLoading(true);
    const categoriesQuery = query(collection(db, 'products'), orderBy('sortName', 'asc'));

    const unsubscribe = onSnapshot(
      categoriesQuery,
      (snapshot) => {
        const nextCategories = snapshot.docs.map(mapCategoryDocument);
        setCategories(nextCategories);
        setCategoriesLoading(false);
        setCategoryError('');

        setSelectedLibraryCategoryId((current) => {
          if (current === 'all') {
            return current;
          }

          return nextCategories.some((category) => category.id === current) ? current : 'all';
        });

        setForm((current) => {
          if (current.categoryId && nextCategories.some((category) => category.id === current.categoryId)) {
            return current;
          }

          return {
            ...current,
            categoryId: nextCategories[0]?.id ?? '',
          };
        });
      },
      (error) => {
        setCategoryError(normalizeError(error));
        setCategoriesLoading(false);
      },
    );

    return () => unsubscribe();
  }, [adminUser]);

  const loadProductPage = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    nextPageIndex: number,
  ) => {
    setProductsLoading(true);

    try {
      const productsQuery = selectedLibraryCategoryId === 'all'
        ? cursor
          ? query(
              collectionGroup(db, 'items'),
              orderBy('categorySortName', 'asc'),
              orderBy('productSortName', 'asc'),
              startAfter(cursor),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
          : query(
              collectionGroup(db, 'items'),
              orderBy('categorySortName', 'asc'),
              orderBy('productSortName', 'asc'),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
        : cursor
          ? query(
              collection(db, 'products', selectedLibraryCategoryId, 'items'),
              orderBy('productSortName', 'asc'),
              startAfter(cursor),
              limit(PRODUCTS_PAGE_SIZE + 1),
            )
          : query(
              collection(db, 'products', selectedLibraryCategoryId, 'items'),
              orderBy('productSortName', 'asc'),
              limit(PRODUCTS_PAGE_SIZE + 1),
            );

      const snapshot = await getDocs(productsQuery);
      const hasExtraDocument = snapshot.docs.length > PRODUCTS_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, PRODUCTS_PAGE_SIZE) : snapshot.docs;

      setProducts(visibleDocuments.map(mapProductDocument));
      setHasNextPage(hasExtraDocument);
      setCurrentLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setPageIndex(nextPageIndex);
      setLibraryError('');

      return { visibleCount: visibleDocuments.length };
    } catch (error) {
      setLibraryError(normalizeError(error));
      return { visibleCount: 0 };
    } finally {
      setProductsLoading(false);
    }
  };

  const loadRecipePage = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    nextPageIndex: number,
  ) => {
    setRecipesLoading(true);

    try {
      const recipesQuery = cursor
        ? query(
            collection(db, 'recipes'),
            orderBy('sortName', 'asc'),
            startAfter(cursor),
            limit(RECIPES_PAGE_SIZE + 1),
          )
        : query(
            collection(db, 'recipes'),
            orderBy('sortName', 'asc'),
            limit(RECIPES_PAGE_SIZE + 1),
          );

      const snapshot = await getDocs(recipesQuery);
      const hasExtraDocument = snapshot.docs.length > RECIPES_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, RECIPES_PAGE_SIZE) : snapshot.docs;

      setRecipes(visibleDocuments.map(mapRecipeDocument));
      setRecipeHasNextPage(hasExtraDocument);
      setRecipeCurrentLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setRecipePageIndex(nextPageIndex);
      setRecipesError('');

      return { visibleCount: visibleDocuments.length };
    } catch (error) {
      setRecipesError(normalizeError(error));
      return { visibleCount: 0 };
    } finally {
      setRecipesLoading(false);
    }
  };

  const loadBlogPage = async (
    cursor: QueryDocumentSnapshot<DocumentData> | null,
    nextPageIndex: number,
  ) => {
    setBlogsLoading(true);

    try {
      const blogsQuery = cursor
        ? query(
            collection(db, 'blogs'),
            orderBy('publishedAt', 'desc'),
            startAfter(cursor),
            limit(BLOGS_PAGE_SIZE + 1),
          )
        : query(
            collection(db, 'blogs'),
            orderBy('publishedAt', 'desc'),
            limit(BLOGS_PAGE_SIZE + 1),
          );

      const snapshot = await getDocs(blogsQuery);
      const hasExtraDocument = snapshot.docs.length > BLOGS_PAGE_SIZE;
      const visibleDocuments = hasExtraDocument ? snapshot.docs.slice(0, BLOGS_PAGE_SIZE) : snapshot.docs;

      setBlogs(visibleDocuments.map(mapBlogDocument));
      setBlogHasNextPage(hasExtraDocument);
      setBlogCurrentLastVisible(visibleDocuments.length > 0 ? visibleDocuments[visibleDocuments.length - 1] : null);
      setBlogPageIndex(nextPageIndex);
      setBlogsError('');

      return { visibleCount: visibleDocuments.length };
    } catch (error) {
      setBlogsError(normalizeError(error));
      return { visibleCount: 0 };
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    if (!adminUser) {
      return;
    }

    void loadProductPage(null, 0);
  }, [adminUser, selectedLibraryCategoryId]);

  useEffect(() => {
    if (!adminUser) {
      return;
    }

    void loadRecipePage(null, 0);
  }, [adminUser]);

  useEffect(() => {
    if (!adminUser) {
      return;
    }

    void loadBlogPage(null, 0);
  }, [adminUser]);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl('');
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!blogSelectedImage) {
      setBlogPreviewUrl('');
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(blogSelectedImage);
    setBlogPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [blogSelectedImage]);

  const resetForm = () => {
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? '',
    });
    setEditingLocation(null);
    setSelectedImage(null);
    setEditingProductId('');
  };

  const resetRecipeForm = () => {
    setRecipeForm(emptyRecipeForm);
    setRecipeFormError('');
    setRecipeFormSuccess('');
    setEditingRecipeId('');
  };

  const resetBlogForm = () => {
    setBlogForm(emptyBlogForm);
    setBlogSelectedImage(null);
    setBlogFormError('');
    setBlogFormSuccess('');
    setEditingBlogId('');
  };

  const refreshCurrentPage = async () => {
    const cursor = pageIndex === 0 ? null : pageCursors[pageIndex] ?? null;
    const result = await loadProductPage(cursor, pageIndex);

    if (result.visibleCount === 0 && pageIndex > 0) {
      const previousPageIndex = pageIndex - 1;
      const previousCursor = previousPageIndex === 0 ? null : pageCursors[previousPageIndex] ?? null;
      await loadProductPage(previousCursor, previousPageIndex);
    }
  };

  const refreshCurrentRecipePage = async () => {
    const cursor = recipePageIndex === 0 ? null : recipePageCursors[recipePageIndex] ?? null;
    const result = await loadRecipePage(cursor, recipePageIndex);

    if (result.visibleCount === 0 && recipePageIndex > 0) {
      const previousPageIndex = recipePageIndex - 1;
      const previousCursor = previousPageIndex === 0 ? null : recipePageCursors[previousPageIndex] ?? null;
      await loadRecipePage(previousCursor, previousPageIndex);
    }
  };

  const refreshCurrentBlogPage = async () => {
    const cursor = blogPageIndex === 0 ? null : blogPageCursors[blogPageIndex] ?? null;
    const result = await loadBlogPage(cursor, blogPageIndex);

    if (result.visibleCount === 0 && blogPageIndex > 0) {
      const previousPageIndex = blogPageIndex - 1;
      const previousCursor = previousPageIndex === 0 ? null : blogPageCursors[previousPageIndex] ?? null;
      await loadBlogPage(previousCursor, previousPageIndex);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittingLogin(true);
    setAuthError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setAuthError(normalizeError(error));
    } finally {
      setSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    resetForm();
    resetRecipeForm();
    resetBlogForm();
  };

  const handleCategoryCreate = async () => {
    const trimmedName = categoryForm.name.trim();
    if (!trimmedName) {
      setCategoryError('Enter a category name before creating it.');
      return;
    }

    const categoryId = slugifyValue(trimmedName);
    if (!categoryId) {
      setCategoryError('Use letters or numbers in the category name.');
      return;
    }

    setSavingCategory(true);
    setCategoryError('');

    try {
      await setDoc(
        doc(db, 'products', categoryId),
        {
          name: trimmedName,
          sortName: trimmedName.toLowerCase(),
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      setCategoryForm(emptyCategoryForm);
      setForm((current) => ({
        ...current,
        categoryId,
      }));
    } catch (error) {
      setCategoryError(normalizeError(error));
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    const confirmed = window.confirm(
      `Delete ${categoryName}? This will also delete every product and image inside this category.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingCategoryId(categoryId);
    setCategoryError('');
    setFormError('');
    setFormSuccess('');

    try {
      const productSnapshots = await getDocs(collection(db, 'products', categoryId, 'items'));

      await Promise.all(
        productSnapshots.docs.map(async (snapshot) => {
          const product = mapProductDocument(snapshot);

          await deleteDoc(snapshot.ref);

          if (product.imagePath) {
            await deleteObject(ref(storage, product.imagePath)).catch(() => undefined);
          }
        }),
      );

      await deleteDoc(doc(db, 'products', categoryId));

      if (editingLocation?.categoryId === categoryId) {
        resetForm();
      }

      if (selectedLibraryCategoryId === categoryId) {
        setSelectedLibraryCategoryId('all');
        setPageIndex(0);
        setHasNextPage(false);
        setPageCursors([null]);
        setCurrentLastVisible(null);
      }

      setForm((current) => ({
        ...current,
        categoryId: current.categoryId === categoryId ? '' : current.categoryId,
      }));
      setFormSuccess(`Category ${categoryName} deleted successfully.`);
      await refreshCurrentPage();
    } catch (error) {
      setCategoryError(normalizeError(error));
    } finally {
      setDeletingCategoryId('');
    }
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
  };

  const handleBlogImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setBlogSelectedImage(file);
  };

  const handleEditProduct = (product: Product) => {
    setActiveSection('add-product');
    setEditingLocation({ categoryId: product.categoryId, productId: product.id });
    setEditingProductId(product.id);
    setSelectedImage(null);
    setForm({
      categoryId: product.categoryId,
      title: product.title,
      shortDescription: product.shortDescription,
      imageUrl: product.imageUrl,
      imagePath: product.imagePath,
      moqs: product.moqs.length > 0 ? product.moqs : [''],
    });
    setFormError('');
    setFormSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uploadImageIfNeeded = async () => {
    const productId = slugifyValue(form.title);

    if (!selectedImage) {
      return {
        imageUrl: form.imageUrl,
        imagePath: form.imagePath,
      };
    }

    const fileName = `${Date.now()}-${selectedImage.name.replace(/\s+/g, '-').toLowerCase()}`;
    const imageRef = ref(storage, `products/${form.categoryId}/${productId}/${fileName}`);
    await uploadBytes(imageRef, selectedImage);
    const downloadUrl = await getDownloadURL(imageRef);

    if (editingLocation && form.imagePath) {
      await deleteObject(ref(storage, form.imagePath)).catch(() => undefined);
    }

    return {
      imageUrl: downloadUrl,
      imagePath: imageRef.fullPath,
    };
  };

  const handleSaveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminUser) {
      setFormError('Please sign in again.');
      return;
    }

    if (!form.categoryId) {
      setFormError('Create or choose a category before saving the product.');
      return;
    }

    if (!editingProductId && !selectedImage) {
      setFormError('Please choose a product image before saving.');
      return;
    }

    setSavingProduct(true);
    setFormError('');
    setFormSuccess('');

    try {
      const category = categories.find((item) => item.id === form.categoryId);
      if (!category) {
        throw new Error('The selected category no longer exists.');
      }

      const normalizedMoqs = form.moqs.map((value) => value.trim()).filter(Boolean);
      if (normalizedMoqs.length === 0) {
        throw new Error('Add at least one MOQ before saving the product.');
      }

      const nextProductId = slugifyValue(form.title);
      if (!nextProductId) {
        throw new Error('Use letters or numbers in the product title.');
      }

      const imageData = await uploadImageIfNeeded();
      const nextProductRef = doc(db, 'products', category.id, 'items', nextProductId);

      const payload: Record<string, unknown> = {
        categoryId: category.id,
        categoryName: category.name,
        categorySortName: category.sortName,
        productSortName: form.title.trim().toLowerCase(),
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        imageUrl: imageData.imageUrl,
        imagePath: imageData.imagePath,
        moqs: normalizedMoqs,
        description: deleteField(),
        ingredients: deleteField(),
        textureProfile: deleteField(),
        bulkPackaging: deleteField(),
        shelfLifeStorage: deleteField(),
        updatedAt: serverTimestamp(),
      };

      let oldProductRef: DocumentReference<DocumentData> | null = null;

      if (editingLocation) {
        oldProductRef = doc(db, 'products', editingLocation.categoryId, 'items', editingLocation.productId);
      }

      if (!editingLocation) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(nextProductRef, payload, { merge: true });

      if (
        oldProductRef
        && (editingLocation?.categoryId !== category.id || editingLocation?.productId !== nextProductId)
      ) {
        await deleteDoc(oldProductRef);
      }

      setPageCursors((current) => current.slice(0, pageIndex + 1));
      await refreshCurrentPage();
      setFormSuccess(editingLocation ? 'Product updated successfully.' : 'Product created successfully.');
      resetForm();
    } catch (error) {
      setFormError(normalizeError(error));
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const confirmed = window.confirm(`Delete ${product.title}? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setDeletingProductId(`${product.categoryId}/${product.id}`);
    setFormError('');
    setFormSuccess('');

    try {
      await deleteDoc(doc(db, 'products', product.categoryId, 'items', product.id));

      if (product.imagePath) {
        await deleteObject(ref(storage, product.imagePath)).catch(() => undefined);
      }

      if (editingLocation?.categoryId === product.categoryId && editingLocation.productId === product.id) {
        resetForm();
      }

      setPageCursors((current) => current.slice(0, pageIndex + 1));
      await refreshCurrentPage();
      setFormSuccess('Product deleted successfully.');
    } catch (error) {
      setFormError(normalizeError(error));
    } finally {
      setDeletingProductId('');
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setActiveSection('add-recipe');
    setEditingRecipeId(recipe.id);
    setRecipeForm({
      title: recipe.title,
      description: recipe.description,
      youtubeUrl: recipe.youtubeUrl,
      duration: recipe.duration,
    });
    setRecipeFormError('');
    setRecipeFormSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setActiveSection('add-blog');
    setEditingBlogId(blog.id);
    setBlogSelectedImage(null);
    setBlogForm({
      title: blog.title,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      imageUrl: blog.imageUrl,
      imagePath: blog.imagePath,
    });
    setBlogFormError('');
    setBlogFormSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uploadBlogImageIfNeeded = async () => {
    const blogId = slugifyValue(blogForm.title);

    if (!blogSelectedImage) {
      return {
        imageUrl: blogForm.imageUrl,
        imagePath: blogForm.imagePath,
      };
    }

    const fileName = `${Date.now()}-${blogSelectedImage.name.replace(/\s+/g, '-').toLowerCase()}`;
    const imageRef = ref(storage, `blogs/${blogId}/${fileName}`);
    await uploadBytes(imageRef, blogSelectedImage);
    const downloadUrl = await getDownloadURL(imageRef);

    if (editingBlogId && blogForm.imagePath) {
      await deleteObject(ref(storage, blogForm.imagePath)).catch(() => undefined);
    }

    return {
      imageUrl: downloadUrl,
      imagePath: imageRef.fullPath,
    };
  };

  const handleSaveRecipe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminUser) {
      setRecipeFormError('Please sign in again.');
      return;
    }

    setSavingRecipe(true);
    setRecipeFormError('');
    setRecipeFormSuccess('');

    try {
      const title = recipeForm.title.trim();
      const description = recipeForm.description.trim();
      const youtubeUrl = recipeForm.youtubeUrl.trim();
      const duration = recipeForm.duration.trim();

      if (!title || !description || !youtubeUrl || !duration) {
        throw new Error('Complete all recipe fields before saving.');
      }

      const youtubeId = extractYouTubeVideoId(youtubeUrl);
      if (!youtubeId) {
        throw new Error('Enter a valid YouTube link or video ID.');
      }

      const recipeId = slugifyValue(title);
      if (!recipeId) {
        throw new Error('Use letters or numbers in the recipe title.');
      }

      const nextRecipeRef = doc(db, 'recipes', recipeId);
      const payload: Record<string, unknown> = {
        title,
        description,
        youtubeUrl,
        youtubeId,
        thumbnail: getRecipeThumbnail(youtubeId),
        duration,
        sortName: title.toLowerCase(),
        updatedAt: serverTimestamp(),
      };

      if (!editingRecipeId) {
        payload.createdAt = serverTimestamp();
      }

      await setDoc(nextRecipeRef, payload, { merge: true });

      if (editingRecipeId && editingRecipeId !== recipeId) {
        await deleteDoc(doc(db, 'recipes', editingRecipeId));
      }

      setRecipePageCursors((current) => current.slice(0, recipePageIndex + 1));
      await refreshCurrentRecipePage();
      setRecipeForm(emptyRecipeForm);
      setEditingRecipeId('');
      setRecipeFormSuccess(editingRecipeId ? 'Recipe updated successfully.' : 'Recipe created successfully.');
    } catch (error) {
      setRecipeFormError(normalizeError(error));
    } finally {
      setSavingRecipe(false);
    }
  };

  const handleDeleteRecipe = async (recipe: Recipe) => {
    const confirmed = window.confirm(`Delete ${recipe.title}? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setDeletingRecipeId(recipe.id);
    setRecipeFormError('');
    setRecipeFormSuccess('');

    try {
      await deleteDoc(doc(db, 'recipes', recipe.id));

      if (editingRecipeId === recipe.id) {
        resetRecipeForm();
      }

      setRecipePageCursors((current) => current.slice(0, recipePageIndex + 1));
      await refreshCurrentRecipePage();
      setRecipeFormSuccess('Recipe deleted successfully.');
    } catch (error) {
      setRecipeFormError(normalizeError(error));
    } finally {
      setDeletingRecipeId('');
    }
  };

  const handleSaveBlog = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminUser) {
      setBlogFormError('Please sign in again.');
      return;
    }

    if (!editingBlogId && !blogSelectedImage) {
      setBlogFormError('Please choose a blog cover image before saving.');
      return;
    }

    setSavingBlog(true);
    setBlogFormError('');
    setBlogFormSuccess('');

    try {
      const title = blogForm.title.trim();
      const category = blogForm.category.trim();
      const excerpt = blogForm.excerpt.trim();
      const content = blogForm.content.trim();
      const contentText = getBlogPlainText(content);

      if (!title || !category || !excerpt || !contentText) {
        throw new Error('Complete all blog fields before saving.');
      }

      const blogId = slugifyValue(title);
      if (!blogId) {
        throw new Error('Use letters or numbers in the blog title.');
      }

      const imageData = await uploadBlogImageIfNeeded();
      const categoryId = getBlogCategoryId(category);
      const nextBlogRef = doc(db, 'blogs', blogId);
      const payload: Record<string, unknown> = {
        title,
        excerpt,
        content,
        category,
        categoryId,
        categoryColor: getBlogCategoryColor(categoryId),
        imageUrl: imageData.imageUrl,
        imagePath: imageData.imagePath,
        readTime: getBlogReadTime(content),
        sortTitle: title.toLowerCase(),
        updatedAt: serverTimestamp(),
      };

      if (!editingBlogId) {
        payload.createdAt = serverTimestamp();
        payload.publishedAt = serverTimestamp();
      }

      await setDoc(nextBlogRef, payload, { merge: true });

      if (editingBlogId && editingBlogId !== blogId) {
        await deleteDoc(doc(db, 'blogs', editingBlogId));
      }

      setBlogPageCursors((current) => current.slice(0, blogPageIndex + 1));
      await refreshCurrentBlogPage();
      setBlogForm(emptyBlogForm);
      setBlogSelectedImage(null);
      setEditingBlogId('');
      setBlogFormSuccess(editingBlogId ? 'Blog post updated successfully.' : 'Blog post created successfully.');
    } catch (error) {
      setBlogFormError(normalizeError(error));
    } finally {
      setSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (blog: BlogPost) => {
    const confirmed = window.confirm(`Delete ${blog.title}? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setDeletingBlogId(blog.id);
    setBlogFormError('');
    setBlogFormSuccess('');

    try {
      await deleteDoc(doc(db, 'blogs', blog.id));

      if (blog.imagePath) {
        await deleteObject(ref(storage, blog.imagePath)).catch(() => undefined);
      }

      if (editingBlogId === blog.id) {
        resetBlogForm();
      }

      setBlogPageCursors((current) => current.slice(0, blogPageIndex + 1));
      await refreshCurrentBlogPage();
      setBlogFormSuccess('Blog post deleted successfully.');
    } catch (error) {
      setBlogFormError(normalizeError(error));
    } finally {
      setDeletingBlogId('');
    }
  };

  const handleNextPage = async () => {
    if (!hasNextPage || !currentLastVisible) {
      return;
    }

    setPageCursors((current) => {
      const next = [...current];
      next[pageIndex + 1] = currentLastVisible;
      return next;
    });

    await loadProductPage(currentLastVisible, pageIndex + 1);
  };

  const handlePreviousPage = async () => {
    if (pageIndex === 0) {
      return;
    }

    const previousPageIndex = pageIndex - 1;
    const previousCursor = previousPageIndex === 0 ? null : pageCursors[previousPageIndex] ?? null;
    await loadProductPage(previousCursor, previousPageIndex);
  };

  const handleNextRecipePage = async () => {
    if (!recipeHasNextPage || !recipeCurrentLastVisible) {
      return;
    }

    setRecipePageCursors((current) => {
      const next = [...current];
      next[recipePageIndex + 1] = recipeCurrentLastVisible;
      return next;
    });

    await loadRecipePage(recipeCurrentLastVisible, recipePageIndex + 1);
  };

  const handlePreviousRecipePage = async () => {
    if (recipePageIndex === 0) {
      return;
    }

    const previousPageIndex = recipePageIndex - 1;
    const previousCursor = previousPageIndex === 0 ? null : recipePageCursors[previousPageIndex] ?? null;
    await loadRecipePage(previousCursor, previousPageIndex);
  };

  const handleNextBlogPage = async () => {
    if (!blogHasNextPage || !blogCurrentLastVisible) {
      return;
    }

    setBlogPageCursors((current) => {
      const next = [...current];
      next[blogPageIndex + 1] = blogCurrentLastVisible;
      return next;
    });

    await loadBlogPage(blogCurrentLastVisible, blogPageIndex + 1);
  };

  const handlePreviousBlogPage = async () => {
    if (blogPageIndex === 0) {
      return;
    }

    const previousPageIndex = blogPageIndex - 1;
    const previousCursor = previousPageIndex === 0 ? null : blogPageCursors[previousPageIndex] ?? null;
    await loadBlogPage(previousCursor, previousPageIndex);
  };

  const handleLibraryCategoryChange = (categoryId: string) => {
    setSelectedLibraryCategoryId(categoryId);
    setPageIndex(0);
    setHasNextPage(false);
    setPageCursors([null]);
    setCurrentLastVisible(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#090d1a] text-white grid place-items-center px-6">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span className="inline-flex animate-spin"><ImSpinner8 /></span>
          Checking admin access...
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <AdminLogin
        email={email}
        password={password}
        authError={authError}
        submittingLogin={submittingLogin}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  const handleFormChange = (field: keyof ProductFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleRecipeFormChange = (field: keyof RecipeFormState, value: string) => {
    setRecipeForm((current) => ({ ...current, [field]: value }));
  };

  const handleBlogFormChange = (field: keyof BlogFormState, value: string) => {
    setBlogForm((current) => ({ ...current, [field]: value }));
  };

  const handleMoqChange = (index: number, value: string) => {
    setForm((current) => ({
      ...current,
      moqs: current.moqs.map((moq, moqIndex) => (moqIndex === index ? value : moq)),
    }));
  };

  const handleAddMoq = () => {
    setForm((current) => ({
      ...current,
      moqs: [...current.moqs, ''],
    }));
  };

  const handleRemoveMoq = (index: number) => {
    setForm((current) => {
      if (current.moqs.length === 1) {
        return {
          ...current,
          moqs: [''],
        };
      }

      return {
        ...current,
        moqs: current.moqs.filter((_, moqIndex) => moqIndex !== index),
      };
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'add-product':
        return (
          <ProductFormPanel
            editingProductId={editingProductId}
            form={form}
            categoryForm={categoryForm}
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoryError={categoryError}
            savingCategory={savingCategory}
            deletingCategoryId={deletingCategoryId}
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            formError={formError}
            formSuccess={formSuccess}
            savingProduct={savingProduct}
            onCategoryFormChange={(value) => setCategoryForm({ name: value })}
            onCreateCategory={handleCategoryCreate}
            onDeleteCategory={handleDeleteCategory}
            onCancelEdit={resetForm}
            onImageSelect={handleImageSelect}
            onFormChange={handleFormChange}
            onMoqChange={handleMoqChange}
            onAddMoq={handleAddMoq}
            onRemoveMoq={handleRemoveMoq}
            onSubmit={handleSaveProduct}
          />
        );
      case 'catalog':
        return (
          <ProductListPanel
            products={products}
            categories={categories}
            productsLoading={productsLoading}
            libraryError={libraryError}
            deletingProductId={deletingProductId}
            pageIndex={pageIndex}
            hasNextPage={hasNextPage}
            hasPreviousPage={pageIndex > 0}
            selectedCategoryId={selectedLibraryCategoryId}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onCategoryChange={handleLibraryCategoryChange}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 'add-recipe':
        return (
          <RecipeFormPanel
            editingRecipeId={editingRecipeId}
            form={recipeForm}
            formError={recipeFormError}
            formSuccess={recipeFormSuccess}
            savingRecipe={savingRecipe}
            onFormChange={handleRecipeFormChange}
            onCancelEdit={resetRecipeForm}
            onSubmit={handleSaveRecipe}
          />
        );
      case 'recipe-library':
        return (
          <RecipeListPanel
            recipes={recipes}
            recipesLoading={recipesLoading}
            recipesError={recipesError}
            deletingRecipeId={deletingRecipeId}
            pageIndex={recipePageIndex}
            hasNextPage={recipeHasNextPage}
            hasPreviousPage={recipePageIndex > 0}
            onEditRecipe={handleEditRecipe}
            onDeleteRecipe={handleDeleteRecipe}
            onNextPage={handleNextRecipePage}
            onPreviousPage={handlePreviousRecipePage}
          />
        );
      case 'add-blog':
        return (
          <BlogFormPanel
            editingBlogId={editingBlogId}
            form={blogForm}
            selectedImage={blogSelectedImage}
            previewUrl={blogPreviewUrl}
            formError={blogFormError}
            formSuccess={blogFormSuccess}
            savingBlog={savingBlog}
            onImageSelect={handleBlogImageSelect}
            onFormChange={handleBlogFormChange}
            onCancelEdit={resetBlogForm}
            onSubmit={handleSaveBlog}
          />
        );
      case 'blog-library':
        return (
          <BlogListPanel
            blogs={blogs}
            blogsLoading={blogsLoading}
            blogsError={blogsError}
            deletingBlogId={deletingBlogId}
            pageIndex={blogPageIndex}
            hasNextPage={blogHasNextPage}
            hasPreviousPage={blogPageIndex > 0}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
            onNextPage={handleNextBlogPage}
            onPreviousPage={handlePreviousBlogPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AdminShell
      activeSection={activeSection}
      items={sidebarItems}
      userEmail={adminUser.email || 'Admin'}
      sectionTitle={sectionContent[activeSection].title}
      sectionDescription={sectionContent[activeSection].description}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      {renderSection()}
    </AdminShell>
  );
};

export default AdminPanel;