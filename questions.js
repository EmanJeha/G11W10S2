/* Questions for both games. Edit text here; keep the structure.
   Question types:
     mc    – multiple choice (options + answer index)
     order – tap tiles into the right order
     line  – tap a line (here: the line of code that does a job)
     bins  – sort each item into one of two (or three) groups
   Any question can have its own "seconds". */
window.SITE_INFO = {
 "badge": "Grade 11 · Unit 4 · Sprint 4.1 · Session 2",
 "titleText": "Relationship Games",
 "warmup": {
  "label": "Warm-up",
  "sub": "Guess today’s topic"
 },
 "wrapup": {
  "label": "Wrap-up",
  "sub": "Link every table"
 },
 "titleHTML": "<span class=\"c1\">R</span><span class=\"c2\">e</span><span class=\"c3\">l</span><span class=\"c4\">a</span><span class=\"c5\">t</span><span class=\"c1\">i</span><span class=\"c2\">o</span><span class=\"c3\">n</span><span class=\"c4\">s</span><span class=\"c5\">h</span><span class=\"c1\">i</span><span class=\"c2\">p</span><br><span class=\"c3\">G</span><span class=\"c4\">a</span><span class=\"c5\">m</span><span class=\"c1\">e</span><span class=\"c2\">s</span>"
};
window.GAMES = {
 "warmup": {
  "badge": "Unit 4 · Sprint 4.1 · Session 2 · Warm-up",
  "name": "Split the Sheet!",
  "titleHTML": "<span class=\"c1\">S</span><span class=\"c2\">p</span><span class=\"c3\">l</span><span class=\"c4\">i</span><span class=\"c5\">t</span> <span class=\"c1\">t</span><span class=\"c2\">h</span><span class=\"c3\">e</span><br><span class=\"c4\">S</span><span class=\"c5\">h</span><span class=\"c1\">e</span><span class=\"c2\">e</span><span class=\"c3\">t</span><span class=\"c4\">!</span>",
  "intro": "Day one at work: one massive spreadsheet with EVERYTHING in it. Every correct answer flips letters of today’s mystery topic. Crack it for +200!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Crack the topic early: +200",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 40,
  "points": 100,
  "floaters": [
   "📊",
   "🔗",
   "🔑",
   "🗂️",
   "✂️",
   "📋",
   "🧩",
   "🧑‍💼"
  ],
  "topic": "Relationships",
  "mystery": {
   "label": "Today’s mystery topic",
   "phrase": "TABLE RELATIONSHIPS",
   "order": [
    14,
    17,
    12,
    1,
    4,
    9,
    0,
    8,
    3,
    6,
    2,
    11,
    13,
    7,
    18,
    15,
    10,
    16
   ],
   "perCorrect": 3,
   "bonus": 200,
   "accept": [
    "table relationships",
    "relationships",
    "database relationships",
    "relationships between tables",
    "table relationship",
    "relations"
   ],
   "finalQ": "Put all the clues together. What is today’s topic?",
   "finalOptions": [
    "Data Types",
    "Table Relationships",
    "Spreadsheet Formulas",
    "Sorting Records"
   ],
   "finalAnswer": 1,
   "finalWhy": "Splitting the big sheet into focused tables and linking them with keys: today we learn table relationships."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "ALL_DATA.xlsx",
    "skill": "Analyze",
    "q": "Sara | Riyadh | #501 | Laptop, Sara | Riyadh | #502 | Mouse, Sara | Riyadh | #504 | Keyboard. What keeps REPEATING?",
    "options": [
     "The order numbers",
     "Sara’s name and address",
     "Nothing repeats",
     "The column headings"
    ],
    "answer": 1,
    "why": "Sara’s name and address are typed again on every order: repeated data."
   },
   {
    "type": "bins",
    "ctx": "Focused lists",
    "skill": "Analyze",
    "seconds": 55,
    "q": "Which focused list does each column belong in?",
    "bins": [
     "👤 Customers",
     "🧾 Orders"
    ],
    "items": [
     {
      "t": "Customer name",
      "b": 0
     },
     {
      "t": "Address",
      "b": 0
     },
     {
      "t": "Order number",
      "b": 1
     },
     {
      "t": "Product bought",
      "b": 1
     }
    ],
    "why": "Customer details describe the person; order details describe each purchase."
   },
   {
    "type": "mc",
    "ctx": "Session 1 recap",
    "skill": "Remember",
    "q": "Which key uniquely identifies each record in a table?",
    "options": [
     "Foreign key",
     "Primary key",
     "Car key",
     "Sort key"
    ],
    "answer": 1,
    "why": "The primary key is unique for every record, like StudentID."
   },
   {
    "type": "mc",
    "ctx": "Session 1 recap",
    "skill": "Understand",
    "q": "What does a FOREIGN key do?",
    "options": [
     "Deletes a table",
     "Links to the primary key of another table",
     "Makes text bold",
     "Sorts the records"
    ],
    "answer": 1,
    "why": "A foreign key points to a primary key in another table: it creates the link."
   },
   {
    "type": "mc",
    "ctx": "Update pain",
    "skill": "Apply",
    "q": "Sara moves to Dammam. In the ONE big sheet, how many rows must you update?",
    "options": [
     "1 row",
     "3 rows (every Sara order)",
     "0 rows",
     "All 4 rows"
    ],
    "answer": 1,
    "why": "Her address is repeated on 3 rows. Miss one, and the data becomes inconsistent!"
   },
   {
    "type": "order",
    "ctx": "Split it",
    "skill": "Apply",
    "seconds": 50,
    "q": "Put the steps to split the big sheet in order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "Link them with a foreign key",
     "Find what repeats",
     "Give each table a primary key",
     "Move it into its own table"
    ],
    "answer": [
     "Find what repeats",
     "Move it into its own table",
     "Give each table a primary key",
     "Link them with a foreign key"
    ],
    "why": "Find repetition → separate it → identify each row → link the tables."
   },
   {
    "type": "mc",
    "ctx": "Best design",
    "skill": "Evaluate",
    "q": "Which design is easiest to manage, update and search?",
    "options": [
     "One giant sheet with everything",
     "Several focused tables linked together",
     "Paper notes",
     "A new sheet every day"
    ],
    "answer": 1,
    "why": "Focused tables linked by keys store each fact once: easy to update and search."
   }
  ],
  "endHTML": "<div class=\"reveal\"><span class=\"pill\">Today's topic</span><div class=\"big\">Table Relationships</div><p class=\"lede\">Connect tables the smart way: 1:1, 1:M and M:M.</p></div>\n<div class=\"recap\"><div><b>Split</b>One fact, one place</div><div><b>Keys</b>PK identifies · FK links</div><div><b>3 types</b>1:1 · 1:M · M:M</div></div>"
 },
 "wrapup": {
  "badge": "Unit 4 · Sprint 4.1 · Session 2 · Wrap-up",
  "name": "Link Up!",
  "titleHTML": "<span class=\"c1\">L</span><span class=\"c2\">i</span><span class=\"c3\">n</span><span class=\"c4\">k</span><br><span class=\"c5\">U</span><span class=\"c1\">p</span><span class=\"c2\">!</span>",
  "intro": "Ten challenges on relationships: why they matter, 1:1, 1:M, M:M and junction tables. Link every table!",
  "rules": [
   "Play on your own device (or with your partner)",
   "Faster answers = more points",
   "3 right in a row = 🔥 streak bonus",
   "Sort cards, order tiles and tap code lines",
   "Watch your name climb on the teacher’s screen"
  ],
  "seconds": 45,
  "points": 100,
  "floaters": [
   "🔗",
   "🔑",
   "1:1",
   "1:M",
   "M:M",
   "🧾",
   "🗂️",
   "✓"
  ],
  "topic": "Relationships",
  "exit": {
   "q": "In your own words, explain why relationships between tables are important in a database.",
   "placeholder": "Relationships are important because…",
   "model": "Relationships link tables with primary and foreign keys, so each fact is stored only once. This prevents repeated data, keeps the data accurate and consistent, and makes the database easier to update and search."
  },
  "questions": [
   {
    "type": "mc",
    "ctx": "Definition",
    "skill": "Remember",
    "q": "What is a relationship in a database?",
    "options": [
     "A link between tables using primary and foreign keys",
     "A type of spreadsheet chart",
     "A password for the database",
     "A list of all columns"
    ],
    "answer": 0,
    "why": "Relationships connect tables through a common field: a primary key and a foreign key."
   },
   {
    "type": "mc",
    "ctx": "Why",
    "skill": "Understand",
    "q": "Mr. Ahmed’s email is typed on every class row, and one row says ahmad@mis.edu. What problem is this?",
    "options": [
     "Too few tables",
     "Repeated data causing inconsistency",
     "A missing primary key",
     "A data type error"
    ],
    "answer": 1,
    "why": "Repeating the same data wastes space and creates inconsistencies. Store the teacher once!"
   },
   {
    "type": "bins",
    "ctx": "Which type?",
    "skill": "Analyze",
    "seconds": 60,
    "q": "Sort each pair into its relationship type.",
    "bins": [
     "1 : 1",
     "1 : M",
     "M : M"
    ],
    "items": [
     {
      "t": "Student ↔ login details",
      "b": 0
     },
     {
      "t": "Teacher → classes",
      "b": 1
     },
     {
      "t": "Students ⇄ courses",
      "b": 2
     },
     {
      "t": "Customer → orders",
      "b": 1
     },
     {
      "t": "Student ↔ ID card",
      "b": 0
     }
    ],
    "why": "One-to-one: a unique match. One-to-many: a parent with many children. Many-to-many: many on both sides."
   },
   {
    "type": "mc",
    "ctx": "1 : M",
    "skill": "Analyze",
    "q": "Teachers (1) → Students (many). Which table holds the TeacherID foreign key?",
    "options": [
     "Teachers",
     "Students",
     "Both",
     "Neither"
    ],
    "answer": 1,
    "why": "The foreign key goes on the MANY side: each student row stores its one TeacherID."
   },
   {
    "type": "mc",
    "ctx": "M : M",
    "skill": "Understand",
    "q": "How do we build a many-to-many relationship?",
    "options": [
     "Put both IDs in one column",
     "Use a junction (bridge) table",
     "Use only one table",
     "It cannot be stored at all"
    ],
    "answer": 1,
    "why": "M:M cannot be stored directly: a junction table holds one row per pair of IDs."
   },
   {
    "type": "line",
    "ctx": "SQL",
    "skill": "Analyze",
    "q": "Tap the line that LINKS Students to the Teachers table.",
    "code": [
     "CREATE TABLE Students (",
     "  StudentID INT PRIMARY KEY,",
     "  Name VARCHAR(50),",
     "  TeacherID INT,",
     "  FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID));"
    ],
    "answer": 4,
    "why": "FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID) creates the relationship."
   },
   {
    "type": "mc",
    "ctx": "Junction table",
    "skill": "Apply",
    "q": "Enrollments: (1, 101), (1, 102), (2, 101). Courses: 101 Math, 102 Science. Which courses does student 1 take?",
    "options": [
     "Math only",
     "Math and Science",
     "Science only",
     "None"
    ],
    "answer": 1,
    "why": "Student 1 appears in two rows: 101 (Math) and 102 (Science)."
   },
   {
    "type": "mc",
    "ctx": "1 : 1 use",
    "skill": "Understand",
    "q": "Why might a school split student login details into their own 1:1 table?",
    "options": [
     "To make it slower",
     "To keep sensitive data separate and secure",
     "Because tables must have 2 columns",
     "To repeat the data"
    ],
    "answer": 1,
    "why": "1:1 tables are often used to separate sensitive or optional data."
   },
   {
    "type": "order",
    "ctx": "Build M : M",
    "skill": "Apply",
    "seconds": 50,
    "q": "Put the steps to connect Students and Courses in order.",
    "sub": "Tap the tiles in order.",
    "tiles": [
     "Add one row per student-course pair",
     "Create the Courses table",
     "Create the Students table",
     "Create the Enrollments junction table"
    ],
    "answer": [
     "Create the Students table",
     "Create the Courses table",
     "Create the Enrollments junction table",
     "Add one row per student-course pair"
    ],
    "why": "Two main tables, then the bridge table with both foreign keys, then the pairs."
   },
   {
    "type": "mc",
    "ctx": "Benefits",
    "skill": "Evaluate",
    "q": "Which is NOT a benefit of relationships?",
    "options": [
     "Less repeated data",
     "More accurate data",
     "Easier to update",
     "Every fact typed many times"
    ],
    "answer": 3,
    "why": "Relationships avoid typing the same fact many times: that is the whole point!"
   }
  ],
  "endHTML": "<div class=\"recap\"><div><b>1 : 1</b>Student ↔ ID card</div><div><b>1 : M</b>Teacher → many classes</div><div><b>M : M</b>Students ⇄ Courses via a junction</div></div>"
 }
};
