import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, RefreshCcw, Trash2, Bot, User } from 'lucide-react';
import { ChatMessage, Theme } from '../types';
import { loadChatHistory, saveChatMessage, clearChatHistory } from '../lib/firebase';

interface DSAChatbotProps {
  theme: Theme;
}

const CHAT_SUGGESTIONS = [
  'How do I traverse a graph using BFS?',
  'Explain Dijkstra’s algorithm in plain English',
  'What is dynamic programming and when do I use memoization?',
  'Show me the difference between Insertion Sort and Merge Sort',
];

export const DSAChatbot: React.FC<DSAChatbotProps> = ({ theme }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load persisted chat history from Firestore or LocalStorage backup!
    const initChat = async () => {
      const history = await loadChatHistory();
      if (history.length > 0) {
        setMessages(history);
      } else {
        // Initial Assistant welcome message
        const welcome: ChatMessage = {
          id: 'welcome',
          role: 'model',
          content: 'Hi! I am your visual DSA & Aptitude AI Coach. Ask me any theoretical question, request a dry run of code, or clarify how pointers work in our visualizations!',
          timestamp: new Date().toISOString(),
        };
        setMessages([welcome]);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Save to Firestore & local cache
    await saveChatMessage(userMsg);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.slice(-15), // send last 15 messages for context
          userMessage: text,
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        const modelMsg: ChatMessage = {
          id: Math.random().toString(36).substring(2, 9),
          role: 'model',
          content: data.reply,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, modelMsg]);
        await saveChatMessage(modelMsg);
      } else {
        throw new Error(data.error || 'The AI server returned an empty or invalid response.');
      }
    } catch (error: any) {
      console.error(error);
      const errMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'model',
        content: `⚠️ Error: ${error.message || 'Failed to connect to Gemini AI Server. Please make sure your network and environment variables are active.'}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear your chat history?')) {
      await clearChatHistory();
      const welcome: ChatMessage = {
        id: 'welcome',
        role: 'model',
        content: 'Hi! I am your visual DSA & Aptitude AI Coach. Ask me any theoretical question, request a dry run of code, or clarify how pointers work in our visualizations!',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcome]);
    }
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all flex flex-col h-[520px] justify-between`}>
      {/* Chat header */}
      <div className="flex justify-between items-center border-b border-slate-800/60 pb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-200">DSA.viz Assistant</h3>
            <span className="text-[10px] text-slate-500 font-mono">Powered by Gemini 3.5 Flash</span>
          </div>
        </div>

        <button
          id="btn-clear-chat"
          onClick={handleClearHistory}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Clear Conversation History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 scrollbar-thin">
        {messages.map((m) => {
          const isModel = m.role === 'model';
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${isModel ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isModel ? 'bg-indigo-950 text-indigo-400 border border-indigo-900/60' : 'bg-slate-800 text-slate-300'
              }`}>
                {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                isModel ? 'bg-slate-900/70 text-slate-200 border border-slate-800/60' : 'bg-indigo-600 text-white'
              }`}>
                {m.content.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%] items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center animate-spin">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl text-xs text-slate-500 font-mono">
              DSA Assistant is analyzing concepts...
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Inputs + Suggestions */}
      <div className="space-y-3 flex-shrink-0">
        {/* Suggestion Chips */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5">
            {CHAT_SUGGESTIONS.map((s) => (
              <button
                id={`chat-suggestion-${s.substring(0, 10)}`}
                key={s}
                onClick={() => handleSendMessage(s)}
                className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-900 text-[10px] text-slate-400 border border-slate-900 transition-all cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input box */}
        <form
          id="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex gap-2"
        >
          <input
            id="chat-input-field"
            type="text"
            placeholder="Ask anything (e.g. 'explain dynamic programming')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white transition-all cursor-pointer flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
