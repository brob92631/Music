'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';

export interface Track {
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
  playTrack: (newTrack: Track, newQueue?: Track[], playAtIndex?: number) => void;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setInternalQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      const audio = audioRef.current;

      const onLoadedMetadata = () => setDuration(audio.duration);
      const onTimeUpdate = () => setProgress(audio.currentTime);
      
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('timeupdate', onTimeUpdate);

      return () => {
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.pause();
        audio.src = '';
      };
    }
  }, []);

  const playTrack = useCallback((newTrack: Track, newQueue?: Track[], playAtIndex?: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    let qToUse = newQueue || queue;
    let idxToUse = -1;

    if (newQueue) {
      setInternalQueue(newQueue);
      idxToUse = newQueue.findIndex(t => t.id === newTrack.id);
      if (idxToUse === -1 && playAtIndex !== undefined && playAtIndex >= 0 && playAtIndex < newQueue.length) {
        idxToUse = playAtIndex;
      } else if (idxToUse === -1) {
         idxToUse = 0; // Default to first if not found by id or specific index
      }
    } else {
      idxToUse = queue.findIndex(t => t.id === newTrack.id);
      if (idxToUse === -1) {
        qToUse = [newTrack]; // Track not in current queue, treat as a single track queue
        setInternalQueue(qToUse);
        idxToUse = 0;
      }
    }
    
    setCurrentIndex(idxToUse);
    setTrack(newTrack); 
    setPlaying(true);
  }, [audioRef, queue]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) {
        if(audio && !track && playing){
            audio.pause();
            setPlaying(false);
        }
        return;
    }
    audio.src = track.url;
    audio.load();
    if (playing) {
      audio.play().catch(error => {
        console.error("Error playing track in track effect:", error);
        setPlaying(false);
      });
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    if (playing) {
      audio.play().catch(error => {
        console.error("Error playing track in playing effect:", error);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing, track]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentIndex + 1 < queue.length) {
        playTrack(queue[currentIndex + 1], queue, currentIndex + 1);
      } else {
        setPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [audioRef, queue, currentIndex, playTrack]);

  const togglePlayPause = useCallback(() => {
    if (!track && queue.length > 0) {
      const trackToPlayIdx = currentIndex !== -1 ? currentIndex : 0;
      if (queue[trackToPlayIdx]) {
        playTrack(queue[trackToPlayIdx], queue, trackToPlayIdx);
      }
    } else if (track) {
      setPlaying(p => !p);
    }
  }, [track, queue, currentIndex, playTrack]);

  const seekTo = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = seconds;
      setProgress(seconds);
    }
  }, [audioRef]);

  const nextTrack = useCallback(() => {
    if (queue.length > 0 && currentIndex + 1 < queue.length) {
      playTrack(queue[currentIndex + 1], queue, currentIndex + 1);
    }
  }, [queue, currentIndex, playTrack]);

  const prevTrack = useCallback(() => {
    if (queue.length > 0 && currentIndex - 1 >= 0) {
      playTrack(queue[currentIndex - 1], queue, currentIndex - 1);
    }
  }, [queue, currentIndex, playTrack]);

  const setQueue = useCallback((tracks: Track[]) => {
    setInternalQueue(tracks);
    if (tracks.length === 0) {
        setTrack(null);
        setCurrentIndex(-1);
        setPlaying(false);
    }
    // Optionally, could auto-play first track if nothing is playing:
    // else if (!track && tracks.length > 0) {
    //   playTrack(tracks[0], tracks, 0);
    // }
  }, []);

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
