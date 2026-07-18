export interface QuizQuestion {
  id: number;
  company: string;
  topic: string;
  level: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

const STATIC_FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    id: 90001,
    company: 'TCS',
    topic: 'Trees',
    level: 'Easy',
    question: 'Which tree traversal algorithm visits the root node first, followed by the left subtree, and then the right subtree?',
    options: ['In-order Traversal', 'Pre-order Traversal', 'Post-order Traversal', 'Level-order Traversal'],
    answer: 'Pre-order Traversal',
    explanation: 'Pre-order traversal follows the root-left-right sequence. It is commonly used to create a copy of the tree or get prefix expressions.'
  },
  {
    id: 90002,
    company: 'Google',
    topic: 'Trees',
    level: 'Medium',
    question: 'What is the time complexity to search for an element in a balanced Binary Search Tree (BST) like an AVL tree with N nodes?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    answer: 'O(log N)',
    explanation: 'In a balanced BST, the height is guaranteed to be O(log N). Since each comparison discards half of the remaining nodes, the search time complexity is O(log N).'
  },
  {
    id: 90003,
    company: 'Amazon',
    topic: 'Trees',
    level: 'Hard',
    question: 'In a Red-Black Tree, what is the maximum possible height of a tree with N internal nodes?',
    options: ['log(N)', '2 * log(N + 1)', 'O(N)', '1.44 * log(N)'],
    answer: '2 * log(N + 1)',
    explanation: 'By Red-Black Tree properties, no path from the root to a leaf is more than twice as long as any other path. The height of a Red-Black tree with N nodes is guaranteed to be at most 2 * log2(N + 1).'
  },
  {
    id: 90004,
    company: 'Infosys',
    topic: 'Sorting',
    level: 'Easy',
    question: 'Which of the following sorting algorithms is stable and has a guaranteed worst-case time complexity of O(N log N)?',
    options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Selection Sort'],
    answer: 'Merge Sort',
    explanation: 'Merge Sort consistently divides the array in half and merges them in O(N) time, achieving O(N log N) in all cases. It maintains relative order of equal elements, making it stable.'
  },
  {
    id: 90005,
    company: 'Google',
    topic: 'Sorting',
    level: 'Medium',
    question: 'What is the space complexity of the standard in-place Quick Sort algorithm in the worst case, considering the recursion stack?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    answer: 'O(N)',
    explanation: 'Although Quick Sort is in-place and does not use auxiliary arrays, its recursion stack uses space. In the worst case (highly unbalanced partitions), the call stack depth is O(N).'
  },
  {
    id: 90006,
    company: 'Amazon',
    topic: 'Sorting',
    level: 'Hard',
    question: 'Which sorting algorithm utilizes a minimum heap data structure to sort elements and operates in-place with O(N log N) worst-case time complexity?',
    options: ['Merge Sort', 'Heap Sort', 'Radix Sort', 'Shell Sort'],
    answer: 'Heap Sort',
    explanation: 'Heap Sort builds a max/min heap and repeatedly extracts the root element, placing it at the end. It takes O(N log N) time and runs in-place with O(1) auxiliary space.'
  },
  {
    id: 90007,
    company: 'Accenture',
    topic: 'Dynamic Programming',
    level: 'Easy',
    question: 'What are the two core properties that a problem must exhibit to be solved efficiently using Dynamic Programming (DP)?',
    options: [
      'Divide and conquer, and greedy choice',
      'Overlapping subproblems, and optimal substructure',
      'Linear structure, and binary partitioning',
      'Depth-first search, and breadth-first search'
    ],
    answer: 'Overlapping subproblems, and optimal substructure',
    explanation: 'Optimal substructure means the optimal solution to the problem contains optimal solutions to subproblems. Overlapping subproblems means the recursive algorithm visits the same subproblems repeatedly.'
  },
  {
    id: 90008,
    company: 'Google',
    topic: 'Dynamic Programming',
    level: 'Medium',
    question: 'What is the time and space complexity of the standard DP approach to find the Longest Common Subsequence (LCS) of two strings of lengths M and N?',
    options: [
      'Time: O(M+N), Space: O(M+N)',
      'Time: O(M*N), Space: O(M*N)',
      'Time: O(M^2), Space: O(N^2)',
      'Time: O(2^(M+N)), Space: O(1)'
    ],
    answer: 'Time: O(M*N), Space: O(M*N)',
    explanation: 'The standard LCS table is of size (M+1) x (N+1). Filling each cell takes O(1) time. Thus, both time and space complexities are O(M*N).'
  },
  {
    id: 90009,
    company: 'Amazon',
    topic: 'Dynamic Programming',
    level: 'Hard',
    question: 'In the Matrix Chain Multiplication problem with N matrices, what is the time complexity of the classic dynamic programming solution?',
    options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'],
    answer: 'O(N^3)',
    explanation: 'The DP state is defined by intervals [i, j], which takes O(N^2) states. For each state, we iterate from i to j to find the optimal split point, which takes O(N) work. Hence, total time complexity is O(N^3).'
  },
  {
    id: 90010,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A sum of money doubles itself in 8 years at simple interest. In how many years will it become triple itself at the same rate?',
    options: ['12 years', '15 years', '16 years', '24 years'],
    answer: '16 years',
    explanation: 'Simple Interest = P. If money doubles, SI = P in 8 years. To triple, SI must be 2P. Since SI is directly proportional to time, 2P interest will take 2 * 8 = 16 years.'
  },
  {
    id: 90011,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Two pipes A and B can fill a cistern in 12 minutes and 15 minutes respectively. If both are opened together, but pipe A is closed after 3 minutes, how much longer will it take B to fill the remaining cistern?',
    options: ['7 mins 15 secs', '8 mins 15 secs', '9 mins 15 secs', '10 mins 15 secs'],
    answer: '8 mins 15 secs',
    explanation: 'Part filled by A+B in 1 min = (1/12 + 1/15) = 9/60 = 3/20. In 3 mins, they fill 9/20. Remaining is 11/20. B fills 1/15 per min, so it takes (11/20) * 15 = 33/4 = 8.25 mins, which is 8 mins 15 seconds.'
  },
  {
    id: 90012,
    company: 'Amazon',
    topic: 'Graphs',
    level: 'Hard',
    question: 'Which algorithm finds all-pairs shortest paths in a directed weighted graph with potential negative edge weights but no negative cycles in O(V^3) time?',
    options: ['Dijkstra\'s Algorithm', 'Kruskal\'s Algorithm', 'Bellman-Ford Algorithm', 'Floyd-Warshall Algorithm'],
    answer: 'Floyd-Warshall Algorithm',
    explanation: 'Floyd-Warshall is a dynamic programming algorithm that computes shortest paths between all pairs of vertices in O(V^3) time and handles negative edge weights.'
  },
  {
    id: 90013,
    company: 'Accenture',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'What is the output of the following Python expression: 3 * 1 ** 3 + 2?',
    options: ['11', '5', '27', '9'],
    answer: '5',
    explanation: 'Operator precedence in Python dictates that exponentiation (**) is evaluated first, then multiplication (*), and finally addition (+). So: 1**3 = 1; then 3*1 = 3; then 3+2 = 5.'
  },
  {
    id: 90014,
    company: 'Google',
    topic: 'Graphs',
    level: 'Medium',
    question: 'If a graph G has V vertices and E edges, what is the maximum number of edges in a simple undirected graph without self-loops or multiple edges?',
    options: ['V * (V - 1)', 'V * (V - 1) / 2', 'V^2', '2 * V'],
    answer: 'V * (V - 1) / 2',
    explanation: 'Each vertex can connect to V-1 other vertices. For undirected graphs, we divide by 2 to avoid counting edges twice, giving V * (V-1) / 2 combinations.'
  }
];

