import { QuizQuestion } from '../types';

export const AMAZON_GOOGLE_GOLDMAN_CGI_QUESTIONS: QuizQuestion[] = [
  // --- AMAZON ---
  {
    id: 3001,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'The ratio of two numbers is 3:4 and their sum is 420. Find the larger number.',
    options: ['180', '240', '280', '300'],
    answer: '240',
    explanation: 'Total parts = 7. 1 part = 420/7 = 60. Larger number = 4 * 60 = 240.'
  },
  {
    id: 3002,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A toy is bought for ₹150 and sold for ₹180. Find the gain percent.',
    options: ['15%', '20%', '25%', '30%'],
    answer: '20%',
    explanation: 'Gain = 30. Gain% = (30 / 150) * 100 = 20%.'
  },
  {
    id: 3003,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'What is 15% of 34% of 10000?',
    options: ['450', '510', '600', '650'],
    answer: '510',
    explanation: '0.15 * 0.34 * 10000 = 510.'
  },
  {
    id: 3004,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'Find the HCF of 24, 36, and 40.',
    options: ['2', '4', '6', '8'],
    answer: '4',
    explanation: 'Factors: 24 (2³x3), 36 (2²x3²), 40 (2³x5). Common factor is 2² = 4.'
  },
  {
    id: 3005,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A can do a piece of work in 12 days and B can do it in 15 days. How long working together?',
    options: ['6 days', '6.66 days', '7 days', '8 days'],
    answer: '6.66 days',
    explanation: 'Combined rate = 1/12 + 1/15 = 9/60 = 3/20. Days = 20/3 = 6.66 days.'
  },
  {
    id: 3006,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Find the average of all prime numbers between 30 and 50.',
    options: ['39.8', '40.5', '41', '42'],
    answer: '39.8',
    explanation: 'Primes: 31, 37, 41, 43, 47. Sum = 199. Average = 199/5 = 39.8.'
  },
  {
    id: 3007,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Two numbers are in the ratio 3:5. If 9 is subtracted from each, the ratio becomes 12:23. Find smaller number.',
    options: ['27', '33', '49', '55'],
    answer: '33',
    explanation: 'Solving (3x-9)/(5x-9) = 12/23 gives x=11. Smaller number = 33.'
  },
  {
    id: 3008,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'A shopkeeper marks his goods 30% above CP and gives 10% discount. Profit %?',
    options: ['17%', '20%', '23%', '27%'],
    answer: '17%',
    explanation: '1.3 * 0.9 = 1.17, which is a 17% profit.'
  },
  {
    id: 3009,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'By selling 33m of cloth, a person gains the cost price of 11m. Find gain %.',
    options: ['25%', '33.33%', '50%', '10%'],
    answer: '33.33%',
    explanation: 'Gain% = (Gain/Cloth sold)*100 = (11/33)*100 = 33.33%.'
  },
  {
    id: 3010,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'The ratio of ages of A and B is 4:3. After 6 years, ratio is 11:9. B\'s present age?',
    options: ['9', '12', '15', '18'],
    answer: '12',
    explanation: '(4x+6)/(3x+6) = 11/9 => 36x+54 = 33x+66 => 3x=12 => x=4. B = 3*4 = 12.'
  },
  {
    id: 3011,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A dishonest dealer professes to sell at cost price, but uses 960g for 1kg. Find gain %.',
    options: ['4%', '4.16%', '4.25%', '4.5%'],
    answer: '4.16%',
    explanation: 'Gain% = [Error / (True value - Error)] * 100 = (40 / 960) * 100 = 4.16%.'
  },
  {
    id: 3012,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'If CP of 12 items = SP of 8 items, what is profit %?',
    options: ['25%', '33.33%', '50%', '66.66%'],
    answer: '50%',
    explanation: 'Let CP of 1 item = 1. CP of 12 = 12. SP of 8 = 12. SP of 1 = 1.5. Profit% = (0.5/1)*100 = 50%.'
  },
  {
    id: 3013,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'If SP is doubled, profit triples. Find profit %.',
    options: ['66.66%', '100%', '105%', '120%'],
    answer: '100%',
    explanation: '3(SP - CP) = 2SP - CP => SP = 2CP. Profit = 100%.'
  },
  {
    id: 3014,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A shopkeeper sells two items for ₹9900 each. On one he gains 10% and on other loses 10%. Overall result?',
    options: ['No gain no loss', 'Loss of ₹100', 'Gain of ₹200', 'Loss of ₹200'],
    answer: 'Loss of ₹200',
    explanation: 'Always a loss of (x/10)^2 percent = 1%. Total SP = 19800, which is 99% of CP. CP = 20000. Loss = 200.'
  },
  {
    id: 3015,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A man buys oranges at 3 for ₹10 and sells at 2 for ₹12. Find gain %.',
    options: ['60%', '70%', '80%', '90%'],
    answer: '80%',
    explanation: 'LCM of 3 and 2 is 6. CP of 6 = 20. SP of 6 = 36. Profit = 16. (16/20)*100 = 80%.'
  },
  {
    id: 3016,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A sum of ₹1550 lent partly at 5% and partly at 8% SI. Total 3-yr interest was ₹300. Ratio of sums?',
    options: ['16:15', '17:15', '16:13', '31:6'],
    answer: '16:15',
    explanation: 'Interest per year = 100. Average rate = (100 / 1550) * 100 = 200/31%. Use allegation: (8 - 200/31) : (200/31 - 5) = 48:45 = 16:15.'
  },
  {
    id: 3017,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'In a mixture of 60L, milk and water ratio is 2:1. How much water should be added to make it 1:2?',
    options: ['20L', '40L', '60L', '80L'],
    answer: '60L',
    explanation: 'Milk = 40L, Water = 20L. To make 1:2, water must be 80L. Thus we must add 60L of water.'
  },
  {
    id: 3018,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'If 15 men can reap a field in 28 days, in how many days will 10 men reap it?',
    options: ['35', '40', '42', '45'],
    answer: '42',
    explanation: 'M1D1 = M2D2 => 15 * 28 = 10 * D2 => D2 = 420 / 10 = 42.'
  },
  {
    id: 3019,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A train 240m long passes a pole in 24 seconds. How long to pass a platform 650m long?',
    options: ['65s', '89s', '100s', '110s'],
    answer: '89s',
    explanation: 'Speed = 240/24 = 10 m/s. Platform time = (240 + 650) / 10 = 89 seconds.'
  },
  {
    id: 3020,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'The ratio of speed of boat in still water to stream is 36:5. Boat goes downstream in 5 hrs 10 min. Upstream time?',
    options: ['5 hrs 50 min', '6 hrs', '6 hrs 50 min', '7 hrs 10 min'],
    answer: '6 hrs 50 min',
    explanation: 'Ratio of speeds Down:Up = 41:31. Inverse time ratio = 31:41. 31 units = 310 min. 41 units = 410 min = 6 hrs 50 min.'
  },
  {
    id: 3021,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'An item is sold at loss of 10%. If sold for ₹90 more, there would be a gain of 5%. CP?',
    options: ['₹500', '₹600', '₹750', '₹800'],
    answer: '₹600',
    explanation: 'Difference = 15% of CP = 90. CP = 90/0.15 = ₹600.'
  },
  {
    id: 3022,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'Speed of train is 72 kmph. It crosses a platform in 30s. If train length is 200m, platform length?',
    options: ['300m', '400m', '500m', '600m'],
    answer: '400m',
    explanation: 'Speed = 20 m/s. Total distance = 20 * 30 = 600m. Platform = 600 - 200 = 400m.'
  },
  {
    id: 3023,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A cistern is normally filled in 8 hours. Due to a leak in the bottom, it takes 10 hours. How long for leak to empty full cistern?',
    options: ['20 hrs', '30 hrs', '40 hrs', '50 hrs'],
    answer: '40 hrs',
    explanation: 'Leak rate = 1/8 - 1/10 = 1/40. So it will empty the full cistern in 40 hours.'
  },
  {
    id: 3024,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A sum of money doubles itself at SI in 10 years. In how many years will it triple itself?',
    options: ['15', '20', '25', '30'],
    answer: '20',
    explanation: 'To double, SI must be 100% of P (takes 10 yrs). To triple, SI must be 200% of P. Time = 2 * 10 = 20 years.'
  },
  {
    id: 3025,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A merchant buys two cows for ₹500. He sells one at 12% loss and other at 8% gain. Overall no gain/loss. CP of cow sold at gain?',
    options: ['₹200', '₹300', '₹250', '₹150'],
    answer: '₹300',
    explanation: 'By Alligation: Ratio of CP = 8:12 = 2:3. CP of cow sold at gain = (3/5)*500 = ₹300.'
  },
  {
    id: 3026,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A reduction of 20% in price of sugar enables a purchaser to get 4kg more for ₹160. Reduced price per kg?',
    options: ['₹8', '₹10', '₹12', '₹15'],
    answer: '₹8',
    explanation: '20% of 160 = ₹32. This pays for 4kg. Reduced price = 32/4 = ₹8 per kg.'
  },
  {
    id: 3027,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'The population of a town increases by 5% annually. Current population is 92610. Population 3 years ago?',
    options: ['80000', '84000', '85000', '90000'],
    answer: '80000',
    explanation: '92610 / (1.05)^3 = 92610 / 1.157625 = 80000.'
  },
  {
    id: 3028,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A man sold a book at a profit of 10%. Had he bought it for 4% less and sold it for ₹6 more, he would gain 18.75%. CP?',
    options: ['₹130', '₹140', '₹150', '₹160'],
    answer: '₹150',
    explanation: 'Let CP = 100x. SP1 = 110x. New CP = 96x. SP2 = 96x * 1.1875 = 114x. Diff = 4x = 6. CP = 100x = 150.'
  },
  {
    id: 3029,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'In how many ways can the letters of the word "AMAZON" be arranged?',
    options: ['360', '720', '120', '240'],
    answer: '360',
    explanation: 'Total letters = 6. A repeats twice. Arrangements = 6!/2! = 720/2 = 360.'
  },
  {
    id: 3030,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A shopkeeper allows 25% discount on MP and still makes 20% profit. If he gains ₹40, find MP.',
    options: ['₹300', '₹320', '₹350', '₹400'],
    answer: '₹320',
    explanation: 'Profit = 20% of CP = 40 => CP = 200. SP = 240. Since SP is 75% of MP, MP = 240/0.75 = ₹320.'
  },
  {
    id: 3031,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'The CI on a sum for 2 years at 10% is ₹420. Find the SI on same sum for same time/rate.',
    options: ['₹350', '₹380', '₹400', '₹410'],
    answer: '₹400',
    explanation: 'Effective CI rate = 21% = ₹420. Sum = 2000. SI = 2000 * 0.10 * 2 = ₹400.'
  },
  {
    id: 3032,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A bag has 4 red and 6 black balls. Two drawn at random. Prob that both same color?',
    options: ['7/15', '8/15', '1/2', '11/15'],
    answer: '7/15',
    explanation: 'Total ways = 10C2 = 45. Red pair = 4C2 = 6. Black pair = 6C2 = 15. Prob = (6+15)/45 = 21/45 = 7/15.'
  },
  {
    id: 3033,
    company: 'Amazon',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A tap fills a tank in 6 hours, leak empties it in 9. If both open, how long to fill?',
    options: ['12 hrs', '15 hrs', '18 hrs', '21 hrs'],
    answer: '18 hrs',
    explanation: 'Net rate = 1/6 - 1/9 = 1/18. Time taken = 18 hours.'
  },

  // --- GOOGLE ---
  {
    id: 3034,
    company: 'Google',
    topic: 'Logical',
    level: 'Easy',
    question: 'Complete the series: 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '64'],
    answer: '36',
    explanation: 'Perfect squares: 1, 4, 9, 16, 25, 36.'
  },
  {
    id: 3035,
    company: 'Google',
    topic: 'Logical',
    level: 'Medium',
    question: 'How many degrees does the hour hand rotate in 20 minutes?',
    options: ['10', '20', '5', '12'],
    answer: '10',
    explanation: 'Hour hand moves 360 deg in 12 hours (720 min), which is 0.5 degrees per minute. 20 * 0.5 = 10 degrees.'
  },
  {
    id: 3036,
    company: 'Google',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'If (1/5)^3y = 0.008, find (0.25)^y.',
    options: ['0.25', '0.5', '0.75', '1'],
    answer: '0.25',
    explanation: '0.008 = 8/1000 = (1/5)^3. Thus 3y = 3 => y = 1. (0.25)^1 = 0.25.'
  },
  {
    id: 3037,
    company: 'Google',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A and B throw a die. A wins if he throws 6. If A starts, find B\'s chance of winning.',
    options: ['5/11', '6/11', '5/6', '1/6'],
    answer: '5/11',
    explanation: 'B wins on 2nd throw, 4th throw, etc. P = (5/6)*(1/6) + (5/6)^3*(1/6) + ... = (5/36) / (1 - 25/36) = 5/11.'
  },

  // --- GOLDMAN SACHS ---
  {
    id: 3038,
    company: 'Goldman Sachs',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A:B = 3:5, B:C = 2:3. Find A:C.',
    options: ['6:15', '3:3', '2:5', '5:2'],
    answer: '6:15',
    explanation: 'A/C = (A/B) * (B/C) = (3/5) * (2/3) = 6/15.'
  },
  {
    id: 3039,
    company: 'Goldman Sachs',
    topic: 'Arithmetic',
    level: 'Hard',
    question: '80L milk. 8L replaced with water. Repeat twice more. Final milk?',
    options: ['58.32', '60', '55.4', '51.2'],
    answer: '58.32',
    explanation: 'Final milk = 80 * (1 - 8/80)^3 = 80 * (0.9)^3 = 80 * 0.729 = 58.32L.'
  },
  {
    id: 3040,
    company: 'Goldman Sachs',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'A beats B by 10m in 100m, B beats C by 10m in 100m. A beats C by?',
    options: ['19m', '20m', '21m', '25m'],
    answer: '19m',
    explanation: 'When A runs 100m, B runs 90m. When B runs 100m, C runs 90m. So when B runs 90m, C runs 81m. A beats C by 100 - 81 = 19m.'
  },
  {
    id: 3041,
    company: 'Goldman Sachs',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'Sum amounts to 5120 in 3yrs, 7290 in 6yrs (CI). Rate?',
    options: ['10%', '12.5%', '15%', '20%'],
    answer: '12.5%',
    explanation: '(1+r)^3 = 7290/5120 = 729/512 = (9/8)^3 => 1+r = 1.125 => r = 12.5%.'
  },

  // --- CGI ---
  {
    id: 3042,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'What is the output of: print(2 ** 3 ** 2)?',
    options: ['64', '512', '32', '256'],
    answer: '512',
    explanation: 'Exponentiation is right-associative. 2**(3**2) = 2**9 = 512.'
  },
  {
    id: 3043,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'Which of these is used to handle exceptions in Python?',
    options: ['catch', 'try-except', 'throw', 'error-handle'],
    answer: 'try-except',
    explanation: 'Python uses try...except blocks for error handling.'
  },
  {
    id: 3044,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'What is the output of: len([1, 2, 3] * 3)?',
    options: ['3', '6', '9', '12'],
    answer: '9',
    explanation: '[1,2,3]*3 duplicates list to [1,2,3,1,2,3,1,2,3]. len is 9.'
  },
  {
    id: 3045,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: "In Python, what does the 'yield' keyword do?",
    options: ['Ends a function', 'Creates a generator', 'Imports a library', 'Deletes a variable'],
    answer: 'Creates a generator',
    explanation: 'Yield allows a function to yield values one-by-one, maintaining local state as a generator.'
  }
];
