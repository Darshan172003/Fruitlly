import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import type { Recipe } from '../types/recipe';

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export const extractYouTubeVideoId = (value: string) => {
  const input = value.trim();
  if (!input) {
    return '';
  }

  if (YOUTUBE_ID_PATTERN.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      const candidate = url.pathname.split('/').filter(Boolean)[0] ?? '';
      return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : '';
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const watchId = url.searchParams.get('v') ?? '';
      if (YOUTUBE_ID_PATTERN.test(watchId)) {
        return watchId;
      }

      const pathSegments = url.pathname.split('/').filter(Boolean);
      const candidate = pathSegments[pathSegments.length - 1] ?? '';
      return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : '';
    }
  } catch {
    return '';
  }

  return '';
};

export const getRecipeThumbnail = (youtubeId: string) => {
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
};

export const mapRecipeData = (id: string, data: DocumentData): Recipe => {
  const youtubeUrl = String(data.youtubeUrl ?? '');
  const youtubeId = String(data.youtubeId ?? extractYouTubeVideoId(youtubeUrl));

  return {
    id,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    youtubeUrl,
    youtubeId,
    thumbnail: String(data.thumbnail ?? getRecipeThumbnail(youtubeId)),
    duration: String(data.duration ?? ''),
    sortName: String(data.sortName ?? id),
  };
};

export const mapRecipeDocument = (document: QueryDocumentSnapshot<DocumentData>): Recipe => {
  return mapRecipeData(document.id, document.data());
};