import { Sun, Maximize, X } from 'lucide-react';

const ExamHeader = ({ onThemeToggle, onFullscreen, onClose }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      {/* Title */}
      <h1 className="text-xl font-semibold text-[#1a6b8c] tracking-tight">
        ការប្រមូលអត្ថបទ
      </h1>

      {/* Action Icons */}
      <div className="flex items-center gap-5">
        <button
          onClick={onThemeToggle}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          <Sun size={20} strokeWidth={1.5} />
        </button>

        <button
          onClick={onFullscreen}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Fullscreen"
        >
          <Maximize size={18} strokeWidth={1.5} />
        </button>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};

export default ExamHeader;