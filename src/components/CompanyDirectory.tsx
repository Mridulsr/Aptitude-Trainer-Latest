import React, { useState } from 'react';
import { Building2, Sparkles, ChevronDown, ChevronUp, CheckCircle2, MessageSquare, HelpCircle, Search, Filter } from 'lucide-react';
import { QuizQuestion, Theme } from '../types';
import { DEFAULT_QUESTIONS } from '../data/dsaRoadmap';

interface CompanyDirectoryProps {
  theme: Theme;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({ theme }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});
  const [userSelections, setUserSelections] = useState<Record<number, string>>({});

  // List of all unique companies in the database
  const companies = ['All', ...Array.from(new Set(DEFAULT_QUESTIONS.map((q) => q.company)))];

  // Filter questions based on selected company and search query
  const filteredQuestions = DEFAULT_QUESTIONS.filter((q) => {
    const matchesCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  const toggleAnswer = (id: number) => {
    setExpandedAnswers((prev) => {
      const nextExpanded = !prev[id];
      if (!nextExpanded) {
        setUserSelections((prevSel) => {
          const nextSel = { ...prevSel };
          delete nextSel[id];
          return nextSel;
        });
      }
      return {
        ...prev,
        [id]: nextExpanded,
      };
    });
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-indigo-400 font-extrabold">{part}</strong> : part);
  };

  const formatExplanation = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let content = line.trim();
      if (!content) return <div key={idx} className="h-3" />;
      
      // Check if it's a heading
      if (content.startsWith('###') || content.startsWith('##') || content.startsWith('- **Concept Breakdown') || content.startsWith('- **Detailed Step-by-Step') || content.startsWith('- **Why the Selected') || content.startsWith('- **Pro Tip')) {
        const cleanHeading = content.replace(/^#+\s*/, '').replace(/^- \*\*/, '').replace(/\*\*:/, '').replace(/\*\*/g, '');
        return (
          <h4 key={idx} className="text-xs md:text-sm font-extrabold text-indigo-400 mt-4 mb-2 flex items-center gap-2 uppercase tracking-wider border-b border-white/5 pb-1">
            {cleanHeading}
          </h4>
        );
      }
      
      // Check if it is a list item
      if (content.startsWith('-') || content.startsWith('*')) {
        const cleanLi = content.substring(1).trim();
        return (
          <li key={idx} className="ml-5 list-disc text-xs text-slate-300 mb-1.5 leading-relaxed">
            {parseBoldText(cleanLi)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed mb-2.5">
          {parseBoldText(content)}
        </p>
      );
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Search and Company Selection Bar */}
      <div className={`p-8 rounded-3xl border ${theme.colors.border} ${theme.colors.card} shadow-xl shadow-black/25 space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-100 flex items-center gap-2 tracking-tight">
              <Building2 className="w-5 h-5 text-indigo-500" />
              Company Question Directories
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any tech company to study and review all of their verified placement aptitude questions.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              id="company-q-search"
              type="text"
              placeholder="Search formula, topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Company Quick-Selection Tabs */}
        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-800/50">
          {companies.map((comp) => {
            const isActive = selectedCompany === comp;
            return (
              <button
                id={`btn-dir-comp-${comp}`}
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-indigo-600 text-white border border-indigo-500 shadow-indigo-500/10'
                    : 'bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {comp === 'All' ? '🌐 All Companies' : `🏢 ${comp}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions Listing */}
      <div className="space-y-8">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => {
            const isExpanded = !!expandedAnswers[q.id];
            return (
              <div
                key={q.id}
                className={`p-8 rounded-3xl border border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/40 shadow-xl shadow-black/15 transition-all duration-300 space-y-5`}
              >
                {/* Badges Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-indigo-950 text-indigo-400 border border-indigo-900/50 rounded-lg">
                      🏢 {q.company}
                    </span>
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-slate-950 text-slate-400 border border-slate-800 rounded-lg">
                      {q.topic}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                    q.level === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                    q.level === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                    q.level === 'Hard' ? 'bg-rose-500/10 text-rose-400' : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {q.level}
                  </span>
                </div>

                {/* Question statement */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold font-mono text-slate-500 block uppercase tracking-wider">Question {idx + 1}</span>
                  <p className="text-base md:text-lg font-semibold text-slate-100 leading-relaxed tracking-tight">
                    {q.question}
                  </p>
                </div>

                {/* Grid Options View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt) => {
                    const userChoice = userSelections[q.id];
                    const isSelected = userChoice === opt;
                    const isAnswer = opt === q.answer;
                    
                    let optStyle = 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/40 cursor-pointer text-slate-400';

                    if (userChoice) {
                      // Question has been answered
                      if (isAnswer) {
                        optStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-300';
                      } else if (isSelected) {
                        optStyle = 'border-rose-500 bg-rose-950/20 text-rose-300';
                      } else {
                        optStyle = 'border-slate-800 opacity-50 cursor-not-allowed text-slate-500';
                      }
                    } else if (isExpanded) {
                      // Question steps revealed directly without choice
                      if (isAnswer) {
                        optStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-300';
                      } else {
                        optStyle = 'border-slate-800 opacity-50 text-slate-500';
                      }
                    }

                    return (
                      <button
                        id={`company-q-${q.id}-opt-${opt.replace(/\s+/g, '-')}`}
                        key={opt}
                        onClick={() => {
                          if (!userChoice) {
                            setUserSelections((prev) => ({ ...prev, [q.id]: opt }));
                            setExpandedAnswers((prev) => ({ ...prev, [q.id]: true }));
                          }
                        }}
                        disabled={!!userChoice}
                        className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {userChoice && isAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {userChoice && isSelected && !isAnswer && (
                          <span className="text-rose-400 text-[10px] font-bold">Incorrect</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Action Reveal & Interactive Coach buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/40">
                  <button
                    id={`btn-reveal-${q.id}`}
                    onClick={() => toggleAnswer(q.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isExpanded
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600/20'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isExpanded ? 'Hide Steps' : 'Reveal Answer & Steps'}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href="#ai-study-coach-input"
                    onClick={() => {
                      const chatInput = document.getElementById('ai-study-coach-input') as HTMLTextAreaElement;
                      if (chatInput) {
                        chatInput.value = `Can you explain the formula and steps for this question from ${q.company}: "${q.question}"?`;
                        chatInput.focus();
                      }
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Ask AI Coach
                  </a>
                </div>

                {/* Expanded steps panel */}
                {isExpanded && (
                  <div className="mt-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner space-y-3 animate-fade-in">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      Correct Answer: {q.answer}
                    </div>
                    <div className="border-t border-slate-800/50 pt-3 space-y-2.5">
                      {formatExplanation(q.explanation)}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-16 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <span className="text-sm text-slate-500 block">No placement questions found matching "{searchQuery}" under "{selectedCompany}".</span>
          </div>
        )}
      </div>
    </div>
  );
};
