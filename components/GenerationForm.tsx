
import React from 'react';
import { ArtisticStyle, AspectRatio, GenerationParams } from '../types';

interface GenerationFormProps {
  onGenerate: (params: GenerationParams) => void;
  isGenerating: boolean;
}

const styles: ArtisticStyle[] = [
  'Cinematic Photorealistic',
  'Anime',
  'Cinematic',
  'Surreal',
  'Watercolor',
  'Moebius',
  'Hyper-realistic'
];

const aspectRatios: AspectRatio[] = ['16:9', '9:16'];

const GenerationForm: React.FC<GenerationFormProps> = ({ onGenerate, isGenerating }) => {
  const [description, setDescription] = React.useState('');
  const [style, setStyle] = React.useState<ArtisticStyle>('Cinematic');
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio>('16:9');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onGenerate({ description, style, aspectRatio });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-300">
          Describe your vision
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A futuristic city with flying vehicles and glowing neon signs at sunset..."
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
          disabled={isGenerating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">Artistic Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as ArtisticStyle)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={isGenerating}
          >
            {styles.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-300">Aspect Ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={isGenerating}
          >
            {aspectRatios.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating || !description.trim()}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${
          isGenerating || !description.trim()
            ? 'bg-slate-700 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 shadow-lg shadow-indigo-500/20'
        }`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Generate Video
          </>
        )}
      </button>
    </form>
  );
};

export default GenerationForm;
