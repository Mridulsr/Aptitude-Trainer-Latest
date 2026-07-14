import { QuizQuestion } from '../types';

export const TCS_INFOSYS_WIPRO_COGNIZANT_QUESTIONS: QuizQuestion[] = [
  // --- TCS ---
  {
    id: 1001,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the unit digit in (7^95 - 3^58)?',
    options: ['0', '4', '6', '7'],
    answer: '4',
    explanation: '7^95 ends in 3; 3^58 ends in 9. Borrowing 1: 13-9 = 4.'
  },
  {
    id: 1002,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The sum of two numbers is 25 and their difference is 13. Find their product.',
    options: ['104', '114', '315', '325'],
    answer: '114',
    explanation: 'x+y=25, x-y=13 => x=19, y=6. 19 * 6 = 114.'
  },
  {
    id: 1003,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the sum of the first 15 odd numbers?',
    options: ['225', '200', '196', '256'],
    answer: '225',
    explanation: 'Sum of first n odd numbers is n^2. 15^2 = 225.'
  },
  {
    id: 1004,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If 0.75 : x :: 5 : 8, then find the value of x.',
    options: ['1.12', '1.2', '1.25', '1.30'],
    answer: '1.2',
    explanation: 'Product of extremes = product of means: 0.75 * 8 = 5 * x => 6 = 5x => x = 1.2.'
  },
  {
    id: 1005,
    company: 'TCS',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'Find the odd one out among the following numbers: 3, 5, 11, 14, 17, 21',
    options: ['14', '17', '21', '3'],
    answer: '14',
    explanation: 'All other numbers are odd (primes or composite), whereas 14 is the only even number.'
  },
  {
    id: 1006,
    company: 'TCS',
    topic: 'Logical',
    level: 'Easy',
    question: 'If DRIVER = 12, PEDESTRIAN = 20, ACCIDENT = 16, then what is CAR?',
    options: ['3', '6', '8', '10'],
    answer: '6',
    explanation: 'The pattern is (Number of letters in the word) * 2. CAR has 3 letters, so 3 * 2 = 6.'
  },
  {
    id: 1007,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'What is the remainder when 2^31 is divided by 7?',
    options: ['1', '2', '3', '4'],
    answer: '2',
    explanation: '2^3 = 8 = 1 mod 7. Thus (2^3)^10 * 2^1 = 1^10 * 2 = 2 mod 7.'
  },
  {
    id: 1008,
    company: 'TCS',
    topic: 'Data Interpretation',
    level: 'Medium',
    question: 'What is the value of 25% of 25% of 100?',
    options: ['6.25', '0.625', '62.5', '25'],
    answer: '6.25',
    explanation: '25% of 100 is 25. 25% of 25 is 6.25.'
  },
  {
    id: 1009,
    company: 'TCS',
    topic: 'Programming Logic',
    level: 'Hard',
    question: 'In C, what is the output of the statement: printf("%d", 10 ? 0 ? 5 : 11 : 12);?',
    options: ['10', '0', '11', '12'],
    answer: '11',
    explanation: 'Ternary evaluates nested: 10 is true, so 0 ? 5 : 11 is evaluated. 0 is false, so 11 is returned.'
  },
  {
    id: 1010,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Hard',
    question: "A man's speed with current is 15 km/hr and current is 2.5 km/hr. Speed against current?",
    options: ['8.5', '9', '10', '12.5'],
    answer: '10',
    explanation: 'Speed in still water = 15 - 2.5 = 12.5. Speed against current = 12.5 - 2.5 = 10.'
  },
  {
    id: 1011,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A sum of money compound interest amounts to ₹6,690 after 3 years and to ₹10,035 after 6 years. Find the initial sum.',
    options: ['₹4,460', '₹4,400', '₹4,500', '₹4,660'],
    answer: '₹4,460',
    explanation: 'Ratio of 6yr to 3yr = 10035 / 6690 = 1.5. Hence, initial sum = 6690 / 1.5 = ₹4,460.'
  },
  {
    id: 1012,
    company: 'TCS',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'In how many ways can 5 boys and 5 girls sit in a row such that no two girls are together?',
    options: ['5! * 6!', '5! * 5!', '10!', '11!'],
    answer: '5! * 6!',
    explanation: 'Boys can sit in 5! ways. Gaps created = 6. Girls can be seated in 6 gaps in 6P5 = 6! ways. Total = 5! * 6!.'
  },

  // --- INFOSYS ---
  {
    id: 1013,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Solve: 0.003 * 0.02',
    options: ['0.06', '0.006', '0.0006', '0.00006'],
    answer: '0.00006',
    explanation: '3 * 2 = 6, with a total of 5 decimal places = 0.00006.'
  },
  {
    id: 1014,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Ages of A and B are in ratio 5:7. 18 years ago, ratio was 8:13. Present ages?',
    options: ['50, 70', '40, 56', '60, 84', '45, 63'],
    answer: '50, 70',
    explanation: 'Solving (5x-18)/(7x-18) = 8/13 gives x=10. Present ages are 50 and 70.'
  },
  {
    id: 1015,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Find the HCF of the fractions 2/3, 8/9, and 64/81.',
    options: ['2/81', '2/3', '8/81', '1/3'],
    answer: '2/81',
    explanation: 'HCF of fractions = HCF of numerators / LCM of denominators = HCF(2,8,64)/LCM(3,9,81) = 2/81.'
  },
  {
    id: 1016,
    company: 'Infosys',
    topic: 'Logical Reasoning',
    level: 'Medium',
    question: 'In a certain code, "TIGER" is written as "QDFHS". How is "FISH" written in that code?',
    options: ['GRHE', 'HRGF', 'GSHE', 'GHRE'],
    answer: 'GRHE',
    explanation: 'Reverse word and subtract 1 from each letter: FISH -> HSIF -> GRHE.'
  },
  {
    id: 1017,
    company: 'Infosys',
    topic: 'Logical Reasoning',
    level: 'Hard',
    question: 'There are 8 identical-looking gold coins, but one is fake and weighs slightly less. What is the minimum number of balance scale weighings needed to guarantee finding the fake?',
    options: ['2', '3', '4', '8'],
    answer: '2',
    explanation: 'Divide into 3-3-2. Weigh 3 vs 3. If equal, fake is in the remaining 2 (weigh them). Else, fake is in the lighter 3 (weigh 2).'
  },
  {
    id: 1018,
    company: 'Infosys',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'Card from 52. Prob of King or Heart?',
    options: ['4/13', '17/52', '1/4', '1/13'],
    answer: '4/13',
    explanation: '(4 Kings + 13 Hearts - 1 King of Hearts) / 52 = 16 / 52 = 4/13.'
  },

  // --- WIPRO ---
  {
    id: 1019,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is the square root of 0.0009?',
    options: ['0.3', '0.03', '0.003', '0.9'],
    answer: '0.03',
    explanation: '0.03 * 0.03 = 0.0009.'
  },
  {
    id: 1020,
    company: 'Wipro',
    topic: 'Logical',
    level: 'Easy',
    question: 'Find the missing term: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    answer: '42',
    explanation: 'Pattern of differences: +4, +6, +8, +10, +12. 30 + 12 = 42.'
  },
  {
    id: 1021,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A can do work in 15 days, B in 20. Work together for 4 days. Fraction left?',
    options: ['7/15', '8/15', '11/15', '1/4'],
    answer: '8/15',
    explanation: 'Combined 1-day work = 1/15 + 1/20 = 7/60. 4 days = 28/60 = 7/15. Fraction left = 1 - 7/15 = 8/15.'
  },
  {
    id: 1022,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A sum of ₹12,500 amounts to ₹15,500 in 4 years at simple interest. Find the rate.',
    options: ['5%', '6%', '7%', '8%'],
    answer: '6%',
    explanation: 'SI = 3000. Interest per year = 750. Rate = (750 / 12500) * 100 = 6%.'
  },
  {
    id: 1023,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A train covers a distance in 50 minutes if it runs at 48 km/hr. At what speed must it run to cover it in 40 minutes?',
    options: ['55 km/hr', '60 km/hr', '64 km/hr', '70 km/hr'],
    answer: '60 km/hr',
    explanation: 'Distance = Speed * Time = 48 * (50/60) = 40 km. Required Speed = 40 / (40/60) = 60 km/hr.'
  },
  {
    id: 1024,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A sum of money becomes 8 times itself in 3 years at compound interest. Find the rate.',
    options: ['50%', '100%', '150%', '200%'],
    answer: '100%',
    explanation: 'Amount = P(1 + R/100)^3 => 8P = P(1 + R/100)^3 => 2 = 1 + R/100 => R = 100%.'
  },
  {
    id: 1025,
    company: 'Wipro',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'Find the last two digits of 2^2026.',
    options: ['04', '36', '76', '84'],
    answer: '84',
    explanation: '2^10 ends in 24. 2^20 ends in 76. Thus 2^2020 ends in 76. 76 * 2^6 (64) = 84.'
  },

  // --- COGNIZANT ---
  {
    id: 1026,
    company: 'Cognizant',
    topic: 'Logical Reasoning',
    level: 'Easy',
    question: 'If FISH is coded as EHRG, what is the alphabetical code for JUNGLE?',
    options: ['ITMFKD', 'ITNFKD', 'KVOHMF', 'TIMFKD'],
    answer: 'ITMFKD',
    explanation: 'Each letter is shifted backward by 1: J-1=I, U-1=T, N-1=M, G-1=F, L-1=K, E-1=D.'
  },
  {
    id: 1027,
    company: 'Cognizant',
    topic: 'Logical Reasoning',
    level: 'Medium',
    question: "Pointing to a photograph, a man said: 'I have no brother or sister, but that man's father is my father's son.' Who is in the photograph?",
    options: ['His son', 'His father', 'His nephew', 'Himself'],
    answer: 'His son',
    explanation: "'My father's son' is himself since he has no siblings. Thus, the man in the photo's father is himself, meaning it is his son."
  },
  {
    id: 1028,
    company: 'Cognizant',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'Difference between SI and CI on Rs. 5000 for 2 years at 10% is:',
    options: ['25', '50', '75', '100'],
    answer: '50',
    explanation: 'Diff = P(R/100)^2 = 5000 * (10/100)^2 = 5000 * 0.01 = 50.'
  }
];
