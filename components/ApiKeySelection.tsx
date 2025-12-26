
import React from 'react';

interface ApiKeySelectionProps {
  onKeySelected: () => void;
}

const ApiKeySelection: React.FC<ApiKeySelectionProps> = ({ onKeySelected }) => {
  const handleOpenSelectKey = async () => {
    try {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      onKeySelected();
    } catch (err) {
      console.error("Failed to open key selection dialog", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold mb-4 text-white">Unlock Cinematic Creation</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The Veo 3 model requires a paid API key for video generation. 
          Please select a valid API key from a paid GCP project to continue.
        </p>
        <button
          onClick={handleOpenSelectKey}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Select API Key
        </button>
        <div className="mt-6 text-sm text-slate-500">
          <p>Don't have a key? Check the </p>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            Billing Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySelection;
