import React from 'react';
import { HelpCircle, Sparkles, BookOpen, Clock, Activity, Settings } from 'lucide-react';
import { Theme } from '../types';

interface HelpGuideProps {
  theme: Theme;
}

export const HelpGuide: React.FC<HelpGuideProps> = ({ theme }) => {
  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all space-y-6 max-w-4xl mx-auto`}>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          💡 DSA.viz Platform Help Guide
        </h2>
        <p className="text-xs text-slate-400">
          Learn how to maximize your technical preparation and concept visualization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sorting Guide */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
            📊 Sorting Visualizer
          </h3>
          <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Choose <strong>Bubble</strong>, <strong>Insertion</strong>, or <strong>Quick Sort</strong> to start.</li>
            <li>Use the <strong>Play/Pause</strong> button to animate the algorithm, or <strong>Single Step</strong> manually.</li>
            <li>Watch the highlighted lines in the <strong>Live Implementation Trace</strong> to see exact line executions.</li>
          </ul>
        </div>

        {/* BST Guide */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
            🌳 Binary Search Trees
          </h3>
          <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Type any integer to <strong>Insert</strong>, <strong>Delete</strong>, or <strong>Search</strong> nodes.</li>
            <li>Trigger depth-first (<strong>Inorder</strong>, <strong>Preorder</strong>, <strong>Postorder</strong>) or breadth-first (<strong>BFS</strong>) traversals.</li>
            <li>Watch the nodes blink as they are pushed into the Visited Queue!</li>
          </ul>
        </div>

        {/* Linked List Guide */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
            🔗 Singly Linked Lists
          </h3>
          <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Insert items at the <strong>Head</strong> or <strong>Tail</strong>, or insert/delete at a custom index.</li>
            <li>Click <strong>Reverse!</strong> to watch a slow-motion dry run of pointer changes in action.</li>
            <li>Visual pointer labels: <strong>prev</strong> (green), <strong>curr</strong> (blue), and <strong>next</strong> (amber) trace.</li>
          </ul>
        </div>

        {/* AI Lab & Chatbot Guide */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
            🤖 AI Practice Lab & Coach
          </h3>
          <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
            <li>Trigger custom <strong>AI-Generated Quizzes</strong> on 22 technical topics on-demand.</li>
            <li>Submit options to retrieve instant <strong>Gemini AI step-by-step solutions</strong>.</li>
            <li>Chat with the persistent <strong>AI Coach</strong> to clarify code complexity or test case logic.</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-indigo-950/20 border border-indigo-900/60 rounded-xl text-center text-[11px] text-indigo-300 leading-relaxed">
        <strong>💡 Pro Tip:</strong> Use the <strong>Stopwatch Timer</strong> on the dashboard to track your speed. When you save a timestamp, it is automatically logged into your <strong>Solve Speed Trend Graphs</strong>!
      </div>
    </div>
  );
};
