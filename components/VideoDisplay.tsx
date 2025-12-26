
import React from 'react';
import { VideoResult } from '../types';

interface VideoDisplayProps {
  video: VideoResult;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ video }) => {
  return (
    <div className="mt-12 animate-fadeIn space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-700 aspect-auto">
        <video
          key={video.url}
          controls
          autoPlay
          loop
          className={`w-full max-h-[70vh] object-contain ${video.params.aspectRatio === '9:16' ? 'max-w-md mx-auto' : ''}`}
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50">
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold">
            {video.params.style}
          </span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">
            {video.params.aspectRatio}
          </span>
          <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-xs font-semibold">
            {new Date(video.timestamp).toLocaleString()}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed italic">
          "{video.params.description}"
        </p>
      </div>
    </div>
  );
};

export default VideoDisplay;
