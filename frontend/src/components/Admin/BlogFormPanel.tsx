import React, { useEffect, type ChangeEvent, type FormEvent } from 'react';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor, type Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Link2,
  List,
  ListOrdered,
  LucideIcon,
  Minus,
  Pilcrow,
  Redo2,
  Quote,
  RemoveFormatting,
  RotateCcw,
  RotateCw,
  ScrollText,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from 'lucide-react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { ImSpinner8 } from 'react-icons/im';
import type { BlogFormState } from './types';

interface BlogFormPanelProps {
  editingBlogId: string;
  form: BlogFormState;
  selectedImage: File | null;
  previewUrl: string;
  formError: string;
  formSuccess: string;
  savingBlog: boolean;
  onImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onFormChange: (field: keyof BlogFormState, value: string) => void;
  onCancelEdit: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

type ToolbarAction = {
  label: string;
  icon: LucideIcon;
  isActive?: (editor: Editor) => boolean;
  onClick: (editor: Editor) => void;
};

type ToolbarGroup = {
  title: string;
  description: string;
  actions: ToolbarAction[];
};

const BlogFormPanel = ({
  editingBlogId,
  form,
  selectedImage,
  previewUrl,
  formError,
  formSuccess,
  savingBlog,
  onImageSelect,
  onFormChange,
  onCancelEdit,
  onSubmit,
}: BlogFormPanelProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: form.content,
    editorProps: {
      attributes: {
        class:
          'min-h-[460px] rounded-3xl border border-slate-200 bg-white px-5 py-5 text-[15px] leading-7 text-slate-700 outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 max-w-none [&_p]:my-4 [&_p]:text-[15px] [&_p]:leading-7 [&_p]:text-slate-700 [&_a]:font-semibold [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:text-blue-700 [&_strong]:font-black [&_strong]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-5xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:text-slate-950 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:font-black [&_h2]:leading-tight [&_h2]:text-slate-900 [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-3xl [&_h3]:font-black [&_h3]:leading-snug [&_h3]:text-slate-900 [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:text-2xl [&_h4]:font-extrabold [&_h4]:leading-snug [&_h4]:text-slate-900 [&_h5]:mt-5 [&_h5]:mb-2 [&_h5]:text-xl [&_h5]:font-bold [&_h5]:leading-snug [&_h5]:uppercase [&_h5]:tracking-[0.08em] [&_h5]:text-slate-800 [&_h6]:mt-5 [&_h6]:mb-2 [&_h6]:text-base [&_h6]:font-bold [&_h6]:leading-6 [&_h6]:uppercase [&_h6]:tracking-[0.14em] [&_h6]:text-slate-500 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-300 [&_blockquote]:bg-amber-50 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-slate-100 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_hr]:my-8 [&_hr]:border-slate-200',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onFormChange('content', currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();
    const nextHtml = form.content || '<p></p>';

    if (currentHtml !== nextHtml) {
      editor.commands.setContent(nextHtml, { emitUpdate: false });
    }
  }, [editor, form.content]);

  const toolbarGroups: ToolbarGroup[] = [
    {
      title: 'Structure',
      description: 'Shape the article hierarchy and flow.',
      actions: [
        {
          label: 'H1',
          icon: Heading1,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 1 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 1 }).run(),
        },
        {
          label: 'H2',
          icon: Heading2,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 2 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 2 }).run(),
        },
        {
          label: 'H3',
          icon: Heading3,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 3 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 3 }).run(),
        },
        {
          label: 'H4',
          icon: Heading4,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 4 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 4 }).run(),
        },
        {
          label: 'H5',
          icon: Heading5,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 5 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 5 }).run(),
        },
        {
          label: 'H6',
          icon: Heading6,
          isActive: (currentEditor) => currentEditor.isActive('heading', { level: 6 }),
          onClick: (currentEditor) => currentEditor.chain().focus().setHeading({ level: 6 }).run(),
        },
        {
          label: 'Body',
          icon: Pilcrow,
          isActive: (currentEditor) => currentEditor.isActive('paragraph'),
          onClick: (currentEditor) => currentEditor.chain().focus().setParagraph().run(),
        },
      ],
    },
    {
      title: 'Emphasis',
      description: 'Highlight key ideas and add contrast.',
      actions: [
        {
          label: 'Bold',
          icon: Bold,
          isActive: (currentEditor) => currentEditor.isActive('bold'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleBold().run(),
        },
        {
          label: 'Italic',
          icon: Italic,
          isActive: (currentEditor) => currentEditor.isActive('italic'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleItalic().run(),
        },
        {
          label: 'Strike',
          icon: Strikethrough,
          isActive: (currentEditor) => currentEditor.isActive('strike'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleStrike().run(),
        },
        {
          label: 'Underline',
          icon: UnderlineIcon,
          isActive: (currentEditor) => currentEditor.isActive('underline'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleUnderline().run(),
        },
        {
          label: 'Code',
          icon: Code2,
          isActive: (currentEditor) => currentEditor.isActive('code'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleCode().run(),
        },
        {
          label: 'Clear marks',
          icon: RemoveFormatting,
          onClick: (currentEditor) => currentEditor.chain().focus().unsetAllMarks().run(),
        },
        {
          label: 'Clear nodes',
          icon: Eraser,
          onClick: (currentEditor) => currentEditor.chain().focus().clearNodes().run(),
        },
      ],
    },
    {
      title: 'Blocks',
      description: 'Build richer sections and content patterns.',
      actions: [
        {
          label: 'List',
          icon: List,
          isActive: (currentEditor) => currentEditor.isActive('bulletList'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleBulletList().run(),
        },
        {
          label: 'Ordered list',
          icon: ListOrdered,
          isActive: (currentEditor) => currentEditor.isActive('orderedList'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleOrderedList().run(),
        },
        {
          label: 'Code block',
          icon: ScrollText,
          isActive: (currentEditor) => currentEditor.isActive('codeBlock'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleCodeBlock().run(),
        },
        {
          label: 'Blockquote',
          icon: Quote,
          isActive: (currentEditor) => currentEditor.isActive('blockquote'),
          onClick: (currentEditor) => currentEditor.chain().focus().toggleBlockquote().run(),
        },
        {
          label: 'Horizontal rule',
          icon: Minus,
          onClick: (currentEditor) => currentEditor.chain().focus().setHorizontalRule().run(),
        },
        {
          label: 'Hard break',
          icon: RotateCw,
          onClick: (currentEditor) => currentEditor.chain().focus().setHardBreak().run(),
        },
      ],
    },
    {
      title: 'Alignment',
      description: 'Control how each paragraph block sits on the page.',
      actions: [
        {
          label: 'Left',
          icon: AlignLeft,
          isActive: (currentEditor) => currentEditor.isActive({ textAlign: 'left' }),
          onClick: (currentEditor) => currentEditor.chain().focus().setTextAlign('left').run(),
        },
        {
          label: 'Center',
          icon: AlignCenter,
          isActive: (currentEditor) => currentEditor.isActive({ textAlign: 'center' }),
          onClick: (currentEditor) => currentEditor.chain().focus().setTextAlign('center').run(),
        },
        {
          label: 'Right',
          icon: AlignRight,
          isActive: (currentEditor) => currentEditor.isActive({ textAlign: 'right' }),
          onClick: (currentEditor) => currentEditor.chain().focus().setTextAlign('right').run(),
        },
        {
          label: 'Justify',
          icon: AlignJustify,
          isActive: (currentEditor) => currentEditor.isActive({ textAlign: 'justify' }),
          onClick: (currentEditor) => currentEditor.chain().focus().setTextAlign('justify').run(),
        },
      ],
    },
    {
      title: 'History',
      description: 'Undo and redo writing changes quickly.',
      actions: [
        {
          label: 'Undo',
          icon: Undo2,
          onClick: (currentEditor) => currentEditor.chain().focus().undo().run(),
        },
        {
          label: 'Redo',
          icon: Redo2,
          onClick: (currentEditor) => currentEditor.chain().focus().redo().run(),
        },
      ],
    },
  ];

  const getToolbarButtonClassName = (isActive: boolean) =>
    `inline-flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${
      isActive
        ? 'border-[#2563eb] bg-[#2563eb] text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)]'
        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
    }`;

  const insertLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const href = window.prompt('Enter the link URL', previousUrl ?? '');

    if (href === null) {
      return;
    }

    const trimmedHref = href.trim();

    if (!trimmedHref) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${trimmedHref}" target="_blank" rel="noreferrer">Link text</a>`).run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: trimmedHref }).run();
  };

  return (
    <section className="rounded-4xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{editingBlogId ? 'Edit Blog Post' : 'Add Blog Post'}</h2>
          <p className="mt-2 text-slate-500">Create blog articles with cover images, excerpts, and formatted content blocks.</p>
        </div>
        {editingBlogId && (
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
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Blog title</span>
            <input
              type="text"
              value={form.title}
              onChange={(event) => onFormChange('title', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              placeholder="The Rise of Sugar Coated Jelly in B2B Confectionery"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Category</span>
            <input
              type="text"
              value={form.category}
              onChange={(event) => onFormChange('category', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Market Trend"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Cover image</span>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                <HiOutlineCloudArrowUp size={16} />
                Choose image
                <input type="file" accept="image/*" className="hidden" onChange={onImageSelect} />
              </label>
              <p className="mt-3 text-sm text-slate-500">
                {selectedImage ? selectedImage.name : form.imageUrl ? 'Current image will remain until you replace it.' : 'Upload a blog cover image for the public blog grid.'}
              </p>
            </div>
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Excerpt</span>
            <textarea
              value={form.excerpt}
              onChange={(event) => onFormChange('excerpt', event.target.value)}
              className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Short summary shown in the blog card."
              required
            />
          </label>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur md:p-5">
          <div className="mb-5 rounded-3xl border border-slate-200 bg-slate-50/90 p-4">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Editor Tools</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">Compose with better control</h3>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                Full formatting toolbar with writing history and block tools
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {toolbarGroups.map((group) => (
                <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-3">
                  <p className="text-sm font-black text-slate-900">{group.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{group.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.actions.map((action) => {
                      const Icon = action.icon;
                      const isActive = editor ? (action.isActive?.(editor) ?? false) : false;

                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => editor && action.onClick(editor)}
                          className={getToolbarButtonClassName(isActive)}
                        >
                          <Icon size={16} />
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-slate-200 bg-white p-3 xl:col-span-2">
                <p className="text-sm font-black text-slate-900">Links</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Attach or update a link on selected text, or insert a default link block.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={insertLink}
                    className={getToolbarButtonClassName(Boolean(editor?.isActive('link')))}
                  >
                    <Link2 size={16} />
                    Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="block">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="block text-sm font-semibold text-slate-700">Article content</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                Rich text canvas
              </span>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <EditorContent editor={editor} />
            </div>
            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Use the toolbar to format the article directly. The separate live preview panel has been removed to keep the editor focused on writing.
            </div>
          </div>
        </div>

        {(selectedImage || form.imageUrl) && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-700">Cover preview</p>
            <img
              src={selectedImage ? previewUrl : form.imageUrl}
              alt="Selected blog preview"
              className="h-60 w-full rounded-2xl object-cover"
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
          disabled={savingBlog}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {savingBlog ? <span className="inline-flex animate-spin"><ImSpinner8 size={18} /></span> : 'Publish'}
          {editingBlogId ? 'Update Blog Post' : 'Save Blog Post'}
        </button>

        {!form.content.trim() && (
          <p className="text-sm text-slate-500">Add article content before saving the blog post.</p>
        )}
      </form>
    </section>
  );
};

export default BlogFormPanel;