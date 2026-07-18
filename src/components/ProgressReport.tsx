import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Download, TrendingUp, Sparkles, AlertCircle, CheckCircle, BarChart2, Star } from 'lucide-react';
import { Theme, UserStats, SpeedLog, AppUser, QuizQuestion } from '../types';
import { jsPDF } from 'jspdf';

interface ProgressReportProps {
  theme: Theme;
  userStats: UserStats;
  speedLogs: SpeedLog[];
  currentUser: AppUser | null;
  questions: QuizQuestion[];
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  theme,
  userStats,
  speedLogs,
  currentUser,
  questions,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Group solved logs by topic
  const topicStats: { [key: string]: { correct: number; total: number; totalTime: number } } = {};
  speedLogs.forEach((log) => {
    if (!topicStats[log.topic]) {
      topicStats[log.topic] = { correct: 0, total: 0, totalTime: 0 };
    }
    topicStats[log.topic].total += 1;
    topicStats[log.topic].totalTime += log.timeSeconds;
    if (log.isCorrect) {
      topicStats[log.topic].correct += 1;
    }
  });

  const topicsList = Object.keys(topicStats);

  // Suggestion Graph Data: Compares Current Accuracy, Target (90%), and Suggested Practice Impact
  const suggestionData = topicsList.map((topic) => {
    const stats = topicStats[topic];
    const currentAccuracy = Math.round((stats.correct / stats.total) * 100);
    // Predicted accuracy if user practices 5 more questions on this topic with improved understanding (adds +12% up to 95%)
    const predictedAccuracy = Math.min(95, Math.max(currentAccuracy, currentAccuracy + Math.round(15 - (stats.total * 0.8))));
    const targetAccuracy = 90;

    return {
      topic,
      "Current Accuracy (%)": currentAccuracy,
      "Target Benchmark (%)": targetAccuracy,
      "Suggested Practice Boost (%)": predictedAccuracy,
      attempts: stats.total,
    };
  });

  // Fallback data if user hasn't solved any questions yet
  const defaultSuggestionData = [
    { topic: "Arithmetic", "Current Accuracy (%)": 65, "Target Benchmark (%)": 90, "Suggested Practice Boost (%)": 82, attempts: 2 },
    { topic: "Logical Reasoning", "Current Accuracy (%)": 70, "Target Benchmark (%)": 90, "Suggested Practice Boost (%)": 85, attempts: 3 },
    { topic: "Programming Logic", "Current Accuracy (%)": 50, "Target Benchmark (%)": 90, "Suggested Practice Boost (%)": 75, attempts: 1 },
    { topic: "Sorting", "Current Accuracy (%)": 40, "Target Benchmark (%)": 90, "Suggested Practice Boost (%)": 68, attempts: 1 },
    { topic: "Trees & BST", "Current Accuracy (%)": 30, "Target Benchmark (%)": 90, "Suggested Practice Boost (%)": 60, attempts: 1 },
  ];

  const chartData = suggestionData.length > 0 ? suggestionData : defaultSuggestionData;

  // Generate action items/suggestions based on performance
  const generateSuggestions = () => {
    const suggestions: string[] = [];
    if (speedLogs.length === 0) {
      return [
        "Complete at least 5 questions to generate personalized dynamic suggestions.",
        "Focus on 'Arithmetic' under Easy difficulty to build high-yield accuracy.",
        "Verify your time management using the built-in stopwatch feature.",
      ];
    }

    // Find lowest accuracy topic
    let lowestAccuracyTopic = '';
    let minAcc = 101;
    Object.keys(topicStats).forEach((topic) => {
      const acc = (topicStats[topic].correct / topicStats[topic].total) * 100;
      if (acc < minAcc) {
        minAcc = acc;
        lowestAccuracyTopic = topic;
      }
    });

    if (lowestAccuracyTopic && minAcc < 75) {
      suggestions.push(`🔥 Focus on ${lowestAccuracyTopic}: Current accuracy is ${Math.round(minAcc)}%. Practicing 10 more questions will boost confidence.`);
    }

    // Solve time suggestion
    const averageSolveTime = speedLogs.reduce((acc, curr) => acc + curr.timeSeconds, 0) / speedLogs.length;
    if (averageSolveTime > 45) {
      suggestions.push(`⏱️ Improve Pace: Your average solve time of ${Math.round(averageSolveTime)}s is slightly high. Try using the dynamic study guide hints.`);
    } else {
      suggestions.push(`⚡ Excellent Speed: Your solve rate of ${Math.round(averageSolveTime)}s per question meets top tech interview requirements.`);
    }

    // Streak and XP target
    if (userStats.streak < 3) {
      suggestions.push("📅 Boost Your Streak: Maintain a 3-day active streak to unlock elite placement question sets.");
    } else {
      suggestions.push(`🎉 Elite Streak active: ${userStats.streak} Days! Keep it up for prime company assessments.`);
    }

    return suggestions;
  };

  const activeSuggestions = generateSuggestions();

  // PDF Export using jsPDF
  const downloadPDFReport = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const todayStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Colors
      const primaryColor = [79, 70, 229]; // Indigo
      const secondaryColor = [15, 23, 42]; // Slate
      const textColor = [51, 65, 85]; // Slate dark

      // Title header banner
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(0, 0, 210, 40, 'F');

      // Title text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('DSA.viz - PREPARATION REPORT', 15, 22);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(199, 210, 254);
      doc.text('Comprehensive Placement Aptitude & Algorithm Analysis', 15, 30);

      // Date alignment
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(`Report Date: ${todayStr}`, 150, 26);

