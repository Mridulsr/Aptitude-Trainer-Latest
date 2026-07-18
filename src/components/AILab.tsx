import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, ChevronRight, HelpCircle, Flame, Send, Timer, Play, Pause, Upload, Link, FileText, Check, Plus } from 'lucide-react';
import { QuizQuestion, Theme, AppUser, SpeedLog } from '../types';
import { DEFAULT_QUESTIONS, TOPICS } from '../data/dsaRoadmap';
import { saveSpeedLog, saveQuizProgress, loadQuizProgress } from '../lib/firebase';
import { EASY_QUESTIONS_BOOST } from '../data/easy_questions_boost';
import { ProgressReport } from './ProgressReport';

interface AILabProps {
  theme: Theme;
  onSolveQuestion: (timeSpentSeconds: number, isCorrect: boolean) => void;
  userStats: {
    score: number;
    solvedCount: number;
    streak: number;
    totalTimeSpent: number;
  };
  quizTimerSeconds: number;
  setQuizTimerSeconds: React.Dispatch<React.SetStateAction<number>>;
  isQuizTimerRunning: boolean;
  setIsQuizTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: AppUser | null;
  speedLogs: SpeedLog[];
}

export const AILab: React.FC<AILabProps> = ({ 
  theme, 
  onSolveQuestion, 
  userStats,
  quizTimerSeconds,
  setQuizTimerSeconds,
  isQuizTimerRunning,
  setIsQuizTimerRunning,
  currentUser,
  speedLogs
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('Easy');
  const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState<boolean>(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [aiError, setAiError] = useState<string>('');

  // Save Progress states
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [isGenerating50, setIsGenerating50] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  // Parser and uploader states
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [activeUploadTab, setActiveUploadTab] = useState<'text' | 'file' | 'link'>('text');
  const [pasteText, setPasteText] = useState<string>('');
  const [pastedUrl, setPastedUrl] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>('');
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);


  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize progress from Firestore / LocalStorage on mount
  useEffect(() => {
    const initProgress = async () => {
      try {
        const saved = await loadQuizProgress();
        if (saved) {
          if (saved.questions && saved.questions.length > 0) {
            setQuestions(saved.questions);
          }
          setSelectedLevel(saved.selectedLevel || 'Easy');
          setSelectedTopic(saved.selectedTopic || 'All');
          setSelectedCompany(saved.selectedCompany || 'All');
          setCurrentIdx(saved.currentIdx || 0);
          if (saved.answers) {
            setAnswers(saved.answers);
          }
        }
      } catch (err) {
        console.warn('Failed to load quiz progress:', err);
      } finally {
        setIsLoaded(true);
      }
    };
    initProgress();
  }, []);

  // Save progress automatically when states change, with a loaded guard to prevent overwriting
  useEffect(() => {
    if (!isLoaded) return;
    saveQuizProgress({
      currentIdx,
      questions,
      selectedLevel,
      selectedTopic,
      selectedCompany,
      answers,
    });
  }, [currentIdx, questions, selectedLevel, selectedTopic, selectedCompany, answers, isLoaded]);

  // Filter local questions
  const filteredQuestions = questions.filter((q) => {
    const matchCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchLevel = q.level === selectedLevel;
    return matchCompany && matchTopic && matchLevel;
  });

  const activeQuestion = filteredQuestions[currentIdx] || null;

  // Re-start timer whenever question changes
  useEffect(() => {
    setQuizTimerSeconds(0);
    setIsQuizTimerRunning(true);

    // Restore previously saved answer for this question if any
    const savedAnswer = answers[activeQuestion?.id || 0];
    if (savedAnswer) {
      setSelectedOption(savedAnswer);
      setIsSubmitted(true);
      setIsQuizTimerRunning(false);
      setAiExplanation(activeQuestion?.explanation || 'No explanation available.');
    } else {
      setSelectedOption('');
      setIsSubmitted(false);
      setAiExplanation('');
    }
    setAiError('');
  }, [currentIdx, selectedTopic, selectedLevel, selectedCompany, activeQuestion, answers, setQuizTimerSeconds, setIsQuizTimerRunning]);

  // Shuffle array utility
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Shuffle options when activeQuestion changes
  useEffect(() => {
    if (activeQuestion) {
      setShuffledOptions(shuffleArray(activeQuestion.options));
    } else {
      setShuffledOptions([]);
    }
  }, [activeQuestion]);

  const handleSubmit = async () => {
    if (!activeQuestion || !selectedOption || isSubmitted) return;

    const timeSpentSeconds = quizTimerSeconds;
    const isCorrect = selectedOption === activeQuestion.answer;

    setIsSubmitted(true);
    setIsQuizTimerRunning(false);
    
    // Show the predefined explanation immediately! Blazing fast!
    setAiExplanation(activeQuestion.explanation || 'No explanation available.');

    // Save answer state locally and in firestore
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: selectedOption }));

    // Call callback to sync user profile score/count
    onSolveQuestion(timeSpentSeconds, isCorrect);

    // Record Speed & Accuracy Log to LocalStorage / Firestore!
    await saveSpeedLog({
      topic: activeQuestion.topic,
      timeSeconds: timeSpentSeconds,
      timestamp: new Date().toISOString(),
      isCorrect,
      accuracy: isCorrect ? 100 : 0,
    });
  };

  const fetchDeepAiExplanation = async () => {
    if (!activeQuestion || !isSubmitted) return;
    setIsLoadingExplanation(true);
    setAiError('');
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeQuestion.question,
          selectedOption,
          correctOption: activeQuestion.answer,
          options: activeQuestion.options,
        }),
      });

      const data = await response.json();
      if (data.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiError('Could not retrieve custom explanation from AI. Showing pre-defined version.');
      }
    } catch (e) {
      console.warn('AI Explanation fetch failed, showing predefined version:', e);
      setAiError('Failed to contact Gemini server. Showing pre-defined version.');
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0); // wrap around
    }
  };

  // Generate custom dynamic questions via server-side Gemini Proxy
  const generateDynamicQuestions = async () => {
    setIsGeneratingQuestions(true);
    setAiError('');
    try {
      const topicToGen = selectedTopic === 'All' ? 'Trees and Graphs' : selectedTopic;
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToGen,
          difficulty: selectedLevel,
          company: selectedCompany !== 'All' ? selectedCompany : undefined,
        }),
      });

      const data = await response.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        // Prepend custom questions to local session set
        setQuestions([...data.questions, ...questions]);
        setCurrentIdx(0);
      } else {
        setAiError('Could not parse AI-generated questions. Using default database instead.');
      }
    } catch (err) {
      console.error(err);
      setAiError('Failed to communicate with AI server. Using pre-loaded offline practice questions instead.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Dynamic 50-Question Generation Loop to securely build massive question sets!
  const generate50Questions = async (level: 'Easy' | 'Medium' | 'Hard' | 'Advanced') => {
    setIsGenerating50(true);
    setGenerationProgress(0);
    setAiError('');
    setUploadSuccessMsg('');

    if (level === 'Easy') {
      const alreadyBoosted = questions.some(q => q.id >= 3001 && q.id <= 3050);
      if (alreadyBoosted) {
        setUploadSuccessMsg('🚀 Easy question bank already boosted with +50 Easy questions!');
        setIsGenerating50(false);
        return;
      }
      setQuestions(prev => [...EASY_QUESTIONS_BOOST, ...prev]);
      setSelectedLevel('Easy');
      setSelectedCompany('All');
      setSelectedTopic('All');
      setCurrentIdx(0);
      setUploadSuccessMsg('🚀 Successfully boosted question bank with +50 High-Yield Easy placement questions! Try them out!');
      setIsGenerating50(false);
      return;
    }

    let compiledQuestions: QuizQuestion[] = [];
    const topicToGen = selectedTopic === 'All' ? 'Arithmetic' : selectedTopic;
    const companyToGen = selectedCompany !== 'All' ? selectedCompany : 'All';

    try {
      // 5 batches of 10 questions each ensures robustness and zero timeouts
      for (let batch = 1; batch <= 5; batch++) {
        setGenerationProgress((batch - 1) * 10);
        const response = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: topicToGen,
            difficulty: level,
            company: companyToGen !== 'All' ? companyToGen : undefined,
            count: 10
          }),
        });

        const data = await response.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          const offset = Date.now() + Math.round(Math.random() * 100000);
          const mapped = data.questions.map((q: QuizQuestion, index: number) => ({
            ...q,
            id: offset + index,
            level: level
          }));
          compiledQuestions = [...compiledQuestions, ...mapped];
          setQuestions(prev => [...mapped, ...prev]);
        } else {
          throw new Error('AI failed to produce structured questions in this batch.');
        }
        setGenerationProgress(batch * 10);
      }

      setSelectedLevel(level);
      setCurrentIdx(0);
      setUploadSuccessMsg(`🎉 Successfully generated and appended 50 premium AI-crafted ${level} MCQs targeting ${topicToGen}!`);
    } catch (err: any) {
      console.error(err);
      setAiError(`Batch generation paused. Generated ${compiledQuestions.length} questions successfully before hitting AI transient limits.`);
      if (compiledQuestions.length > 0) {
        setSelectedLevel(level);
        setCurrentIdx(0);
      }
    } finally {
      setIsGenerating50(false);
      setGenerationProgress(0);
    }
  };

  // Ingest massive list of 100+ easy placement questions
  const handleBoostEasyQuestions = () => {
    generate50Questions('Easy');
  };


  // Parse questions from document file, text, or link
  const handleUploadAndParse = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsParsing(true);
    setUploadSuccessMsg('');
    setAiError('');

    try {
      let bodyData: { text?: string; url?: string } = {};

      if (activeUploadTab === 'text') {
        if (!pasteText.trim()) {
          setAiError('Please enter some text or content to parse.');
          setIsParsing(false);
          return;
        }
        bodyData = { text: pasteText };
      } else if (activeUploadTab === 'link') {
        if (!pastedUrl.trim() || !pastedUrl.startsWith('http')) {
          setAiError('Please enter a valid HTTP/HTTPS URL link.');
          setIsParsing(false);
          return;
        }
        bodyData = { url: pastedUrl };
      }

      const res = await fetch('/api/parse-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (res.status !== 200 || data.error) {
        throw new Error(data.error || 'Server error occurred during parsing.');
      }

      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(prev => [...data.questions, ...prev]);
        setUploadSuccessMsg(`🎉 Successfully extracted and ingested ${data.questions.length} premium MCQs into your active study quiz! Set Target Company to '${data.questions[0].company}' or pick level '${data.questions[0].level}' to practice!`);
        setPasteText('');
        setPastedUrl('');
        setCurrentIdx(0);
        if (data.questions[0].company) {
          setSelectedCompany(data.questions[0].company);
        }
        if (data.questions[0].level) {
          setSelectedLevel(data.questions[0].level);
        }
        setSelectedTopic('All');
      } else {
        setAiError('No valid multiple choice questions could be extracted from this content. Please try another sample.');
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Failed to connect to the Gemini parser. Please verify your connection or secret key.');
    } finally {
      setIsParsing(false);
    }
  };

  // Handle local text file selection & reading
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setUploadSuccessMsg('');
    setAiError('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target?.result as string;
      if (!fileContent || fileContent.trim().length < 10) {
        setAiError('The selected file is empty or unreadable.');
        setIsParsing(false);
        return;
      }

      try {
        const res = await fetch('/api/parse-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: fileContent }),
        });

        const data = await res.json();
        if (res.status !== 200 || data.error) {
          throw new Error(data.error || 'Parsing failed.');
        }

        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(prev => [...data.questions, ...prev]);
          setUploadSuccessMsg(`🎉 Successfully parsed and loaded ${data.questions.length} questions from "${file.name}" into your active study session!`);
          setCurrentIdx(0);
          if (data.questions[0].company) setSelectedCompany(data.questions[0].company);
          if (data.questions[0].level) setSelectedLevel(data.questions[0].level);
          setSelectedTopic('All');
        } else {
          setAiError('Could not parse any structured MCQs from this file content. Please check the file format.');
        }
      } catch (err: any) {
        console.error(err);
        setAiError(err.message || 'Error parsing document file with Gemini.');
      } finally {
        setIsParsing(false);
      }
    };

    reader.onerror = () => {
      setAiError('Failed to read file from disk.');
      setIsParsing(false);
    };

    reader.readAsText(file);
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
          <h4 key={idx} className="text-xs md:text-sm font-extrabold text-indigo-400 mt-6 mb-3 flex items-center gap-2 uppercase tracking-wider border-b border-white/5 pb-1">
            {cleanHeading}
          </h4>
        );
      }
      
      // Check if it is a list item
      if (content.startsWith('-') || content.startsWith('*')) {
        const cleanLi = content.substring(1).trim();
        return (
          <li key={idx} className="ml-5 list-disc text-[12px] text-slate-300 mb-2 leading-relaxed">
            {parseBoldText(cleanLi)}
          </li>
        );
      }

      return (
        <p key={idx} className="text-[12px] text-slate-300 leading-relaxed mb-3">
          {parseBoldText(content)}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
      {/* Filters & Configuration */}
      <div className={`lg:col-span-4 p-8 rounded-2xl border ${theme.colors.card} shadow-xl shadow-black/20 transition-all h-fit space-y-6`}>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            ⚙️ Placement Config
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Pick target company and trigger dynamic custom AI questions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Target Company</label>
            <select
              id="lab-company-select"
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setCurrentIdx(0);
              }}
              className="px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">🌐 All Companies</option>
              {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Amazon', 'Google', 'Capgemini', 'Goldman Sachs', 'CGI', 'HCL', 'Tech Mahindra', 'Persistent Systems', 'KPIT', 'LTIMindtree', 'IBM', 'Zensar', 'DXC Technology', 'Hexaware', 'Mphasis', 'Virtusa', 'Oracle', 'Verizon', 'Microsoft'].map((comp) => (
                <option key={comp} value={comp}>
                  🏢 {comp}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Category / Topic</label>
            <select
              id="lab-topic-select"
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setCurrentIdx(0);
              }}
              className="px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Topics</option>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Difficulty Level</label>
            <div className="grid grid-cols-2 gap-2">
              {['Easy', 'Medium', 'Hard', 'Advanced'].map((lvl) => (
                <button
                  id={`btn-lvl-${lvl}`}
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setCurrentIdx(0);
                  }}
                  className={`px-2.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          id="btn-ai-gen-qs"
          onClick={generateDynamicQuestions}
          disabled={isGeneratingQuestions}
          className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          {isGeneratingQuestions ? 'AI Generating Questions...' : 'AI-Generate Custom Quiz'}
        </button>

        <div className="border-t border-slate-800/80 pt-5 space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block">⚡ Question Booster Center (+50 MCQs)</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['Easy', 'Medium', 'Hard', 'Advanced'] as const).map((lvl) => (
                <button
                  id={`btn-boost-${lvl}`}
                  key={lvl}
                  onClick={() => generate50Questions(lvl)}
                  disabled={isGenerating50}
                  className="py-2 px-2.5 rounded-xl text-[10px] font-bold text-emerald-300 bg-emerald-950/10 hover:bg-emerald-950/30 border border-emerald-900/30 shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>Boost {lvl}</span>
                </button>
              ))}
            </div>

            {isGenerating50 && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-xs space-y-2 animate-fade-in">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest font-mono">
                  <span>Generating Batch...</span>
                  <span>{generationProgress}/50</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${(generationProgress / 50) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 block text-right">Drafting high-yield placement problems...</span>
              </div>
            )}

            <button
              id="btn-toggle-upload"
              onClick={() => {
                setIsUploadOpen(!isUploadOpen);
                setUploadSuccessMsg('');
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                isUploadOpen
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-indigo-950/20 hover:bg-indigo-950/40 border-indigo-900/40 text-indigo-400'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              {isUploadOpen ? 'Hide Upload Section' : '📁 Upload New Questions (PDF/Link)'}
            </button>
          </div>

          {/* Collapsible Upload Panel */}
          {isUploadOpen && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">AI Document Parser</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-900/40 font-mono">Gemini-3.5</span>
              </div>

              {/* Upload Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg">
                {(['text', 'file', 'link'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveUploadTab(tab);
                      setAiError('');
                    }}
                    className={`py-1 text-[10px] font-bold rounded-md capitalize transition-all ${
                      activeUploadTab === tab
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Paste Text Tab */}
              {activeUploadTab === 'text' && (
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 block font-medium">Paste textbook questions, notes, or copied PDF text:</label>
                  <textarea
                    value={pasteText}
                    onChange={(e) => setPasteText(e.target.value)}
                    placeholder="e.g., Q1. What is the complexity of...\n(A) O(1)\n(B) O(N)..."
                    className="w-full h-24 p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono resize-none"
                  />
                </div>
              )}

              {/* Upload Document File Tab */}
              {activeUploadTab === 'file' && (
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 block font-medium">Select a questions file (.txt, .csv, .json, or any text/doc):</label>
                  <div className="border border-dashed border-slate-800 hover:border-slate-700 rounded-lg p-4 bg-slate-900/40 text-center relative cursor-pointer group transition-all">
                    <input
                      type="file"
                      accept=".txt,.csv,.json,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <FileText className="w-6 h-6 text-slate-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-slate-300 block">Drag & Drop or click to browse</span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">TXT, CSV, JSON, or copied Doc text</span>
                  </div>
                </div>
              )}

              {/* Paste URL Link Tab */}
              {activeUploadTab === 'link' && (
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 block font-medium">Enter a website or blog article URL to parse questions from:</label>
                  <div className="flex gap-1.5">
                    <div className="relative flex-grow">
                      <Link className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="url"
                        value={pastedUrl}
                        onChange={(e) => setPastedUrl(e.target.value)}
                        placeholder="https://example.com/aptitude-questions"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Ingest Action Button */}
              {activeUploadTab !== 'file' && (
                <button
                  type="button"
                  onClick={() => handleUploadAndParse()}
                  disabled={isParsing}
                  className="w-full py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer transition-all"
                >
                  {isParsing ? (
                    <>
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gemini is parsing document...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ingest & Parse Questions</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Success / Upload Status Messages */}
          {uploadSuccessMsg && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-[10px] text-emerald-400 leading-normal flex gap-1.5 animate-fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}
        </div>

        {aiError && (
          <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-xl text-[10px] text-amber-400 leading-normal flex gap-1.5 animate-fade-in">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{aiError}</span>
          </div>
        )}
      </div>

      {/* Main Practice Quiz Area */}
      <div className="lg:col-span-8 space-y-8">
        {activeQuestion ? (
          <div className={`p-8 rounded-3xl border ${theme.colors.card} shadow-xl shadow-black/20 transition-all space-y-6`}>
            {/* Topic Header & Company tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-indigo-950 text-indigo-400 border border-indigo-900/60 rounded-lg">
                  🎯 {activeQuestion.company} Placement
                </span>

                {/* Active Question Stopwatch directly inside the questions section */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-extrabold shadow-inner">
                    <Timer className={`w-3.5 h-3.5 text-emerald-400 ${isQuizTimerRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                    <span className="text-[9px] uppercase text-emerald-500/80 tracking-wider">Time:</span>
                    <span>
                      {Math.floor(quizTimerSeconds / 60).toString().padStart(2, '0')}:{(quizTimerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsQuizTimerRunning(!isQuizTimerRunning)}
                    disabled={isSubmitted}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      isSubmitted
                        ? 'opacity-40 cursor-not-allowed bg-slate-800/40 text-slate-500 border border-slate-900'
                        : isQuizTimerRunning
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                    title={isQuizTimerRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
                  >
                    {isQuizTimerRunning ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Start</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setQuizTimerSeconds(0)}
                    disabled={isSubmitted}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      isSubmitted
                        ? 'opacity-40 cursor-not-allowed bg-slate-800/40 text-slate-500 border border-slate-900'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title="Reset Stopwatch"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <span className="text-xs font-bold text-slate-500">
                {selectedTopic !== 'All' ? selectedTopic : activeQuestion.topic} | Question {currentIdx + 1} of {filteredQuestions.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-semibold text-slate-100 leading-relaxed tracking-tight">
              {activeQuestion.question}
            </h3>

            {/* Multiple Options selection */}
            <div className="grid grid-cols-1 gap-3.5">
              {(shuffledOptions.length > 0 ? shuffledOptions : activeQuestion.options).map((opt) => {
                const isSelected = selectedOption === opt;
                let optBorder = 'border-slate-800 bg-slate-950/40 hover:border-slate-700';

                if (isSubmitted) {
                  const isCorrectAnswer = opt === activeQuestion.answer;
                  const isWrongSelection = isSelected && opt !== activeQuestion.answer;

                  if (isCorrectAnswer) optBorder = 'border-emerald-500 bg-emerald-950/20 text-emerald-300';
                  else if (isWrongSelection) optBorder = 'border-rose-500 bg-rose-950/20 text-rose-300';
                  else optBorder = 'border-slate-800 opacity-50';
                } else if (isSelected) {
                  optBorder = 'border-indigo-500 bg-indigo-950/20';
                }

                return (
                  <button
                    id={`opt-btn-${opt}`}
                    key={opt}
                    onClick={() => !isSubmitted && setSelectedOption(opt)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4.5 rounded-2xl border text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] ${optBorder}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* If on the last question of the set, guide the user to boost! */}
            {currentIdx === filteredQuestions.length - 1 && (
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-300 leading-relaxed flex items-center gap-3 animate-fade-in">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 animate-bounce" />
                <div>
                  <span className="font-extrabold block text-white text-xs uppercase tracking-wide">🏆 You reached the final question!</span>
                  <span>Practice makes perfect. Click the <strong>Boost +50 More {selectedLevel} Qs</strong> button to dynamically expand this section with high-yield placement MCQs generated live by Gemini.</span>
                </div>
              </div>
            )}

            {/* Actions: Submit & Next */}
            <div className="flex flex-wrap gap-3 justify-end items-center pt-4">
              {isSubmitted && currentIdx === filteredQuestions.length - 1 && (
                <button
                  id="btn-trigger-boost-50-last"
                  onClick={() => generate50Questions(selectedLevel as any)}
                  disabled={isGenerating50}
                  className="px-5 py-3 rounded-xl text-xs md:text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 hover:scale-[1.02] shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer flex items-center gap-1.5 animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGenerating50 ? 'Generating 50 Qs...' : `Boost +50 More ${selectedLevel} Qs`}</span>
                </button>
              )}

              {!isSubmitted ? (
                <button
                  id="btn-quiz-submit"
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className="px-6 py-3 rounded-xl text-xs md:text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] shadow-lg shadow-indigo-500/20 transition-all duration-200 cursor-pointer disabled:opacity-40"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  id="btn-quiz-next"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl text-xs md:text-sm font-extrabold text-white bg-slate-800 hover:bg-slate-700 hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  {currentIdx === filteredQuestions.length - 1 ? 'Restart Set' : 'Next Question'} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Score & Correct Answer feedback banner */}
            {isSubmitted && (
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in ${
                selectedOption === activeQuestion.answer 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                    selectedOption === activeQuestion.answer ? 'bg-emerald-500/20' : 'bg-rose-500/20'
                  }`}>
                    {selectedOption === activeQuestion.answer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold tracking-wide uppercase">
                      {selectedOption === activeQuestion.answer ? '🎉 Absolutely Correct!' : '⚠️ Incorrect Selection'}
                    </h4>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">
                      {selectedOption === activeQuestion.answer 
                        ? 'Spot on! Excellent analytical skills. You have been awarded +20 XP.' 
                        : `The correct option is "${activeQuestion.answer}". You received +5 Participation XP.`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-900 px-4 py-2 rounded-xl self-start sm:self-center">
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Total Score</span>
                    <span className="text-sm font-extrabold text-white font-mono">{userStats.score} XP</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Explanation Accordion */}
            {isSubmitted && (
              <div className="mt-8 border-t border-slate-800/60 pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-indigo-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    Predefined Explanation
                  </div>
                  {!isLoadingExplanation && (
                    <button
                      id="btn-quiz-deep-ai"
                      onClick={fetchDeepAiExplanation}
                      className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 cursor-pointer transition-all flex items-center gap-1"
                    >
                      🤖 Request Deep Gemini AI Breakdown
                    </button>
                  )}
                </div>

                {aiError && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 px-3 py-2 rounded-lg border border-rose-500/20">{aiError}</p>
                )}

                {isLoadingExplanation ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-500 font-mono">Gemini AI is parsing steps...</span>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-3 max-h-[500px] overflow-y-auto shadow-inner">
                    {formatExplanation(aiExplanation)}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-16 text-center rounded-3xl border border-dashed border-slate-800 bg-slate-950/40">
            <span className="text-sm text-slate-500 block">No practice questions available for the selected topic & difficulty.</span>
            <button
              id="btn-ai-gen-qs-fallback"
              onClick={generateDynamicQuestions}
              className="mt-4 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-md"
            >
              Trigger AI Generator
            </button>
          </div>
        )}
      </div>

      {/* Progress Report & suggestion graphs at the very bottom */}
      <div className="lg:col-span-12">
        <ProgressReport 
          theme={theme}
          userStats={{
            score: userStats.score,
            solvedCount: userStats.solvedCount,
            streak: userStats.streak,
            totalTimeSpent: userStats.totalTimeSpent || 0
          }}
          speedLogs={speedLogs}
          currentUser={currentUser}
          questions={questions}
        />
      </div>
    </div>
  );
};

