import React, { type FormEvent } from 'react';
// import { HiOutlinePlus } from 'react-icons/hi2';
import { MdVideoFile } from "react-icons/md";
import { ImSpinner8 } from 'react-icons/im';
import type { RecipeFormState } from './types';

interface RecipeFormPanelProps {
  editingRecipeId: string;
  form: RecipeFormState;
  formError: string;
  formSuccess: string;
  savingRecipe: boolean;
  onFormChange: (field: keyof RecipeFormState, value: string) => void;
  onCancelEdit: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const RecipeFormPanel = ({
  editingRecipeId,
  form,
  formError,
  formSuccess,
  savingRecipe,
  onFormChange,
  onCancelEdit,
  onSubmit,
}: RecipeFormPanelProps) => {
  return (
    <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{editingRecipeId ? 'Edit Recipe Video' : 'Add Recipe Video'}</h2>
          <p className="mt-2 text-slate-500">Publish recipe videos to the public recipes page using a YouTube link.</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Recipe name</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => onFormChange('title', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
            placeholder="Sparkling Jelly Mocktails"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">YouTube link</span>
          <input
            type="url"
            value={form.youtubeUrl}
            onChange={(event) => onFormChange('youtubeUrl', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </label>

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => onFormChange('description', event.target.value)}
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Explain what buyers or chefs will learn from this video."
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Duration</span>
            <input
              type="text"
              value={form.duration}
              onChange={(event) => onFormChange('duration', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              placeholder="8 mins"
              required
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {editingRecipeId && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            disabled={savingRecipe}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {savingRecipe ? <span className="inline-flex animate-spin"><ImSpinner8 size={18} /></span> : <MdVideoFile size={18} />}
            {editingRecipeId ? 'Update Recipe' : 'Save Recipe'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecipeFormPanel;