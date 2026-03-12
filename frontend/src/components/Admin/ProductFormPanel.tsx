import React, { type ChangeEvent, type FormEvent } from 'react';
import { HiOutlineCloudArrowUp, HiOutlineFolderPlus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import type { CategoryFormState, CategoryOption, ProductFormState } from './types';

interface ProductFormPanelProps {
  editingProductId: string;
  form: ProductFormState;
  categoryForm: CategoryFormState;
  categories: CategoryOption[];
  categoriesLoading: boolean;
  categoryError: string;
  savingCategory: boolean;
  deletingCategoryId: string;
  selectedImage: File | null;
  previewUrl: string;
  formError: string;
  formSuccess: string;
  savingProduct: boolean;
  onCategoryFormChange: (value: string) => void;
  onCreateCategory: () => void;
  onDeleteCategory: (categoryId: string, categoryName: string) => void;
  onCancelEdit: () => void;
  onImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormChange: (field: keyof ProductFormState, value: string) => void;
  onMoqChange: (index: number, value: string) => void;
  onAddMoq: () => void;
  onRemoveMoq: (index: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const ProductFormPanel = ({
  editingProductId,
  form,
  categoryForm,
  categories,
  categoriesLoading,
  categoryError,
  savingCategory,
  deletingCategoryId,
  selectedImage,
  previewUrl,
  formError,
  formSuccess,
  savingProduct,
  onCategoryFormChange,
  onCreateCategory,
  onDeleteCategory,
  onCancelEdit,
  onImageSelect,
  onFormChange,
  onMoqChange,
  onAddMoq,
  onRemoveMoq,
  onSubmit,
}: ProductFormPanelProps) => {
  return (
    <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{editingProductId ? 'Edit Product' : 'Add Product'}</h2>
          <p className="mt-2 text-slate-500">Create new catalog items or update existing ones.</p>
        </div>
        {editingProductId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <label className="block flex-1">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Create category first</span>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(event) => onCategoryFormChange(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary"
                placeholder="Jelly Cubes"
              />
            </label>

            <button
              type="button"
              onClick={onCreateCategory}
              disabled={savingCategory}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingCategory ? <ImSpinner8 className="animate-spin" size={18} /> : <HiOutlineFolderPlus size={18} />}
              Create Category
            </button>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Manage categories</p>
              <span className="text-xs font-medium text-slate-400">
                {categories.length} categor{categories.length === 1 ? 'y' : 'ies'}
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {categories.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm text-slate-500">
                  No categories created yet.
                </div>
              ) : (
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{category.name}</p>
                      <p className="text-xs text-slate-500">ID: {category.id}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteCategory(category.id, category.name)}
                      disabled={deletingCategoryId === category.id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingCategoryId === category.id ? <ImSpinner8 className="animate-spin" size={16} /> : <HiOutlineTrash size={16} />}
                      Delete Category
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {categoryError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {categoryError}
            </div>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Category</span>
            <select
              value={form.categoryId}
              onChange={(event) => onFormChange('categoryId', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              disabled={categoriesLoading || categories.length === 0}
              required
            >
              <option value="">{categoriesLoading ? 'Loading categories...' : 'Select category'}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Product title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => onFormChange('title', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              required
            />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Short description</span>
            <textarea
              value={form.shortDescription}
              onChange={(event) => onFormChange('shortDescription', event.target.value)}
              className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Product image</span>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                <HiOutlineCloudArrowUp size={16} />
                Choose image
                <input type="file" accept="image/*" className="hidden" onChange={onImageSelect} />
              </label>
              <p className="mt-3 text-sm text-slate-500">
                {selectedImage ? selectedImage.name : form.imageUrl ? 'Current image will remain until you replace it.' : 'PNG, JPG, WEBP supported. Stored under the selected category.'}
              </p>
            </div>
          </label>

          <div className="block md:col-span-2">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <span className="block text-sm font-semibold text-slate-700">MOQ options</span>
                <p className="mt-1 text-sm text-slate-500">Add one or more minimum order quantity values for this product.</p>
              </div>

              <button
                type="button"
                onClick={onAddMoq}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <HiOutlinePlus size={16} />
                Add MOQ
              </button>
            </div>

            <div className="space-y-3">
              {form.moqs.map((moq, index) => (
                <div key={`moq-${index}`} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={moq}
                    onChange={(event) => onMoqChange(index, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
                    placeholder="50 cartons"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => onRemoveMoq(index)}
                    disabled={form.moqs.length === 1}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <HiOutlineTrash size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {(selectedImage || form.imageUrl) && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700 mb-3">Image preview</p>
            <img
              src={selectedImage ? previewUrl : form.imageUrl}
              alt="Selected product preview"
              className="h-52 w-full rounded-2xl object-cover"
            />
          </div>
        )}

        {formError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        {formSuccess && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {formSuccess}
          </div>
        )}

        <button
          type="submit"
          disabled={savingProduct}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {savingProduct ? <ImSpinner8 className="animate-spin" size={18} /> : <HiOutlinePlus size={18} />}
          {editingProductId ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </section>
  );
};

export default ProductFormPanel;