import React, { useEffect, useState } from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { Theme, ThemeId } from '../types';

export const THEMES: Theme[] = [
  {
    id: 'immersive-ui',
    name: 'Immersive UI (Dark)',
    isDark: true,
    className: 'theme-immersive-ui',
    colors: {
      bg: 'bg-[#05070A]',
      card: 'bg-[#080A0F] border-white/5',
      text: 'text-slate-300',
      primary: 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] text-white shadow-lg shadow-indigo-500/20 transition-all duration-200',
      accent: 'text-indigo-400',
      border: 'border-white/5',
    }
  },
  {
    id: 'vercel-dark',
    name: 'Vercel Dark',
    isDark: true,
    className: 'theme-vercel-dark',
    colors: {
      bg: 'bg-black',
      card: 'bg-zinc-950 border-zinc-800 shadow-lg shadow-black/40',
      text: 'text-zinc-100',
      primary: 'bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm transition-all',
      accent: 'text-indigo-400 font-bold',
      border: 'border-zinc-800',
    }
  },
  {
    id: 'vercel-light',
    name: 'Vercel Light',
    isDark: false,
    className: 'theme-vercel-light',
    colors: {
      bg: 'bg-white',
      card: 'bg-zinc-50 border-zinc-200/90 shadow-sm',
      text: 'text-zinc-900',
      primary: 'bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shadow-sm transition-all',
      accent: 'text-indigo-600 font-bold',
      border: 'border-zinc-200',
    }
  },
  {
    id: 'space-slate',
    name: 'Space Slate (Dark)',
    isDark: true,
    className: 'theme-space-slate',
    colors: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900/80 border-slate-800',
      text: 'text-slate-100',
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      accent: 'text-indigo-400',
      border: 'border-slate-800',
    }
  },
  {
    id: 'cosmic-indigo',
    name: 'Cosmic Indigo (Dark)',
    isDark: true,
    className: 'theme-cosmic-indigo',
    colors: {
      bg: 'bg-zinc-950',
      card: 'bg-indigo-950/40 border-indigo-900/60',
      text: 'text-purple-100',
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      accent: 'text-fuchsia-400',
      border: 'border-indigo-900/60',
    }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon (Dark)',
    isDark: true,
    className: 'theme-cyberpunk-neon',
    colors: {
      bg: 'bg-black',
      card: 'bg-zinc-950 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.1)]',
      text: 'text-cyan-100',
      primary: 'bg-pink-600 hover:bg-pink-700 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]',
      accent: 'text-cyan-400 font-bold',
      border: 'border-cyan-500/30',
    }
  },
  {
    id: 'calming-forest',
    name: 'Calming Forest (Light)',
    isDark: false,
    className: 'theme-calming-forest',
    colors: {
      bg: 'bg-stone-50',
      card: 'bg-stone-100/90 border-emerald-900/10 shadow-sm',
      text: 'text-stone-800',
      primary: 'bg-emerald-700 hover:bg-emerald-800 text-stone-100',
      accent: 'text-emerald-700 font-semibold',
      border: 'border-emerald-900/10',
    }
  },
  {
    id: 'royal-crimson',
    name: 'Royal Crimson (Dark)',
    isDark: true,
    className: 'theme-royal-crimson',
    colors: {
      bg: 'bg-rose-950',
      card: 'bg-rose-900/30 border-amber-500/20',
      text: 'text-rose-100',
      primary: 'bg-amber-600 hover:bg-amber-700 text-white',
      accent: 'text-amber-400',
      border: 'border-amber-500/20',
    }
  },
  {
    id: 'classic-amber',
    name: 'Classic Amber (Terminal)',
    isDark: true,
    className: 'theme-classic-amber',
    colors: {
      bg: 'bg-neutral-950',
      card: 'bg-black border-amber-500/40',
      text: 'text-amber-500 font-mono',
      primary: 'bg-amber-500 hover:bg-amber-600 text-black font-mono',
      accent: 'text-amber-400 underline decoration-dotted',
      border: 'border-amber-500/30',
    }
  },
  {
    id: 'warm-sepia',
    name: 'Warm Sepia (Light)',
    isDark: false,
    className: 'theme-warm-sepia',
    colors: {
      bg: 'bg-amber-50/40',
      card: 'bg-orange-100/30 border-orange-200 shadow-sm',
      text: 'text-stone-800',
      primary: 'bg-amber-800 hover:bg-amber-900 text-amber-50',
      accent: 'text-amber-800',
      border: 'border-orange-200',
    }
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze (Dark)',
    isDark: true,
    className: 'theme-ocean-breeze',
    colors: {
      bg: 'bg-sky-950',
      card: 'bg-sky-900/40 border-sky-800/80',
      text: 'text-sky-100',
      primary: 'bg-teal-600 hover:bg-teal-700 text-white',
      accent: 'text-teal-400',
      border: 'border-sky-800/80',
    }
  },
  {
    id: 'minimal-charcoal',
    name: 'Minimal Charcoal (Dark)',
    isDark: true,
    className: 'theme-minimal-charcoal',
    colors: {
      bg: 'bg-zinc-900',
      card: 'bg-zinc-800/80 border-zinc-700',
      text: 'text-zinc-100',
      primary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900',
      accent: 'text-zinc-300 font-medium',
      border: 'border-zinc-700',
    }
  },
  {
    id: 'solarized-gold',
    name: 'Solarized Gold (Light)',
    isDark: false,
    className: 'theme-solarized-gold',
    colors: {
      bg: 'bg-yellow-50/50',
      card: 'bg-yellow-100/40 border-yellow-300 shadow-sm',
      text: 'text-yellow-950',
      primary: 'bg-yellow-700 hover:bg-yellow-800 text-white',
      accent: 'text-yellow-800 font-bold',
      border: 'border-yellow-200',
    }
  }
];

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface SunMoonToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const SunMoonToggle: React.FC<SunMoonToggleProps> = ({ currentTheme, onThemeChange }) => {
  const isDark = currentTheme.isDark;

  const handleToggle = (targetDark: boolean) => {
    if (targetDark === isDark) return;
    if (targetDark) {
      // Find default dark theme
      const darkTheme = THEMES.find(t => t.id === 'vercel-dark') || THEMES.find(t => t.isDark) || THEMES[0];
      onThemeChange(darkTheme);
    } else {
      // Find default light theme
      const lightTheme = THEMES.find(t => t.id === 'vercel-light') || THEMES.find(t => !t.isDark) || THEMES[4];
      onThemeChange(lightTheme);
    }
  };

  return (
    <div className="flex items-center p-1 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 border border-slate-700/60 shadow-inner gap-1">
      <button
        id="theme-toggle-light-btn"
        onClick={() => handleToggle(false)}
        className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
          !isDark
            ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-105'
            : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/60'
        }`}
        title="Switch to Light Mode (Sun)"
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-slate-950 fill-slate-950' : 'text-amber-400'}`} />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        id="theme-toggle-dark-btn"
        onClick={() => handleToggle(true)}
        className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
          isDark
            ? 'bg-indigo-600 text-white shadow-md font-extrabold scale-105'
            : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-800/60'
        }`}
        title="Switch to Dark Mode (Moon)"
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-white fill-white' : 'text-indigo-400'}`} />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50 flex items-center gap-2">
      {/* Direct Sun & Moon Dark/Light Mode Section */}
      <SunMoonToggle currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <button
        id="theme-select-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all bg-slate-900/80 backdrop-blur-md cursor-pointer hover:bg-slate-800 border-slate-700/80 text-slate-300 hover:text-white"
        title="Choose Custom Preset Theme"
      >
        <Palette className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="hidden md:inline font-medium">{currentTheme.name}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-xl border p-2 shadow-2xl backdrop-blur-xl bg-slate-950 border-slate-800 transition-all text-slate-200">
            <div className="px-3 py-2 flex items-center justify-between border-b border-slate-800 mb-1">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" /> Presets ({THEMES.length})
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto pr-1">
              {THEMES.map((t) => (
                <button
                  id={`theme-btn-${t.id}`}
                  key={t.id}
                  onClick={() => {
                    onThemeChange(t);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    currentTheme.id === t.id
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span>{t.name}</span>
                  <div className="flex gap-1 items-center">
                    {t.isDark ? (
                      <Moon className="w-3 h-3 text-indigo-400" />
                    ) : (
                      <Sun className="w-3 h-3 text-amber-500" />
                    )}
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-white/10"
                      style={{
                        backgroundColor: t.id === 'vercel-dark' ? '#000000' : t.id === 'vercel-light' ? '#ffffff' : t.id === 'immersive-ui' ? '#6366f1' : t.id === 'cyberpunk-neon' ? '#ec4899' : t.id === 'calming-forest' ? '#047857' : t.id === 'classic-amber' ? '#f59e0b' : '#4f46e5'
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
