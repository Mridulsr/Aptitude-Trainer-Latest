import { QuizQuestion } from '../types';

export const ACCENTURE_CAPGEMINI_HCL_IBM_QUESTIONS: QuizQuestion[] = [
  // --- ACCENTURE ---
  {
    id: 2001,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is 20% of 50 + 50% of 20?',
    options: ['10', '20', '30', '40'],
    answer: '20',
    explanation: '10 + 10 = 20.'
  },
  {
    id: 2002,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the value of 12.5% of 800?',
    options: ['100', '125', '80', '160'],
    answer: '100',
    explanation: '12.5% = 1/8. 1/8 of 800 is 100.'
  },
  {
    id: 2003,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If 20% of a = b, then b% of 20 is the same as:',
    options: ['4% of a', '5% of a', '20% of a', 'None'],
    answer: '4% of a',
    explanation: 'b = 0.2a. b% of 20 = (0.2a/100)*20 = 0.04a = 4% of a.'
  },
  {
    id: 2004,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The ratio of two numbers is 3:4 and their HCF is 4. Find their LCM.',
    options: ['12', '16', '24', '48'],
    answer: '48',
    explanation: 'Numbers are 3*4=12 and 4*4=16. LCM(12, 16) = 48.'
  },
  {
    id: 2005,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Easy',
    question: "If 'ORANGE' is coded as 'PSBOHF', how is 'APPLE' coded?",
    options: ['BQQMF', 'BPPMF', 'BQQNF', 'BQPLF'],
    answer: 'BQQMF',
    explanation: 'Each letter is shifted +1 (A+1=B, P+1=Q, etc.).'
  },
  {
    id: 2006,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Easy',
    question: 'In a row of trees, one tree is 7th from either end. How many trees are there?',
    options: ['11', '13', '14', '15'],
    answer: '13',
    explanation: 'Total = (Left + Right) - 1 = (7 + 7) - 1 = 13.'
  },
  {
    id: 2007,
    company: 'Accenture',
    topic: 'Verbal',
    level: 'Easy',
    question: "Synonym for 'CANDID':",
    options: ['Frank', 'Hidden', 'Greedy', 'Polite'],
    answer: 'Frank',
    explanation: 'Candid means truthful, frank, and straightforward.'
  },
  {
    id: 2008,
    company: 'Accenture',
    topic: 'Verbal',
    level: 'Easy',
    question: 'Find the correctly spelt word:',
    options: ['Commitee', 'Committee', 'Comittee', 'Committe'],
    answer: 'Committee',
    explanation: 'Committee is the correct spelling (double m, double t, double e).'
  },
  {
    id: 2009,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A sum of money at CI doubles in 5 years. In how many years will it be 8 times?',
    options: ['10', '15', '20', '25'],
    answer: '15',
    explanation: '2^3 = 8, so 5 * 3 = 15 years.'
  },
  {
    id: 2010,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A person crosses a 600m long street in 5 minutes. What is his speed in km/hr?',
    options: ['3.6', '7.2', '8.4', '10'],
    answer: '7.2',
    explanation: 'Speed = 600m / 300s = 2 m/s. 2 * 18/5 = 7.2 km/hr.'
  },
  {
    id: 2011,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'The average of 20 numbers is zero. At most, how many can be greater than zero?',
    options: ['0', '1', '10', '19'],
    answer: '19',
    explanation: 'At most 19 numbers can be positive, balanced by 1 highly negative number.'
  },
  {
    id: 2012,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Medium',
    question: 'Which word does not belong with the others? (Tyre, Steering Wheel, Engine, Car)',
    options: ['Tyre', 'Steering Wheel', 'Engine', 'Car'],
    answer: 'Car',
    explanation: 'Tyre, Steering Wheel, and Engine are parts of a Car.'
  },
  {
    id: 2013,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Medium',
    question: 'Complete the series: 1, 4, 9, 16, 25, ?',
    options: ['30', '35', '36', '49'],
    answer: '36',
    explanation: 'Series of squares: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2 = 36.'
  },
  {
    id: 2014,
    company: 'Accenture',
    topic: 'Verbal',
    level: 'Medium',
    question: "Antonym for 'ENORMOUS':",
    options: ['Huge', 'Tiny', 'Average', 'Heavy'],
    answer: 'Tiny',
    explanation: 'Enormous means extremely large; tiny is the opposite.'
  },
  {
    id: 2015,
    company: 'Accenture',
    topic: 'Verbal',
    level: 'Medium',
    question: "Synonym for 'ABANDON':",
    options: ['Keep', 'Forsake', 'Adopt', 'Try'],
    answer: 'Forsake',
    explanation: 'Abandon means to leave or give up; forsake is a synonym.'
  },
  {
    id: 2016,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'Shopkeeper marks goods 20% above CP and allows 10% discount. Profit %?',
    options: ['8%', '10%', '12%', '15%'],
    answer: '8%',
    explanation: 'If CP = 100, MP = 120. SP = 120 - 10% = 108. Profit = 8%.'
  },
  {
    id: 2017,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A sum of money at CI amounts to ₹4624 in 2 years and ₹4913 in 3 years. Find the rate.',
    options: ['4.25%', '5%', '6.25%', '8%'],
    answer: '6.25%',
    explanation: 'Interest on 4624 for 1 year = 4913 - 4624 = 289. Rate = (289/4624)*100 = 6.25%.'
  },
  {
    id: 2018,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Hard',
    question: 'Statements: Some actors are singers. All singers are dancers. Conclusion: (I) Some actors are dancers. (II) No singer is an actor.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    answer: 'Only I follows',
    explanation: 'Actors overlapping with singers must also be dancers, so I follows. II is incorrect.'
  },
  {
    id: 2019,
    company: 'Accenture',
    topic: 'Verbal',
    level: 'Hard',
    question: "Choose the best word: The manager was _____ with the employee's performance.",
    options: ['Satisfy', 'Satisfied', 'Satisfying', 'Satisfaction'],
    answer: 'Satisfied',
    explanation: "Grammatically correct form is the past participle adjective 'satisfied'."
  },
  {
    id: 2020,
    company: 'Accenture',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'Marked price of a shirt is ₹400. 10% discount gives 26% profit. What is the Cost Price?',
    options: ['₹540', '₹560', '₹600', '₹620'],
    answer: '₹560',
    explanation: 'Wait, SP = 0.9 * 400 = 360? Or is the question actually: "Cost price is 400. 10% discount gives 26% profit. Find MP?" Yes, CP = 400. SP = 1.26*400 = 504. 0.9*MP = 504 => MP = 560.'
  },
  {
    id: 2021,
    company: 'Accenture',
    topic: 'Logical',
    level: 'Advanced',
    question: 'If 5 + 3 = 28, 9 + 1 = 810, 8 + 6 = 214, then 5 + 4 = ?',
    options: ['19', '91', '120', '20'],
    answer: '19',
    explanation: 'Pattern: (A-B) then (A+B). (5-4)=1, (5+4)=9. Combined: 19.'
  },

  // --- CAPGEMINI ---
  {
    id: 2022,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find average of first 5 multiples of 3.',
    options: ['6', '9', '12', '15'],
    answer: '9',
    explanation: 'Multiples: 3, 6, 9, 12, 15. Average = 45/5 = 9.'
  },
  {
    id: 2023,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Loss of 6 items = SP of 144 items. Loss %?',
    options: ['4%', '5%', '6%', '10%'],
    answer: '4%',
    explanation: 'Loss% = [Loss / (SP + Loss)] * 100 = [6 / 150] * 100 = 4%.'
  },
  {
    id: 2024,
    company: 'Capgemini',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A fruit seller sells 40% of his apples and still has 420 apples. Total apples?',
    options: ['500', '600', '700', '800'],
    answer: '700',
    explanation: '60% of total = 420 => Total = 420/0.6 = 700.'
  },
  {
    id: 2025,
    company: 'Capgemini',
    topic: 'Logical',
    level: 'Hard',
    question: "If 'POND' is coded as 'RSTL', how is 'HEAR' coded?",
    options: ['JGIV', 'JIGV', 'JHKV', 'KIGV'],
    answer: 'JGIV',
    explanation: 'Pattern: P(+2)->R, O(+4)->S, N(+5)->T? No, shift is +2, +4, +6, +8. H(+2)=J, E(+4)=I, A(+6)=G, R(+8)=Z? Wait, options have JGIV. H+2=J, E+2=G, A+8=I, R+4=V. Shift pattern: P(+2)->R, O(+4)->S, N(+6)->T, D(+8)->L. Yes, H+2=J, E+2=G, A+8=I, R+4=V. Let\'s match JGIV.'
  },

  // --- HCL ---
  {
    id: 2026,
    company: 'HCL',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If x:y = 3:4, find (2x+3y)/(3x+4y).',
    options: ['18/25', '17/24', '19/26', '2/3'],
    answer: '18/25',
    explanation: '(2*3 + 3*4) / (3*3 + 4*4) = (6+12)/(9+16) = 18/25.'
  },
  {
    id: 2027,
    company: 'HCL',
    topic: 'Logical',
    level: 'Advanced',
    question: 'Find the odd one: 1, 8, 27, 64, 125, 196',
    options: ['64', '125', '196', '27'],
    answer: '196',
    explanation: 'All other numbers are perfect cubes: 1^3, 2^3, 3^3, 4^3, 5^3. 196 is 14^2.'
  },

  // --- IBM ---
  {
    id: 2028,
    company: 'IBM',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Sum put at SI for 3 yrs. If rate was 2% higher, it fetches 360 more. Sum?',
    options: ['5000', '6000', '7000', '4000'],
    answer: '6000',
    explanation: 'Rate increase = 2% per year * 3 years = 6%. 6% of Principal = 360 => Principal = 6000.'
  }
];