      // Reset text color
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      // Candidate Profile Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Candidate Profile', 15, 55);
      doc.setDrawColor(226, 232, 240);
      doc.line(15, 58, 195, 58);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Name: ${currentUser?.name || 'Guest Student'}`, 15, 66);
      doc.text(`Email: ${currentUser?.email || 'guest@dsaviz.com'}`, 15, 72);
      doc.text(`Target Company: ${currentUser?.targetCompany || 'All Companies'}`, 15, 78);
      doc.text(`Level Preference: ${currentUser?.levelPreference || 'All Levels'}`, 15, 84);

      // Statistics Section
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Performance Summary', 115, 55);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Solved Questions: ${userStats.solvedCount}`, 115, 66);
      doc.text(`Total Score: ${userStats.score} XP`, 115, 72);
      doc.text(`Active Streak: ${userStats.streak} Days`, 115, 78);
      doc.text(`Total Time Spent: ${Math.round(userStats.totalTimeSpent / 60)} minutes`, 115, 84);

      // Detailed Performance Table Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Topic Performance Analysis', 15, 102);
      doc.line(15, 105, 195, 105);

      // Table Header row
      doc.setFillColor(248, 250, 252);
      doc.rect(15, 110, 180, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('Topic Category', 18, 115);
      doc.text('Attempts', 90, 115);
      doc.text('Accuracy %', 120, 115);
      doc.text('Avg Solve Time', 155, 115);

      // Populate Table rows
      let yOffset = 124;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);

      const tableData = topicsList.length > 0 ? topicsList : ["Arithmetic", "Logical Reasoning", "Programming Logic", "Sorting", "Trees & BST"];

      tableData.forEach((topic) => {
        const stats = topicStats[topic] || { correct: 0, total: 0, totalTime: 0 };
        const attempts = stats.total || 0;
        const accuracy = attempts > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        const avgTime = attempts > 0 ? `${Math.round(stats.totalTime / stats.total)}s` : 'N/A';

        // Strip borders
        doc.line(15, yOffset - 5, 195, yOffset - 5);
        doc.text(topic, 18, yOffset);
        doc.text(attempts.toString(), 90, yOffset);
        doc.text(`${accuracy}%`, 120, yOffset);
        doc.text(avgTime, 155, yOffset);
        yOffset += 9;
      });

      doc.line(15, yOffset - 5, 195, yOffset - 5);

      // AI Suggestions & Growth Path Section
      yOffset += 10;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('AI Smart Recommendations & Suggestions', 15, yOffset);
      doc.line(15, yOffset + 3, 195, yOffset + 3);

      yOffset += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      activeSuggestions.forEach((sug) => {
        doc.text(`* ${sug}`, 15, yOffset);
        yOffset += 7;
      });

      // Footer
      doc.setFillColor(241, 245, 249);
      doc.rect(0, 282, 210, 15, 'F');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Generated dynamically by DSA.viz - The Intelligent Practice & Visualizer Workspace.', 15, 291);
      doc.text('Page 1 of 1', 180, 291);

      // Save PDF
      doc.save(`dsaviz_placement_report_${todayStr.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div id="progress-report-widget" className={`p-6 md:p-8 rounded-3xl border ${theme.colors.card} shadow-xl shadow-black/20 transition-all space-y-6 mt-12`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
              <BarChart2 className="w-5 h-5" />
            </span>
            <h2 className="text-base md:text-lg font-extrabold text-slate-100 tracking-tight uppercase">
              📊 DSA Practice Suggestion & Performance Report
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Compare your actual topic accuracies with AI-predicted potential and benchmark goals.
          </p>
        </div>

        <button
          id="btn-download-pdf-report"
          onClick={downloadPDFReport}
          disabled={isDownloading}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Compiling PDF Report...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Performance PDF</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Suggestion Graph Card */}
        <div className="lg:col-span-2 space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-slate-900 shadow-inner">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-indigo-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Suggested Practice Impact Chart
              </h3>
              <p className="text-[10px] text-slate-500">
                Visualizes actual accuracy vs. 90% benchmark and the predicted impact of practicing +10 questions.
              </p>
            </div>
            {speedLogs.length === 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                Showing Sandbox Data
              </span>
            )}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBoost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="topic" stroke="#4b5563" fontSize={9} />
                <YAxis stroke="#4b5563" fontSize={9} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', borderRadius: '12px', fontSize: '11px' }}
                  labelStyle={{ color: '#9ca3af', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Current Accuracy (%)" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="Target Benchmark (%)" stroke="#4f46e5" strokeDasharray="4 4" strokeWidth={1.5} fillOpacity={1} fill="url(#colorTarget)" />
                <Area type="monotone" dataKey="Suggested Practice Boost (%)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBoost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Side Card */}
        <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-900 shadow-inner flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Smart Study Path Suggestions
            </h3>
            <p className="text-[10px] text-slate-500">
              Personalized advice based on your current solve speed and accuracy trends.
            </p>

            <div className="space-y-2.5">
              {activeSuggestions.map((sug, idx) => {
                let icon = <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />;
                if (sug.includes("🔥") || sug.includes("Focus")) {
                  icon = <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5 animate-pulse" />;
                } else if (sug.includes("🎉") || sug.includes("Excellent")) {
                  icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />;
                }
                return (
                  <div key={idx} className="flex gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/50 text-[11px] leading-relaxed text-slate-300">
                    {icon}
                    <span>{sug}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-bold text-slate-500">
            <span>STREAK MULTIPLIER:</span>
            <span className="text-amber-500 font-mono">{(1 + (userStats.streak * 0.05)).toFixed(2)}x XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
