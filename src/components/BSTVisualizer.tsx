import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash, Search, Compass, RefreshCw } from 'lucide-react';
import { Theme } from '../types';

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  x: number;
  y: number;
}

interface BSTVisualizerProps {
  theme: Theme;
}

const TRAVERSAL_PSEUDOCODE = {
  inorder: [
    'inorder(node):',
    '  if node is null: return',
    '  inorder(node.left)',
    '  visit(node.value)  // <== VISITING NOW',
    '  inorder(node.right)'
  ],
  preorder: [
    'preorder(node):',
    '  if node is null: return',
    '  visit(node.value)  // <== VISITING NOW',
    '  preorder(node.left)',
    '  preorder(node.right)'
  ],
  postorder: [
    'postorder(node):',
    '  if node is null: return',
    '  postorder(node.left)',
    '  postorder(node.right)',
    '  visit(node.value)  // <== VISITING NOW'
  ],
  bfs: [
    'bfs(root):',
    '  queue = [root]',
    '  while queue is not empty:',
    '    node = queue.shift()',
    '    visit(node.value)  // <== VISITING NOW',
    '    if node.left: queue.push(node.left)',
    '    if node.right: queue.push(node.right)'
  ]
};

export const BSTVisualizer: React.FC<BSTVisualizerProps> = ({ theme }) => {
  const [root, setRoot] = useState<BSTNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [activeNodeValue, setActiveNodeValue] = useState<number | null>(null);
  const [visitedList, setVisitedList] = useState<number[]>([]);
  const [activeTraversal, setActiveTraversal] = useState<'inorder' | 'preorder' | 'postorder' | 'bfs' | null>(null);
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [searchFound, setSearchFound] = useState<boolean | null>(null);

  // Initialize with some default nodes
  useEffect(() => {
    let tRoot = insertNode(null, 50, 400, 50, 160);
    tRoot = insertNode(tRoot, 30, 400, 50, 160);
    tRoot = insertNode(tRoot, 70, 400, 50, 160);
    tRoot = insertNode(tRoot, 20, 400, 50, 160);
    tRoot = insertNode(tRoot, 40, 400, 50, 160);
    tRoot = insertNode(tRoot, 60, 400, 50, 160);
    tRoot = insertNode(tRoot, 80, 400, 50, 160);
    setRoot(tRoot);
  }, []);

  // Recalculate positions for rendering
  function updateCoordinates(node: BSTNode | null, x: number, y: number, offset: number): BSTNode | null {
    if (!node) return null;
    node.x = x;
    node.y = y;
    if (node.left) updateCoordinates(node.left, x - offset, y + 60, offset / 1.8);
    if (node.right) updateCoordinates(node.right, x + offset, y + 60, offset / 1.8);
    return node;
  }

  function insertNode(node: BSTNode | null, val: number, x: number, y: number, offset: number): BSTNode {
    if (!node) {
      return { value: val, left: null, right: null, x, y };
    }
    if (val < node.value) {
      node.left = insertNode(node.left, val, x - offset, y + 60, offset / 1.8);
    } else if (val > node.value) {
      node.right = insertNode(node.right, val, x + offset, y + 60, offset / 1.8);
    }
    return node;
  }

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;
    let newRoot = root ? { ...root } : null;
    newRoot = insertNode(newRoot, val, 400, 50, 160);
    updateCoordinates(newRoot, 400, 50, 160);
    setRoot({ ...newRoot } as BSTNode);
    setInputValue('');
    setSearchFound(null);
  };

  // BST Delete function helper
  function findMin(node: BSTNode): BSTNode {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  }

  function deleteNode(node: BSTNode | null, val: number): BSTNode | null {
    if (!node) return null;
    if (val < node.value) {
      node.left = deleteNode(node.left, val);
    } else if (val > node.value) {
      node.right = deleteNode(node.right, val);
    } else {
      // Node to delete found
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Two children: Get inorder successor
      const temp = findMin(node.right);
      node.value = temp.value;
      node.right = deleteNode(node.right, temp.value);
    }
    return node;
  }

  const handleDelete = () => {
    const val = parseInt(inputValue);
    if (isNaN(val) || !root) return;
    let newRoot = { ...root };
    const res = deleteNode(newRoot, val);
    if (res) {
      updateCoordinates(res, 400, 50, 160);
      setRoot({ ...res } as BSTNode);
    } else {
      setRoot(null);
    }
    setInputValue('');
    setSearchFound(null);
  };

  const handleSearch = async () => {
    const val = parseInt(inputValue);
    if (isNaN(val) || !root) return;
    setSearchFound(null);

    let current: BSTNode | null = root;
    while (current) {
      setActiveNodeValue(current.value);
      await new Promise((r) => setTimeout(r, 450));
      if (val === current.value) {
        setSearchFound(true);
        setActiveNodeValue(current.value);
        setInputValue('');
        return;
      }
      current = val < current.value ? current.left : current.right;
    }
    setSearchFound(false);
    setActiveNodeValue(null);
    setInputValue('');
  };

  // Traversal animations
  const runTraversal = async (type: 'inorder' | 'preorder' | 'postorder' | 'bfs') => {
    setActiveTraversal(type);
    setVisitedList([]);
    setActiveNodeValue(null);

    const visited: number[] = [];

    if (type === 'bfs') {
      const queue: BSTNode[] = [];
      if (root) queue.push(root);

      setActiveLine(1); // queue = [root]
      await new Promise((r) => setTimeout(r, 400));

      while (queue.length > 0) {
        setActiveLine(2); // while loop
        const node = queue.shift()!;
        setActiveNodeValue(node.value);

        setActiveLine(3); // node = queue.shift()
        await new Promise((r) => setTimeout(r, 400));

        setActiveLine(4); // visit line
        visited.push(node.value);
        setVisitedList([...visited]);
        await new Promise((r) => setTimeout(r, 600));

        setActiveLine(5); // push left
        if (node.left) queue.push(node.left);
        await new Promise((r) => setTimeout(r, 200));

        setActiveLine(6); // push right
        if (node.right) queue.push(node.right);
        await new Promise((r) => setTimeout(r, 300));
      }
    } else {
      // DFS Recurse Traversals
      const traverse = async (node: BSTNode | null) => {
        if (!node) {
          setActiveLine(1); // null base case
          return;
        }

        if (type === 'preorder') {
          setActiveLine(2); // visit first
          setActiveNodeValue(node.value);
          visited.push(node.value);
          setVisitedList([...visited]);
          await new Promise((r) => setTimeout(r, 650));

          setActiveLine(3); // recurse left
          await traverse(node.left);

          setActiveLine(4); // recurse right
          await traverse(node.right);
        } else if (type === 'inorder') {
          setActiveLine(2); // recurse left
          await traverse(node.left);

          setActiveLine(3); // visit current
          setActiveNodeValue(node.value);
          visited.push(node.value);
          setVisitedList([...visited]);
          await new Promise((r) => setTimeout(r, 650));

          setActiveLine(4); // recurse right
          await traverse(node.right);
        } else if (type === 'postorder') {
          setActiveLine(2); // recurse left
          await traverse(node.left);

          setActiveLine(3); // recurse right
          await traverse(node.right);

          setActiveLine(4); // visit current
          setActiveNodeValue(node.value);
          visited.push(node.value);
          setVisitedList([...visited]);
          await new Promise((r) => setTimeout(r, 650));
        }
      };

      await traverse(root);
    }

    setActiveLine(-1);
    setActiveTraversal(null);
    setActiveNodeValue(null);
  };

  // Recursively collect lines and circles for drawing
  const renderTreeElements = (node: BSTNode | null): React.ReactNode[] => {
    if (!node) return [];

    let elements: React.ReactNode[] = [];

    // Render connecting lines to children
    if (node.left) {
      elements.push(
        <line
          id={`edge-${node.value}-left`}
          key={`line-l-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke="#475569"
          strokeWidth="2.5"
          className="transition-all"
        />
      );
      elements = elements.concat(renderTreeElements(node.left));
    }

    if (node.right) {
      elements.push(
        <line
          id={`edge-${node.value}-right`}
          key={`line-r-${node.value}`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke="#475569"
          strokeWidth="2.5"
          className="transition-all"
        />
      );
      elements = elements.concat(renderTreeElements(node.right));
    }

    // Render node circle
    const isActive = activeNodeValue === node.value;
    const isVisited = visitedList.includes(node.value);

    let nodeColor = 'fill-slate-800 stroke-slate-700';
    if (isActive) {
      nodeColor = 'fill-pink-600 stroke-pink-400 animate-pulse';
    } else if (isVisited) {
      nodeColor = 'fill-emerald-600 stroke-emerald-400';
    }

    elements.push(
      <g id={`node-group-${node.value}`} key={`node-${node.value}`} className="cursor-pointer transition-all duration-300">
        <circle
          id={`node-circle-${node.value}`}
          cx={node.x}
          cy={node.y}
          r="22"
          className={`${nodeColor} stroke-[2.5]`}
        />
        <text
          id={`node-text-${node.value}`}
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          className="fill-white font-bold text-xs font-mono"
        >
          {node.value}
        </text>
      </g>
    );

    return elements;
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.colors.card} transition-all`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            🌳 Binary Search Tree (BST)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Perform insert, delete, search, and visualize BFS/DFS traversals step-by-step.
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            id="bst-input"
            type="number"
            placeholder="Node Value (e.g. 45)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-36"
          />
          <button
            id="bst-insert"
            onClick={handleInsert}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer flex items-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Insert
          </button>
          <button
            id="bst-delete"
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center gap-1 transition-all"
          >
            <Trash className="w-3.5 h-3.5" /> Delete
          </button>
          <button
            id="bst-search"
            onClick={handleSearch}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white cursor-pointer flex items-center gap-1 transition-all"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>
        </div>
      </div>

      {searchFound !== null && (
        <div className={`p-2.5 rounded-xl mb-4 text-xs font-semibold text-center border ${
          searchFound ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-400' : 'bg-rose-950/30 border-rose-500/40 text-rose-400'
        }`}>
          {searchFound ? '🎯 Node Found in BST!' : '❌ Node Not Found in Tree.'}
        </div>
      )}

      {/* Main Canvas + Control Traversal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-slate-950 p-4 border border-slate-800/80 overflow-x-auto relative min-h-[360px]">
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 flex gap-1 z-10 flex-wrap">
            {['inorder', 'preorder', 'postorder', 'bfs'].map((trav) => (
              <button
                id={`btn-traverse-${trav}`}
                key={trav}
                onClick={() => runTraversal(trav as any)}
                disabled={activeTraversal !== null}
                className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800 hover:bg-indigo-600 hover:text-white rounded text-slate-300 transition-all cursor-pointer disabled:opacity-40"
              >
                {trav}
              </button>
            ))}
          </div>

          <svg id="bst-svg" width="100%" height="340" viewBox="0 0 800 340" className="mx-auto min-w-[700px]">
            {root ? renderTreeElements(root) : (
              <text x="400" y="170" textAnchor="middle" className="fill-slate-600 text-sm font-medium">
                Tree is empty. Add a node above!
              </text>
            )}
          </svg>
        </div>

        {/* Live traversal trace */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
          <div>
            <h4 className="text-xs font-semibold text-indigo-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
              🗺️ Traversal Pseudocode
            </h4>
            <div className="space-y-1">
              {activeTraversal ? (
                TRAVERSAL_PSEUDOCODE[activeTraversal].map((line, idx) => {
                  const isActive = idx === activeLine;
                  return (
                    <div
                      key={idx}
                      className={`px-2 py-0.5 rounded transition-all ${
                        isActive
                          ? 'bg-indigo-950 border-l-2 border-indigo-500 text-indigo-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {line}
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 italic text-center py-8">
                  Start any traversal in the canvas to see real-time recursion trace!
                </div>
              )}
            </div>
          </div>

          {/* Visited node list */}
          <div className="mt-4 border-t border-slate-800 pt-3">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Visited Elements Queue
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2 min-h-[44px] content-start">
              {visitedList.length > 0 ? (
                visitedList.map((val, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-900/60 flex items-center justify-center animate-bounce"
                  >
                    {val}
                  </span>
                ))
              ) : (
                <span className="text-slate-600 italic text-[11px] self-center">None visited yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
