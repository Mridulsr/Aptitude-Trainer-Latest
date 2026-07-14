import React, { useState, useEffect } from 'react';
import { Plus, Trash, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { Theme } from '../types';

interface LLNode {
  id: string;
  value: number;
}

interface LinkedListVisualizerProps {
  theme: Theme;
}

export const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ theme }) => {
  const [list, setList] = useState<LLNode[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [indexValue, setIndexValue] = useState<string>('');
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<string>('');
  const [isReversing, setIsReversing] = useState<boolean>(false);
  const [pointerPrev, setPointerPrev] = useState<number>(-1);
  const [pointerCurr, setPointerCurr] = useState<number>(-1);
  const [pointerNext, setPointerNext] = useState<number>(-1);

  useEffect(() => {
    // Initial linked list elements
    setList([
      { id: '1', value: 10 },
      { id: '2', value: 20 },
      { id: '3', value: 30 },
      { id: '4', value: 40 },
    ]);
  }, []);

  const handleAppend = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setActiveAction(`Appending ${val} to Tail`);

    const newId = Math.random().toString(36).substring(2, 9);
    const newList = [...list, { id: newId, value: val }];

    setActiveNodeId(newId);
    setList(newList);
    setInputValue('');
    await new Promise((r) => setTimeout(r, 800));
    setActiveNodeId(null);
    setActiveAction('');
  };

  const handlePrepend = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    setActiveAction(`Prepending ${val} to Head`);

    const newId = Math.random().toString(36).substring(2, 9);
    const newList = [{ id: newId, value: val }, ...list];

    setActiveNodeId(newId);
    setList(newList);
    setInputValue('');
    await new Promise((r) => setTimeout(r, 800));
    setActiveNodeId(null);
    setActiveAction('');
  };

  const handleInsert = async () => {
    const val = parseInt(inputValue);
    const idx = parseInt(indexValue);
    if (isNaN(val) || isNaN(idx) || idx < 0 || idx > list.length) return;

    setActiveAction(`Inserting ${val} at index ${idx}`);

    const newId = Math.random().toString(36).substring(2, 9);
    const newList = [...list];
    newList.splice(idx, 0, { id: newId, value: val });

    setActiveNodeId(newId);
    setList(newList);
    setInputValue('');
    setIndexValue('');
    await new Promise((r) => setTimeout(r, 800));
    setActiveNodeId(null);
    setActiveAction('');
  };

  const handleDelete = async () => {
    const idx = parseInt(indexValue);
    if (isNaN(idx) || idx < 0 || idx >= list.length) return;

    setActiveAction(`Deleting node at index ${idx}`);
    setActiveNodeId(list[idx].id);
    await new Promise((r) => setTimeout(r, 600));

    const newList = list.filter((_, i) => i !== idx);
    setList(newList);
    setIndexValue('');
    setActiveNodeId(null);
    setActiveAction('');
  };

  // Iterative Reversal Visualization
  const handleReverse = async () => {
    if (list.length < 2 || isReversing) return;
    setIsReversing(true);
    setActiveAction('Iteratively Reversing Linked List Pointers');

    let prev = -1;
    let curr = 0;
    let next = -1;

    // We will simulate step by step reversals
    while (curr < list.length) {
      next = curr + 1;
      setPointerPrev(prev);
      setPointerCurr(curr);
      setPointerNext(next);

      await new Promise((r) => setTimeout(r, 1200));

      curr++;
      prev++;
    }

    // Now reverse the array in state to reflect reversed list
    const reversed = [...list].reverse();
    setList(reversed);

    setPointerPrev(-1);
    setPointerCurr(-1);
    setPointerNext(-1);
    setIsReversing(false);
    setActiveAction('Reversal Complete!');
    await new Promise((r) => setTimeout(r, 800));
    setActiveAction('');
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            🔗 Animated Linked List
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Observe pointer mutations live: append, prepend, insert, delete, and iterative reversal.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            id="ll-val"
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-24"
          />
          <input
            id="ll-idx"
            type="number"
            placeholder="Index"
            value={indexValue}
            onChange={(e) => setIndexValue(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-20"
          />
          <button
            id="ll-append"
            onClick={handleAppend}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Append
          </button>
          <button
            id="ll-prepend"
            onClick={handlePrepend}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Prepend
          </button>
          <button
            id="ll-insert"
            onClick={handleInsert}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white cursor-pointer"
          >
            Insert At
          </button>
          <button
            id="ll-delete"
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
          >
            Delete At
          </button>
          <button
            id="ll-reverse"
            onClick={handleReverse}
            disabled={isReversing}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer disabled:opacity-40"
          >
            Reverse!
          </button>
        </div>
      </div>

      {activeAction && (
        <div className="p-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl text-xs text-center font-mono font-semibold mb-4 animate-pulse">
          ⚡ Action: {activeAction}
        </div>
      )}

      {/* Main rendering area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-slate-950 border border-slate-800 p-6 overflow-x-auto min-h-[220px] flex items-center">
          <div className="flex items-center gap-4 min-w-full justify-start py-8">
            {list.map((node, index) => {
              const isNewOrActive = activeNodeId === node.id;
              const isPrev = index === pointerPrev;
              const isCurr = index === pointerCurr;
              const isNext = index === pointerNext;

              let nodeBorderColor = 'border-slate-800 bg-slate-900';
              if (isNewOrActive) {
                nodeBorderColor = 'border-pink-500 bg-pink-950/20 shadow-[0_0_15px_rgba(236,72,153,0.3)] scale-110';
              } else if (isCurr) {
                nodeBorderColor = 'border-indigo-500 bg-indigo-950/20';
              } else if (isPrev) {
                nodeBorderColor = 'border-emerald-500 bg-emerald-950/20';
              } else if (isNext) {
                nodeBorderColor = 'border-amber-500 bg-amber-950/20';
              }

              return (
                <React.Fragment key={node.id}>
                  {/* Linked List Node */}
                  <div className="flex flex-col items-center relative">
                    {/* Node Index label */}
                    <span className="text-[10px] text-slate-500 font-mono mb-1">idx: {index}</span>

                    <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-between p-1.5 transition-all duration-300 ${nodeBorderColor}`}>
                      <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">val</div>
                      <div className="text-sm font-bold text-slate-100 font-mono">{node.value}</div>
                      <div className="text-[9px] uppercase font-mono text-indigo-400">next</div>
                    </div>

                    {/* Pointer state tags for visual trace */}
                    <div className="absolute -bottom-8 flex flex-col gap-1 text-[9px] font-mono font-bold">
                      {isPrev && <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">prev</span>}
                      {isCurr && <span className="px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-400 border border-indigo-800">curr</span>}
                      {isNext && <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800">next</span>}
                    </div>
                  </div>

                  {/* Connecting Pointer arrow */}
                  {index < list.length - 1 && (
                    <div className="flex items-center text-slate-600 transition-all">
                      <ArrowRight className={`w-5 h-5 ${isReversing && index === pointerCurr ? 'text-pink-500 rotate-180 transition-all duration-300' : 'text-indigo-400'}`} />
                    </div>
                  )}

                  {/* Tail Null Node */}
                  {index === list.length - 1 && (
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-slate-700" />
                      <div className="w-12 h-10 rounded-lg border border-dashed border-slate-800 flex items-center justify-center bg-slate-950">
                        <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">null</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {list.length === 0 && (
              <div className="text-slate-500 italic text-center w-full">
                List is currently empty. Add values to append!
              </div>
            )}
          </div>
        </div>

        {/* Educational Code explanation box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold text-indigo-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              🧠 Pointer Mutation Logic
            </h4>
            <div className="space-y-2">
              <p className="text-[11px] leading-relaxed">
                A singly linked list is composed of nodes where each node points to the next.
              </p>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[10px] text-slate-400">
                <div className="font-bold text-indigo-300 mb-1">To Reverse (Iterative):</div>
                <div>1. next = curr.next</div>
                <div>2. curr.next = prev (Reverses pointer!)</div>
                <div>3. prev = curr</div>
                <div>4. curr = next</div>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded text-[11px] space-y-1 mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500 inline-block" />
              <span>prev: Node previously visited</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500/20 border border-indigo-500 inline-block" />
              <span>curr: Node currently being reversed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500 inline-block" />
              <span>next: Node holding next elements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
