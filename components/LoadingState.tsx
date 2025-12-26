
import React, { useState, useEffect } from 'react';

const messages = [
  "Initializing neural engines...",
  "Synthesizing visual fragments...",
  "Calibrating artistic style gradients...",
  "Rendering cinematic sequences...",
  "Enhancing frame consistency...",
  "Finalizing your masterpiece...",
  "Optimizing video compression...",
  "Almost there, just a few more seconds...",
];

const LoadingState: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-ping"></div>
        <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-xl font-medium text-slate-200 animate-pulse text-center">
        {messages[messageIndex]}
      </p>
      <p className="mt-4 text-sm text-slate-500 italic">
        Video generation can take up to 2-3 minutes.
      </p>
    </div>
  );
};

export default LoadingState;
