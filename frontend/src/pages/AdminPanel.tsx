import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { HiOutlinePlus, HiOutlineQueueList } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import {
  collection,
  collectionGroup,
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
import type { Product } from '../types/product';
import {
  AdminLogin,
  AdminShell,
  ProductFormPanel,
  ProductListPanel,
  type AdminSectionId,
  type AdminSidebarItem,
  type CategoryFormState,
  type CategoryOption,
  type ProductFormState,
} from '../components/Admin';
import { mapCategoryDocument, mapProductDocument, slugifyValue } from '../lib/productCatalog';

const emptyForm: ProductFormState = {
  categoryId: '',
  title: '',
  shortDescription: '',
  description: '',
  ingredients: '',
  textureProfile: '',
  bulkPackaging: '',
  shelfLifeStorage: '',
  imageUrl: '',
  imagePath: '',
};

const emptyCategoryForm: CategoryFormState = {
  name: '',
};

const normalizeError = (message: unknown) => {
  if (message instanceof Error) {
    return message.message;
  }

  return 'Something went wrong. Please try again.';
};

const PRODUCTS_PAGE_SIZE = 6;

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
  const [pageIndex, setPageIndex] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageCursors, setPageCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([null]);
  const [currentLastVisible, setCurrentLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [editingLocation, setEditingLocation] = useState<{ categoryId: string; productId: string } | null>(null);

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
      setPageIndex(0);
      setHasNextPage(false);
      setPageCursors([null]);
      setCurrentLastVisible(null);
      return;
    }

    setPageIndex(0);
    setHasNextPage(false);
    setPageCursors([null]);
    setCurrentLastVisible(null);
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

        setForm((current) => {
          if (current.categoryId) {
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
      const productsQuery = cursor
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

  useEffect(() => {
    if (!adminUser) {
      return;
    }

    void loadProductPage(null, 0);
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

  const resetForm = () => {
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? '',
    });
    setEditingLocation(null);
    setSelectedImage(null);
    setEditingProductId('');
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

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedImage(file);
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
      description: product.description,
      ingredients: product.ingredients,
      textureProfile: product.textureProfile,
      bulkPackaging: product.bulkPackaging,
      shelfLifeStorage: product.shelfLifeStorage,
      imageUrl: product.imageUrl,
      imagePath: product.imagePath,
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
        description: form.description.trim(),
        ingredients: form.ingredients.trim(),
        textureProfile: form.textureProfile.trim(),
        bulkPackaging: form.bulkPackaging.trim(),
        shelfLifeStorage: form.shelfLifeStorage.trim(),
        imageUrl: imageData.imageUrl,
        imagePath: imageData.imagePath,
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#090d1a] text-white grid place-items-center px-6">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <ImSpinner8 className="animate-spin" />
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
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            formError={formError}
            formSuccess={formSuccess}
            savingProduct={savingProduct}
            onCategoryFormChange={(value) => setCategoryForm({ name: value })}
            onCreateCategory={handleCategoryCreate}
            onCancelEdit={resetForm}
            onImageSelect={handleImageSelect}
            onFormChange={handleFormChange}
            onSubmit={handleSaveProduct}
          />
        );
      case 'catalog':
        return (
          <ProductListPanel
            products={products}
            productsLoading={productsLoading}
            libraryError={libraryError}
            deletingProductId={deletingProductId}
            pageIndex={pageIndex}
            hasNextPage={hasNextPage}
            hasPreviousPage={pageIndex > 0}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
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