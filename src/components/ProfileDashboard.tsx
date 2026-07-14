import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { Flame, Award, Clock, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
import { SpeedLog, Theme, UserStats } from '../types';
import { ROADMAP_MODULES } from '../data/dsaRoadmap';

interface ProfileDashboardProps {
  theme: Theme;
  userStats: UserStats;
  speedLogs: SpeedLog[];
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ theme, userStats, speedLogs }) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'graphs'>('roadmap');

  // Format Recharts speed data
  const chartData = speedLogs.map((log, index) => ({
    name: `Q${index + 1}`,
    seconds: log.timeSeconds,
    topic: log.topic,
    status: log.isCorrect ? 'Correct' : 'Incorrect',
  }));

  // Format accuracy by topic
  const topicStatsMap: { [key: string]: { correct: number; total: number } } = {};
  speedLogs.forEach((log) => {
    if (!topicStatsMap[log.topic]) {
      topicStatsMap[log.topic] = { correct: 0, total: 0 };
    }
    topicStatsMap[log.topic].total += 1;
    if (log.isCorrect) {
      topicStatsMap[log.topic].correct += 1;
    }
  });

  const accuracyData = Object.keys(topicStatsMap).map((topic) => {
    const stats = topicStatsMap[topic];
    const percentage = Math.round((stats.correct / stats.total) * 100);
    return {
      topic,
      Accuracy: percentage,
      Attempts: stats.total,
    };
  });

  return (
    <div className="space-y-6">
      {/* Visual KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak card */}
        <div className={`p-4 rounded-2xl border ${theme.colors.card} transition-all flex items-center gap-3.5`}>
          <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Streak</span>
            <span className="text-xl font-bold font-mono text-slate-100">{userStats.streak} Days</span>
          </div>
        </div>

        {/* Score card */}
        <div className={`p-4 rounded-2xl border ${theme.colors.card} transition-all flex items-center gap-3.5`}>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total XP</span>
            <span className="text-xl font-bold font-mono text-slate-100">{userStats.score} XP</span>
          </div>
        </div>

        {/* Solved card */}
        <div className={`p-4 rounded-2xl border ${theme.colors.card} transition-all flex items-center gap-3.5`}>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Questions Solved</span>
            <span className="text-xl font-bold font-mono text-slate-100">{userStats.solvedCount}</span>
          </div>
        </div>

        {/* Time Card */}
        <div className={`p-4 rounded-2xl border ${theme.colors.card} transition-all flex items-center gap-3.5`}>
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Time</span>
            <span className="text-xl font-bold font-mono text-slate-100">
              {Math.floor(userStats.totalTimeSpent / 60)} min
            </span>
          </div>
        </div>
      </div>

      {/* Main dashboard toggle tabs */}
      <div className="flex border-b border-slate-800">
        <button
          id="dashboard-roadmap-tab"
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🗺️ Preparation Roadmap
        </button>
        <button
          id="dashboard-graphs-tab"
          onClick={() => setActiveTab('graphs')}
          className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'graphs'
              ? 'border-b-2 border-indigo-500 text-indigo-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📈 Analytics Charts
        </button>
      </div>

      {activeTab === 'graphs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Practice speed trend chart */}
          <div className={`p-5 rounded-2xl border ${theme.colors.card} transition-all space-y-4`}>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                ⏱️ Solve Speed Trend
              </h3>
              <p className="text-[10px] text-slate-500">Track how fast you answer questions over time (seconds).</p>
            </div>

            <div className="h-64 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} label={{ value: 'Secs', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Line type="monotone" dataKey="seconds" name="Solve Time (s)" stroke="#4f46e5" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 italic text-xs">
                  Solve some quiz questions or record custom timer logs to view trend graphs!
                </div>
              )}
            </div>
          </div>

          {/* Accuracy distribution by category */}
          <div className={`p-5 rounded-2xl border ${theme.colors.card} transition-all space-y-4`}>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                🎯 Topic Accuracy Distribution
              </h3>
              <p className="text-[10px] text-slate-500">Percentage accuracy across target Aptitude and DSA categories.</p>
            </div>

            <div className="h-64 w-full">
              {accuracyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="topic" stroke="#64748b" fontSize={9} interval={0} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Bar dataKey="Accuracy" fill="#10b981" name="Accuracy %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 italic text-xs">
                  No topic accuracy data. Complete a few quizzes in the AI Lab to populate!
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Roadmap Milestone modules */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROADMAP_MODULES.map((m) => {
            let statusColor = 'bg-slate-900 border-slate-850 text-slate-400';
            let labelStyle = 'bg-slate-800 text-slate-400';

            if (m.status === 'Completed') {
              statusColor = 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.03)]';
              labelStyle = 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40';
            } else if (m.status === 'In Progress') {
              statusColor = 'bg-indigo-950/20 border-indigo-900/40 text-indigo-300 animate-pulse';
              labelStyle = 'bg-indigo-900/40 text-indigo-400 border border-indigo-850';
            }

            return (
              <div
                id={`roadmap-module-${m.id}`}
                key={m.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${statusColor}`}
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${labelStyle}`}>
                      {m.status}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">{m.difficulty}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{m.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
