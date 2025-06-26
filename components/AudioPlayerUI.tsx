'use client';

import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useEffect, useState, ChangeEvent, MouseEvent, TouchEvent } from 'react';

const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"></polygon></svg>;
const PauseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>;
const PrevIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,5 19,19 12,12"></polygon><line x1="6" y1="5" x2="6" y2="19"></line></svg>;
const NextIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,5 5,19 12,12"></polygon><line x1="18" y1="5" x2="18" y2="19"></line></svg>;
const MusicNoteSmallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;

export default function AudioPlayerUI() {
  const {
    track,
    playing,
    progress,
    duration,
    togglePlayPause,
    seekTo,
    nextTrack,
    prevTrack,
  } = useAudioPlayer();

  const [seekValue, setSeekValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) {
      setSeekValue(progress);
    }
  }, [progress, isSeeking]);

  if (!track) return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md text-white p-3 text-center text-sm shadow-2xl border-t border-zinc-700/50 h-[68px] sm:h-[84px] flex items-center justify-center">
      <span className="text-zinc-400">Select a track to play</span>
    </div>
  );

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeekValue(Number(e.target.value));
  };

  const handleSeekInteractionStart = () => setIsSeeking(true);
  
  const handleSeekInteractionEnd = (e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>) => {
    const targetValue = (e.target as HTMLInputElement).value;
    seekTo(Number(targetValue));
    setIsSeeking(false);
  };

  const currentProgressPercent = duration > 0 ? (seekValue / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md text-white p-3 sm:p-4 shadow-2xl border-t border-zinc-700/50">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-700 rounded flex items-center justify-center shrink-0">
            {track.artwork && !track.artwork.includes("placeholder") ? (
              <img src={track.artwork} alt={track.title} className="w-full h-full object-cover rounded"/>
            ) : (
              <MusicNoteSmallIcon />
            )}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm sm:text-base text-zinc-100 truncate" title={track.title}>{track.title}</div>
            <div className="text-xs text-zinc-400 truncate" title={track.artist}>{track.artist}</div>
          </div>
        </div>

        {/* Controls & Progress Bar (Combined for better mobile layout) */}
        <div className="flex flex-col items-center w-full sm:w-auto sm:flex-[1.5_1_0%] max-w-md">
          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={prevTrack} className="text-zinc-300 hover:text-white transition-colors disabled:opacity-50" aria-label="Previous track" disabled={!prevTrack}>
              <PrevIcon />
            </button>
            <button 
              onClick={togglePlayPause} 
              className="bg-white text-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:scale-105 transition-transform active:scale-95" 
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={nextTrack} className="text-zinc-300 hover:text-white transition-colors disabled:opacity-50" aria-label="Next track" disabled={!nextTrack}>
              <NextIcon />
            </button>
          </div>
          
          {/* Progress Bar for all screen sizes */}
          <div className="flex items-center gap-2 w-full mt-2 pt-1">
            <span className="text-xs text-zinc-400 w-9 text-center tabular-nums">{formatTime(seekValue)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={seekValue}
              onChange={handleSeekChange}
              onMouseDown={handleSeekInteractionStart}
              onMouseUp={handleSeekInteractionEnd}
              onTouchStart={handleSeekInteractionStart}
              onTouchEnd={handleSeekInteractionEnd}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer group/slider"
              style={{ backgroundSize: `${currentProgressPercent}% 100%` }}
              aria-label="Track progress"
            />
            <span className="text-xs text-zinc-400 w-9 text-center tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume Controls (Placeholder - can be added on sm:flex-1) */}
        <div className="hidden sm:flex sm:w-auto sm:flex-1 justify-end min-w-0">
           {/* Future: Volume slider here */}
        </div>
      </div>
    </div>
  );
}
