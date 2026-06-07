import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group"
      aria-label="Toggle light/dark theme"
    >
      {theme === 'dark' ? (
        <Sun size={14} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
      ) : (
        <Moon size={14} className="text-slate-600 group-hover:text-slate-800 transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
