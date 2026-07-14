import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, BookmarkPlus, Check } from 'lucide-react';
import { Theme } from '../types';
import { TOPICS } from '../data/dsaRoadmap';
import { saveSpeedLog } from '../lib/firebase';

interface TimerSectionProps {
  theme: Theme;
  onTimerLogSaved: () => void;
}

export const TimerSection: React.FC<TimerSectionProps> = ({ theme, onTimerLogSaved }) => {
  const [time, setTime] = useState<number>(0); // time in deciseconds (100ms)
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Arithmetic');
  const [laps, setLaps] = useState<string[]>([]);
  const [showLogSavedMessage, setShowLogSavedMessage] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (totalDeciseconds: number) => {
    const minutes = Math.floor(totalDeciseconds / 600);
    const seconds = Math.floor((totalDeciseconds % 600) / 10);
    const deciseconds = totalDeciseconds % 10;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${deciseconds}`;
  };

  const handleRecordTimestamp = async () => {
    const formatted = formatTime(time);
    const secondsOnly = Math.round(time / 10);

    // Save timestamp to lap history
    setLaps((prev) => [`Lap ${prev.length + 1}: ${formatted} (${selectedTopic})`, ...prev]);

    // Save this speed log to Firebase / local storage securely!
    await saveSpeedLog({
      topic: selectedTopic,
      timeSeconds: secondsOnly > 0 ? secondsOnly : 1,
      timestamp: new Date().toISOString(),
      isCorrect: true, // assume self-verified correct on manual timer
      accuracy: 100,
    });

    onTimerLogSaved();
    setShowLogSavedMessage(true);
    setTimeout(() => setShowLogSavedMessage(false), 2000);
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all space-y-5`}>
      <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-indigo-400 animate-bounce" />
          <div>
            <h3 className="text-sm font-bold text-slate-200">Practice Speed Stopwatch</h3>
            <span className="text-[10px] text-slate-500 font-mono">Log custom timestamps to track metrics</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            id="timer-topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-2.5 py-1 text-[11px] rounded bg-slate-950 border border-slate-800 text-slate-300"
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Elegant Digits Screen */}
      <div className="text-center py-6 bg-slate-950 border border-slate-900 rounded-2xl">
        <span className="text-4xl md:text-5xl font-mono font-bold tracking-widest text-indigo-400">
          {formatTime(time)}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2.5 justify-center">
        <button
          id="btn-timer-start"
          onClick={handleStartStop}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          id="btn-timer-lap"
          onClick={handleRecordTimestamp}
          disabled={time === 0}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1"
        >
          <BookmarkPlus className="w-4 h-4" /> Save Timestamp
        </button>

        <button
          id="btn-timer-reset"
          onClick={handleReset}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {showLogSavedMessage && (
        <div className="p-2 bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold text-center rounded-xl flex items-center justify-center gap-1 animate-pulse">
          <Check className="w-4 h-4" /> Saved directly to speed tracking log!
        </div>
      )}

      {/* Laps List */}
      {laps.length > 0 && (
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Saved timestamps</span>
          {laps.map((lap, index) => (
            <div
              key={index}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-850 text-xs font-mono text-slate-400 flex justify-between items-center"
            >
              <span>{lap}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/40">log synced</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
