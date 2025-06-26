'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string; // audio file URL
  artwork?: string;
}

interface AudioPlayerContextType {
  track: Track | null;
  playing: boolean;
  progress: number; // seconds
  duration: number; // seconds
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  seekTo: (seconds: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  queue: Track[];
  setQueue: (tracks: Track[]) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    const audio = audioRef.current;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onEnded = () => {
      // Auto play next track
      if (currentIndex + 1 < queue.length) {
        playTrack(queue[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
      } else {
        setPlaying(false);
        setTrack(null);
        setCurrentIndex(-1);
      }
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [queue, currentIndex]);

  useEffect(() => {
    if (!track) return;
    audioRef.current.src = track.url;
    audioRef.current.play();
    setPlaying(true);
  }, [track]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const playTrack = (newTrack: Track) => {
    const index = queue.findIndex((t) => t.id === newTrack.id);
    setCurrentIndex(index !== -1 ? index : 0);
    setTrack(newTrack);
    setPlaying(true);
  };

  const togglePlayPause = () => setPlaying((p) => !p);

  const seekTo = (seconds: number) => {
    audioRef.current.currentTime = seconds;
    setProgress(seconds);
  };

  const nextTrack = () => {
    if (currentIndex + 1 < queue.length) {
      playTrack(queue[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevTrack = () => {
    if (currentIndex - 1 >= 0) {
      playTrack(queue[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        track,
        playing,
        progress,
        duration,
        playTrack,
        togglePlayPause,
        seekTo,
        nextTrack,
        prevTrack,
        queue,
        setQueue,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
}
