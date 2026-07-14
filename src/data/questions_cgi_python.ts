import { QuizQuestion } from '../types';

export const CGI_PYTHON_QUESTIONS: QuizQuestion[] = [
  {
    id: 4001,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which data type is immutable in Python?',
    options: ['List', 'Dictionary', 'Set', 'Tuple'],
    answer: 'Tuple',
    explanation: 'Tuples cannot be changed once created.'
  },
  {
    id: 4002,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which of the following is a correct variable name?',
    options: ['2variables', 'var-name', 'var_name', 'global'],
    answer: 'var_name',
    explanation: 'Variable names cannot start with numbers, contain hyphens, or use keywords like "global".'
  },
  {
    id: 4003,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'What is the output of print(type([]) is list)?',
    options: ['True', 'False', 'Error', 'None'],
    answer: 'True',
    explanation: '[] is a list literal, so type([]) returns the list class.'
  },
  {
    id: 4004,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which operator is used for floor division?',
    options: ['/', '//', '%', '**'],
    answer: '//',
    explanation: '// returns the largest integer less than or equal to the result.'
  },
  {
    id: 4005,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'How do you insert an element at the end of a list?',
    options: ['add()', 'push()', 'append()', 'insert()'],
    answer: 'append()',
    explanation: 'append() adds a single element to the end of a list.'
  },
  {
    id: 4006,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: "What is the output of 'Python'[1]?",
    options: ['P', 'y', 't', 'Error'],
    answer: 'y',
    explanation: 'Python uses zero-based indexing; index 1 is the second character "y".'
  },
  {
    id: 4007,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which keyword is used to create a function?',
    options: ['func', 'define', 'def', 'function'],
    answer: 'def',
    explanation: '"def" stands for "define function".'
  },
  {
    id: 4008,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which data type is used to store True or False?',
    options: ['int', 'str', 'bool', 'float'],
    answer: 'bool',
    explanation: 'Boolean data types represent one of two values: True or False.'
  },
  {
    id: 4009,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'What is the output of 10 % 3?',
    options: ['3', '1', '0', '0.33'],
    answer: '1',
    explanation: 'The modulo operator (%) returns the remainder of the division. 10 / 3 = 3 with remainder 1.'
  },
  {
    id: 4010,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'How do you write a comment in Python?',
    options: ['//', '/* */', '#', '--'],
    answer: '#',
    explanation: 'Python uses the hash symbol (#) for single-line comments.'
  },
  {
    id: 4011,
    company: 'CGI',
    topic: 'Python',
    level: 'Easy',
    question: 'Which function is used to get the length of a string?',
    options: ['size()', 'count()', 'length()', 'len()'],
    answer: 'len()',
    explanation: 'len() is a built-in function to return the number of items in an object.'
  },
  {
    id: 4012,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'What is the output of: [i for i in range(5) if i % 2 == 0]?',
    options: ['[0, 2, 4]', '[1, 3]', '[0, 1, 2, 3, 4]', '[]'],
    answer: '[0, 2, 4]',
    explanation: 'This is a list comprehension filtering for even numbers.'
  },
  {
    id: 4013,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'What does the .get() method do for a dictionary?',
    options: ['Deletes a key', 'Returns value for a key or None if not found', 'Adds a new key', 'Clears the dictionary'],
    answer: 'Returns value for a key or None if not found',
    explanation: '.get() prevents KeyError if the key is missing.'
  },
  {
    id: 4014,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'Which of these is used for multi-threading in Python?',
    options: ['threading module', 'multiprocess module', 'os module', 'sys module'],
    answer: 'threading module',
    explanation: "The 'threading' module is standard for thread-based parallelism."
  },
  {
    id: 4015,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: "What is a 'docstring' in Python?",
    options: ['A string used for documentation', 'A type of list', 'A system variable', 'A decorator'],
    answer: 'A string used for documentation',
    explanation: 'Docstrings are strings used at the start of functions/classes to document them.'
  },
  {
    id: 4016,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'How do you merge two dictionaries (Python 3.9+)?',
    options: ['dict1 + dict2', 'dict1.merge(dict2)', 'dict1 | dict2', 'dict1 & dict2'],
    answer: 'dict1 | dict2',
    explanation: 'Python 3.9 introduced the union operator (|) for dictionaries.'
  },
  {
    id: 4017,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: "What is the output of print('abc'.upper())?",
    options: ['abc', 'ABC', 'Abc', 'Error'],
    answer: 'ABC',
    explanation: '.upper() converts all characters in a string to uppercase.'
  },
  {
    id: 4018,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: "What does 'self' represent in a class method?",
    options: ['The class itself', 'The parent class', 'The instance of the class', 'A reserved keyword'],
    answer: 'The instance of the class',
    explanation: "'self' points to the specific object being manipulated."
  },
  {
    id: 4019,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'Which function converts a string to an integer?',
    options: ['str()', 'float()', 'int()', 'convert()'],
    answer: 'int()',
    explanation: 'int() casts compatible types into integer objects.'
  },
  {
    id: 4020,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: "What is the purpose of the 'pass' statement?",
    options: ['To exit a loop', 'To skip an iteration', 'A null operation to act as placeholder', 'To return a value'],
    answer: 'A null operation to act as placeholder',
    explanation: '"pass" is used when a statement is syntactically required but no action is needed.'
  },
  {
    id: 4021,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'How do you open a file for writing in Python?',
    options: ["open('file.txt', 'r')", "open('file.txt', 'w')", "open('file.txt', 'x')", "open('file.txt', 'a')"],
    answer: "open('file.txt', 'w')",
    explanation: '"w" stands for write mode (overwrites existing files).'
  },
  {
    id: 4022,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'Which function converts a JSON string to a Python dictionary?',
    options: ['json.load()', 'json.loads()', 'json.dict()', 'json.parse()'],
    answer: 'json.loads()',
    explanation: '"loads" stands for "load string".'
  },
  {
    id: 4023,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: "What does 'pip' stand for?",
    options: ['Python Install Package', 'Preferred Installer Program', 'Python Integration Protocol', 'Package Independent Python'],
    answer: 'Preferred Installer Program',
    explanation: 'It is the standard package manager for Python.'
  },
  {
    id: 4024,
    company: 'CGI',
    topic: 'Python',
    level: 'Medium',
    question: 'How do you start a Streamlit app from the terminal?',
    options: ['python app.py', 'streamlit run app.py', 'run streamlit app.py', 'streamlit app.start'],
    answer: 'streamlit run app.py',
    explanation: 'This is the standard command to launch a Streamlit server.'
  },
  {
    id: 4025,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is the Global Interpreter Lock (GIL)?',
    options: ['A tool for encryption', 'A mutex that allows only one thread to execute at a time', 'A memory management tool', 'A debugger'],
    answer: 'A mutex that allows only one thread to execute at a time',
    explanation: 'The GIL ensures thread safety but limits multi-core CPU performance in CPython.'
  },
  {
    id: 4026,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is a decorator?',
    options: ['A function that modifies another function', 'A class attribute', 'A type of loop', 'A design tool'],
    answer: 'A function that modifies another function',
    explanation: 'Decorators wrap functions to extend behavior without permanent modification.'
  },
  {
    id: 4027,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is the output of: print(id(5) == id(5))?',
    options: ['True', 'False', 'Error', 'Sometimes True'],
    answer: 'True',
    explanation: 'Python caches small integers, so they share the same memory ID.'
  },
  {
    id: 4028,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is the difference between __str__ and __repr__?',
    options: ['No difference', '__str__ is for users, __repr__ is for developers', '__repr__ is for users, __str__ is for developers', '__str__ is faster'],
    answer: '__str__ is for users, __repr__ is for developers',
    explanation: '__str__ provides a readable string; __repr__ provides an unambiguous representation for debugging.'
  },
  {
    id: 4029,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: "What is a 'closure' in Python?",
    options: ['Closing a file', 'An inner function that remembers variables from its outer scope', 'Ending a loop', 'A garbage collection method'],
    answer: 'An inner function that remembers variables from its outer scope',
    explanation: 'Closures allow functions to retain state even after the outer scope has finished.'
  },
  {
    id: 4030,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: "What is 'MRO' in Python?",
    options: ['Main Run Operation', 'Method Resolution Order', 'Memory Resource Optimization', 'Modular Rule Object'],
    answer: 'Method Resolution Order',
    explanation: 'MRO determines the order in which base classes are searched during inheritance.'
  },
  {
    id: 4031,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What does the @staticmethod decorator do?',
    options: ['Makes a method private', 'Allows a method to be called without a class instance', 'Creates a constant', 'Speeds up the method'],
    answer: 'Allows a method to be called without a class instance',
    explanation: "Static methods don't take 'self' or 'cls' as the first argument."
  },
  {
    id: 4032,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What are *args and **kwargs?',
    options: ['Pointers', 'Math functions', 'Variable-length arguments', 'Boolean flags'],
    answer: 'Variable-length arguments',
    explanation: '*args is for non-keyworded variable arguments; **kwargs is for keyworded ones.'
  },
  {
    id: 4033,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: "What is the 'super()' function used for?",
    options: ['Admin access', 'Accessing methods of a parent class', 'Creating a global variable', 'Running code faster'],
    answer: 'Accessing methods of a parent class',
    explanation: 'Super() allows you to call inherited methods that have been overridden.'
  },
  {
    id: 4034,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is pickling in Python?',
    options: ['Data cleaning', 'Serializing an object into a byte stream', 'Compressing a file', 'Converting code to C++'],
    answer: 'Serializing an object into a byte stream',
    explanation: 'Pickling is used for saving complex objects to a file for later use.'
  },
  {
    id: 4035,
    company: 'CGI',
    topic: 'Python',
    level: 'Hard',
    question: 'What is the result of 0.1 + 0.2 == 0.3?',
    options: ['True', 'False', 'Error', 'None'],
    answer: 'False',
    explanation: 'Due to floating-point precision, 0.1+0.2 is actually 0.30000000000000004.'
  },
  {
    id: 4036,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'What is a metaclass?',
    options: ['A class that inherits from multiple classes', 'A class whose instances are classes', 'A library for data science', 'A virtual environment'],
    answer: 'A class whose instances are classes',
    explanation: 'Metaclasses define how classes themselves are created; "type" is the default metaclass.'
  },
  {
    id: 4037,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'What is the use of __slots__?',
    options: ['To speed up loops', 'To restrict attribute creation and save memory', 'To define class methods', 'To connect to a database'],
    answer: 'To restrict attribute creation and save memory',
    explanation: '__slots__ prevents the creation of __dict__ for each instance, reducing memory overhead.'
  },
  {
    id: 4038,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'How do you implement a Singleton pattern using a metaclass?',
    options: ['By overriding __init__', 'By overriding __new__ or __call__', 'By using a decorator', 'By making attributes private'],
    answer: 'By overriding __new__ or __call__',
    explanation: 'The metaclass can check if an instance already exists before creating a new one.'
  },
  {
    id: 4039,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'What is monkey patching in Python?',
    options: ['Using a slow algorithm', 'Dynamic modification of a class or module at runtime', 'A type of bug testing', 'Writing code in a messy way'],
    answer: 'Dynamic modification of a class or module at runtime',
    explanation: 'Monkey patching allows you to replace methods in a library without changing its source code.'
  },
  {
    id: 4040,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'What is the purpose of the dis module?',
    options: ['To disable features', 'To disassemble Python bytecode', 'To manage disk space', 'To display graphics'],
    answer: 'To disassemble Python bytecode',
    explanation: 'The dis module helps developers see the underlying instructions the Python interpreter executes.'
  },
  {
    id: 4041,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'Which protocol does the with statement use?',
    options: ['The Context Management Protocol', 'The Iterator Protocol', 'The HTTP Protocol', 'The Secure Shell Protocol'],
    answer: 'The Context Management Protocol',
    explanation: 'Objects used with "with" must implement __enter__ and __exit__ methods.'
  },
  {
    id: 4042,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: "What is an f-string with '=' used for (Python 3.8+)?",
    options: ['Assignment', 'Debugging/Printing variable name and value', 'Defining a constant', 'Mathematical comparison'],
    answer: 'Debugging/Printing variable name and value',
    explanation: 'f"{var=}" prints the variable name followed by its value, which is very useful for debugging.'
  },
  {
    id: 4043,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: "What is the effect of 'from module import *' inside a function?",
    options: ['Imports everything', 'SyntaxError in Python 3', 'Only imports public variables', 'Speeds up the function'],
    answer: 'SyntaxError in Python 3',
    explanation: 'Python 3 does not allow wildcard imports inside a function scope.'
  },
  {
    id: 4044,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: 'What is the purpose of sys.setrecursionlimit()?',
    options: ['To speed up recursion', 'To change the maximum depth of the Python interpreter stack', 'To stop a loop', 'To limit memory usage'],
    answer: 'To change the maximum depth of the Python interpreter stack',
    explanation: 'It allows deep recursive calls that would otherwise hit a RecursionError.'
  },
  {
    id: 4045,
    company: 'CGI',
    topic: 'Python',
    level: 'Advanced',
    question: "What does the 'nonlocal' keyword do?",
    options: ['Creates a global variable', 'Modifies a variable in the nearest enclosing scope (not global)', 'Imports a local module', 'None of the above'],
    answer: 'Modifies a variable in the nearest enclosing scope (not global)',
    explanation: 'Nonlocal is used in nested functions to reference variables in the parent function\'s scope.'
  },
  {
    id: 4046,
    company: 'CGI',
    topic: 'Logical',
    level: 'Medium',
    question: 'Find the missing number: 7, 26, 63, 124, 215, ?',
    options: ['342', '343', '441', '512'],
    answer: '342',
    explanation: 'Pattern: n^3 - 1. 2^3-1=7, 3^3-1=26, ..., 7^3-1 = 343-1 = 342.'
  },
  {
    id: 4047,
    company: 'CGI',
    topic: 'Arithmetic',
    level: 'Medium',
    question: 'Pipe A can fill a tank in 20 min, Pipe B in 30 min. If both are opened together, how long to fill?',
    options: ['10 min', '12 min', '15 min', '25 min'],
    answer: '12 min',
    explanation: 'Combined rate = 1/20 + 1/30 = 5/60 = 1/12. Time = 12 mins.'
  },
  {
    id: 4048,
    company: 'CGI',
    topic: 'Logical',
    level: 'Medium',
    question: "In a code, 'ROAD' is written as 'URDG'. How is 'SWAN' written?",
    options: ['VXDQ', 'VZDQ', 'VZCQ', 'UXDQ'],
    answer: 'VZDQ',
    explanation: 'Each letter is shifted +3: S+3=V, W+3=Z, A+3=D, N+3=Q.'
  },
  {
    id: 4049,
    company: 'CGI',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'If 15% of 40 is greater than 25% of a number by 2, find the number.',
    options: ['12', '16', '24', '32'],
    answer: '16',
    explanation: '15% of 40 = 6. Given 6 = 25% of x + 2 => 25% of x = 4 => x = 16.'
  },
  {
    id: 4050,
    company: 'CGI',
    topic: 'Arithmetic',
    level: 'Easy',
    question: 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?',
    options: ['10%', '12.5%', '15%', '20%'],
    answer: '12.5%',
    explanation: 'SI = P. R = (SI * 100) / (P * T) = (P * 100) / (P * 8) = 12.5%.'
  },
  {
    id: 4051,
    company: 'CGI',
    topic: 'Arithmetic',
    level: 'Hard',
    question: 'A train 150m long passes a man running at 5kmph in the same direction in 15 sec. Speed of train?',
    options: ['41 kmph', '36 kmph', '45 kmph', '50 kmph'],
    answer: '41 kmph',
    explanation: 'Relative speed = 150/15 = 10 m/s = 36 kmph. Same direction => V_train - V_man = 36 => V_train = 41 kmph.'
  },
  {
    id: 4052,
    company: 'CGI',
    topic: 'Verbal',
    level: 'Easy',
    question: "Choose the synonym for 'CANDID':",
    options: ['Secretive', 'Frank', 'Polite', 'Cruel'],
    answer: 'Frank',
    explanation: 'Candid means frank, open, and sincere.'
  },
  {
    id: 4053,
    company: 'CGI',
    topic: 'Logical',
    level: 'Hard',
    question: 'How many squares are there in a 4x4 chessboard?',
    options: ['16', '30', '32', '40'],
    answer: '30',
    explanation: 'Formula: 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30 squares.'
  },
  {
    id: 4054,
    company: 'CGI',
    topic: 'Arithmetic',
    level: 'Advanced',
    question: 'The probability of drawing a red card or a King from a deck of 52 cards is:',
    options: ['28/52', '30/52', '1/2', '7/13'],
    answer: '7/13',
    explanation: '(26 red + 4 kings - 2 red kings)/52 = 28/52 = 7/13.'
  },
  {
    id: 4055,
    company: 'CGI',
    topic: 'Logical',
    level: 'Medium',
    question: 'If 1st Jan 2024 was Monday, what day was 1st Jan 2025?',
    options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    answer: 'Wednesday',
    explanation: '2024 is a leap year (366 days, which is 52 weeks and 2 days). So day shifts by 2 days: Monday + 2 = Wednesday.'
  }
];
