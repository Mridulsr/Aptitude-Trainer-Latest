import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';
import { Theme } from '../types';

interface SortingVisualizerProps {
  theme: Theme;
}

const PSEUDOCODE = {
  bubble: [
    'for i from 0 to N-1:',
    '  for j from 0 to N-i-1:',
    '    if arr[j] > arr[j+1]:',
    '      swap(arr[j], arr[j+1])',
  ],
  insertion: [
    'for i from 1 to N-1:',
    '  key = arr[i]',
    '  j = i - 1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j+1] = arr[j]; j--',
    '  arr[j+1] = key',
  ],
  quick: [
    'quickSort(arr, low, high):',
    '  if low < high:',
    '    pi = partition(arr, low, high)',
    '    quickSort(arr, low, pi - 1)',
    '    quickSort(arr, pi + 1, high)',
  ]
};

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ theme }) => {
  const [array, setArray] = useState<number[]>([]);
  const [algo, setAlgo] = useState<'bubble' | 'insertion' | 'quick'>('bubble');
  const [speed, setSpeed] = useState<number>(300); // ms delay
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [pointerA, setPointerA] = useState<number>(-1);
  const [pointerB, setPointerB] = useState<number>(-1);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());

  // Sorting state for manual step-by-step
  const stateRef = useRef<{
    bubble: { i: number; j: number };
    insertion: { i: number; j: number; key: number };
    quick: { stack: [number, number][]; pi: number; state: 'partition' | 'sort'; low: number; high: number; i: number; j: number; pivot: number };
  }>({
    bubble: { i: 0, j: 0 },
    insertion: { i: 1, j: 0, key: 0 },
    quick: { stack: [[0, 19]], pi: -1, state: 'sort', low: 0, high: 19, i: -1, j: -1, pivot: -1 }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a random array
  const generateNewArray = () => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(arr);
    resetState(arr.length);
  };

  const resetState = (length: number) => {
    setIsPlaying(false);
    setActiveLine(-1);
    setPointerA(-1);
    setPointerB(-1);
    setSortedIndices(new Set());
    stateRef.current = {
      bubble: { i: 0, j: 0 },
      insertion: { i: 1, j: 0, key: 0 },
      quick: { stack: [[0, length - 1]], pi: -1, state: 'sort', low: 0, high: length - 1, i: -1, j: -1, pivot: -1 }
    };
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    generateNewArray();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [algo]);

  // Execute a single step of sorting
  const stepSorting = () => {
    let arr = [...array];
    const N = arr.length;

    if (algo === 'bubble') {
      let { i, j } = stateRef.current.bubble;
      if (i >= N) {
        setIsPlaying(false);
        setPointerA(-1);
        setPointerB(-1);
        setActiveLine(-1);
        return;
      }

      setActiveLine(1); // checking j loop
      setPointerA(j);
      setPointerB(j + 1);

      if (arr[j] > arr[j + 1]) {
        setActiveLine(3); // swap line
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        setActiveLine(2); // comparison line
      }

      j++;
      if (j >= N - i - 1) {
        setSortedIndices((prev) => {
          const next = new Set(prev);
          next.add(N - i - 1);
          return next;
        });
        j = 0;
        i++;
      }

      stateRef.current.bubble = { i, j };
      setArray(arr);
    } else if (algo === 'insertion') {
      let { i, j, key } = stateRef.current.insertion;

      if (i >= N) {
        setIsPlaying(false);
        setPointerA(-1);
        setPointerB(-1);
        setActiveLine(-1);
        setSortedIndices(new Set(Array.from({ length: N }, (_, index) => index)));
        return;
      }

      if (j === i - 1 && key === 0) {
        key = arr[i];
        setActiveLine(1); // key = arr[i]
        setPointerA(i);
        setPointerB(j);
        stateRef.current.insertion = { i, j, key };
        return;
      }

      if (j >= 0 && arr[j] > key) {
        setActiveLine(4); // shift line
        setPointerA(j + 1);
        setPointerB(j);
        arr[j + 1] = arr[j];
        j--;
        stateRef.current.insertion = { i, j, key };
      } else {
        setActiveLine(5); // insert key line
        arr[j + 1] = key;
        i++;
        j = i - 1;
        key = 0;
        stateRef.current.insertion = { i, j, key };
      }
      setArray(arr);
    } else if (algo === 'quick') {
      let { stack, low, high, pi, state, i, j, pivot } = stateRef.current.quick;

      if (stack.length === 0 && state === 'sort') {
        setIsPlaying(false);
        setPointerA(-1);
        setPointerB(-1);
        setActiveLine(-1);
        setSortedIndices(new Set(Array.from({ length: N }, (_, index) => index)));
        return;
      }

      if (state === 'sort') {
        const [currLow, currHigh] = stack.pop()!;
        low = currLow;
        high = currHigh;
        if (low < high) {
          pivot = arr[high];
          i = low - 1;
          j = low;
          state = 'partition';
          setActiveLine(2); // partition line
        } else {
          if (low >= 0 && low < N) {
            setSortedIndices((prev) => new Set([...prev, low]));
          }
        }
        stateRef.current.quick = { stack, low, high, pi, state, i, j, pivot };
        return;
      }

      if (state === 'partition') {
        setPointerA(j);
        setPointerB(high);

        if (j < high) {
          if (arr[j] < pivot) {
            i++;
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
          j++;
          setActiveLine(1); // loop
        } else {
          // Swap pivot to place
          const temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          pi = i + 1;

          setSortedIndices((prev) => new Set([...prev, pi]));

          // Push sub-arrays
          stack.push([low, pi - 1]);
          stack.push([pi + 1, high]);

          state = 'sort';
          setActiveLine(3); // recurse left
        }
        stateRef.current.quick = { stack, low, high, pi, state, i, j, pivot };
        setArray(arr);
      }
    }
  };

  // Autoplay hook
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepSorting();
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, array, algo]);

  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            📊 Sorting Visualizer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Watch and control sorting algorithms live.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['bubble', 'insertion', 'quick'].map((type) => (
            <button
              id={`algo-${type}`}
              key={type}
              onClick={() => setAlgo(type as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                algo === type
                  ? theme.colors.primary
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {type} sort
            </button>
          ))}
        </div>
      </div>

      {/* Visual Workspace & Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col justify-between h-80 rounded-xl bg-slate-950 p-6 relative border border-slate-800/80">
          <div className="flex items-end justify-between h-64 gap-1 border-b border-slate-800 pb-2">
            {array.map((val, idx) => {
              const isSelected = idx === pointerA || idx === pointerB;
              const isSorted = sortedIndices.has(idx);

              let barColor = 'bg-indigo-500/80';
              if (isSelected) barColor = 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]';
              else if (isSorted) barColor = 'bg-emerald-500/80';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-150 ${barColor}`}
                    style={{ height: `${val * 2}px` }}
                  />
                  <span className="text-[9px] text-slate-500 font-mono mt-1">{val}</span>
                </div>
              );
            })}
          </div>

          {/* Controls Panel */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button
                id="btn-play-pause"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 rounded-lg cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 transition-all`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                id="btn-step"
                onClick={stepSorting}
                disabled={isPlaying}
                className="p-2 rounded-lg cursor-pointer text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all disabled:opacity-40"
                title="Single Step Manually"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                id="btn-reset"
                onClick={generateNewArray}
                className="p-2 rounded-lg cursor-pointer text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                title="Shuffle Array"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed controller */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">Delay:</span>
              <input
                id="speed-slider"
                type="range"
                min="50"
                max="1000"
                step="50"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-24 md:w-32 accent-indigo-500"
              />
              <span className="text-xs font-mono text-indigo-400">{speed}ms</span>
            </div>
          </div>
        </div>

        {/* Live Code / Trace Panel */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
          <div>
            <h4 className="text-xs font-semibold text-indigo-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              📝 Live Implementation Trace
            </h4>
            <div className="space-y-1">
              {(PSEUDOCODE[algo] || []).map((line, idx) => {
                const isActive = idx === activeLine;
                return (
                  <div
                    key={idx}
                    className={`px-2.5 py-1 rounded transition-all ${
                      isActive
                        ? 'bg-indigo-950/80 border-l-2 border-indigo-500 text-indigo-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block" />
              <span>Active Comparison / Sweep</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
              <span>Sorted Element</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500 inline-block" />
              <span>Unsorted Element</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