export function getFallbackQuestions(topic: string, difficulty: string, company?: string): QuizQuestion[] {
  // Normalize parameters
  const normTopic = (topic || '').trim().toLowerCase();
  const normDiff = (difficulty || 'easy').trim().toLowerCase();
  const normComp = (company || '').trim().toLowerCase();

  // Try to find exact topic and difficulty matches
  let filtered = STATIC_FALLBACK_QUESTIONS.filter(q => {
    const topicMatch = q.topic.toLowerCase().includes(normTopic) || normTopic.includes(q.topic.toLowerCase());
    const diffMatch = q.level.toLowerCase() === normDiff;
    const compMatch = !normComp || q.company.toLowerCase() === normComp;
    return topicMatch && diffMatch && (normComp ? compMatch : true);
  });

  // If we have fewer than 3, expand filters to match just topic
  if (filtered.length < 3) {
    const topicOnly = STATIC_FALLBACK_QUESTIONS.filter(q => {
      return q.topic.toLowerCase().includes(normTopic) || normTopic.includes(q.topic.toLowerCase());
    });
    filtered = [...filtered, ...topicOnly];
  }

  // If still fewer than 3, expand filters to match difficulty
  if (filtered.length < 3) {
    const diffOnly = STATIC_FALLBACK_QUESTIONS.filter(q => q.level.toLowerCase() === normDiff);
    filtered = [...filtered, ...diffOnly];
  }

  // Deduplicate by question text
  const seen = new Set<string>();
  let result = filtered.filter(q => {
    if (seen.has(q.question)) return false;
    seen.add(q.question);
    return true;
  });

  // If still fewer than 3, fill with random questions from full fallback list
  while (result.length < 3) {
    const randQuest = STATIC_FALLBACK_QUESTIONS[Math.floor(Math.random() * STATIC_FALLBACK_QUESTIONS.length)];
    if (!seen.has(randQuest.question)) {
      seen.add(randQuest.question);
      result.push(randQuest);
    }
  }

  // Return exactly 3 questions with updated dynamic properties
  return result.slice(0, 3).map((q, idx) => ({
    ...q,
    id: Math.floor(Math.random() * 900000) + 100000 + idx, // Unique dynamic ID
    topic: topic || q.topic,
    level: (difficulty as any) || q.level,
    company: company && company !== 'All' ? company : q.company
  }));
}
