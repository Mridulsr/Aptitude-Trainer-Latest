import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart2, Flame, HelpCircle, Code, Compass, MessageSquare, Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { ThemeId, Theme, UserStats, SpeedLog } from './types';
import { ThemeSelector, THEMES } from './components/ThemeSelector';
import { SortingVisualizer } from './components/SortingVisualizer';
import { BSTVisualizer } from './components/BSTVisualizer';
import { LinkedListVisualizer } from './components/LinkedListVisualizer';
import { AILab } from './components/AILab';
import { DSAChatbot } from './components/DSAChatbot';
import { ProfileDashboard } from './components/ProfileDashboard';
import { HelpGuide } from './components/HelpGuide';
import { CompanyDirectory } from './components/CompanyDirectory';
import { loadUserStats, saveUserStats, loadSpeedLogs } from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'practice-lab' | 'visualizer' | 'ai-chat' | 'dashboard' | 'help'>('practice-lab');
  const [aptitudeSubTab, setAptitudeSubTab] = useState<'practice' | 'directory'>('practice');
  const [activeVisualizer, setActiveVisualizer] = useState<'sorting' | 'bst' | 'linked-list'>('sorting');
  const [showAISidebar, setShowAISidebar] = useState<boolean>(true);
  const [isAIFullscreen, setIsAIFullscreen] = useState<boolean>(false);
  const [globalStopwatchSeconds, setGlobalStopwatchSeconds] = useState<number>(0);
  const [isGlobalStopwatchRunning, setIsGlobalStopwatchRunning] = useState<boolean>(false);
  const [quizTimerSeconds, setQuizTimerSeconds] = useState<number>(0);
  const [isQuizTimerRunning, setIsQuizTimerRunning] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  });
  const [speedLogs, setSpeedLogs] = useState<SpeedLog[]>([]);

  const formatMinutesSeconds = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    const parts = [];
    if (hrs > 0) {
      parts.push(hrs.toString().padStart(2, '0'));
    }
    parts.push(mins.toString().padStart(2, '0'));
    parts.push(secs.toString().padStart(2, '0'));
    return parts.join(':');
  };

  // Question specific stopwatch (increments every second)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isQuizTimerRunning && activeTab === 'practice-lab' && aptitudeSubTab === 'practice') {
      interval = setInterval(() => {
        setQuizTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isQuizTimerRunning, activeTab, aptitudeSubTab]);

  // Global Interactive Stopwatch ticking logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGlobalStopwatchRunning) {
      interval = setInterval(() => {
        setGlobalStopwatchSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGlobalStopwatchRunning]);

  // Load user profile & speed history logs from cloud database / local storage!
  const syncStats = async () => {
    const stats = await loadUserStats();
    setUserStats(stats);
    const logs = await loadSpeedLogs();
    setSpeedLogs(logs);
  };

  useEffect(() => {
    syncStats();
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setCurrentTheme(newTheme);
  };

  const handleSolveQuestion = async (timeSpentSeconds: number, isCorrect: boolean) => {
    const updatedStats = { ...userStats };
    updatedStats.solvedCount += 1;
    updatedStats.totalTimeSpent += timeSpentSeconds;

    if (isCorrect) {
      updatedStats.score += 20; // 20 XP per correct question
    } else {
      updatedStats.score += 5; // 5 XP participation
    }

    setUserStats(updatedStats);
    await saveUserStats(updatedStats);

    // Reload speed logs to update Recharts graphs dynamically
    const logs = await loadSpeedLogs();
    setSpeedLogs(logs);
  };

  const getTabClass = (tab: typeof activeTab) => {
    const isActive = activeTab === tab;
    const base = "px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer";
    if (currentTheme.id === 'immersive-ui') {
      return `${base} ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
      }`;
    }
    return `${base} ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg'
        : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
    }`;
  };

  return (
    <div className={`min-h-screen ${currentTheme.colors.bg} ${currentTheme.colors.text} transition-colors duration-500 pb-12`}>
      {/* Top Main Navigation Header */}
      <header className={`border-b ${currentTheme.id === 'immersive-ui' ? 'border-white/5 bg-[#080A0F]' : 'border-slate-800/80 bg-slate-950/60'} backdrop-blur-xl sticky top-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600/10 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Code className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-base md:text-lg tracking-wider text-white">DSA.<span className="text-indigo-400">viz</span></span>
            <span className="text-[10px] text-slate-500 block font-semibold leading-none">Interactive Full-Stack Platform</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex gap-1">
          <button
            id="nav-tab-practice"
            onClick={() => setActiveTab('practice-lab')}
            className={getTabClass('practice-lab')}
          >
            🎯 Aptitude Trainer
          </button>
          <button
            id="nav-tab-visualizer"
            onClick={() => setActiveTab('visualizer')}
            className={getTabClass('visualizer')}
          >
            ⚡ DSA & Visualizers
          </button>
          <button
            id="nav-tab-chat"
            onClick={() => setActiveTab('ai-chat')}
            className={getTabClass('ai-chat')}
          >
            💬 AI Coach Chat
          </button>
          <button
            id="nav-tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={getTabClass('dashboard')}
          >
            📊 Milestones & Charts
          </button>
          <button
            id="nav-tab-help"
            onClick={() => setActiveTab('help')}
            className={getTabClass('help')}
          >
            ❓ Help Guide
          </button>
        </nav>

        {/* Theme select & Streak display */}
        <div className="flex items-center gap-3">
          {/* Beautiful Interactive Global Stopwatch in the top right corner */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-black shadow-inner">
            <div className="flex items-center gap-1.5">
              <Timer className={`w-3.5 h-3.5 text-indigo-400 ${isGlobalStopwatchRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span className="text-[10px] uppercase text-indigo-400/80 tracking-wider">Timer:</span>
              <span className="w-12 text-center">{formatStopwatch(globalStopwatchSeconds)}</span>
            </div>
            <div className="flex items-center gap-1 border-l border-indigo-500/20 pl-2">
              <button
                onClick={() => setIsGlobalStopwatchRunning(!isGlobalStopwatchRunning)}
                className="hover:text-white transition-colors cursor-pointer text-indigo-400"
                title={isGlobalStopwatchRunning ? "Pause" : "Start"}
              >
                {isGlobalStopwatchRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setGlobalStopwatchSeconds(0);
                  setIsGlobalStopwatchRunning(false);
                }}
                className="hover:text-white transition-colors cursor-pointer text-indigo-400 ml-0.5"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500">
            <Flame className="w-4 h-4 animate-bounce" />
            <span className="text-xs font-extrabold font-mono">{userStats.streak} Days</span>
          </div>
        </div>
      </header>

      {/* Small Screen Bottom/Top Navigation Tab Bar */}
      <div className="lg:hidden bg-slate-950 border-b border-slate-900 flex justify-around py-2 px-1">
        <button
          onClick={() => setActiveTab('practice-lab')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${activeTab === 'practice-lab' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Aptitude
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${activeTab === 'visualizer' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          DSA Viz
        </button>
        <button
          onClick={() => setActiveTab('ai-chat')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${activeTab === 'ai-chat' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Coach
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Charts
        </button>
        <button
          onClick={() => setActiveTab('help')}
          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${activeTab === 'help' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Help
        </button>
      </div>

      {/* Main Workspace Stage */}
      <main className={`max-w-[1440px] mx-auto px-4 md:px-10 mt-8 mb-16 space-y-10 transition-all duration-300 ${
        showAISidebar && !isAIFullscreen ? 'xl:pr-[480px]' : ''
      }`}>
        {['practice-lab', 'visualizer'].includes(activeTab) ? (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 items-start">
            {/* Main Content Area - Full width and spacious */}
            <div className="xl:col-span-12 space-y-8 transition-all duration-300">
              <div className="flex justify-between items-center bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60">
                <div>
                  <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wider">
                    {activeTab === 'practice-lab' ? '🎯 Aptitude Trainer' : '⚡ DSA & Visualizers'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeTab === 'practice-lab' 
                      ? 'Practice quantitative, logical, verbal, and programming placement questions.'
                      : 'Interactive real-time execution flows for key algorithms and structures.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAISidebar(!showAISidebar)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                    showAISidebar 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/20' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {showAISidebar ? 'Hide AI Mentor' : 'Show AI Mentor'}
                </button>
              </div>

              {activeTab === 'practice-lab' && (
                <div className="space-y-10 animate-fade-in">
                  {/* Spacious Slide Toggle Panel */}
                  <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 max-w-lg shadow-inner">
                    <button
                      id="btn-apti-sub-practice"
                      onClick={() => setAptitudeSubTab('practice')}
                      className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer text-center ${
                        aptitudeSubTab === 'practice'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ✍️ Adaptive Practice Quiz
                    </button>
                    <button
                      id="btn-apti-sub-directory"
                      onClick={() => setAptitudeSubTab('directory')}
                      className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer text-center ${
                        aptitudeSubTab === 'directory'
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🏢 Company Question Directory
                    </button>
                  </div>

                  {aptitudeSubTab === 'practice' ? (
                    <div className="space-y-10 animate-fade-in">
                      <AILab 
                        theme={currentTheme} 
                        onSolveQuestion={handleSolveQuestion} 
                        userStats={userStats}
                        quizTimerSeconds={quizTimerSeconds}
                        setQuizTimerSeconds={setQuizTimerSeconds}
                        isQuizTimerRunning={isQuizTimerRunning}
                        setIsQuizTimerRunning={setIsQuizTimerRunning}
                      />
                      <div className="grid grid-cols-1 gap-10">
                        <div className={`p-8 rounded-2xl border ${currentTheme.colors.card} transition-all flex flex-col justify-between space-y-6`}>
                          <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                              ⚙️ Aptitude Practice Guide
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Hone your speed-solving capability for placement assessments! Select companies like <strong>TCS, Infosys, Accenture, Wipro, Google</strong> to solve target questions. Review deep AI Step-by-Step breakdowns below every question! The live stopwatch in the top-right tracks your active question speed automatically.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl text-xs text-slate-400 font-medium leading-relaxed">
                            💡 Did you know? Re-running custom AI questions generates unique problems every single time!
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CompanyDirectory theme={currentTheme} />
                  )}
                </div>
              )}

              {activeTab === 'visualizer' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Visualizer selector bar */}
                  <div className="flex border-b border-slate-800 gap-1 overflow-x-auto pb-0.5">
                    <button
                      id="vis-tab-sorting"
                      onClick={() => setActiveVisualizer('sorting')}
                      className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 ${
                        activeVisualizer === 'sorting' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📊 Array Sorting Visualizer
                    </button>
                    <button
                      id="vis-tab-bst"
                      onClick={() => setActiveVisualizer('bst')}
                      className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 ${
                        activeVisualizer === 'bst' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🌳 Binary Search Tree (BST)
                    </button>
                    <button
                      id="vis-tab-linked-list"
                      onClick={() => setActiveVisualizer('linked-list')}
                      className={`px-5 py-3 text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer flex-shrink-0 ${
                        activeVisualizer === 'linked-list' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🔗 Animated Linked List
                    </button>
                  </div>

                  {activeVisualizer === 'sorting' && <SortingVisualizer theme={currentTheme} />}
                  {activeVisualizer === 'bst' && <BSTVisualizer theme={currentTheme} />}
                  {activeVisualizer === 'linked-list' && <LinkedListVisualizer theme={currentTheme} />}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Other Standalone Tabs */
          <div className="space-y-8 animate-fade-in">
            {activeTab === 'ai-chat' && (
              <div className="max-w-4xl mx-auto">
                <DSAChatbot theme={currentTheme} />
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <ProfileDashboard theme={currentTheme} userStats={userStats} speedLogs={speedLogs} />
              </div>
            )}

            {activeTab === 'help' && (
              <div>
                <HelpGuide theme={currentTheme} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Immersive UI Footer / Status Bar */}
      <footer className={`mt-12 h-10 ${currentTheme.id === 'immersive-ui' ? 'bg-[#0B0E14] border-t border-white/5 text-white/30' : 'bg-slate-950/80 border-t border-slate-800/80 text-slate-500'} flex items-center justify-between px-6 md:px-12 text-[10px] uppercase tracking-wider`}>
        <div className="flex gap-6">
          <span>Status: <span className="text-emerald-500 font-bold">● Syncing to Cloud</span></span>
          <span className="hidden md:inline">Server: us-east-prod-01</span>
        </div>
        <div className="flex gap-4">
          <span>Users Online: 1,204</span>
          <span className="hidden sm:inline">Version 4.2.0-stable</span>
        </div>
      </footer>

      {/* AI Study Coach Sliding Overlay Drawer */}
      {showAISidebar && (
        <>
          {/* Blur Backdrop */}
          <div
            id="ai-drawer-backdrop"
            onClick={() => setShowAISidebar(false)}
            className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 animate-fade-in xl:hidden"
          />

          {/* Drawer Body Panel */}
          <div
            id="ai-drawer-body"
            className={`fixed right-0 top-0 h-screen bg-[#0A0D14] border-l border-slate-800/80 shadow-2xl z-50 flex flex-col transition-all duration-300 ${
              isAIFullscreen ? 'w-full md:w-[85vw]' : 'w-full sm:w-[480px]'
            } animate-slide-in`}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-800/60 flex justify-between items-center bg-slate-900/30">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600/15 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white tracking-wide">AI Study Coach & Mentor</h3>
                  <p className="text-[10px] text-slate-500 leading-none mt-1">Ask questions, get step-by-step guidance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="btn-ai-drawer-expand"
                  onClick={() => setIsAIFullscreen(!isAIFullscreen)}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 cursor-pointer transition-all flex items-center gap-1"
                >
                  {isAIFullscreen ? '🗗 Compact' : '🗖 Fullscreen'}
                </button>
                <button
                  id="btn-ai-drawer-close"
                  onClick={() => setShowAISidebar(false)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all cursor-pointer text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Chat Content wrapper - scrollable */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950/10">
              <DSAChatbot theme={currentTheme} />
            </div>
          </div>
        </>
      )}

      {/* Floating Sticky Collapsed AI Tab Ribbon (Always accessible!) */}
      {!showAISidebar && (
        <button
          id="btn-sticky-ai-expand"
          onClick={() => setShowAISidebar(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold uppercase text-[9px] tracking-widest py-5 px-3.5 rounded-l-2xl shadow-2xl flex flex-col items-center gap-3.5 transition-all duration-300 group hover:-translate-x-1 cursor-pointer border border-indigo-500/30"
        >
          <MessageSquare className="w-4 h-4 text-white animate-pulse" />
          <span className="[writing-mode:vertical-lr] tracking-[0.2em] select-none font-bold">AI STUDY COACH</span>
        </button>
      )}
    </div>
  );
}
