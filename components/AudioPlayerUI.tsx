// components/AudioPlayerUI.tsx
'use client';

import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';

// --- ICONS ---
const PlayIcon = () => <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const PrevIcon = () => <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>;
const NextIcon = () => <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zm-4.5 6-8.5 6V6z"/></svg>;
const ShuffleIcon = ({isActive}:{isActive:boolean}) => <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor" className={isActive ? 'text-green-500' : 'text-secondary'}><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>;
const RepeatIcon = ({isActive}:{isActive:boolean}) => <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor" className={isActive ? 'text-green-500' : 'text-secondary'}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>;
const VolumeIcon = () => <svg height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>;
const MusicIcon = () => <svg height="32" width="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;

// --- HELPER COMPONENT: Slider ---
interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: (event: MouseEvent<HTMLInputElement>) => void;
  ariaLabel: string;
}

const Slider = ({ value, min, max, step, onChange, onMouseUp, ariaLabel }: SliderProps) => {
    const progress = max > 0 ? (value / max) * 100 : 0;
    return (
        <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={onChange}
            onMouseUp={onMouseUp}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer group/slider"
            style={{ background: `linear-gradient(to right, #1DB954 ${progress}%, #4d4d4d ${progress}%)` }}
            aria-label={ariaLabel}
        />
    );
};


// --- MAIN COMPONENT: AudioPlayerUI ---
export default function AudioPlayerUI() {
  const { track, playing, progress, duration, volume, togglePlayPause, seekTo, nextTrack, prevTrack, setVolume } = useAudioPlayer();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => { if (!isSeeking) setSeekValue(progress); }, [progress, isSeeking]);

  if (!track) {
    return (
        <div className="h-[var(--player-height)] bg-[#181818] border-t border-default flex items-center justify-center">
            <p className="text-sm">Select a track to start listening</p>
        </div>
    );
  }

  const formatTime = (s: number) => !isNaN(s) ? `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}` : '0:00';

  const handleSeekMouseUp = (e: MouseEvent<HTMLInputElement>) => {
    seekTo(Number(e.currentTarget.value));
    setIsSeeking(false);
  }

  return (
    <div className="h-[var(--player-height)] bg-[#181818] border-t border-default text-white px-4">
      <div className="grid grid-cols-3 items-center h-full">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 bg-elevated rounded flex items-center justify-center shrink-0">
            {track.artwork ? <img src={track.artwork} alt={track.title} className="w-full h-full object-cover rounded"/> : <MusicIcon />}
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className="font-bold text-primary truncate">{track.title}</div>
            <div className="text-sm text-secondary truncate">{track.artist}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-4">
            <button className="text-secondary hover:text-primary transition-colors"><ShuffleIcon isActive={false}/></button>
            <button onClick={prevTrack} className="text-secondary hover:text-primary transition-colors disabled:opacity-30" disabled={!prevTrack}><PrevIcon /></button>
            <button 
              onClick={togglePlayPause} 
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={nextTrack} className="text-secondary hover:text-primary transition-colors disabled:opacity-30" disabled={!nextTrack}><NextIcon /></button>
            <button className="text-secondary hover:text-primary transition-colors"><RepeatIcon isActive={false}/></button>
          </div>
          <div className="hidden md:flex items-center gap-2 w-full max-w-xl mt-2">
            <span className="text-xs text-secondary tabular-nums">{formatTime(seekValue)}</span>
            <Slider
              min={0} max={duration || 1} step={0.1} value={seekValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setIsSeeking(true); setSeekValue(Number(e.target.value)); }}
              onMouseUp={handleSeekMouseUp}
              ariaLabel="Track progress"
            />
            <span className="text-xs text-secondary tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume Controls */}
        <div className="hidden md:flex items-center justify-end gap-2">
          <VolumeIcon />
          <div className="w-32">
            <Slider
              min={0} max={1} step={0.05} value={volume}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value))}
              ariaLabel="Volume control"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
