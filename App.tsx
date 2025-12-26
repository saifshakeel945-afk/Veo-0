
import React, { useState, useEffect } from 'react';
import ApiKeySelection from './components/ApiKeySelection';
import GenerationForm from './components/GenerationForm';
import LoadingState from './components/LoadingState';
import VideoDisplay from './components/VideoDisplay';
import { GenerationParams, VideoResult } from './types';
import { generateVideo } from './services/veoService';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoResult | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      const exists = await window.aistudio.hasSelectedApiKey();
      setHasKey(exists);
    };
    checkKey();
  }, []);

  const handleGenerate = async (params: GenerationParams) => {
    setIsGenerating(true);
    setError(null);
    try {
      const videoUrl = await generateVideo(params);
      setResult({
        url: videoUrl,
        params,
        timestamp: Date.now()
      });
      // Scroll to video
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'API_KEY_EXPIRED') {
        setError("The session has expired or the API key is no longer valid. Please re-select your API key.");
        setHasKey(false);
      } else {
        setError(err.message || "An unexpected error occurred while generating the video.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasKey === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center">
        <ApiKeySelection onKeySelected={() => setHasKey(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              Dream<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Veo</span>
            </h1>
          </div>
          <button 
            onClick={() => {
              // @ts-ignore
              window.aistudio.openSelectKey().then(() => setHasKey(true));
            }}
            className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Switch Project Key
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            AI Video Generation
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transform your imagination into high-quality cinematic clips using the latest Gemini Veo 3 model.
          </p>
        </div>

        <GenerationForm onGenerate={handleGenerate} isGenerating={isGenerating} />

        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center animate-shake">
            <p className="font-semibold mb-1">Generation failed</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        )}

        {isGenerating ? (
          <LoadingState />
        ) : (
          result && <VideoDisplay video={result} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-slate-900 bg-slate-950/30">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} DreamVeo Studio. Powered by Google Gemini Veo 3.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
