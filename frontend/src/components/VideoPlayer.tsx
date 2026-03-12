import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MdPlayArrow } from 'react-icons/md';

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  title: string;
}

const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const getYouTubeVideoId = (value: string) => {
  const input = value.trim();
  if (!input) {
    return '';
  }

  if (YOUTUBE_ID_PATTERN.test(input)) {
    return input;
  }

  try {
    const parsedUrl = new URL(input);
    const host = parsedUrl.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] ?? '';
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const watchId = parsedUrl.searchParams.get('v');
      if (watchId) {
        return watchId;
      }

      const segments = parsedUrl.pathname.split('/').filter(Boolean);
      return segments[segments.length - 1] ?? '';
    }
  } catch {
    return '';
  }

  return '';
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnail, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);
  const embedUrl = useMemo(() => {
    if (!videoId) {
      return '';
    }

    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  const handlePlay = () => {
    if (!embedUrl) {
      setHasError(true);
      return;
    }

    setHasError(false);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
      <AnimatePresence>
        {!isPlaying && !hasError && (
          <motion.button
            type="button"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={handlePlay}
            aria-label={`Play ${title}`}
          >
            <img 
              src={thumbnail} 
              alt={title} 
              className="h-full w-full object-cover brightness-75 transition-all duration-500 hover:brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
              >
                <span className="inline-flex translate-x-0.5">
                  <MdPlayArrow size={48} />
                </span>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-bold">{title}</h3>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {isPlaying && !hasError && (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onError={() => {
            setIsPlaying(false);
            setHasError(true);
          }}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-slate-950/85 px-6 text-center text-white">
          <p className="text-sm font-semibold">This video could not be loaded in the embedded player.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
