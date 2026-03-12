import React from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import type { Recipe } from '../../types/recipe';

interface RecipeListPanelProps {
  recipes: Recipe[];
  recipesLoading: boolean;
  recipesError: string;
  deletingRecipeId: string;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onEditRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const RecipeListPanel = ({
  recipes,
  recipesLoading,
  recipesError,
  deletingRecipeId,
  pageIndex,
  hasNextPage,
  hasPreviousPage,
  onEditRecipe,
  onDeleteRecipe,
  onNextPage,
  onPreviousPage,
}: RecipeListPanelProps) => {
  return (
    <section className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Recipe Library</h2>
          <p className="mt-2 text-slate-500">These recipe videos are shown live on the public recipes page.</p>
        </div>
        <Link
          to="/recipes"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          View Public Page
        </Link>
      </div>

      {recipesLoading && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-slate-500">
          Loading recipes...
        </div>
      )}

      {!recipesLoading && recipesError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-red-700">
          {recipesError}
        </div>
      )}

      {!recipesLoading && !recipesError && recipes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
          No recipe videos yet. Add the first one from the Recipe Video section.
        </div>
      )}

      {!recipesLoading && !recipesError && recipes.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <article key={recipe.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-bold text-slate-900">{recipe.title}</h4>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      {recipe.duration}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-slate-600">{recipe.description}</p>

                  <a
                    href={recipe.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-primary transition hover:text-primary/80"
                  >
                    Open YouTube video
                  </a>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => onEditRecipe(recipe)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
                    >
                      <HiOutlinePencilSquare size={14} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteRecipe(recipe)}
                      disabled={deletingRecipeId === recipe.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {deletingRecipeId === recipe.id ? <span className="inline-flex animate-spin"><ImSpinner8 size={14} /></span> : <HiOutlineTrash size={14} />}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">Page {pageIndex + 1}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onPreviousPage}
                disabled={!hasPreviousPage || recipesLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HiOutlineChevronLeft size={16} />
                Previous
              </button>
              <button
                type="button"
                onClick={onNextPage}
                disabled={!hasNextPage || recipesLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <HiOutlineChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecipeListPanel;