import { QuizQuestion } from '../types';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const synonyms = [
  { word: 'Diligent', ans: 'Hardworking', opts: ['Lazy', 'Hardworking', 'Careless', 'Slow'] },
  { word: 'Abundant', ans: 'Plentiful', opts: ['Plentiful', 'Scarce', 'Brief', 'Heavy'] },
  { word: 'Benevolent', ans: 'Kind', opts: ['Cruel', 'Kind', 'Selfish', 'Clever'] },
  { word: 'Candid', ans: 'Honest', opts: ['Deceitful', 'Honest', 'Shy', 'Arrogant'] },
  { word: 'Epitome', ans: 'Perfect example', opts: ['Perfect example', 'Opposite', 'Failure', 'Summary'] },
  { word: 'Frugal', ans: 'Economical', opts: ['Extravagant', 'Economical', 'Generous', 'Wasteful'] },
  { word: 'Gullible', ans: 'Easily deceived', opts: ['Easily deceived', 'Suspicious', 'Smart', 'Stubborn'] },
  { word: 'Impartial', ans: 'Unbiased', opts: ['Biased', 'Unbiased', 'Unfair', 'Emotional'] },
  { word: 'Jovial', ans: 'Cheerful', opts: ['Sad', 'Cheerful', 'Angry', 'Silent'] },
  { word: 'Lethargic', ans: 'Sluggish', opts: ['Active', 'Sluggish', 'Quick', 'Healthy'] }
];

const antonyms = [
  { word: 'Hostile', ans: 'Friendly', opts: ['Angry', 'Friendly', 'Cold', 'Bitter'] },
  { word: 'Obsolete', ans: 'Modern', opts: ['Ancient', 'Modern', 'Outdated', 'Extinct'] },
  { word: 'Transparent', ans: 'Opaque', opts: ['Opaque', 'Clear', 'Glassy', 'Dark'] },
  { word: 'Zenith', ans: 'Nadir', opts: ['Peak', 'Nadir', 'Middle', 'Base'] },
  { word: 'Amateur', ans: 'Professional', opts: ['Novice', 'Professional', 'Beginner', 'Expert'] },
  { word: 'Bold', ans: 'Timid', opts: ['Timid', 'Brave', 'Strong', 'Loud'] },
  { word: 'Despair', ans: 'Hope', opts: ['Sadness', 'Hope', 'Misery', 'Anger'] },
  { word: 'Expand', ans: 'Contract', opts: ['Contract', 'Grow', 'Stretch', 'Widen'] },
  { word: 'Flexible', ans: 'Rigid', opts: ['Rigid', 'Soft', 'Elastic', 'Bendable'] },
  { word: 'Genuine', ans: 'Fake', opts: ['Real', 'Fake', 'Pure', 'Honest'] }
];

const spellingWords = [
  { correct: 'Accommodate', opts: ['Accommodate', 'Acommodate', 'Accomodate', 'Acomodate'] },
  { correct: 'Committee', opts: ['Committee', 'Commitee', 'Comittee', 'Comite'] },
  { correct: 'Occurrence', opts: ['Occurrence', 'Occurence', 'Ocurrence', 'Ocurance'] },
  { correct: 'Necessary', opts: ['Necessary', 'Neccessary', 'Necesary', 'Neccesary'] },
  { correct: 'Prerequisite', opts: ['Prerequisite', 'Prerequisit', 'Pre-requisit', 'Prerequsite'] },
  { correct: 'Separate', opts: ['Separate', 'Seperate', 'Seprate', 'Saparate'] },
  { correct: 'Liaison', opts: ['Liaison', 'Liason', 'Liasion', 'Liaisson'] },
  { correct: 'Embarrass', opts: ['Embarrass', 'Embaras', 'Embarasss', 'Emberass'] },
  { correct: 'Millennium', opts: ['Millennium', 'Millenium', 'Milennium', 'Milenium'] },
  { correct: 'Colleague', opts: ['Colleague', 'Coleague', 'Colleage', 'Coliege'] }
];

