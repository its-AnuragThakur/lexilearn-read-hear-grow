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

export const topicExplanations: Record<string, TopicData> = {
  'topic-1': {
    id: 'topic-1',
    name: 'Introduction to Letters',
    unitName: 'Basic Reading',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Letters are symbols we use to write words.' },
          { type: 'highlight-box', value: 'The English alphabet has 26 letters.' },
          { type: 'text', value: 'Each letter has an uppercase (big) and lowercase (small) form.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What are Letters?' },
          { type: 'text', value: 'Letters are the building blocks of words.' },
          { type: 'text', value: 'We use letters to write everything we read.' },
          { type: 'highlight-box', value: 'There are 26 letters in the English alphabet.' },
          { type: 'heading', value: 'Two Forms of Each Letter' },
          { type: 'text', value: 'Every letter comes in two forms:' },
          { type: 'bullets', items: [
            { text: 'Uppercase (capital)', highlight: true, description: 'A, B, C, D...' },
            { text: 'Lowercase (small)', highlight: true, description: 'a, b, c, d...' },
          ]},
          { type: 'text', value: 'We use uppercase letters at the start of sentences and names.' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'What are Letters?' },
          { type: 'text', value: 'Letters are symbols that represent sounds.' },
          { type: 'text', value: 'When we put letters together, we make words.' },
          { type: 'text', value: 'Words help us communicate with each other.' },
          { type: 'highlight-box', value: 'The English alphabet: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z' },
          { type: 'heading', value: 'Uppercase and Lowercase' },
          { type: 'text', value: 'Each of the 26 letters has two forms.' },
          { type: 'bullets', items: [
            { text: 'Uppercase (Capital Letters)', highlight: true, description: 'These are the big letters: A, B, C' },
            { text: 'Lowercase (Small Letters)', highlight: true, description: 'These are the small letters: a, b, c' },
          ]},
          { type: 'heading', value: 'When to Use Uppercase' },
          { type: 'bullets', items: [
            { text: 'At the start of a sentence' },
            { text: 'For names of people and places' },
            { text: 'For the word "I"' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'Try writing each letter of the alphabet.' },
          { type: 'text', value: 'Write the uppercase letter first, then the lowercase one next to it.' },
          { type: 'text', value: 'This helps you remember both forms.' },
        ],
      },
    },
  },

  'topic-2': {
    id: 'topic-2',
    name: 'Vowels and Consonants',
    unitName: 'Basic Reading',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'The alphabet has two types of letters:' },
          { type: 'bullets', items: [
            { text: 'Vowels', highlight: true, description: 'A, E, I, O, U' },
            { text: 'Consonants', highlight: true, description: 'All other letters' },
          ]},
          { type: 'text', value: 'Every word needs at least one vowel.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What are Vowels?' },
          { type: 'text', value: 'Vowels are special letters.' },
          { type: 'text', value: 'There are 5 vowels in English:' },
          { type: 'highlight-box', value: 'A, E, I, O, U' },
          { type: 'text', value: 'Vowels make open sounds.' },
          { type: 'text', value: 'Your mouth stays open when you say them.' },
          { type: 'heading', value: 'What are Consonants?' },
          { type: 'text', value: 'Consonants are all the other letters.' },
          { type: 'bullets', items: [
            { text: 'There are 21 consonants' },
            { text: 'Examples: B, C, D, F, G, H...' },
            { text: 'Your mouth closes a bit when you say them' },
          ]},
          { type: 'heading', value: 'Why does this matter?' },
          { type: 'text', value: 'Every word needs at least one vowel.' },
          { type: 'text', value: 'Knowing vowels helps you read better.' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'Understanding Vowels' },
          { type: 'text', value: 'The English alphabet has 26 letters.' },
          { type: 'text', value: 'These letters are divided into two groups.' },
          { type: 'highlight-box', value: 'The 5 Vowels: A, E, I, O, U' },
          { type: 'text', value: 'Here is what makes vowels special:' },
          { type: 'bullets', items: [
            { text: 'They make open sounds' },
            { text: 'Your mouth stays open when you say them' },
            { text: 'Every word must have at least one vowel' },
            { text: 'Sometimes the letter Y acts like a vowel too' },
          ]},
          { type: 'heading', value: 'Understanding Consonants' },
          { type: 'text', value: 'There are 21 consonants in English.' },
          { type: 'bullets', items: [
            { text: 'Consonants make different sounds than vowels' },
            { text: 'Your lips, tongue, or teeth touch when you say them' },
            { text: 'Examples: B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z' },
          ]},
          { type: 'heading', value: 'How Vowels and Consonants Work Together' },
          { type: 'text', value: 'Words are made by combining vowels and consonants.' },
          { type: 'bullets', items: [
            { text: 'CAT', highlight: true, description: 'C and T are consonants, A is a vowel' },
            { text: 'BEE', highlight: true, description: 'B is a consonant, E and E are vowels' },
            { text: 'DOG', highlight: true, description: 'D and G are consonants, O is a vowel' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'When you see a new word, find the vowels first.' },
          { type: 'text', value: 'This helps you break the word into parts.' },
        ],
      },
    },
  },

  'topic-3': {
    id: 'topic-3',
    name: 'Simple Words',
    unitName: 'Basic Reading',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Simple words are short words with 2–4 letters.' },
          { type: 'bullets', items: [
            { text: 'CVC words', highlight: true, description: 'Consonant-Vowel-Consonant like CAT, DOG, SIT' },
          ]},
          { type: 'text', value: 'Sound out each letter, then blend them together.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What are Simple Words?' },
          { type: 'text', value: 'Simple words are short and easy to sound out.' },
          { type: 'text', value: 'Most simple words follow a pattern called CVC.' },
          { type: 'highlight-box', value: 'CVC = Consonant + Vowel + Consonant' },
          { type: 'heading', value: 'Examples of CVC Words' },
          { type: 'bullets', items: [
            { text: 'CAT', highlight: true, description: 'C-A-T → sounds like "cat"' },
            { text: 'BIG', highlight: true, description: 'B-I-G → sounds like "big"' },
            { text: 'RUN', highlight: true, description: 'R-U-N → sounds like "run"' },
            { text: 'PEN', highlight: true, description: 'P-E-N → sounds like "pen"' },
          ]},
          { type: 'heading', value: 'How to Read Simple Words' },
          { type: 'bullets', items: [
            { text: 'Look at each letter' },
            { text: 'Say the sound of each letter' },
            { text: 'Blend the sounds together slowly' },
            { text: 'Say the word faster' },
          ]},
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'What Makes a Word Simple?' },
          { type: 'text', value: 'Simple words are words you can sound out letter by letter.' },
          { type: 'text', value: 'They are usually 2, 3, or 4 letters long.' },
          { type: 'text', value: 'The most common pattern is CVC.' },
          { type: 'highlight-box', value: 'CVC = Consonant + Vowel + Consonant' },
          { type: 'heading', value: 'CVC Word Families' },
          { type: 'text', value: 'Words that end with the same letters are called word families.' },
          { type: 'bullets', items: [
            { text: '-AT family', highlight: true, description: 'cat, bat, hat, mat, sat, rat' },
            { text: '-IG family', highlight: true, description: 'big, dig, fig, pig, wig' },
            { text: '-OT family', highlight: true, description: 'hot, dot, got, lot, pot, not' },
            { text: '-UN family', highlight: true, description: 'bun, fun, gun, run, sun' },
          ]},
          { type: 'heading', value: 'Steps to Read a Simple Word' },
          { type: 'bullets', items: [
            { text: 'Step 1: Point to the first letter and say its sound' },
            { text: 'Step 2: Move to the next letter and say its sound' },
            { text: 'Step 3: Move to the last letter and say its sound' },
            { text: 'Step 4: Say all the sounds together slowly' },
            { text: 'Step 5: Say the word faster until it sounds right' },
          ]},
          { type: 'heading', value: 'Two-Letter Words' },
          { type: 'text', value: 'Some simple words only have two letters.' },
          { type: 'bullets', items: [
            { text: 'Examples', description: 'am, an, at, if, in, is, it, on, up, us' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'Start with one word family at a time.' },
          { type: 'text', value: 'Change just the first letter to make new words.' },
          { type: 'text', value: 'For example: cat → bat → hat → mat.' },
        ],
      },
    },
  },

  'topic-4': {
    id: 'topic-4',
    name: 'Reading Short Sentences',
    unitName: 'Basic Reading',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'A sentence is a group of words that tells a complete idea.' },
          { type: 'highlight-box', value: 'The cat sat on the mat.' },
          { type: 'text', value: 'Every sentence starts with a capital letter and ends with a full stop.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What is a Sentence?' },
          { type: 'text', value: 'A sentence is a group of words that makes sense together.' },
          { type: 'text', value: 'It tells us something complete.' },
          { type: 'heading', value: 'Parts of a Sentence' },
          { type: 'bullets', items: [
            { text: 'Capital letter', highlight: true, description: 'Every sentence starts with one' },
            { text: 'Words in the middle', description: 'These tell the idea' },
            { text: 'Full stop (period)', highlight: true, description: 'Every sentence ends with one' },
          ]},
          { type: 'heading', value: 'Example Sentences' },
          { type: 'bullets', items: [
            { text: 'The dog is big.' },
            { text: 'I can run fast.' },
            { text: 'She has a red hat.' },
            { text: 'We like to play.' },
          ]},
          { type: 'heading', value: 'How to Read a Sentence' },
          { type: 'bullets', items: [
            { text: 'Read one word at a time' },
            { text: 'Point to each word as you read it' },
            { text: 'Stop at the full stop' },
            { text: 'Think about what the sentence means' },
          ]},
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'Understanding Sentences' },
          { type: 'text', value: 'Words on their own can be confusing.' },
          { type: 'text', value: 'When we put words together in the right order, they make a sentence.' },
          { type: 'text', value: 'A sentence tells us a complete idea.' },
          { type: 'highlight-box', value: 'A sentence = Subject + Action (+ more details)' },
          { type: 'heading', value: 'Rules for Sentences' },
          { type: 'bullets', items: [
            { text: 'Always start with a capital letter' },
            { text: 'Always end with a full stop, question mark, or exclamation mark' },
            { text: 'Must have a subject (who or what)' },
            { text: 'Must have an action (what happens)' },
          ]},
          { type: 'heading', value: 'Simple Sentence Examples' },
          { type: 'bullets', items: [
            { text: 'The cat sat.', highlight: true, description: 'Subject: the cat. Action: sat.' },
            { text: 'I can jump.', highlight: true, description: 'Subject: I. Action: can jump.' },
            { text: 'Birds fly high.', highlight: true, description: 'Subject: birds. Action: fly high.' },
          ]},
          { type: 'heading', value: 'Reading Sentences Step by Step' },
          { type: 'bullets', items: [
            { text: 'Step 1: Look at the whole sentence first' },
            { text: 'Step 2: Read one word at a time' },
            { text: 'Step 3: If a word is hard, sound it out' },
            { text: 'Step 4: Read the whole sentence again smoothly' },
            { text: 'Step 5: Ask yourself: what did it say?' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'Use your finger to point to each word as you read.' },
          { type: 'text', value: 'This helps your eyes follow along.' },
          { type: 'text', value: 'Read the sentence three times to get smoother.' },
        ],
      },
    },
  },

  'topic-5': {
    id: 'topic-5',
    name: 'Practice Reading',
    unitName: 'Basic Reading',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Practice makes reading easier and faster.' },
          { type: 'bullets', items: [
            { text: 'Read every day', highlight: true },
            { text: 'Start with easy books', highlight: true },
            { text: 'Read out loud', highlight: true },
          ]},
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'Why Practice Reading?' },
          { type: 'text', value: 'The more you read, the better you get.' },
          { type: 'text', value: 'Practice helps your brain recognise words faster.' },
          { type: 'heading', value: 'Ways to Practice' },
          { type: 'bullets', items: [
            { text: 'Read out loud', description: 'This helps you hear the words' },
            { text: 'Read with someone', description: 'They can help with hard words' },
            { text: 'Re-read favourite stories', description: 'Familiar words build confidence' },
            { text: 'Point to words as you read', description: 'This helps you focus' },
          ]},
          { type: 'heading', value: 'How Much to Practice' },
          { type: 'highlight-box', value: 'Try to read for 10–15 minutes every day.' },
          { type: 'text', value: 'Short daily practice is better than long sessions once a week.' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'The Power of Practice' },
          { type: 'text', value: 'Reading is like a muscle — it gets stronger with practice.' },
          { type: 'text', value: 'Every time you read, your brain gets faster at recognising words.' },
          { type: 'heading', value: 'Daily Reading Habits' },
          { type: 'highlight-box', value: 'Goal: Read for 10–15 minutes every day' },
          { type: 'bullets', items: [
            { text: 'Pick the same time each day', description: 'Before bed or after school works well' },
            { text: 'Find a quiet spot', description: 'Less noise means better focus' },
            { text: 'Choose books you enjoy', description: 'Fun books make practice easier' },
          ]},
          { type: 'heading', value: 'Reading Strategies' },
          { type: 'bullets', items: [
            { text: 'Sound it out', highlight: true, description: 'Break hard words into sounds' },
            { text: 'Look at pictures', highlight: true, description: 'Pictures give clues about the story' },
            { text: 'Skip and come back', highlight: true, description: 'If a word is too hard, read on and come back' },
            { text: 'Ask for help', highlight: true, description: 'It\'s okay to ask someone what a word means' },
          ]},
          { type: 'heading', value: 'Track Your Progress' },
          { type: 'text', value: 'Keep a reading log to see how much you\'ve read.' },
          { type: 'bullets', items: [
            { text: 'Write down the title of each book or story' },
            { text: 'Note how many pages or minutes you read' },
            { text: 'Give each book a star rating' },
          ]},
          { type: 'heading', value: 'Fun Reading Activities' },
          { type: 'bullets', items: [
            { text: 'Read to a pet or stuffed animal' },
            { text: 'Act out the story as you read it' },
            { text: 'Draw a picture of your favourite part' },
            { text: 'Tell someone what the story was about' },
          ]},
        ],
      },
    },
  },

  // Vocabulary unit topics
  'topic-6': {
    id: 'topic-6',
    name: 'Common Words',
    unitName: 'Vocabulary',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Common words are words we see and use every day.' },
          { type: 'highlight-box', value: 'the, and, is, it, you, that, he, was, for, on' },
          { type: 'text', value: 'Learning these words helps you read faster.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What are Common Words?' },
          { type: 'text', value: 'Some words appear in almost everything we read.' },
          { type: 'text', value: 'These are called common words or sight words.' },
          { type: 'heading', value: 'Top 10 Most Common Words' },
          { type: 'bullets', items: [
            { text: 'the', highlight: true, description: 'The most used word in English' },
            { text: 'and', highlight: true, description: 'Joins two ideas together' },
            { text: 'is / was', highlight: true, description: 'Tells us about something' },
            { text: 'you / he / she', highlight: true, description: 'Words for people' },
          ]},
          { type: 'heading', value: 'Why Learn Them?' },
          { type: 'text', value: 'These words make up about 50% of all writing.' },
          { type: 'text', value: 'If you know them by sight, you can read much faster.' },
          { type: 'highlight-box', value: 'Tip: Don\'t sound these out — just recognise them!' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'Sight Words' },
          { type: 'text', value: 'Sight words are words you should recognise instantly without sounding them out.' },
          { type: 'text', value: 'They appear so often that memorising them speeds up your reading.' },
          { type: 'heading', value: 'The First 20 Sight Words' },
          { type: 'highlight-box', value: 'the, of, and, a, to, in, is, you, that, it, he, was, for, on, are, as, with, his, they, I' },
          { type: 'heading', value: 'Groups of Common Words' },
          { type: 'bullets', items: [
            { text: 'People words', highlight: true, description: 'I, you, he, she, we, they' },
            { text: 'Action words', highlight: true, description: 'is, was, are, can, do, go' },
            { text: 'Connecting words', highlight: true, description: 'and, but, or, so, the, a' },
            { text: 'Place words', highlight: true, description: 'in, on, at, to, from, with' },
          ]},
          { type: 'heading', value: 'How to Learn Sight Words' },
          { type: 'bullets', items: [
            { text: 'Use flashcards and practise daily' },
            { text: 'Write each word 5 times' },
            { text: 'Find the words in books you read' },
            { text: 'Play word games with friends or family' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'Learn 3–5 new sight words each week.' },
          { type: 'text', value: 'Review old words while learning new ones.' },
        ],
      },
    },
  },

  'topic-7': {
    id: 'topic-7',
    name: 'Word Families',
    unitName: 'Vocabulary',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Word families are groups of words that rhyme and have the same ending.' },
          { type: 'highlight-box', value: '-at family: cat, bat, hat, mat, rat, sat' },
          { type: 'text', value: 'Knowing one word helps you read many others.' },
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What is a Word Family?' },
          { type: 'text', value: 'A word family is a group of words that share the same ending.' },
          { type: 'text', value: 'They rhyme with each other.' },
          { type: 'heading', value: 'Popular Word Families' },
          { type: 'bullets', items: [
            { text: '-at', highlight: true, description: 'cat, bat, hat, mat, rat, sat, fat' },
            { text: '-an', highlight: true, description: 'can, fan, man, pan, ran, van, tan' },
            { text: '-op', highlight: true, description: 'hop, mop, pop, top, stop, drop' },
            { text: '-ig', highlight: true, description: 'big, dig, fig, pig, wig, jig' },
          ]},
          { type: 'heading', value: 'Why Word Families Help' },
          { type: 'text', value: 'If you can read "cat", you can read "bat", "hat", and "mat".' },
          { type: 'text', value: 'You just change the first letter!' },
          { type: 'highlight-box', value: 'One pattern → many words!' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'Understanding Word Families' },
          { type: 'text', value: 'A word family is a group of words with the same ending pattern.' },
          { type: 'text', value: 'The ending stays the same, but the beginning letter changes.' },
          { type: 'heading', value: 'Short Vowel Word Families' },
          { type: 'bullets', items: [
            { text: '-at family', highlight: true, description: 'bat, cat, fat, hat, mat, pat, rat, sat' },
            { text: '-en family', highlight: true, description: 'ben, den, hen, men, pen, ten' },
            { text: '-in family', highlight: true, description: 'bin, din, fin, kin, pin, tin, win' },
            { text: '-ot family', highlight: true, description: 'cot, dot, got, hot, lot, not, pot, rot' },
            { text: '-ug family', highlight: true, description: 'bug, dug, hug, jug, mug, rug, tug' },
          ]},
          { type: 'heading', value: 'How to Use Word Families' },
          { type: 'bullets', items: [
            { text: 'Step 1: Learn the ending sound (e.g., -at)' },
            { text: 'Step 2: Add different starting letters' },
            { text: 'Step 3: Read each new word out loud' },
            { text: 'Step 4: Notice how they all rhyme' },
          ]},
          { type: 'heading', value: 'Word Family Games' },
          { type: 'bullets', items: [
            { text: 'Make a list of all the words in one family' },
            { text: 'Write a silly sentence using family words' },
            { text: 'Draw pictures for each word in the family' },
          ]},
          { type: 'text', value: 'Example silly sentence: "The fat cat sat on a mat with a bat!"' },
        ],
      },
    },
  },

  'topic-8': {
    id: 'topic-8',
    name: 'Synonyms',
    unitName: 'Vocabulary',
    subjectName: 'English',
    explanations: {
      short: {
        content: [
          { type: 'text', value: 'Synonyms are words that mean the same thing.' },
          { type: 'bullets', items: [
            { text: 'happy = glad', highlight: true },
            { text: 'big = large', highlight: true },
            { text: 'fast = quick', highlight: true },
          ]},
        ],
      },
      medium: {
        content: [
          { type: 'heading', value: 'What are Synonyms?' },
          { type: 'text', value: 'Synonyms are different words that have the same or similar meaning.' },
          { type: 'heading', value: 'Common Synonyms' },
          { type: 'bullets', items: [
            { text: 'happy', highlight: true, description: 'glad, joyful, cheerful' },
            { text: 'sad', highlight: true, description: 'unhappy, upset, gloomy' },
            { text: 'big', highlight: true, description: 'large, huge, enormous' },
            { text: 'small', highlight: true, description: 'little, tiny, mini' },
            { text: 'fast', highlight: true, description: 'quick, speedy, rapid' },
          ]},
          { type: 'heading', value: 'Why Learn Synonyms?' },
          { type: 'text', value: 'Synonyms help you understand more words when reading.' },
          { type: 'text', value: 'They also make your writing more interesting.' },
        ],
      },
      long: {
        content: [
          { type: 'heading', value: 'Understanding Synonyms' },
          { type: 'text', value: 'A synonym is a word that means the same as another word.' },
          { type: 'text', value: 'English has many synonyms because it borrowed words from other languages.' },
          { type: 'heading', value: 'Feeling Words' },
          { type: 'bullets', items: [
            { text: 'happy', highlight: true, description: 'glad, joyful, pleased, cheerful, delighted' },
            { text: 'sad', highlight: true, description: 'unhappy, upset, gloomy, miserable, down' },
            { text: 'angry', highlight: true, description: 'mad, furious, upset, cross, annoyed' },
            { text: 'scared', highlight: true, description: 'afraid, frightened, terrified, nervous' },
          ]},
          { type: 'heading', value: 'Size Words' },
          { type: 'bullets', items: [
            { text: 'big', highlight: true, description: 'large, huge, enormous, giant, massive' },
            { text: 'small', highlight: true, description: 'little, tiny, mini, petite, wee' },
          ]},
          { type: 'heading', value: 'Action Words' },
          { type: 'bullets', items: [
            { text: 'run', highlight: true, description: 'sprint, dash, jog, race' },
            { text: 'walk', highlight: true, description: 'stroll, march, wander, hike' },
            { text: 'eat', highlight: true, description: 'munch, nibble, gobble, chew, devour' },
          ]},
          { type: 'heading', value: 'Practice Tip' },
          { type: 'text', value: 'When you learn a new word, try to think of one synonym for it.' },
          { type: 'text', value: 'This doubles your vocabulary!' },
        ],
      },
    },
  },
};

// Helper to get plain text for TTS
export const getPlainText = (content: ContentBlock[]): string => {
  return content.map(block => {
    if (block.type === 'text' || block.type === 'heading' || block.type === 'highlight-box') {
      return (block as TextBlock).value;
    }
    if (block.type === 'bullets') {
      return (block as { type: 'bullets'; items: BulletItem[] }).items.map(item =>
        item.description ? `${item.text}: ${item.description}` : item.text
      ).join('. ');
    }
    return '';
  }).join('. ');
};
