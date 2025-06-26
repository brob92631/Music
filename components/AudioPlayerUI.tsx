'use client';

import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useEffect, useState } from 'react';

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

  // Sync slider while playing
  useEffect(() => {
    setSeekValue(progress);
  }, [progress]);

  if (!track) return null;

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-4 flex items-center gap-4 shadow-lg">
      <div className="flex-1">
        <div className="font-semibold">{track.title}</div>
        <div className="text-sm text-zinc-400">{track.artist}</div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={prevTrack} className="hover:text-blue-500">⏮️</button>
        <button onClick={togglePlayPause} className="text-xl px-2 hover:text-blue-500">
          {playing ? '⏸️' : '▶️'}
        </button>
        <button onClick={nextTrack} className="hover:text-blue-500">⏭️</button>
      </div>

      <div className="flex items-center gap-2 w-48">
        <span className="text-xs">{formatTime(seekValue)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={seekValue}
          onChange={(e) => setSeekValue(Number(e.target.value))}
          onMouseUp={() => seekTo(seekValue)}
          onTouchEnd={() => seekTo(seekValue)}
          className="w-full"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
