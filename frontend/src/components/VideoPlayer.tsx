import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'motion/react';
import { MdPlayArrow, MdPause, MdVolumeUp, MdVolumeOff, MdFullscreen } from 'react-icons/md';

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnail, title }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handlePlayPause = () => setPlaying(!playing);
  const handleToggleMute = () => setMuted(!muted);
  
  const handleProgress = (state: any) => {
    setPlayed(state.played);
  };

  const handleDuration = (dur: any) => {
    setDuration(dur);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const Player = ReactPlayer as any;

  return (
    <div 
      className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden group shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Custom Thumbnail Overlay */}
      <AnimatePresence>
        {!playing && played === 0 && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={handlePlayPause}
          >
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
              >
                <MdPlayArrow size={48} className="ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-bold">{title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Player */}
      <Player
        url={url}
        playing={playing}
        muted={muted}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
        config={{
          youtube: {
            playerVars: { 
              controls: 0, 
              rel: 0, 
              modestbranding: 1 
            }
          }
        }}
        style={{ pointerEvents: playing ? 'auto' : 'none' }}
      />

      {/* Custom Controls Overlay */}
      <AnimatePresence>
        {playing && (showControls || !playing) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20"
          >
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden cursor-pointer relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
                style={{ width: `${played * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button onClick={handlePlayPause} className="hover:text-primary transition-colors">
                  {playing ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
                </button>
                
                <div className="flex items-center gap-2">
                  <button onClick={handleToggleMute} className="hover:text-primary transition-colors">
                    {muted ? <MdVolumeOff size={20} /> : <MdVolumeUp size={20} />}
                  </button>
                  <span className="text-xs font-mono">
                    {formatTime(played * duration)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="hover:text-primary transition-colors">
                  <MdFullscreen size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