export function generateQuestions(): QuizQuestion[] {
  const list: QuizQuestion[] = [];
  let baseId = 25000;

  const topics = [
    'Arithmetic',
    'Logical Reasoning',
    'Logical',
    'Data Interpretation',
    'Verbal Ability',
    'Verbal',
    'Programming Logic',
    'Python',
    'Probability',
    'Profit and Loss',
    'Sorting',
    'Linked List',
    'Binary Search Tree',
    'Dynamic Programming',
    'Graph Theory',
    'Recursion'
  ];

  const levels: ('Easy' | 'Medium' | 'Hard' | 'Advanced')[] = ['Easy', 'Medium', 'Hard', 'Advanced'];

  // Company names to distribute across questions
  const companies = [
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 
    'Amazon', 'Google', 'Capgemini', 'Goldman Sachs', 'CGI', 
    'HCL', 'Tech Mahindra', 'Persistent Systems', 'KPIT', 
    'LTIMindtree', 'IBM', 'Zensar', 'DXC Technology', 
    'Hexaware', 'Mphasis', 'Virtusa', 'Oracle', 'Verizon', 'Microsoft'
  ];

  for (const topic of topics) {
    for (const level of levels) {
      // 100 questions for Easy, 50 questions for Medium, Hard, Advanced
      const count = level === 'Easy' ? 100 : 50;

      for (let i = 1; i <= count; i++) {
        const id = baseId++;
        const company = companies[id % companies.length];
        let question = '';
        let options: string[] = [];
        let answer = '';
        let explanation = '';

        if (topic === 'Recursion') {
          if (level === 'Easy') {
            const factor = (i % 8) + 3; // 3 to 10
            if (i % 4 === 1) {
              question = `For a simple recursive function that computes the sum of the first N integers, how many stack frames are created in the call stack for N = ${factor}?`;
              answer = `${factor + 1}`;
              options = [`${factor}`, `${factor + 1}`, `${factor * 2}`, `${factor - 1}`];
              explanation = `Each recursive call from N down to 0 adds one stack frame. This gives ${factor} frames for the positive inputs plus 1 frame for the base case (N = 0), resulting in exactly ${factor + 1} stack frames.`;
            } else if (i % 4 === 2) {
              question = `What is the value of factorial(${factor}) if calculated using the standard recursive function where fact(n) = n * fact(n-1) and fact(0) = 1?`;
              let val = 1;
              for (let x = 1; x <= factor; x++) val *= x;
              answer = `${val}`;
              options = [`${val}`, `${val + factor}`, `${val * 2}`, `${val - factor}`];
              explanation = `Factorial of ${factor} is computed recursively as ${factor} * fact(${factor - 1}) down to the base case fact(0) = 1. Multiplying these numbers gives ${val}.`;
            } else if (i % 4 === 3) {
              question = `What is the printed sequence of fun(${factor})?
void fun(int n) {
  if (n <= 0) return;
  fun(n - 1);
  print(n);
}`;
              const seq = Array.from({ length: factor }, (_, idx) => idx + 1).join(' ');
              const revSeq = Array.from({ length: factor }, (_, idx) => factor - idx).join(' ');
              answer = seq;
              options = [seq, revSeq, `1 to ${factor - 1}`, `0 to ${factor}`];
              explanation = `This is head recursion. The recursive call fun(n - 1) executes first, and printing occurs as the stack unwinds, printing numbers in ascending order from 1 to ${factor}.`;
            } else {
              question = `In recursive implementations, what occurs if the base case of a recursion is missing or never reached for inputs up to ${factor * 10}?`;
              answer = 'Stack Overflow';
              options = ['Compilation Error', 'Memory Leak', 'Infinite Memory Allocation', 'Stack Overflow'];
              explanation = `Without a valid base case, the recursive calls will continue indefinitely, filling up the call stack space until a StackOverflowError is thrown.`;
            }
          } else {
            const factor = (i % 5) + 5;
            question = `For recursive depth of ${factor}, what is the time complexity of the Fibonacci algorithm T(n) = T(n-1) + T(n-2) + O(1)?`;
            answer = 'O(2^n)';
            options = ['O(log n)', 'O(n)', 'O(n log n)', 'O(2^n)'];
            explanation = `The naive recursive Fibonacci implementation makes two recursive calls at each step, leading to an exponential binary recursion tree with a time complexity of O(2^n).`;
          }
        }

        else if (topic === 'Graph Theory') {
          if (level === 'Easy') {
            const v = (i % 10) + 4; // 4 to 13
            if (i % 4 === 1) {
              question = `In a simple undirected graph with ${v} vertices, what is the maximum number of edges possible without self-loops or multiple edges?`;
              answer = `${(v * (v - 1)) / 2}`;
              options = [`${v}`, `${v * (v - 1)}`, `${(v * (v - 1)) / 2}`, `${v + 1}`];
              explanation = `The maximum number of edges in a simple undirected graph is given by the combination formula V * (V - 1) / 2. For ${v} vertices, this is ${(v * (v - 1)) / 2}.`;
            } else if (i % 4 === 2) {
              question = `What is the sum of degrees of all vertices in a simple graph with ${v * 2} edges?`;
              answer = `${v * 4}`;
              options = [`${v * 2}`, `${v * 4}`, `${v * 2 - 1}`, `${v}`];
              explanation = `By the Handshaking Lemma, the sum of degrees of all vertices in any graph is equal to twice the number of edges. Thus, for ${v * 2} edges, the sum is ${v * 4}.`;
            } else if (i % 4 === 3) {
              question = `In a tree with ${v} vertices, how many edges are present?`;
              answer = `${v - 1}`;
              options = [`${v}`, `${v - 1}`, `${v + 1}`, `${v * 2}`];
              explanation = `A tree is a connected acyclic graph. Any tree with V vertices always contains exactly V - 1 edges. For ${v} vertices, there are exactly ${v - 1} edges.`;
            } else {
              question = `Which data structure is typically utilized to implement Breadth-First Search (BFS) on a graph of ${v} nodes?`;
              answer = 'Queue';
              options = ['Stack', 'Queue', 'Priority Queue', 'Min-Heap'];
              explanation = `BFS explores vertices layer by layer in a First-In-First-Out (FIFO) manner, making a Queue the standard data structure for keeping track of visited neighbors.`;
            }
          } else {
            question = `What is the time complexity of Dijkstra's algorithm on a graph of ${i + 50} nodes using an adjacency list and a binary min-heap?`;
            answer = 'O((V + E) log V)';
            options = ['O(V^2)', 'O(V + E)', 'O((V + E) log V)', 'O(E log E)'];
            explanation = `Using a binary heap allows extract-min and decrease-key operations to be completed in O(log V) time, resulting in a total time complexity of O((V + E) log V).`;
          }
        }

        else if (topic === 'Dynamic Programming') {
          if (level === 'Easy') {
            const factor = (i % 6) + 10;
            if (i % 4 === 1) {
              question = `Which approach of Dynamic Programming is also known as the Top-Down recursive caching strategy?`;
              answer = 'Memoization';
              options = ['Memoization', 'Tabulation', 'Divide and Conquer', 'Greedy Method'];
              explanation = `Memoization is a top-down approach where we write the recursive flow and cache the outputs in a lookup table or hash map before returning them.`;
            } else if (i % 4 === 2) {
              question = `Which approach of Dynamic Programming is also known as the Bottom-Up iterative table-filling strategy?`;
              answer = 'Tabulation';
              options = ['Memoization', 'Tabulation', 'Backtracking', 'DFS'];
              explanation = `Tabulation is a bottom-up approach where we build a table iteratively from the base cases up to the target state.`;
            } else if (i % 4 === 3) {
              question = `When using Dynamic Programming to solve the Fibonacci sequence of size ${factor}, what is the optimized auxiliary space complexity?`;
              answer = 'O(1)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'];
              explanation = `To calculate F(n), we only need the two previous values: F(n-1) and F(n-2). Thus, we can use two variables instead of an array of size N, reducing the space complexity to O(1).`;
            } else {
              question = `Dynamic Programming is typically applicable to problems exhibiting optimal substructure and which other core property?`;
              answer = 'Overlapping subproblems';
              options = ['Overlapping subproblems', 'Monotonicity', 'Greedy choices', 'Strict associativity'];
              explanation = `The two main requirements for a problem to be solved using Dynamic Programming are Optimal Substructure and Overlapping Subproblems.`;
            }
          } else {
            question = `In the 0/1 Knapsack problem with ${i + 5} items and a capacity of W, what is the size of the DP table utilized in the classic solution?`;
            answer = '(N + 1) * (W + 1)';
            options = ['N * W', '(N + 1) * (W + 1)', 'N^2', 'W^2'];
            explanation = `The DP state dp[i][w] represents the maximum profit using the first i items with a capacity of w. This requires a table of dimensions (N + 1) x (W + 1) to accommodate the base cases (0 items or 0 capacity).`;
          }
        }

        else if (topic === 'Binary Search Tree') {
          if (level === 'Easy') {
            const n = (i % 15) * 10 + 20; // 20 to 160
            if (i % 4 === 1) {
              question = `Which traversal of a Binary Search Tree (BST) visits nodes in strictly ascending sorted order?`;
              answer = 'Inorder Traversal';
              options = ['Preorder Traversal', 'Inorder Traversal', 'Postorder Traversal', 'Level Order Traversal'];
              explanation = `Inorder traversal visits the left subtree, then the root, and finally the right subtree. By definition of a BST, this yields the elements in strictly increasing order.`;
            } else if (i % 4 === 2) {
              question = `What is the worst-case time complexity of searching for a value in a skewed BST of ${n} nodes?`;
              answer = 'O(N)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
              explanation = `In a worst-case scenario where the tree is completely skewed (acting like a linked list), we may have to traverse all N nodes, resulting in a time complexity of O(N).`;
            } else if (i % 4 === 3) {
              question = `What is the time complexity to search for a value in a balanced Binary Search Tree containing ${n} nodes?`;
              answer = 'O(log N)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
              explanation = `In a balanced BST, the height of the tree is O(log N). Since we discard half the tree at each step of the search, the search complexity is O(log N).`;
            } else {
              question = `For a Binary Search Tree with root key ${n}, which subtree contains keys that are strictly smaller than ${n}?`;
              answer = 'Left Subtree';
              options = ['Left Subtree', 'Right Subtree', 'Both Subtrees', 'Neither Subtree'];
              explanation = `By definition of a BST, all keys in the left subtree must be strictly less than the root key, and all keys in the right subtree must be strictly greater than the root key.`;
            }
          } else {
            question = `In an AVL tree, what is the maximum height difference allowed between the left and right subtrees of any node?`;
            answer = '1';
            options = ['0', '1', '2', 'log N'];
            explanation = `An AVL tree is a self-balancing binary search tree where the balancing factor (height difference of subtrees) of any node is at most 1.`;
          }
        }

        else if (topic === 'Linked List') {
          if (level === 'Easy') {
            const n = (i % 20) + 10;
            if (i % 4 === 1) {
              question = `What is the time complexity to insert a new element at the head of a singly linked list containing ${n} nodes?`;
              answer = 'O(1)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
              explanation = `To insert at the head, we simply set the new node's next pointer to the current head and update the head reference. This is a constant time operation, O(1).`;
            } else if (i % 4 === 2) {
              question = `What is the worst-case time complexity to find the element at the middle of a singly linked list of size ${n}?`;
              answer = 'O(N)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
              explanation = `Since singly linked lists do not support random access, we must traverse the list node-by-node, taking O(N) time to reach the middle.`;
            } else if (i % 4 === 3) {
              question = `In a Doubly Linked List, how many pointer fields are present in each node?`;
              answer = '2';
              options = ['1', '2', '3', '4'];
              explanation = `Each node in a Doubly Linked List contains a data field and two pointer fields: 'next' (points to the subsequent node) and 'prev' (points to the preceding node).`;
            } else {
              question = `What is the time complexity to reverse a singly linked list of size ${n} iteratively using pointers?`;
              answer = 'O(N)';
              options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
              explanation = `An iterative reversal requires visiting each of the N nodes exactly once to update its next pointer, which takes linear time O(N).`;
            }
          } else {
            question = `Which pointer-based approach is used in Floyd's Cycle-Finding Algorithm?`;
            answer = 'Fast and Slow Pointers';
            options = ['Fast and Slow Pointers', 'Two Pointers from Ends', 'Divide and Conquer', 'Stack-based iteration'];
            explanation = `Floyd's algorithm uses a slow pointer that moves 1 step and a fast pointer that moves 2 steps. If a cycle exists, they will meet.`;
          }
        }

        else if (topic === 'Sorting') {
          if (level === 'Easy') {
            const n = (i % 15) * 10 + 30;
            if (i % 4 === 1) {
              question = `What is the worst-case time complexity of Bubble Sort when sorting an array of size ${n}?`;
              answer = 'O(N^2)';
              options = ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'];
              explanation = `In the worst case (reverse sorted array), Bubble Sort makes N*(N-1)/2 comparisons and swaps, giving a time complexity of O(N^2).`;
            } else if (i % 4 === 2) {
              question = `Which sorting algorithm has a best-case time complexity of O(N) when the array of size ${n} is already sorted?`;
              answer = 'Insertion Sort';
              options = ['Selection Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'];
              explanation = `Insertion Sort only does one comparison per element and no swaps if the array is already sorted, resulting in a linear best-case complexity of O(N).`;
            } else if (i % 4 === 3) {
              question = `What is the average-case time complexity of Merge Sort when sorting ${n} elements?`;
              answer = 'O(N log N)';
              options = ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'];
              explanation = `Merge Sort divides the array into halves recursively (taking log N levels) and merges them in linear O(N) time at each level, leading to O(N log N) complexity in all cases.`;
            } else {
              question = `Which of the following sorting algorithms is stable by default?`;
              answer = 'Merge Sort';
              options = ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Selection Sort'];
              explanation = `Stable sorting algorithms maintain the relative order of equal elements. Merge Sort is stable, whereas traditional Quick Sort, Heap Sort, and Selection Sort are not.`;
            }
          } else {
            question = `What is the worst-case time complexity of Quick Sort, and when does it occur?`;
            answer = 'O(N^2), when pivot consistently splits array unevenly';
            options = [
              'O(N log N), when array is random',
              'O(N^2), when pivot consistently splits array unevenly',
              'O(N^3), when there are duplicate keys',
              'O(N) in all cases'
            ];
            explanation = `If the pivot is chosen poorly (e.g. always selecting smallest/largest on a sorted array), partitioning is highly unbalanced, yielding O(N^2) complexity.`;
          }
        }

        else if (topic === 'Probability') {
          if (level === 'Easy') {
            const r = (i % 5) + 3; // 3 to 7
            const b = (i % 6) + 4; // 4 to 9
            const total = r + b;
            if (i % 4 === 1) {
              question = `A box contains ${r} red marbles and ${b} blue marbles. If one marble is drawn at random, what is the probability that it is red?`;
              answer = `${r}/${total}`;
              options = [`${r}/${total}`, `${b}/${total}`, `${r-1}/${total}`, '1/2'];
              explanation = `The probability of drawing a red marble is the number of red marbles (${r}) divided by the total number of marbles (${total}). Thus, the probability is ${r}/${total}.`;
            } else if (i % 4 === 2) {
              const dieVal = (i % 4) + 1; // 1 to 4
              question = `A fair six-sided die is rolled. What is the probability of rolling a number strictly greater than ${dieVal}?`;
              const favorable = 6 - dieVal;
              answer = `${favorable}/6`;
              options = [`${favorable}/6`, `${6 - favorable}/6`, `${favorable - 1}/6`, '1/2'];
              explanation = `Rolling a die has 6 possible outcomes. The numbers greater than ${dieVal} are ${favorable} favorable outcomes. Thus, the probability is ${favorable}/6.`;
            } else if (i % 4 === 3) {
              question = `Two fair coins are tossed simultaneously. What is the probability of obtaining exactly ${i % 2 === 1 ? '1 head' : '2 heads'}?`;
              answer = i % 2 === 1 ? '1/2' : '1/4';
              options = ['1/4', '1/2', '3/4', '1/8'];
              explanation = `The sample space of tossing two coins is {HH, HT, TH, TT}. Exactly 1 head has 2 outcomes (HT, TH) making it 2/4 = 1/2. Exactly 2 heads has 1 outcome (HH) making it 1/4.`;
            } else {
              const p = (i % 10) * 5 + 30; // 30 to 75%
              question = `If the probability of an event happening is ${p}%, what is the probability of the event NOT happening?`;
              answer = `${100 - p}%`;
              options = [`${p}%`, `${100 - p}%`, `${100 + p}%`, '50%'];
              explanation = `The sum of probabilities of all mutually exclusive events must equal 100%. Therefore, the probability of an event not happening is 100% - ${p}% = ${100 - p}%.`;
            }
          } else {
            question = `What is the expected value of a geometric random variable representing trials until success with success probability p?`;
            answer = '1/p';
            options = ['p', '1 - p', '1/p', '1/(p^2)'];
            explanation = `The expected value (mean) of a geometric distribution is mathematically proven to be the reciprocal of the success probability, which is 1/p.`;
          }
        }

        else if (topic === 'Profit and Loss') {
          if (level === 'Easy') {
            const cp = (i % 8) * 100 + 200; // 200 to 900
            const p = (i % 5) * 5 + 10; // 10 to 30
            if (i % 4 === 1) {
              const sp = cp * (1 + p / 100);
              question = `An item is purchased for Rs. ${cp}. If it is sold at a profit of ${p}%, what is the selling price?`;
              answer = `${sp}`;
              options = [`${sp}`, `${sp - 20}`, `${sp + 20}`, `${cp}`];
              explanation = `Profit = ${p}% of ${cp} = Rs. ${cp * p / 100}. Selling Price = Cost Price + Profit = ${cp} + ${cp * p / 100} = Rs. ${sp}.`;
            } else if (i % 4 === 2) {
              const lossVal = 20;
              const sp = cp * 0.8;
              question = `If an item is sold for Rs. ${sp} at a loss of ${lossVal}%, what was its original cost price?`;
              answer = `${cp}`;
              options = [`${cp}`, `${sp}`, `${sp + cp}`, `${sp - 50}`];
              explanation = `Selling Price = Cost Price * (1 - loss%). Thus, Cost Price = Selling Price / (1 - loss%) = ${sp} / 0.8 = Rs. ${cp}.`;
            } else if (i % 4 === 3) {
              const sp = cp + 50;
              const netP = Math.round(((sp - cp) / cp) * 100);
              question = `A shopkeeper buys an article for Rs. ${cp} and sells it for Rs. ${sp}. What is the net profit percentage?`;
              answer = `${netP}%`;
              options = [`${netP}%`, `${netP + 5}%`, `${netP - 5}%`, '10%'];
              explanation = `Profit = SP - CP = ${sp} - ${cp} = Rs. 50. Profit % = (Profit / CP) * 100 = (50 / ${cp}) * 100 = ${netP}%.`;
            } else {
              const xVal = 15;
              const yVal = 12;
              question = `If the cost price of ${xVal} articles is equal to the selling price of ${yVal} articles, what is the profit percentage?`;
              answer = '25%';
              options = ['20%', '25%', '15%', '33.33%'];
              explanation = `Let CP of 1 article = Re 1. CP of ${yVal} articles = Rs. ${yVal}. SP of ${yVal} articles = CP of ${xVal} articles = Rs. ${xVal}. Profit % = ((SP - CP)/CP)*100 = ((${xVal} - ${yVal})/${yVal}) * 100 = (3/12)*100 = 25%.`;
            }
          } else {
            question = `A shopkeeper marks up his goods by 40% and then offers a discount of 20%. What is his net profit percentage?`;
            answer = '12%';
            options = ['20%', '12%', '15%', '8%'];
            explanation = `Let Cost Price = 100. Marked Price = 140. Selling Price = 140 * 0.8 = 112. Profit = Selling Price - Cost Price = 12, which represents a net profit of 12%.`;
          }
        }

        else if (topic === 'Logical Reasoning' || topic === 'Logical') {
          if (level === 'Easy') {
            if (i % 4 === 1) {
              const start = (i % 10) + 5;
              const diff = (i % 5) + 3;
              question = `Complete the following number sequence: ${start}, ${start + diff}, ${start + diff * 2}, ${start + diff * 3}, ... What is the next number?`;
              answer = `${start + diff * 4}`;
              options = [`${start + diff * 4}`, `${start + diff * 4 + 2}`, `${start + diff * 4 - 2}`, `${start + diff * 5}`];
              explanation = `The sequence is an arithmetic progression with a common difference of ${diff}. The next term is ${start + diff * 3} + ${diff} = ${start + diff * 4}.`;
            } else if (i % 4 === 2) {
              question = `If "CAT" is coded as "DBU" (each letter shifted forward by 1 letter), how is the word "DOG" coded?`;
              answer = 'EPH';
              options = ['EPH', 'EPG', 'FQI', 'DOH'];
              explanation = `Each letter in the source word is shifted forward by 1 in the alphabet. D -> E, O -> P, G -> H, resulting in "EPH".`;
            } else if (i % 4 === 3) {
              const distance = (i % 8) + 2;
              question = `A man walks ${distance} km North, then turns right and walks 4 km East, then turns right and walks ${distance} km South. How far is he from his starting point?`;
              answer = '4 km';
              options = ['4 km', `${distance} km`, `${distance + 4} km`, '0 km'];
              explanation = `The path forms a rectangle. Walking ${distance} km North and then ${distance} km South cancels out the North-South distance, leaving him exactly 4 km East from his starting position.`;
            } else {
              question = `Pointing to a girl, Amit says, "She is the daughter of the only sister of my father". How is the girl related to Amit?`;
              answer = 'Cousin';
              options = ['Cousin', 'Sister', 'Niece', 'Aunt'];
              explanation = `Amit's father's only sister is Amit's paternal aunt. Her daughter is Amit's cousin.`;
            }
          } else {
            question = `If A + B means A is the brother of B; A - B means A is the sister of B; what does P + Q - R mean?`;
            answer = 'P is the brother of R';
            options = ['P is the brother of R', 'P is the father of R', 'P is the uncle of R', 'P is the son of R'];
            explanation = `P + Q means P is the brother of Q. Q - R means Q is the sister of R. Since Q is the sister of R and P is the brother of Q, P must be the brother of R.`;
          }
        }

        else if (topic === 'Data Interpretation') {
          if (level === 'Easy') {
            const q1 = (i % 10) * 10 + 100; // 100 to 190
            const q2 = q1 + 50;
            if (i % 4 === 1) {
              const increasePct = Math.round(((q2 - q1) / q1) * 100);
              question = `A line chart shows widget sales in Quarter 1 = ${q1} units and Quarter 2 = ${q2} units. What is the percentage increase in sales from Q1 to Q2?`;
              answer = `${increasePct}%`;
              options = [`${increasePct}%`, `${increasePct + 5}%`, `${increasePct - 5}%`, '25%'];
              explanation = `Percentage Increase = ((Change) / Original) * 100 = ((${q2} - ${q1}) / ${q1}) * 100 = (${50} / ${q1}) * 100 = ${increasePct}%.`;
            } else if (i % 4 === 2) {
              const totalB = 360000;
              const deg = 60;
              question = `A pie chart represents a total annual municipal budget of Rs. ${totalB}. The section allocated to Education spans ${deg} degrees. What is the actual expenditure on education?`;
              answer = 'Rs. 60000';
              options = ['Rs. 60000', 'Rs. 30000', 'Rs. 90000', 'Rs. 120000'];
              explanation = `The total circle is 360 degrees. The fraction spent on education is ${deg}/360 = 1/6. Expenditure = (1/6) * Rs. ${totalB} = Rs. 60000.`;
            } else if (i % 4 === 3) {
              const rA = 40;
              const rB = 50;
              question = `A data table lists the population of Region A as ${rA} million and Region B as ${rB} million. What is the simplified ratio of Region A's population to Region B's?`;
              answer = '4:5';
              options = ['4:5', '5:4', '1:2', '2:3'];
              explanation = `The ratio of population is Region A : Region B = ${rA} : ${rB} = 40 : 50. Simplifying by dividing by 10 gives 4:5.`;
            } else {
              const a = 10, b = 20, c = 30, d = 40;
              question = `A bar graph shows widgets manufactured over 4 quarters: Q1=${a}, Q2=${b}, Q3=${c}, Q4=${d}. What is the average quarterly widget production?`;
              answer = '25';
              options = ['25', '20', '30', '35'];
              explanation = `Average quarterly production = (Q1 + Q2 + Q3 + Q4) / 4 = (${a} + ${b} + ${c} + ${d}) / 4 = 100 / 4 = 25 widgets.`;
            }
          } else {
            question = `In a standard multi-line graph tracking revenue, if Company A starts at Rs. 100k and grows 10% annually, what is its revenue after 2 years?`;
            answer = 'Rs. 121k';
            options = ['Rs. 120k', 'Rs. 121k', 'Rs. 110k', 'Rs. 130k'];
            explanation = `Revenue after 2 years = 100k * 1.10 * 1.10 = 121k.`;
          }
        }

        else if (topic === 'Verbal Ability' || topic === 'Verbal') {
          if (level === 'Easy') {
            if (i % 4 === 1) {
              const synObj = synonyms[i % synonyms.length];
              question = `What is the closest synonym of the word "${synObj.word.toUpperCase()}"?`;
              answer = synObj.ans;
              options = synObj.opts;
              explanation = `The word "${synObj.word}" means showing care and effort in one's work. Its closest synonym is "${synObj.ans}".`;
            } else if (i % 4 === 2) {
              const antObj = antonyms[i % antonyms.length];
              question = `What is the direct antonym of the word "${antObj.word.toUpperCase()}"?`;
              answer = antObj.ans;
              options = antObj.opts;
              explanation = `The word "${antObj.word}" represents a certain condition or concept. Its opposite (antonym) is "${antObj.ans}".`;
            } else if (i % 4 === 3) {
              question = `Choose the correct verb form to complete the sentence: "Neither of the teachers ___ present at the school meeting yesterday."`;
              answer = 'was';
              options = ['was', 'were', 'are', 'been'];
              explanation = `When "neither" is the subject, it refers to one person at a time and takes a singular verb. Since the event occurred "yesterday" (past tense), the singular verb "was" is correct.`;
            } else {
              const spellObj = spellingWords[i % spellingWords.length];
              question = `Identify the correct spelling from the given options:`;
              answer = spellObj.correct;
              options = spellObj.opts;
              explanation = `The correct spelling is "${spellObj.correct}".`;
            }
          } else {
            question = `Select the option that best completes the sentence: "He was so ________ that he was easily fooled by the swindler."`;
            answer = 'gullible';
            options = ['astute', 'gullible', 'suspicious', 'shrewd'];
            explanation = `The word "gullible" means easily persuaded or deceived. This perfectly completes the sentence as the person was easily fooled.`;
          }
        }

        else if (topic === 'Programming Logic') {
          if (level === 'Easy') {
            const val = (i % 10) + 2;
            if (i % 4 === 1) {
              question = `What is the output of the following pseudocode snippet?
int x = 5;
int y = ${val};
print(x + y * 2);`;
              answer = `${5 + val * 2}`;
              options = [`${5 + val * 2}`, `${(5 + val) * 2}`, `${5 + val}`, '20'];
              explanation = `Following operator precedence, multiplication is evaluated before addition. Therefore, y * 2 is computed first (${val} * 2 = ${val * 2}), and then added to x (5), yielding ${5 + val * 2}.`;
            } else if (i % 4 === 2) {
              question = `In programming logic, what does the following boolean expression evaluate to?
(true && false) || (true && !false)`;
              answer = 'true';
              options = ['true', 'false', 'undefined', 'error'];
              explanation = `(true && false) is false. (true && !false) is (true && true) which is true. false || true evaluates to true.`;
            } else if (i % 4 === 3) {
              question = `Which operator is used in most programming languages (C++, Java, Python) to calculate the remainder of division?`;
              answer = '%';
              options = ['/', '%', '//', '&'];
              explanation = `The modulo operator (%) yields the remainder of dividing the left-hand operand by the right-hand operand.`;
            } else {
              const limit = (val % 3) * 4 + 4; // 4, 8, or 12
              question = `How many times will the following loop execute?
for (int i = 0; i < ${limit}; i += 2) { ... }`;
              const times = Math.ceil(limit / 2);
              answer = `${times}`;
              options = [`${times}`, `${limit}`, `${limit / 2 + 1}`, `${times - 1}`];
              explanation = `The loop variable 'i' starts at 0 and increments by 2 each iteration. The values of 'i' visited are even numbers up to ${limit - 2}, executing exactly ${times} times.`;
            }
          } else {
            question = `What is the time complexity of searching an element in a sorted array of size N using Binary Search?`;
            answer = 'O(log N)';
            options = ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'];
            explanation = `Binary Search repeatedly halves the search space, yielding a logarithmic time complexity of O(log N).`;
          }
        }

        else if (topic === 'Python') {
          if (level === 'Easy') {
            const mult = (i % 5) + 2; // 2 to 6
            if (i % 4 === 1) {
              question = `What is the output of the following Python expression: len([1, 2, 3] * ${mult})?`;
              answer = `${3 * mult}`;
              options = [`${3 * mult}`, '3', `${mult}`, `[1, 2, 3]`];
              explanation = `Multiplying a list by an integer N in Python repeats the list elements N times. The resulting list has a length of 3 * ${mult} = ${3 * mult}.`;
            } else if (i % 4 === 2) {
              question = `Which of the following built-in data structures in Python is immutable?`;
              answer = 'tuple';
              options = ['list', 'dict', 'set', 'tuple'];
              explanation = `A tuple is an immutable sequence type in Python. Once created, its elements cannot be added, removed, or modified.`;
            } else if (i % 4 === 3) {
              const idx = i % 6;
              question = `What is the output of the Python statement: print("PYTHON"[${idx}])?`;
              const char = "PYTHON"[idx];
              answer = char;
              options = [char, char.toLowerCase(), `${idx}`, 'Error'];
              explanation = `String indexing in Python is 0-indexed. Index ${idx} in the string "PYTHON" refers to the character '${char}'.`;
            } else {
              question = `In Python, what does the list method lst.append(item) do?`;
              answer = 'Adds the item as a single element to the end of the list';
              options = [
                'Adds the item as a single element to the end of the list',
                'Adds the item to the beginning of the list',
                'Sorts the list with the item inserted',
                'Deletes the item from the list'
              ];
              explanation = `The append() method adds an object/element to the end of an existing list in Python, modifying the list in-place.`;
            }
          } else {
            question = `What does list(map(lambda x: x*2, [1, 2, 3])) return in Python?`;
            answer = '[2, 4, 6]';
            options = ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', 'Error'];
            explanation = `The map function applies the lambda function (which multiplies each number by 2) to each item in the list, returning a sequence of [2, 4, 6].`;
          }
        }

        else if (topic === 'Arithmetic') {
          if (level === 'Easy') {
            const num = (i % 15) * 2 + 10; // 10 to 38
            if (i % 4 === 1) {
              question = `What is the average of the first ${num} natural numbers?`;
              answer = `${(num + 1) / 2}`;
              options = [`${(num + 1) / 2}`, `${num / 2}`, `${num + 1}`, `${num * 2}`];
              explanation = `The sum of the first N natural numbers is N * (N + 1) / 2. Dividing by N to find the average yields (N + 1) / 2. For N = ${num}, the average is ${(num + 1) / 2}.`;
            } else if (i % 4 === 2) {
              const a = 12, b = 18;
              question = `What is the Greatest Common Divisor (GCD) of ${a} and ${b}?`;
              answer = '6';
              options = ['2', '3', '6', '12'];
              explanation = `The divisors of 12 are {1, 2, 3, 4, 6, 12}. The divisors of 18 are {1, 2, 3, 6, 9, 18}. The highest common divisor is 6.`;
            } else if (i % 4 === 3) {
              const a = 10, b = 15;
              question = `A can complete a task in ${a} days, and B can complete it in ${b} days. Working together, how many days will they take to complete the same task?`;
              answer = '6 days';
              options = ['5 days', '6 days', '7 days', '8 days'];
              explanation = `Working together, the rate of work is 1/A + 1/B. Thus, days taken = (A * B) / (A + B) = (${a} * ${b}) / (${a} + ${b}) = 150 / 25 = 6 days.`;
            } else {
              const p = 20;
              const x = 500;
              question = `What is ${p}% of ${x}?`;
              answer = `${p * x / 100}`;
              options = [`${p * x / 100}`, '50', '200', '250'];
              explanation = `${p}% of ${x} is calculated as (${p} / 100) * ${x} = 0.20 * ${x} = ${p * x / 100}.`;
            }
          } else {
            question = `In a class of 40 students, 60% are boys. What is the number of girls in the class?`;
            answer = '16';
            options = ['24', '16', '20', '12'];
            explanation = `If 60% are boys, then 40% are girls. Number of girls = 40% of 40 = 16 students.`;
          }
        }

        // Add generated question to collection
        list.push({
          id,
          company,
          topic,
          level,
          question,
          options,
          answer,
          explanation
        });
      }
    }
  }

  return list;
}

export const DSA_AND_MATH_QUESTIONS = generateQuestions();
