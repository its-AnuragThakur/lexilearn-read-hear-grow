/**
 * Topic explanation data - short, medium, long versions for each topic
 */

export type ExplanationLength = 'short' | 'medium' | 'long';

interface TextBlock {
  type: 'text' | 'heading' | 'highlight-box';
  value: string;
}

interface BulletItem {
  text: string;
  highlight?: boolean;
  description?: string;
}

interface BulletsBlock {
  type: 'bullets';
  items: BulletItem[];
}

export type ContentBlock = TextBlock | BulletsBlock;

export interface Explanation {
  content: ContentBlock[];
}

export interface TopicData {
  id: string;
  name: string;
  unitName: string;
  subjectName: string;
  explanations: Record<ExplanationLength, Explanation>;
}

// Helper to create a simple topic quickly
const makeTopic = (
  id: string, name: string, unitName: string, subjectName: string,
  short: ContentBlock[], medium: ContentBlock[], long: ContentBlock[]
): TopicData => ({
  id, name, unitName, subjectName,
  explanations: { short: { content: short }, medium: { content: medium }, long: { content: long } },
});

export const topicExplanations: Record<string, TopicData> = {
  // ==================== ENGLISH — Basic Reading ====================
  'eng-topic-1': makeTopic('eng-topic-1', 'Introduction to Letters', 'Basic Reading', 'English',
    [
      { type: 'text', value: 'Letters are symbols we use to write words.' },
      { type: 'highlight-box', value: 'The English alphabet has 26 letters.' },
      { type: 'text', value: 'Each letter has an uppercase (big) and lowercase (small) form.' },
    ],
    [
      { type: 'heading', value: 'What are Letters?' },
      { type: 'text', value: 'Letters are the building blocks of words.' },
      { type: 'highlight-box', value: 'There are 26 letters in the English alphabet.' },
      { type: 'heading', value: 'Two Forms of Each Letter' },
      { type: 'bullets', items: [
        { text: 'Uppercase (capital)', highlight: true, description: 'A, B, C, D...' },
        { text: 'Lowercase (small)', highlight: true, description: 'a, b, c, d...' },
      ]},
      { type: 'text', value: 'We use uppercase letters at the start of sentences and names.' },
    ],
    [
      { type: 'heading', value: 'What are Letters?' },
      { type: 'text', value: 'Letters are symbols that represent sounds.' },
      { type: 'text', value: 'When we put letters together, we make words.' },
      { type: 'highlight-box', value: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z' },
      { type: 'heading', value: 'Uppercase and Lowercase' },
      { type: 'bullets', items: [
        { text: 'Uppercase (Capital Letters)', highlight: true, description: 'A, B, C' },
        { text: 'Lowercase (Small Letters)', highlight: true, description: 'a, b, c' },
      ]},
      { type: 'heading', value: 'When to Use Uppercase' },
      { type: 'bullets', items: [
        { text: 'At the start of a sentence' },
        { text: 'For names of people and places' },
        { text: 'For the word "I"' },
      ]},
      { type: 'heading', value: 'Practice Tip' },
      { type: 'text', value: 'Write each letter — uppercase first, then lowercase next to it.' },
    ],
  ),

  'eng-topic-2': makeTopic('eng-topic-2', 'Vowels and Consonants', 'Basic Reading', 'English',
    [
      { type: 'text', value: 'The alphabet has two types of letters:' },
      { type: 'bullets', items: [
        { text: 'Vowels', highlight: true, description: 'A, E, I, O, U' },
        { text: 'Consonants', highlight: true, description: 'All other letters' },
      ]},
      { type: 'text', value: 'Every word needs at least one vowel.' },
    ],
    [
      { type: 'heading', value: 'What are Vowels?' },
      { type: 'text', value: 'There are 5 vowels in English:' },
      { type: 'highlight-box', value: 'A, E, I, O, U' },
      { type: 'text', value: 'Your mouth stays open when you say them.' },
      { type: 'heading', value: 'What are Consonants?' },
      { type: 'bullets', items: [
        { text: 'There are 21 consonants' },
        { text: 'Examples: B, C, D, F, G, H...' },
        { text: 'Your mouth closes a bit when you say them' },
      ]},
      { type: 'text', value: 'Every word needs at least one vowel.' },
    ],
    [
      { type: 'heading', value: 'Understanding Vowels' },
      { type: 'highlight-box', value: 'The 5 Vowels: A, E, I, O, U' },
      { type: 'bullets', items: [
        { text: 'They make open sounds' },
        { text: 'Every word must have at least one vowel' },
        { text: 'Sometimes Y acts like a vowel too' },
      ]},
      { type: 'heading', value: 'Understanding Consonants' },
      { type: 'bullets', items: [
        { text: 'Your lips, tongue, or teeth touch when you say them' },
        { text: 'Examples: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z' },
      ]},
      { type: 'heading', value: 'How They Work Together' },
      { type: 'bullets', items: [
        { text: 'CAT', highlight: true, description: 'C and T are consonants, A is a vowel' },
        { text: 'BEE', highlight: true, description: 'B is a consonant, E and E are vowels' },
        { text: 'DOG', highlight: true, description: 'D and G are consonants, O is a vowel' },
      ]},
    ],
  ),

  'eng-topic-3': makeTopic('eng-topic-3', 'Simple Words', 'Basic Reading', 'English',
    [
      { type: 'text', value: 'Simple words are short words with 2–4 letters.' },
      { type: 'highlight-box', value: 'CVC = Consonant + Vowel + Consonant (e.g. CAT)' },
    ],
    [
      { type: 'heading', value: 'CVC Words' },
      { type: 'highlight-box', value: 'CVC = Consonant + Vowel + Consonant' },
      { type: 'bullets', items: [
        { text: 'CAT', highlight: true, description: 'C-A-T' },
        { text: 'BIG', highlight: true, description: 'B-I-G' },
        { text: 'RUN', highlight: true, description: 'R-U-N' },
      ]},
      { type: 'heading', value: 'How to Read Them' },
      { type: 'bullets', items: [
        { text: 'Say the sound of each letter' },
        { text: 'Blend the sounds together slowly' },
        { text: 'Say the word faster' },
      ]},
    ],
    [
      { type: 'heading', value: 'CVC Word Families' },
      { type: 'bullets', items: [
        { text: '-AT family', highlight: true, description: 'cat, bat, hat, mat, sat, rat' },
        { text: '-IG family', highlight: true, description: 'big, dig, fig, pig, wig' },
        { text: '-OT family', highlight: true, description: 'hot, dot, got, lot, pot' },
        { text: '-UN family', highlight: true, description: 'bun, fun, gun, run, sun' },
      ]},
      { type: 'heading', value: 'Steps to Sound Out a Word' },
      { type: 'bullets', items: [
        { text: 'Step 1: Say the first letter sound' },
        { text: 'Step 2: Say the middle letter sound' },
        { text: 'Step 3: Say the last letter sound' },
        { text: 'Step 4: Blend them together' },
      ]},
      { type: 'heading', value: 'Practice Tip' },
      { type: 'text', value: 'Change just the first letter to make new words: cat → bat → hat.' },
    ],
  ),

  'eng-topic-4': makeTopic('eng-topic-4', 'Reading Short Sentences', 'Basic Reading', 'English',
    [
      { type: 'text', value: 'A sentence is a group of words that tells a complete idea.' },
      { type: 'highlight-box', value: 'The cat sat on the mat.' },
    ],
    [
      { type: 'heading', value: 'Parts of a Sentence' },
      { type: 'bullets', items: [
        { text: 'Capital letter', highlight: true, description: 'Every sentence starts with one' },
        { text: 'Full stop', highlight: true, description: 'Every sentence ends with one' },
      ]},
      { type: 'heading', value: 'Example Sentences' },
      { type: 'bullets', items: [
        { text: 'The dog is big.' },
        { text: 'I can run fast.' },
        { text: 'She has a red hat.' },
      ]},
    ],
    [
      { type: 'heading', value: 'Sentence Rules' },
      { type: 'bullets', items: [
        { text: 'Always start with a capital letter' },
        { text: 'Must have a subject (who or what)' },
        { text: 'Must have an action (what happens)' },
        { text: 'End with a full stop, question mark, or exclamation mark' },
      ]},
      { type: 'heading', value: 'Examples' },
      { type: 'bullets', items: [
        { text: 'The cat sat.', highlight: true, description: 'Subject: the cat. Action: sat.' },
        { text: 'I can jump.', highlight: true, description: 'Subject: I. Action: can jump.' },
      ]},
      { type: 'heading', value: 'Reading Steps' },
      { type: 'bullets', items: [
        { text: 'Read one word at a time' },
        { text: 'Point to each word' },
        { text: 'Read the whole sentence again smoothly' },
      ]},
    ],
  ),

  'eng-topic-5': makeTopic('eng-topic-5', 'Practice Reading', 'Basic Reading', 'English',
    [
      { type: 'text', value: 'Practice makes reading easier and faster.' },
      { type: 'bullets', items: [
        { text: 'Read every day', highlight: true },
        { text: 'Start with easy books', highlight: true },
        { text: 'Read out loud', highlight: true },
      ]},
    ],
    [
      { type: 'heading', value: 'Ways to Practice' },
      { type: 'bullets', items: [
        { text: 'Read out loud', description: 'Helps you hear the words' },
        { text: 'Read with someone', description: 'They can help with hard words' },
        { text: 'Re-read favourite stories', description: 'Builds confidence' },
      ]},
      { type: 'highlight-box', value: 'Try to read for 10–15 minutes every day.' },
    ],
    [
      { type: 'heading', value: 'Daily Reading Habits' },
      { type: 'highlight-box', value: 'Goal: Read for 10–15 minutes every day' },
      { type: 'bullets', items: [
        { text: 'Pick the same time each day' },
        { text: 'Find a quiet spot' },
        { text: 'Choose books you enjoy' },
      ]},
      { type: 'heading', value: 'Reading Strategies' },
      { type: 'bullets', items: [
        { text: 'Sound it out', highlight: true, description: 'Break hard words into sounds' },
        { text: 'Look at pictures', highlight: true, description: 'Pictures give clues' },
        { text: 'Skip and come back', highlight: true, description: 'Read on, then return' },
      ]},
      { type: 'heading', value: 'Fun Activities' },
      { type: 'bullets', items: [
        { text: 'Read to a pet or stuffed animal' },
        { text: 'Act out the story' },
        { text: 'Draw your favourite part' },
      ]},
    ],
  ),

  // ==================== ENGLISH — Vocabulary Building ====================
  'eng-topic-6': makeTopic('eng-topic-6', 'Common Words', 'Vocabulary Building', 'English',
    [
      { type: 'text', value: 'Common words (sight words) appear in almost everything we read.' },
      { type: 'highlight-box', value: 'the, and, is, it, you, that, he, was, for, on' },
    ],
    [
      { type: 'heading', value: 'Top Sight Words' },
      { type: 'highlight-box', value: 'the, and, is, it, you, that, he, was, for, on' },
      { type: 'text', value: 'These words make up about 50% of all writing.' },
      { type: 'heading', value: 'How to Learn Them' },
      { type: 'bullets', items: [
        { text: 'Use flashcards' },
        { text: 'Find them in books' },
        { text: 'Recognise them instantly — don\'t sound them out' },
      ]},
    ],
    [
      { type: 'heading', value: 'The First 20 Sight Words' },
      { type: 'highlight-box', value: 'the, of, and, a, to, in, is, you, that, it, he, was, for, on, are, as, with, his, they, I' },
      { type: 'heading', value: 'Groups of Common Words' },
      { type: 'bullets', items: [
        { text: 'People words', highlight: true, description: 'I, you, he, she, we, they' },
        { text: 'Action words', highlight: true, description: 'is, was, are, can, do, go' },
        { text: 'Connecting words', highlight: true, description: 'and, but, or, so, the, a' },
      ]},
      { type: 'text', value: 'Learn 3–5 new sight words each week.' },
    ],
  ),

  'eng-topic-7': makeTopic('eng-topic-7', 'Word Families', 'Vocabulary Building', 'English',
    [
      { type: 'text', value: 'Word families are groups of words that rhyme and share the same ending.' },
      { type: 'highlight-box', value: '-at family: cat, bat, hat, mat' },
    ],
    [
      { type: 'heading', value: 'Popular Word Families' },
      { type: 'bullets', items: [
        { text: '-at', highlight: true, description: 'cat, bat, hat, mat, rat' },
        { text: '-an', highlight: true, description: 'can, fan, man, pan, ran' },
        { text: '-op', highlight: true, description: 'hop, mop, pop, top, stop' },
      ]},
      { type: 'highlight-box', value: 'One pattern → many words!' },
    ],
    [
      { type: 'heading', value: 'Short Vowel Families' },
      { type: 'bullets', items: [
        { text: '-at', highlight: true, description: 'bat, cat, fat, hat, mat, pat, rat, sat' },
        { text: '-en', highlight: true, description: 'ben, den, hen, men, pen, ten' },
        { text: '-in', highlight: true, description: 'bin, din, fin, kin, pin, tin, win' },
        { text: '-ot', highlight: true, description: 'cot, dot, got, hot, lot, not, pot' },
        { text: '-ug', highlight: true, description: 'bug, dug, hug, jug, mug, rug, tug' },
      ]},
      { type: 'heading', value: 'How to Use Word Families' },
      { type: 'bullets', items: [
        { text: 'Learn the ending sound' },
        { text: 'Add different starting letters' },
        { text: 'Notice how they all rhyme' },
      ]},
    ],
  ),

  'eng-topic-8': makeTopic('eng-topic-8', 'Synonyms', 'Vocabulary Building', 'English',
    [
      { type: 'text', value: 'Synonyms are words that mean the same thing.' },
      { type: 'bullets', items: [
        { text: 'happy = glad', highlight: true },
        { text: 'big = large', highlight: true },
      ]},
    ],
    [
      { type: 'heading', value: 'Common Synonyms' },
      { type: 'bullets', items: [
        { text: 'happy', highlight: true, description: 'glad, joyful, cheerful' },
        { text: 'sad', highlight: true, description: 'unhappy, upset, gloomy' },
        { text: 'big', highlight: true, description: 'large, huge, enormous' },
        { text: 'fast', highlight: true, description: 'quick, speedy, rapid' },
      ]},
      { type: 'text', value: 'Synonyms make your writing more interesting.' },
    ],
    [
      { type: 'heading', value: 'Feeling Words' },
      { type: 'bullets', items: [
        { text: 'happy', highlight: true, description: 'glad, joyful, pleased, delighted' },
        { text: 'sad', highlight: true, description: 'unhappy, upset, gloomy, miserable' },
        { text: 'angry', highlight: true, description: 'mad, furious, cross, annoyed' },
      ]},
      { type: 'heading', value: 'Size & Speed Words' },
      { type: 'bullets', items: [
        { text: 'big', highlight: true, description: 'large, huge, enormous, giant' },
        { text: 'small', highlight: true, description: 'little, tiny, mini, petite' },
        { text: 'fast', highlight: true, description: 'quick, speedy, rapid, swift' },
      ]},
      { type: 'text', value: 'When you learn a new word, think of one synonym to double your vocabulary.' },
    ],
  ),

  // ==================== MATHS — Numbers ====================
  'math-topic-1': makeTopic('math-topic-1', 'Counting 1 to 10', 'Numbers', 'Mathematics',
    [
      { type: 'text', value: 'Counting means saying numbers in order.' },
      { type: 'highlight-box', value: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10' },
    ],
    [
      { type: 'heading', value: 'What is Counting?' },
      { type: 'text', value: 'Counting tells us how many things there are.' },
      { type: 'highlight-box', value: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10' },
      { type: 'heading', value: 'How to Count' },
      { type: 'bullets', items: [
        { text: 'Point to each thing as you count' },
        { text: 'Say one number for each thing' },
        { text: 'The last number you say is the total' },
      ]},
    ],
    [
      { type: 'heading', value: 'Why Do We Count?' },
      { type: 'text', value: 'Counting helps us know "how many" of something there is.' },
      { type: 'highlight-box', value: '1 one, 2 two, 3 three, 4 four, 5 five, 6 six, 7 seven, 8 eight, 9 nine, 10 ten' },
      { type: 'heading', value: 'Counting Rules' },
      { type: 'bullets', items: [
        { text: 'Say one number for each object' },
        { text: 'Don\'t skip any objects' },
        { text: 'Don\'t count the same object twice' },
        { text: 'The last number is your answer' },
      ]},
      { type: 'heading', value: 'Practice Ideas' },
      { type: 'bullets', items: [
        { text: 'Count your fingers' },
        { text: 'Count steps as you walk' },
        { text: 'Count toys in your room' },
      ]},
    ],
  ),

  'math-topic-2': makeTopic('math-topic-2', 'Counting 11 to 20', 'Numbers', 'Mathematics',
    [
      { type: 'highlight-box', value: '11, 12, 13, 14, 15, 16, 17, 18, 19, 20' },
      { type: 'text', value: 'These numbers come after 10.' },
    ],
    [
      { type: 'heading', value: 'Numbers After 10' },
      { type: 'highlight-box', value: '11 eleven, 12 twelve, 13 thirteen, 14 fourteen, 15 fifteen' },
      { type: 'highlight-box', value: '16 sixteen, 17 seventeen, 18 eighteen, 19 nineteen, 20 twenty' },
      { type: 'heading', value: 'Patterns to Notice' },
      { type: 'bullets', items: [
        { text: '11 and 12 have special names' },
        { text: '13–19 all end in "-teen"' },
        { text: '20 is called "twenty"' },
      ]},
    ],
    [
      { type: 'heading', value: 'The Teen Numbers' },
      { type: 'text', value: 'Numbers from 13 to 19 are called "teen" numbers.' },
      { type: 'text', value: 'They are made of 10 + a single digit.' },
      { type: 'bullets', items: [
        { text: '13 = 10 + 3', highlight: true, description: 'thirteen' },
        { text: '14 = 10 + 4', highlight: true, description: 'fourteen' },
        { text: '15 = 10 + 5', highlight: true, description: 'fifteen' },
        { text: '16 = 10 + 6', highlight: true, description: 'sixteen' },
        { text: '17 = 10 + 7', highlight: true, description: 'seventeen' },
      ]},
      { type: 'heading', value: 'Special Numbers' },
      { type: 'bullets', items: [
        { text: '11 (eleven) and 12 (twelve) don\'t follow the "-teen" pattern' },
        { text: '20 (twenty) starts a new group of tens' },
      ]},
    ],
  ),

  'math-topic-3': makeTopic('math-topic-3', 'Number Order', 'Numbers', 'Mathematics',
    [
      { type: 'text', value: 'Numbers go in order from smallest to biggest.' },
      { type: 'highlight-box', value: '1 < 2 < 3 < 4 < 5 ...' },
    ],
    [
      { type: 'heading', value: 'Before and After' },
      { type: 'bullets', items: [
        { text: '3 comes before 4' },
        { text: '7 comes after 6' },
        { text: '5 is between 4 and 6' },
      ]},
      { type: 'heading', value: 'Bigger and Smaller' },
      { type: 'bullets', items: [
        { text: '8 is bigger than 5', highlight: true },
        { text: '2 is smaller than 9', highlight: true },
      ]},
      { type: 'highlight-box', value: 'The number further along the line is always bigger.' },
    ],
    [
      { type: 'heading', value: 'The Number Line' },
      { type: 'highlight-box', value: '1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10' },
      { type: 'text', value: 'A number line shows numbers in order.' },
      { type: 'heading', value: 'Comparing Numbers' },
      { type: 'bullets', items: [
        { text: '> means greater than', highlight: true, description: '5 > 3 (5 is more than 3)' },
        { text: '< means less than', highlight: true, description: '2 < 7 (2 is less than 7)' },
        { text: '= means equal to', highlight: true, description: '4 = 4 (same amount)' },
      ]},
      { type: 'heading', value: 'Ordering Numbers' },
      { type: 'bullets', items: [
        { text: 'Smallest to biggest: 2, 5, 8, 10' },
        { text: 'Biggest to smallest: 10, 8, 5, 2' },
      ]},
    ],
  ),

  'math-topic-4': makeTopic('math-topic-4', 'Number Shapes', 'Numbers', 'Mathematics',
    [
      { type: 'text', value: 'Each number has its own shape when you write it.' },
      { type: 'text', value: 'Practice writing each number from 0 to 9.' },
    ],
    [
      { type: 'heading', value: 'Writing Numbers' },
      { type: 'text', value: 'Each digit 0–9 has a special way to write it.' },
      { type: 'bullets', items: [
        { text: 'Start at the top for most numbers' },
        { text: 'Use lines and curves' },
        { text: 'Practice on lined paper' },
      ]},
      { type: 'heading', value: 'Tips' },
      { type: 'bullets', items: [
        { text: '1 is just a straight line' },
        { text: '0 is a smooth oval' },
        { text: '8 looks like a snowman' },
      ]},
    ],
    [
      { type: 'heading', value: 'The Digits 0–9' },
      { type: 'text', value: 'Every number is made using just 10 digits.' },
      { type: 'highlight-box', value: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9' },
      { type: 'heading', value: 'Writing Tips' },
      { type: 'bullets', items: [
        { text: '0', highlight: true, description: 'Smooth oval, start at the top' },
        { text: '1', highlight: true, description: 'Straight line down' },
        { text: '2', highlight: true, description: 'Curve right, then slide left' },
        { text: '3', highlight: true, description: 'Two curves stacked' },
        { text: '5', highlight: true, description: 'Line down, curve round, hat on top' },
        { text: '8', highlight: true, description: 'Like a sideways "S" that joins up' },
      ]},
      { type: 'heading', value: 'Practice' },
      { type: 'text', value: 'Write each digit 5 times. Try to keep them the same size.' },
    ],
  ),

  // ==================== MATHS — Addition ====================
  'math-topic-5': makeTopic('math-topic-5', 'What is Addition?', 'Addition', 'Mathematics',
    [
      { type: 'text', value: 'Addition means putting numbers together to get a bigger number.' },
      { type: 'highlight-box', value: '2 + 3 = 5' },
    ],
    [
      { type: 'heading', value: 'Adding Means Combining' },
      { type: 'text', value: 'When you add, you combine groups to find the total.' },
      { type: 'highlight-box', value: '2 + 3 = 5 → two apples and three apples makes five apples' },
      { type: 'heading', value: 'The Plus Sign' },
      { type: 'text', value: 'The + sign means "add" or "put together".' },
      { type: 'text', value: 'The = sign means "equals" or "makes".' },
    ],
    [
      { type: 'heading', value: 'Understanding Addition' },
      { type: 'text', value: 'Addition answers the question: "How many altogether?"' },
      { type: 'highlight-box', value: 'Part + Part = Whole' },
      { type: 'heading', value: 'Ways to Add' },
      { type: 'bullets', items: [
        { text: 'Count on your fingers', highlight: true },
        { text: 'Use objects like blocks or counters', highlight: true },
        { text: 'Draw pictures', highlight: true },
        { text: 'Use a number line', highlight: true },
      ]},
      { type: 'heading', value: 'Simple Sums' },
      { type: 'bullets', items: [
        { text: '1 + 1 = 2' },
        { text: '2 + 2 = 4' },
        { text: '3 + 2 = 5' },
        { text: '4 + 3 = 7' },
        { text: '5 + 5 = 10' },
      ]},
    ],
  ),

  'math-topic-6': makeTopic('math-topic-6', 'Adding to 10', 'Addition', 'Mathematics',
    [
      { type: 'text', value: 'Practice adding small numbers that make 10 or less.' },
      { type: 'highlight-box', value: '6 + 4 = 10' },
    ],
    [
      { type: 'heading', value: 'Number Bonds to 10' },
      { type: 'text', value: 'Number bonds are pairs of numbers that add up to 10.' },
      { type: 'bullets', items: [
        { text: '1 + 9 = 10', highlight: true },
        { text: '2 + 8 = 10', highlight: true },
        { text: '3 + 7 = 10', highlight: true },
        { text: '4 + 6 = 10', highlight: true },
        { text: '5 + 5 = 10', highlight: true },
      ]},
      { type: 'text', value: 'Memorise these — they help with bigger sums later!' },
    ],
    [
      { type: 'heading', value: 'Number Bonds to 10' },
      { type: 'highlight-box', value: '0+10, 1+9, 2+8, 3+7, 4+6, 5+5' },
      { type: 'text', value: 'These pairs always add up to 10.' },
      { type: 'heading', value: 'Using a Number Line' },
      { type: 'bullets', items: [
        { text: 'Start at the first number' },
        { text: 'Jump forward by the second number' },
        { text: 'Where you land is the answer' },
      ]},
      { type: 'heading', value: 'Practice Sums' },
      { type: 'bullets', items: [
        { text: '3 + 4 = ?', description: 'Answer: 7' },
        { text: '5 + 3 = ?', description: 'Answer: 8' },
        { text: '2 + 6 = ?', description: 'Answer: 8' },
        { text: '7 + 2 = ?', description: 'Answer: 9' },
      ]},
    ],
  ),

  'math-topic-7': makeTopic('math-topic-7', 'Adding Doubles', 'Addition', 'Mathematics',
    [
      { type: 'text', value: 'Doubles are when you add a number to itself.' },
      { type: 'highlight-box', value: '3 + 3 = 6' },
    ],
    [
      { type: 'heading', value: 'What are Doubles?' },
      { type: 'text', value: 'When both numbers are the same, it\'s a double.' },
      { type: 'bullets', items: [
        { text: '1 + 1 = 2', highlight: true },
        { text: '2 + 2 = 4', highlight: true },
        { text: '3 + 3 = 6', highlight: true },
        { text: '4 + 4 = 8', highlight: true },
        { text: '5 + 5 = 10', highlight: true },
      ]},
      { type: 'text', value: 'Doubles are easy to remember!' },
    ],
    [
      { type: 'heading', value: 'Doubles Facts' },
      { type: 'bullets', items: [
        { text: '1 + 1 = 2' },
        { text: '2 + 2 = 4' },
        { text: '3 + 3 = 6' },
        { text: '4 + 4 = 8' },
        { text: '5 + 5 = 10' },
        { text: '6 + 6 = 12' },
        { text: '7 + 7 = 14' },
        { text: '8 + 8 = 16' },
        { text: '9 + 9 = 18' },
        { text: '10 + 10 = 20' },
      ]},
      { type: 'heading', value: 'Near Doubles' },
      { type: 'text', value: 'If you know 3 + 3 = 6, then 3 + 4 = 7 (just one more!).' },
      { type: 'bullets', items: [
        { text: '5 + 6', highlight: true, description: '5 + 5 = 10, plus 1 more = 11' },
        { text: '4 + 5', highlight: true, description: '4 + 4 = 8, plus 1 more = 9' },
      ]},
    ],
  ),

  // ==================== MATHS — Subtraction ====================
  'math-topic-8': makeTopic('math-topic-8', 'What is Subtraction?', 'Subtraction', 'Mathematics',
    [
      { type: 'text', value: 'Subtraction means taking away.' },
      { type: 'highlight-box', value: '5 − 2 = 3' },
    ],
    [
      { type: 'heading', value: 'Taking Away' },
      { type: 'text', value: 'Subtraction tells us how many are left.' },
      { type: 'highlight-box', value: '5 − 2 = 3 → five sweets, eat two, three left' },
      { type: 'heading', value: 'The Minus Sign' },
      { type: 'text', value: 'The − sign means "take away" or "subtract".' },
    ],
    [
      { type: 'heading', value: 'Understanding Subtraction' },
      { type: 'text', value: 'Subtraction answers: "How many are left?"' },
      { type: 'highlight-box', value: 'Whole − Part = Part left over' },
      { type: 'heading', value: 'Ways to Subtract' },
      { type: 'bullets', items: [
        { text: 'Count backwards on your fingers', highlight: true },
        { text: 'Cross out objects in a picture', highlight: true },
        { text: 'Jump backwards on a number line', highlight: true },
      ]},
      { type: 'heading', value: 'Simple Subtractions' },
      { type: 'bullets', items: [
        { text: '4 − 1 = 3' },
        { text: '6 − 2 = 4' },
        { text: '8 − 3 = 5' },
        { text: '10 − 5 = 5' },
      ]},
    ],
  ),

  // ==================== SCIENCE — Living Things ====================
  'sci-topic-1': makeTopic('sci-topic-1', 'What are Living Things?', 'Living Things', 'Science',
    [
      { type: 'text', value: 'Living things grow, move, eat, and breathe.' },
      { type: 'highlight-box', value: 'People, animals, and plants are all living things.' },
    ],
    [
      { type: 'heading', value: 'Living vs Non-Living' },
      { type: 'text', value: 'Living things do special things that non-living things cannot.' },
      { type: 'heading', value: 'What Living Things Do' },
      { type: 'bullets', items: [
        { text: 'Grow', highlight: true, description: 'They get bigger over time' },
        { text: 'Move', highlight: true, description: 'They can move on their own' },
        { text: 'Eat', highlight: true, description: 'They need food for energy' },
        { text: 'Breathe', highlight: true, description: 'They need air' },
        { text: 'Reproduce', highlight: true, description: 'They can make new living things' },
      ]},
    ],
    [
      { type: 'heading', value: 'Characteristics of Living Things' },
      { type: 'text', value: 'Scientists use 7 signs to decide if something is alive.' },
      { type: 'highlight-box', value: 'MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition' },
      { type: 'bullets', items: [
        { text: 'Movement', highlight: true, description: 'Can move by itself' },
        { text: 'Respiration', highlight: true, description: 'Uses air to get energy' },
        { text: 'Sensitivity', highlight: true, description: 'Reacts to the world around it' },
        { text: 'Growth', highlight: true, description: 'Gets bigger' },
        { text: 'Reproduction', highlight: true, description: 'Can make babies or seeds' },
        { text: 'Excretion', highlight: true, description: 'Gets rid of waste' },
        { text: 'Nutrition', highlight: true, description: 'Needs food or sunlight' },
      ]},
      { type: 'heading', value: 'Examples' },
      { type: 'bullets', items: [
        { text: 'Living', highlight: true, description: 'dog, tree, fish, butterfly, you!' },
        { text: 'Non-living', description: 'rock, water, chair, pencil' },
      ]},
    ],
  ),

  'sci-topic-2': makeTopic('sci-topic-2', 'Animals', 'Living Things', 'Science',
    [
      { type: 'text', value: 'Animals are living things that can move and eat food.' },
      { type: 'bullets', items: [
        { text: 'Mammals', highlight: true, description: 'dogs, cats, humans' },
        { text: 'Birds', highlight: true, description: 'eagles, penguins' },
        { text: 'Fish', highlight: true, description: 'goldfish, sharks' },
      ]},
    ],
    [
      { type: 'heading', value: 'Types of Animals' },
      { type: 'bullets', items: [
        { text: 'Mammals', highlight: true, description: 'Have fur or hair, feed babies milk' },
        { text: 'Birds', highlight: true, description: 'Have feathers, most can fly' },
        { text: 'Fish', highlight: true, description: 'Live in water, have scales and fins' },
        { text: 'Reptiles', highlight: true, description: 'Have dry scaly skin (lizards, snakes)' },
        { text: 'Insects', highlight: true, description: 'Have 6 legs (ants, bees, butterflies)' },
      ]},
    ],
    [
      { type: 'heading', value: 'Animal Groups' },
      { type: 'bullets', items: [
        { text: 'Mammals', highlight: true, description: 'Warm-blooded, fur/hair, feed babies milk: dogs, cats, whales' },
        { text: 'Birds', highlight: true, description: 'Feathers, beaks, lay eggs: eagles, penguins, robins' },
        { text: 'Fish', highlight: true, description: 'Scales, fins, breathe through gills: goldfish, sharks, clownfish' },
        { text: 'Reptiles', highlight: true, description: 'Cold-blooded, scaly skin: lizards, snakes, turtles' },
        { text: 'Amphibians', highlight: true, description: 'Live on land and water: frogs, newts, toads' },
        { text: 'Insects', highlight: true, description: '6 legs, 3 body parts: ants, bees, ladybirds' },
      ]},
      { type: 'heading', value: 'What Animals Need' },
      { type: 'bullets', items: [
        { text: 'Food and water' },
        { text: 'Air to breathe' },
        { text: 'Shelter (a safe place to live)' },
      ]},
    ],
  ),

  'sci-topic-3': makeTopic('sci-topic-3', 'Plants', 'Living Things', 'Science',
    [
      { type: 'text', value: 'Plants are living things that make their own food using sunlight.' },
      { type: 'highlight-box', value: 'Plants need: sunlight, water, air, and soil.' },
    ],
    [
      { type: 'heading', value: 'Parts of a Plant' },
      { type: 'bullets', items: [
        { text: 'Roots', highlight: true, description: 'Hold the plant in soil, drink water' },
        { text: 'Stem', highlight: true, description: 'Holds the plant up, carries water' },
        { text: 'Leaves', highlight: true, description: 'Make food from sunlight' },
        { text: 'Flower', highlight: true, description: 'Makes seeds for new plants' },
      ]},
      { type: 'heading', value: 'What Plants Need' },
      { type: 'highlight-box', value: 'Sunlight + Water + Air + Soil = Healthy Plant' },
    ],
    [
      { type: 'heading', value: 'How Plants Grow' },
      { type: 'bullets', items: [
        { text: 'A seed is planted in soil' },
        { text: 'It gets water and sunlight' },
        { text: 'A root grows down into the soil' },
        { text: 'A shoot grows up towards the light' },
        { text: 'Leaves open and start making food' },
        { text: 'The plant grows bigger and may flower' },
      ]},
      { type: 'heading', value: 'Parts of a Plant' },
      { type: 'bullets', items: [
        { text: 'Roots', highlight: true, description: 'Anchor the plant, absorb water and nutrients' },
        { text: 'Stem', highlight: true, description: 'Supports the plant, transports water' },
        { text: 'Leaves', highlight: true, description: 'Use sunlight to make food (photosynthesis)' },
        { text: 'Flowers', highlight: true, description: 'Attract bees, make seeds' },
        { text: 'Seeds', highlight: true, description: 'Grow into new plants' },
      ]},
    ],
  ),

  // ==================== SCIENCE — Plants unit ====================
  'sci-topic-4': makeTopic('sci-topic-4', 'Seeds and Growth', 'Plants', 'Science',
    [
      { type: 'text', value: 'Seeds contain a tiny plant inside, ready to grow.' },
      { type: 'highlight-box', value: 'Seed → Sprout → Seedling → Adult Plant' },
    ],
    [
      { type: 'heading', value: 'What is a Seed?' },
      { type: 'text', value: 'A seed is like a little package with everything a plant needs to start growing.' },
      { type: 'heading', value: 'How Seeds Grow' },
      { type: 'bullets', items: [
        { text: 'Plant the seed in soil' },
        { text: 'Give it water' },
        { text: 'The seed cracks open (germination)' },
        { text: 'A root grows down, a shoot grows up' },
      ]},
      { type: 'heading', value: 'Types of Seeds' },
      { type: 'bullets', items: [
        { text: 'Tiny seeds', description: 'like poppy and grass seeds' },
        { text: 'Big seeds', description: 'like avocado and coconut' },
      ]},
    ],
    [
      { type: 'heading', value: 'Inside a Seed' },
      { type: 'bullets', items: [
        { text: 'Seed coat', highlight: true, description: 'Protects the seed like a jacket' },
        { text: 'Food store', highlight: true, description: 'Gives energy for the first days of growth' },
        { text: 'Embryo', highlight: true, description: 'The tiny baby plant inside' },
      ]},
      { type: 'heading', value: 'Germination' },
      { type: 'text', value: 'Germination is when a seed starts to grow.' },
      { type: 'highlight-box', value: 'Seeds need warmth + water + air to germinate' },
      { type: 'heading', value: 'Life Cycle of a Plant' },
      { type: 'bullets', items: [
        { text: 'Seed' },
        { text: 'Sprout (first tiny shoot)' },
        { text: 'Seedling (small plant with leaves)' },
        { text: 'Adult plant (fully grown)' },
        { text: 'Flowers and new seeds' },
      ]},
    ],
  ),

  // ==================== GEOGRAPHY — Introduction ====================
  'geo-topic-1': makeTopic('geo-topic-1', 'What is Geography?', 'Introduction', 'Geography',
    [
      { type: 'text', value: 'Geography is the study of the Earth and its features.' },
      { type: 'highlight-box', value: 'Geography = learning about places, people, and nature.' },
    ],
    [
      { type: 'heading', value: 'What Do Geographers Study?' },
      { type: 'bullets', items: [
        { text: 'Mountains, rivers, and oceans', highlight: true },
        { text: 'Countries and cities', highlight: true },
        { text: 'Weather and climate', highlight: true },
        { text: 'How people live around the world', highlight: true },
      ]},
      { type: 'text', value: 'Geography helps us understand the world around us.' },
    ],
    [
      { type: 'heading', value: 'What is Geography?' },
      { type: 'text', value: 'Geography comes from a Greek word meaning "writing about the Earth".' },
      { type: 'heading', value: 'Two Types of Geography' },
      { type: 'bullets', items: [
        { text: 'Physical Geography', highlight: true, description: 'Mountains, rivers, volcanoes, weather' },
        { text: 'Human Geography', highlight: true, description: 'People, cities, cultures, languages' },
      ]},
      { type: 'heading', value: 'Tools Geographers Use' },
      { type: 'bullets', items: [
        { text: 'Maps', description: 'Show where things are' },
        { text: 'Globes', description: 'A round model of Earth' },
        { text: 'Compasses', description: 'Show direction (North, South, East, West)' },
        { text: 'Satellites', description: 'Take photos of Earth from space' },
      ]},
    ],
  ),

  'geo-topic-2': makeTopic('geo-topic-2', 'Maps and Directions', 'Introduction', 'Geography',
    [
      { type: 'text', value: 'Maps are pictures that show us where things are.' },
      { type: 'highlight-box', value: 'N = North, S = South, E = East, W = West' },
    ],
    [
      { type: 'heading', value: 'What is a Map?' },
      { type: 'text', value: 'A map is a flat drawing of a place seen from above.' },
      { type: 'heading', value: 'The Four Directions' },
      { type: 'bullets', items: [
        { text: 'North', highlight: true, description: 'Up on the map' },
        { text: 'South', highlight: true, description: 'Down on the map' },
        { text: 'East', highlight: true, description: 'Right on the map' },
        { text: 'West', highlight: true, description: 'Left on the map' },
      ]},
      { type: 'highlight-box', value: 'Remember: Never Eat Soggy Waffles (N, E, S, W clockwise)' },
    ],
    [
      { type: 'heading', value: 'Types of Maps' },
      { type: 'bullets', items: [
        { text: 'Street maps', description: 'Show roads and buildings' },
        { text: 'World maps', description: 'Show all countries' },
        { text: 'Weather maps', description: 'Show sun, rain, and clouds' },
        { text: 'Treasure maps', description: 'Lead to hidden objects (fun!)' },
      ]},
      { type: 'heading', value: 'Map Features' },
      { type: 'bullets', items: [
        { text: 'Key / Legend', highlight: true, description: 'Explains the symbols on the map' },
        { text: 'Compass Rose', highlight: true, description: 'Shows North, South, East, West' },
        { text: 'Scale', highlight: true, description: 'Shows how big the real place is' },
      ]},
      { type: 'heading', value: 'Compass Directions' },
      { type: 'highlight-box', value: 'North (up) — East (right) — South (down) — West (left)' },
      { type: 'text', value: 'Practice: Stand up and point North. Now turn to face East!' },
    ],
  ),

  // ==================== ART — Introduction ====================
  'art-topic-1': makeTopic('art-topic-1', 'Primary Colours', 'Introduction', 'Art',
    [
      { type: 'text', value: 'Primary colours cannot be made by mixing other colours.' },
      { type: 'highlight-box', value: 'Red, Blue, Yellow' },
    ],
    [
      { type: 'heading', value: 'The 3 Primary Colours' },
      { type: 'highlight-box', value: 'Red 🔴  Blue 🔵  Yellow 🟡' },
      { type: 'text', value: 'These are special because you cannot make them by mixing.' },
      { type: 'heading', value: 'Mixing Primary Colours' },
      { type: 'bullets', items: [
        { text: 'Red + Blue', highlight: true, description: '= Purple' },
        { text: 'Red + Yellow', highlight: true, description: '= Orange' },
        { text: 'Blue + Yellow', highlight: true, description: '= Green' },
      ]},
    ],
    [
      { type: 'heading', value: 'Primary Colours' },
      { type: 'highlight-box', value: 'Red, Blue, Yellow — the building blocks of all colours' },
      { type: 'text', value: 'You cannot make primary colours by mixing other colours together.' },
      { type: 'heading', value: 'Secondary Colours' },
      { type: 'text', value: 'When you mix two primary colours, you get a secondary colour.' },
      { type: 'bullets', items: [
        { text: 'Red + Blue = Purple', highlight: true },
        { text: 'Red + Yellow = Orange', highlight: true },
        { text: 'Blue + Yellow = Green', highlight: true },
      ]},
      { type: 'heading', value: 'The Colour Wheel' },
      { type: 'text', value: 'A colour wheel shows how colours are related.' },
      { type: 'bullets', items: [
        { text: 'Primary colours are spaced evenly around the wheel' },
        { text: 'Secondary colours sit between the primaries that make them' },
        { text: 'Opposite colours on the wheel are called complementary colours' },
      ]},
      { type: 'heading', value: 'Try It!' },
      { type: 'text', value: 'Get red, blue, and yellow paint. Mix them in pairs to discover the secondary colours yourself!' },
    ],
  ),

  'art-topic-2': makeTopic('art-topic-2', 'Shapes in Art', 'Introduction', 'Art',
    [
      { type: 'text', value: 'Artists use shapes to create pictures and designs.' },
      { type: 'highlight-box', value: 'Circle, Square, Triangle, Rectangle' },
    ],
    [
      { type: 'heading', value: 'Basic Shapes' },
      { type: 'bullets', items: [
        { text: 'Circle', highlight: true, description: 'Round, no corners' },
        { text: 'Square', highlight: true, description: '4 equal sides, 4 corners' },
        { text: 'Triangle', highlight: true, description: '3 sides, 3 corners' },
        { text: 'Rectangle', highlight: true, description: '4 sides, 2 long and 2 short' },
      ]},
      { type: 'heading', value: 'Shapes in Real Life' },
      { type: 'bullets', items: [
        { text: 'Clock = circle' },
        { text: 'Window = square or rectangle' },
        { text: 'Roof = triangle' },
      ]},
    ],
    [
      { type: 'heading', value: '2D Shapes' },
      { type: 'text', value: '2D shapes are flat. You can draw them on paper.' },
      { type: 'bullets', items: [
        { text: 'Circle', highlight: true, description: '0 sides, 0 corners — perfectly round' },
        { text: 'Triangle', highlight: true, description: '3 sides, 3 corners' },
        { text: 'Square', highlight: true, description: '4 equal sides, 4 right-angle corners' },
        { text: 'Rectangle', highlight: true, description: '4 sides (2 pairs of equal sides)' },
        { text: 'Oval', highlight: true, description: 'Like a stretched circle' },
        { text: 'Diamond', highlight: true, description: 'Like a tilted square' },
      ]},
      { type: 'heading', value: 'Drawing with Shapes' },
      { type: 'text', value: 'You can draw almost anything using basic shapes!' },
      { type: 'bullets', items: [
        { text: 'House', description: 'Square + triangle roof + rectangle door' },
        { text: 'Tree', description: 'Rectangle trunk + circle or triangle top' },
        { text: 'Face', description: 'Circle head + circle eyes + curved line smile' },
      ]},
    ],
  ),

  // ==================== MUSIC — Introduction ====================
  'music-topic-1': makeTopic('music-topic-1', 'What is Music?', 'Introduction', 'Music',
    [
      { type: 'text', value: 'Music is sounds arranged in a pleasing way.' },
      { type: 'highlight-box', value: 'Music has: rhythm, melody, and beat.' },
    ],
    [
      { type: 'heading', value: 'Parts of Music' },
      { type: 'bullets', items: [
        { text: 'Beat', highlight: true, description: 'The steady pulse you can clap to' },
        { text: 'Rhythm', highlight: true, description: 'The pattern of long and short sounds' },
        { text: 'Melody', highlight: true, description: 'The tune you can sing or hum' },
      ]},
      { type: 'heading', value: 'Music is Everywhere' },
      { type: 'bullets', items: [
        { text: 'Songs on the radio' },
        { text: 'Birds singing' },
        { text: 'Clapping your hands' },
        { text: 'Rain on a window' },
      ]},
    ],
    [
      { type: 'heading', value: 'The Building Blocks of Music' },
      { type: 'bullets', items: [
        { text: 'Beat', highlight: true, description: 'The steady pulse — like a heartbeat' },
        { text: 'Rhythm', highlight: true, description: 'The pattern of sounds — like words in a sentence' },
        { text: 'Melody', highlight: true, description: 'The tune — the part you sing' },
        { text: 'Tempo', highlight: true, description: 'How fast or slow the music is' },
        { text: 'Volume', highlight: true, description: 'How loud or quiet the music is (dynamics)' },
      ]},
      { type: 'heading', value: 'Loud and Quiet' },
      { type: 'bullets', items: [
        { text: 'Forte (f)', highlight: true, description: 'Loud' },
        { text: 'Piano (p)', highlight: true, description: 'Quiet' },
      ]},
      { type: 'heading', value: 'Try This!' },
      { type: 'text', value: 'Clap a steady beat. Now try clapping faster — you changed the tempo!' },
      { type: 'text', value: 'Clap loudly then quietly — you changed the dynamics!' },
    ],
  ),

  'music-topic-2': makeTopic('music-topic-2', 'Musical Instruments', 'Introduction', 'Music',
    [
      { type: 'text', value: 'Instruments are tools we use to make music.' },
      { type: 'highlight-box', value: 'Families: strings, wind, percussion' },
    ],
    [
      { type: 'heading', value: 'Instrument Families' },
      { type: 'bullets', items: [
        { text: 'String instruments', highlight: true, description: 'Guitar, violin, harp — have strings you pluck or bow' },
        { text: 'Wind instruments', highlight: true, description: 'Flute, trumpet, recorder — you blow into them' },
        { text: 'Percussion', highlight: true, description: 'Drums, tambourine, xylophone — you hit or shake them' },
      ]},
    ],
    [
      { type: 'heading', value: 'String Instruments' },
      { type: 'text', value: 'These instruments have strings that vibrate to make sound.' },
      { type: 'bullets', items: [
        { text: 'Guitar', description: 'Strum or pluck the strings' },
        { text: 'Violin', description: 'Use a bow across the strings' },
        { text: 'Piano', description: 'Has strings inside that are hit by hammers when you press keys' },
      ]},
      { type: 'heading', value: 'Wind Instruments' },
      { type: 'text', value: 'You blow air into these to make sound.' },
      { type: 'bullets', items: [
        { text: 'Recorder', description: 'A simple wooden or plastic pipe' },
        { text: 'Flute', description: 'A metal tube you blow across' },
        { text: 'Trumpet', description: 'A brass instrument with valves' },
      ]},
      { type: 'heading', value: 'Percussion Instruments' },
      { type: 'text', value: 'You hit, shake, or scrape these to make sound.' },
      { type: 'bullets', items: [
        { text: 'Drum', description: 'Hit with sticks or hands' },
        { text: 'Tambourine', description: 'Shake or tap it' },
        { text: 'Xylophone', description: 'Hit the bars with mallets' },
      ]},
    ],
  ),

  // Keep old IDs as aliases for backward compatibility
  'topic-1': undefined as unknown as TopicData,
  'topic-2': undefined as unknown as TopicData,
  'topic-3': undefined as unknown as TopicData,
  'topic-4': undefined as unknown as TopicData,
  'topic-5': undefined as unknown as TopicData,
  'topic-6': undefined as unknown as TopicData,
  'topic-7': undefined as unknown as TopicData,
  'topic-8': undefined as unknown as TopicData,
};

// Set up backward-compatible aliases
topicExplanations['topic-1'] = topicExplanations['eng-topic-1'];
topicExplanations['topic-2'] = topicExplanations['eng-topic-2'];
topicExplanations['topic-3'] = topicExplanations['eng-topic-3'];
topicExplanations['topic-4'] = topicExplanations['eng-topic-4'];
topicExplanations['topic-5'] = topicExplanations['eng-topic-5'];
topicExplanations['topic-6'] = topicExplanations['eng-topic-6'];
topicExplanations['topic-7'] = topicExplanations['eng-topic-7'];
topicExplanations['topic-8'] = topicExplanations['eng-topic-8'];

// Helper to get plain text for TTS
export const getPlainText = (content: ContentBlock[]): string => {
  return content.map(block => {
    if (block.type === 'text' || block.type === 'heading' || block.type === 'highlight-box') {
      return (block as { type: string; value: string }).value;
    }
    if (block.type === 'bullets') {
      return (block as BulletsBlock).items.map(item =>
        item.description ? `${item.text}: ${item.description}` : item.text
      ).join('. ');
    }
    return '';
  }).join('. ');
};
