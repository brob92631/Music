'use client';

import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useEffect, useState, ChangeEvent, MouseEvent, TouchEvent } from 'react';

// Icons
const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const PrevIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>;
const NextIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zm-4.5 6-8.5 6V6z"/></svg>;
const MusicNoteSmallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const VolumeHighIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const VolumeMuteIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>;


export default function AudioPlayerUI() {
  const {
    track, playing, progress, duration, volume,
    togglePlayPause, seekTo, nextTrack, prevTrack, setVolume
  } = useAudioPlayer();

  const [seekValue, setSeekValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (!isSeeking) setSeekValue(progress);
  }, [progress, isSeeking]);

  if (!track) return null; // Return null to hide player completely if no track is selected

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => setSeekValue(Number(e.target.value));
  const handleSeekEnd = (e: MouseEvent<HTMLInputElement> | TouchEvent<HTMLInputElement>) => {
    const targetValue = Number((e.target as HTMLInputElement).value);
    seekTo(targetValue);
    setIsSeeking(false);
  };

  const currentProgressPercent = duration > 0 ? (seekValue / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-black/80 backdrop-blur-lg border-t border-white/10 text-white z-50">
      <div className="grid grid-cols-3 items-center h-full max-w-screen-2xl mx-auto px-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 bg-gray-800 rounded-md flex items-center justify-center shrink-0">
            {track.artwork && !track.artwork.includes("placeholder") ? (
              <img src={track.artwork} alt={track.title} className="w-full h-full object-cover rounded-md"/>
            ) : (
              <MusicNoteSmallIcon />
            )}
          </div>
          <div className="min-w-0 hidden md:block">
            <div className="font-semibold text-white truncate" title={track.title}>{track.title}</div>
            <div className="text-sm text-gray-400 truncate" title={track.artist}>{track.artist}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors disabled:opacity-30" aria-label="Previous track" disabled={!prevTrack}>
              <PrevIcon />
            </button>
            <button 
              onClick={togglePlayPause} 
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform active:scale-100" 
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors disabled:opacity-30" aria-label="Next track" disabled={!nextTrack}>
              <NextIcon />
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 w-full max-w-xs lg:max-w-md mt-2">
            <span className="text-xs text-gray-400 w-10 text-center tabular-nums">{formatTime(seekValue)}</span>
            <input
              type="range" min={0} max={duration || 0} step={0.1} value={seekValue}
              onChange={handleSeekChange} onMouseDown={() => setIsSeeking(true)} onMouseUp={handleSeekEnd}
              onTouchStart={() => setIsSeeking(true)} onTouchEnd={handleSeekEnd}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer group audio-slider"
              style={{ backgroundSize: `${currentProgressPercent}% 100%` }} aria-label="Track progress"
            />
            <span className="text-xs text-gray-400 w-10 text-center tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume Controls */}
        <div className="hidden sm:flex items-center justify-end gap-2">
          {volume > 0 ? <VolumeHighIcon /> : <VolumeMuteIcon />}
          <input
            type="range" min="0" max="1" step="0.05" value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer group audio-slider"
            style={{ backgroundSize: `${volume * 100}% 100%` }} aria-label="Volume control"
          />
        </div>
      </div>
    </div>
  );
}
