'use client';

import React from 'react';

interface AudioPlayerUIProps {
  trackTitle?: string;
  artist?: string;
  albumArtUrl?: string;
  isPlaying?: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  progressPercent?: number; // 0 to 100
}

export default function AudioPlayerUI({
  trackTitle = 'No track playing',
  artist = '',
  albumArtUrl,
  isPlaying = false,
  onPlayPause,
  onPrev,
  onNext,
  progressPercent = 0,
}: AudioPlayerUIProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-95 border-t border-gray-800 text-white flex items-center px-4 py-2 space-x-4 select-none z-50">
      {/* Album art */}
      {albumArtUrl ? (
        <img
          src={albumArtUrl}
          alt={`${trackTitle} album art`}
          className="w-12 h-12 rounded-md object-cover"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-900 rounded-md flex items-center justify-center text-gray-600 text-xs uppercase">
          N/A
        </div>
      )}

      {/* Track info */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className="font-semibold truncate">{trackTitle}</span>
        <span className="text-gray-400 text-sm truncate">{artist}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6">
        <button
          aria-label="Previous"
          onClick={onPrev}
          className="hover:text-green-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14V5" />
          </svg>
        </button>

        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          onClick={onPlayPause}
          className="bg-green-500 hover:bg-green-600 p-2 rounded-full shadow-lg flex items-center justify-center transition"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.75a1 1 0 000-1.752z" />
            </svg>
          )}
        </button>

        <button
          aria-label="Next"
          onClick={onNext}
          className="hover:text-green-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M6 5v14" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
        <div
          className="h-1 bg-green-500 transition-all duration-200"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

