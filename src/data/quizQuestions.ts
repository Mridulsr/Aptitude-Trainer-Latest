import { QuizQuestion } from '../types';
import { TCS_INFOSYS_WIPRO_COGNIZANT_QUESTIONS } from './questions_tcs';
import { ACCENTURE_CAPGEMINI_HCL_IBM_QUESTIONS } from './questions_accenture';
import { AMAZON_GOOGLE_GOLDMAN_CGI_QUESTIONS } from './questions_amazon';
import { CGI_PYTHON_QUESTIONS } from './questions_cgi_python';
import { PUNE_AND_OTHERS_QUESTIONS } from './questions_pune_and_others';
import { DSA_AND_MATH_QUESTIONS } from './dsa_questions';

function sanitizeQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  return questions.map(q => {
    let uniqueOpts = Array.from(new Set(q.options.map(o => String(o).trim())));

    const trimmedAns = String(q.answer).trim();
    const ansIdx = uniqueOpts.findIndex(o => o.toLowerCase() === trimmedAns.toLowerCase());

    if (ansIdx !== -1) {
      uniqueOpts[ansIdx] = q.answer;
    } else {
      if (uniqueOpts.length < 4) {
        uniqueOpts.push(q.answer);
      } else {
        uniqueOpts[0] = q.answer;
      }
    }

    // Fill to exactly 4 if needed
    while (uniqueOpts.length < 4) {
      const firstOpt = uniqueOpts[0] || '0';
      const numVal = parseFloat(firstOpt);
      if (!isNaN(numVal)) {
        uniqueOpts.push(`${numVal + uniqueOpts.length * 5}`);
      } else {
        uniqueOpts.push(`${firstOpt} (Alt ${uniqueOpts.length})`);
      }
    }

    if (!uniqueOpts.includes(q.answer)) {
      uniqueOpts[0] = q.answer;
    }

    return {
      ...q,
      options: uniqueOpts
    };
  });
}

export const DEFAULT_QUESTIONS: QuizQuestion[] = sanitizeQuestions([
  ...TCS_INFOSYS_WIPRO_COGNIZANT_QUESTIONS,
  ...ACCENTURE_CAPGEMINI_HCL_IBM_QUESTIONS,
  ...AMAZON_GOOGLE_GOLDMAN_CGI_QUESTIONS,
  ...CGI_PYTHON_QUESTIONS,
  ...PUNE_AND_OTHERS_QUESTIONS,
  ...DSA_AND_MATH_QUESTIONS
]);
