import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import characterImage from "../imports/images__1_-removebg-preview.png";

export default function App() {
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, twinkleDelay: number}>>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const starArray = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleDelay: Math.random() * 3
    }));
    setStars(starArray);
  }, []);

  const handleClick = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    setShowVideo(false);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="size-full flex items-center justify-center bg-black">
      <div className="relative overflow-hidden bg-black" style={{ width: '960px', height: '540px' }}>
        {/* Stars background */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.twinkleDelay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Animated character image */}
        {!showVideo && (
          <motion.div
            className="absolute flex flex-col items-center justify-center gap-2 cursor-pointer"
            style={{
              left: '50%',
              x: '-50%',
            }}
            animate={{
              y: [600, 240, 240, -150],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              times: [0, 0.4, 0.7, 1],
              repeat: Infinity,
              repeatDelay: 1,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            onClick={handleClick}
          >
            <img
              src={characterImage}
              alt="Character"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(100, 150, 255, 0.6))',
              }}
            />
            <motion.p
              className="text-xs tracking-wider"
              style={{
                background: 'linear-gradient(to bottom, #ffffff, #888888)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Space Mono", monospace',
                fontWeight: 700,
              }}
              animate={{
                x: [0, -0.5, 0.5, -0.5, 0, 0.5, -0.5, 0],
                y: [0, 0.5, -0.5, 0.5, 0, -0.5, 0.5, 0],
              }}
              transition={{
                x: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "linear"
                },
                y: {
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              SLIT
            </motion.p>
          </motion.div>
        )}

        {/* Video Player */}
        {showVideo && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ pointerEvents: 'none' }}
              >
                <source src="https://r2.fivemanage.com/DScflHu76T4FMxdTRNCSW/Lil6Ft.ScrewlyG-USORNUN(OfficialMusicVideo).mp4" type="video/mp4" />
              </video>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSliderChange}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer mb-2"
                  style={{
                    accentColor: '#6495ff',
                  }}
                />
                <div className="flex justify-between items-center text-white/80 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                    <span>{formatTime(currentTime)}</span>
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}