import { QuizQuestion } from '../types';
import { TCS_INFOSYS_WIPRO_COGNIZANT_QUESTIONS } from './questions_tcs';
import { ACCENTURE_CAPGEMINI_HCL_IBM_QUESTIONS } from './questions_accenture';
import { AMAZON_GOOGLE_GOLDMAN_CGI_QUESTIONS } from './questions_amazon';
import { CGI_PYTHON_QUESTIONS } from './questions_cgi_python';
import { PUNE_AND_OTHERS_QUESTIONS } from './questions_pune_and_others';

export const DEFAULT_QUESTIONS: QuizQuestion[] = [
  ...TCS_INFOSYS_WIPRO_COGNIZANT_QUESTIONS,
  ...ACCENTURE_CAPGEMINI_HCL_IBM_QUESTIONS,
  ...AMAZON_GOOGLE_GOLDMAN_CGI_QUESTIONS,
  ...CGI_PYTHON_QUESTIONS,
  ...PUNE_AND_OTHERS_QUESTIONS
];
