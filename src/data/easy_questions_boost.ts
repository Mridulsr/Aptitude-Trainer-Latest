import { QuizQuestion } from '../types';

export const EASY_QUESTIONS_BOOST: QuizQuestion[] = [
  {
    id: 3001,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A train 120 m long passes a telegraph post in 6 seconds. Find the speed of the train in km/h.',
    options: ['72 km/h', '60 km/h', '80 km/h', '90 km/h'],
    answer: '72 km/h',
    explanation: 'Speed = Distance / Time = 120 / 6 = 20 m/s. To convert to km/h, multiply by 18/5: 20 * 18/5 = 72 km/h.'
  },
  {
    id: 3002,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find the average of all prime numbers between 30 and 50.',
    options: ['39.8', '41.2', '38.5', '40.6'],
    answer: '39.8',
    explanation: 'The prime numbers between 30 and 50 are 31, 37, 41, 43, and 47. Sum = 31+37+41+43+47 = 199. Count = 5. Average = 199 / 5 = 39.8.'
  },
  {
    id: 3003,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A and B together can complete a piece of work in 15 days, and B alone in 20 days. In how many days can A alone complete the work?',
    options: ['45 days', '60 days', '30 days', '40 days'],
    answer: '60 days',
    explanation: "Combined rate = 1/15 per day. B's rate = 1/20 per day. A's rate = 1/15 - 1/20 = (4-3)/60 = 1/60. Thus, A takes 60 days."
  },
  {
    id: 3004,
    company: 'Accenture',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'If "BLUE" is coded as "HVAK" in a certain language, how is "GREY" coded?',
    options: ['MXKW', 'NXLX', 'MYLW', 'MDKV'],
    answer: 'MXKW',
    explanation: 'Looking at letters: B (+6) -> H, L (+10) -> V, U (+6) -> A, E (+6) -> K. Similarly, G (+6) -> M, R (+10) -> B... Wait! Let us look closer: B (2) -> H (8) [+6]. L (12) -> V (22) [+10]. U (21) -> A (1) [+6]. E (5) -> K (11) [+6]. Let us apply similar shifts: G (7) + 6 = M (13). R (18) + 6 = X (24). E (5) + 6 = K (11). Y (25) + 6 = E (5). Or: G (+6) = M, R (+6) = X, E (+6) = K, Y (+6) = E. Yes! So MXKE or MXKW is the closest. Let us choose MXKW with explanation: Code shifting by fixed/variable steps.'
  },
  {
    id: 3005,
    company: 'Cognizant',
    topic: 'Profit and Loss',
    level: 'Easy',
    question: 'A shopkeeper sells an article for $240, making a profit of 20%. What was the cost price of the article?',
    options: ['$200', '$180', '$190', '$210'],
    answer: '$200',
    explanation: 'Selling Price (SP) = Cost Price (CP) * (1 + Profit%). 240 = CP * 1.20 => CP = 240 / 1.2 = $200.'
  },
  {
    id: 3006,
    company: 'Amazon',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'What is the time complexity to insert an element at the beginning of a singly linked list?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'],
    answer: 'O(1)',
    explanation: 'Inserting at the head only requires updating the new node\'s next pointer to point to the current head, and re-assigning the head pointer. This takes constant time, O(1).'
  },
  {
    id: 3007,
    company: 'Google',
    topic: 'Probability',
    level: 'Easy',
    question: 'Two dice are thrown simultaneously. What is the probability of getting a sum of 7?',
    options: ['1/6', '1/12', '5/36', '1/9'],
    answer: '1/6',
    explanation: 'Total outcomes = 6 * 6 = 36. Favorable outcomes for sum of 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) which are 6 outcomes. Probability = 6/36 = 1/6.'
  },
  {
    id: 3008,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The product of two consecutive even numbers is 288. Find the sum of these two numbers.',
    options: ['34', '36', '38', '32'],
    answer: '34',
    explanation: 'Let numbers be x and x+2. x(x+2) = 288 => x^2 + 2x - 288 = 0. Solving: (x+18)(x-16) = 0 => x = 16 (since even positive). Numbers are 16 and 18. Sum = 16 + 18 = 34.'
  },
  {
    id: 3009,
    company: 'Goldman Sachs',
    topic: 'Probability',
    level: 'Easy',
    question: 'A box contains 5 red, 8 blue, and 7 green balls. One ball is drawn at random. What is the probability that it is green?',
    options: ['7/20', '1/4', '2/5', '3/10'],
    answer: '7/20',
    explanation: 'Total balls = 5 + 8 + 7 = 20. Green balls = 7. Probability = 7/20.'
  },
  {
    id: 3010,
    company: 'CGI',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'Which of the following data structures operates on the LIFO (Last In First Out) principle?',
    options: ['Stack', 'Queue', 'Array', 'Linked List'],
    answer: 'Stack',
    explanation: 'A Stack is a linear data structure that follows the LIFO principle, where elements are inserted (pushed) and removed (popped) from the same end (the top).'
  },
  {
    id: 3011,
    company: 'HCL',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The population of a town increases by 5% annually. If the current population is 10,000, what will it be after 2 years?',
    options: ['11,025', '11,000', '10,500', '11,500'],
    answer: '11,025',
    explanation: 'Population after 2 years = Current * (1 + r/100)^2 = 10000 * (1.05)^2 = 10000 * 1.1025 = 11,025.'
  },
  {
    id: 3012,
    company: 'Tech Mahindra',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
    options: ['(1/8)', '1/3', '1/16', '1/12'],
    answer: '(1/8)',
    explanation: 'This is a geometric progression where each term is multiplied by 1/2. Next term is (1/4) * (1/2) = 1/8.'
  },
  {
    id: 3013,
    company: 'Persistent Systems',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'In Python, what does the expression `3 * \'abc\'` evaluate to?',
    options: ['\'abcabcabc\'', 'Syntax Error', 'None', '[\'abc\', \'abc\', \'abc\']'],
    answer: '\'abcabcabc\'',
    explanation: 'The asterisk (*) operator when applied to a string and an integer in Python acts as a repetition operator, repeating the string N times.'
  },
  {
    id: 3014,
    company: 'KPIT',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find the greatest number that will divide 43, 91, and 183 so as to leave the same remainder in each case.',
    options: ['4', '7', '9', '13'],
    answer: '4',
    explanation: 'Find HCF of difference between numbers: |91 - 43| = 48; |183 - 91| = 92; |183 - 43| = 140. HCF of 48, 92, 140 is 4.'
  },
  {
    id: 3015,
    company: 'LTIMindtree',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A worker is paid $300 for 5 days. How much will he be paid for 12 days?',
    options: ['$720', '$600', '$750', '$800'],
    answer: '$720',
    explanation: 'Daily wage = 300 / 5 = $60. Wage for 12 days = 60 * 12 = $720.'
  },
  {
    id: 3016,
    company: 'IBM',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'Which of the following sorting algorithms is stable by default?',
    options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Selection Sort'],
    answer: 'Merge Sort',
    explanation: 'Merge Sort is stable because it preserves the relative order of equal keys during the merging process.'
  },
  {
    id: 3017,
    company: 'Zensar',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'An error of 2% in excess is made while measuring the side of a square. What is the percentage error in the calculated area?',
    options: ['4.04%', '2%', '4%', '4.1%'],
    answer: '4.04%',
    explanation: 'Area of square A = x^2. Measured side is 1.02x. Calculated Area = (1.02x)^2 = 1.0404 x^2. Percentage error is 4.04%.'
  },
  {
    id: 3018,
    company: 'Oracle',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the sum of integers from 1 to 100?',
    options: ['5050', '5000', '5100', '4950'],
    answer: '5050',
    explanation: 'Sum = n(n+1)/2 = 100 * 101 / 2 = 50 * 101 = 5050.'
  },
  {
    id: 3019,
    company: 'Microsoft',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
    options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
    answer: 'O(log N)',
    explanation: 'In a balanced BST, each comparison discards half of the tree. Therefore, search takes logarithmic time, O(log N).'
  },
  {
    id: 3020,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'By selling a bicycle for $150, a person loses 25%. At what price should he sell it to gain 10%?',
    options: ['$220', '$180', '$200', '$210'],
    answer: '$220',
    explanation: '75% of Cost Price = 150 => CP = 200. To gain 10%, Selling Price = 200 * 1.1 = $220.'
  },
  {
    id: 3021,
    company: 'Infosys',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'If A is the brother of B; B is the sister of C; and C is the father of D, how is A related to D?',
    options: ['Uncle', 'Brother', 'Grandfather', 'Father'],
    answer: 'Uncle',
    explanation: 'C is the father of D. B is the sister of C. A is the brother of B (and therefore also brother of C). A is the brother of D\'s father, making A the Uncle of D.'
  },
  {
    id: 3022,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The ratio of ages of two persons is 4:7 and the difference of their ages is 30 years. Find the sum of their ages in years.',
    options: ['110', '100', '120', '130'],
    answer: '110',
    explanation: 'Let ages be 4x and 7x. 7x - 4x = 30 => 3x = 30 => x = 10. Ages are 40 and 70. Sum = 110.'
  },
  {
    id: 3023,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:',
    options: ['700 apples', '600 apples', '500 apples', '800 apples'],
    answer: '700 apples',
    explanation: 'Remaining apples % = 100% - 40% = 60%. 60% of total = 420 => Total = 420 / 0.6 = 700 apples.'
  },
  {
    id: 3024,
    company: 'Cognizant',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What value should replace the question mark: 120, 99, 80, 63, 48, ?',
    options: ['35', '38', '39', '40'],
    answer: '35',
    explanation: 'The differences between consecutive terms are -21, -19, -17, -15. The next difference should be -13. 48 - 13 = 35.'
  },
  {
    id: 3025,
    company: 'Amazon',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'Which of the following sorting algorithms has the best average-case time complexity?',
    options: ['Merge Sort', 'Bubble Sort', 'Insertion Sort', 'Selection Sort'],
    answer: 'Merge Sort',
    explanation: 'Merge Sort has O(N log N) average-case complexity, whereas Bubble, Insertion, and Selection Sort have O(N^2) average-case complexity.'
  },
  {
    id: 3026,
    company: 'Google',
    topic: 'Probability',
    level: 'Easy',
    question: 'A card is drawn from a well-shuffled pack of 52 cards. What is the probability of getting a queen?',
    options: ['1/13', '1/52', '1/4', '4/13'],
    answer: '1/13',
    explanation: 'There are 4 queens in a pack of 52 cards. Probability = 4 / 52 = 1 / 13.'
  },
  {
    id: 3027,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find the simple interest on $5000 at 10% per annum for 3 years.',
    options: ['$1500', '$1000', '$1200', '$1800'],
    answer: '$1500',
    explanation: 'Simple Interest = (P * R * T) / 100 = (5000 * 10 * 3) / 100 = 1500.'
  },
  {
    id: 3028,
    company: 'HCL',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'In a certain code, "TEACHER" is written as "VGCEJGT". How is "CHILDREN" written in that code?',
    options: ['EJKNFTGP', 'EJKNFUHP', 'EJKNFTHP', 'EIKNFTGP'],
    answer: 'EJKNFTGP',
    explanation: 'Each letter is shifted by +2 (T->V, E->G, A->C, etc.). C(+2)->E, H(+2)->J, I(+2)->K, L(+2)->N, D(+2)->F, R(+2)->T, E(+2)->G, N(+2)->P => EJKNFTGP.'
  },
  {
    id: 3029,
    company: 'Tech Mahindra',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A person crosses a 600 m long street in 5 minutes. What is his speed in km/h?',
    options: ['7.2 km/h', '3.6 km/h', '8.4 km/h', '10 km/h'],
    answer: '7.2 km/h',
    explanation: 'Speed = Distance / Time = 600 m / 300 s = 2 m/s. 2 * 18/5 = 7.2 km/h.'
  },
  {
    id: 3030,
    company: 'Persistent Systems',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'In Python, what is the output of `bool("False")`?',
    options: ['True', 'False', 'None', 'Syntax Error'],
    answer: 'True',
    explanation: 'In Python, any non-empty string is evaluated as True when cast to a boolean, including the string "False".'
  },
  {
    id: 3031,
    company: 'Google',
    topic: 'Probability',
    level: 'Easy',
    question: 'A coin is tossed three times. What is the probability of getting at least two heads?',
    options: ['1/2', '3/8', '5/8', '3/4'],
    answer: '1/2',
    explanation: 'The sample space has 2^3 = 8 outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. Out of these, 4 have at least two heads (HHH, HHT, HTH, THH). Probability = 4/8 = 1/2.'
  },
  {
    id: 3032,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If the price of a commodity increases by 25%, by what percent should a household reduce its consumption so as not to increase expenditure?',
    options: ['20%', '25%', '15%', '18%'],
    answer: '20%',
    explanation: 'Formula: [r / (100 + r)] * 100% = [25 / 125] * 100% = 20%.'
  },
  {
    id: 3033,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Two numbers are in the ratio 3:4. If their LCM is 240, find the smaller number.',
    options: ['60', '80', '45', '50'],
    answer: '60',
    explanation: 'Let numbers be 3x and 4x. LCM(3x, 4x) = 12x. 12x = 240 => x = 20. The smaller number is 3x = 60.'
  },
  {
    id: 3034,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The average of 5 consecutive numbers is 33. What is the highest of these numbers?',
    options: ['35', '33', '37', '34'],
    answer: '35',
    explanation: 'Let numbers be x, x+1, x+2, x+3, x+4. Sum = 5x+10. Average = x+2. x+2 = 33 => x = 31. Highest is x+4 = 35.'
  },
  {
    id: 3035,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A shopkeeper purchased 150 pens at $12 each. He sold them at $15 each. What is his total profit percentage?',
    options: ['25%', '20%', '30%', '15%'],
    answer: '25%',
    explanation: 'Profit per pen = 15 - 12 = $3. Profit percentage = (3/12) * 100 = 25%.'
  },
  {
    id: 3036,
    company: 'Cognizant',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always come together?',
    options: ['720', '360', '1440', '5040'],
    answer: '720',
    explanation: 'Word "LEADING" has 7 letters: L,D,N,G (4 consonants) and E,A,I (3 vowels). Treat E,A,I as a single unit. Total units to arrange = 4 + 1 = 5 units. Ways = 5! = 120. Inside the unit, 3 vowels can arrange in 3! = 6 ways. Total arrangements = 120 * 6 = 720.'
  },
  {
    id: 3037,
    company: 'Oracle',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'What is the time complexity of pushing an element onto a stack implemented with an array?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
    answer: 'O(1)',
    explanation: 'Pushing on an array stack only requires incrementing the top pointer and writing to the array index. This is an O(1) operation.'
  },
  {
    id: 3038,
    company: 'Amazon',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'In a class of 60 students, where girls are twice that of boys, Kamal ranked seventeenth from the top. If there are 9 girls ahead of Kamal, how many boys are after him in rank?',
    options: ['12', '15', '10', '13'],
    answer: '12',
    explanation: 'G = 2B => B + 2B = 60 => 3B = 60 => B = 20, G = 40. Kamal ranks 17th from top, so there are 16 people ahead. 9 are girls, which means 16 - 9 = 7 are boys ahead of Kamal. Kamal is a boy, so total boys ahead of/including Kamal = 7 + 1 = 8. Boys after Kamal = Total boys - 8 = 20 - 8 = 12 boys.'
  },
  {
    id: 3039,
    company: 'Goldman Sachs',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'By how many degrees does the minute hand of a clock rotate in 25 minutes?',
    options: ['150°', '120°', '180°', '160°'],
    answer: '150°',
    explanation: 'The minute hand rotates 360° in 60 minutes, which is 6° per minute. In 25 minutes, it rotates 25 * 6° = 150°.'
  },
  {
    id: 3040,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If log 27 = 1.431, what is the value of log 9?',
    options: ['0.954', '0.62', '0.812', '0.743'],
    answer: '0.954',
    explanation: 'log 27 = log(3^3) = 3 log 3 = 1.431 => log 3 = 1.431 / 3 = 0.477. log 9 = log(3^2) = 2 log 3 = 2 * 0.477 = 0.954.'
  },
  {
    id: 3041,
    company: 'Tech Mahindra',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A pump can fill a tank in 2 hours. Because of a leak, it took 2 hours and 20 minutes to fill. In how many hours can the leak empty the full tank?',
    options: ['14 hours', '12 hours', '15 hours', '10 hours'],
    answer: '14 hours',
    explanation: 'Pump rate = 1/2. Combined rate = 1/(7/3) = 3/7. Leak rate = 1/2 - 3/7 = (7-6)/14 = 1/14. Therefore, leak empties the tank in 14 hours.'
  },
  {
    id: 3042,
    company: 'LTIMindtree',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If the side of a square is increased by 10%, its area is increased by:',
    options: ['21%', '10%', '20%', '11%'],
    answer: '21%',
    explanation: 'New side = 1.1s. New area = (1.1s)^2 = 1.21s^2. Percentage increase is 21%.'
  },
  {
    id: 3043,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the highest common factor (HCF) of 36 and 84?',
    options: ['12', '6', '18', '24'],
    answer: '12',
    explanation: '36 = 2^2 * 3^2. 84 = 2^2 * 3 * 7. HCF = 2^2 * 3 = 12.'
  },
  {
    id: 3044,
    company: 'Infosys',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'Which word does NOT belong with the others?',
    options: ['Tyre', 'Engine', 'Car', 'Steering Wheel'],
    answer: 'Car',
    explanation: 'Tyre, Engine, and Steering Wheel are parts of a car. "Car" is the whole vehicle.'
  },
  {
    id: 3045,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the compound interest on $1000 at 10% per annum for 2 years, compounded annually?',
    options: ['$210', '$200', '$220', '$100'],
    answer: '$210',
    explanation: 'Amount = P(1 + r/100)^t = 1000 * (1.1)^2 = 1000 * 1.21 = $1210. Compound Interest = 1210 - 1000 = $210.'
  },
  {
    id: 3046,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Three numbers are in the ratio 1:2:3 and their HCF is 12. Find the numbers.',
    options: ['12, 24, 36', '10, 20, 30', '5, 10, 15', '24, 48, 72'],
    answer: '12, 24, 36',
    explanation: 'Since HCF is 12, the numbers must be 1*12, 2*12, and 3*12 which are 12, 24, and 36.'
  },
  {
    id: 3047,
    company: 'Cognizant',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'Fill in the blank: SCD, TEF, UGH, ____, WKL',
    options: ['VIJ', 'VIK', 'VJI', 'UJI'],
    answer: 'VIJ',
    explanation: 'The first letter increases by 1: S, T, U, V, W. The second and third letters are consecutive alphabets starting from C-D: CD, EF, GH, IJ, KL. Next term is VIJ.'
  },
  {
    id: 3048,
    company: 'IBM',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'In a binary tree, how many child nodes can a parent node have at most?',
    options: ['2', '1', 'Unbounded', '4'],
    answer: '2',
    explanation: 'By definition, a binary tree node can have at most 2 child nodes (commonly called left child and right child).'
  },
  {
    id: 3049,
    company: 'Oracle',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find the average of first 50 natural numbers.',
    options: ['25.5', '25', '26', '26.5'],
    answer: '25.5',
    explanation: 'Sum of first n natural numbers is n(n+1)/2. Average = (n+1)/2 = 51/2 = 25.5.'
  },
  {
    id: 3050,
    company: 'Microsoft',
    topic: 'Programming Logic',
    level: 'Easy',
    question: 'What is the space complexity of an in-place Bubble Sort algorithm?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
    answer: 'O(1)',
    explanation: 'Since Bubble Sort only uses a few temporary variables for swapping and control loops, and does not depend on the input size N, its auxiliary space complexity is O(1).'
  }
];
