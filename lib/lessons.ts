import type { RoadmapDay } from "@/types/database";

type Lesson = {
  intro: string;
  keyPoints: string[];
  example: string;
  practiceNote: string;
};

const lessonsByDay: Record<number, Lesson> = {
  1: {
    intro:
      "Python is a beginner-friendly programming language used for web apps, automation, data analysis, AI, scripts, and many small daily tasks. A Python program is made of instructions that run from top to bottom. The first instruction most learners use is print(), which sends text or values to the output panel.",
    keyPoints: [
      "Use print() when you want to show something in the output.",
      "Text must be written inside quotes, like \"Hello\".",
      "A comment starts with # and is ignored by Python.",
      "Comments are useful for short notes about what your code is doing."
    ],
    example: '# This line is a comment\nprint("I am learning Python")',
    practiceNote:
      "In today’s exercises, focus on writing small programs that produce visible output. If nothing appears in the output panel, check whether you used print()."
  },
  2: {
    intro:
      "Variables store values so you can reuse them later. Python decides the data type from the value you assign, such as text, whole numbers, decimal numbers, or True/False values.",
    keyPoints: ["Use meaningful variable names.", "Strings use quotes.", "Integers and floats do not need quotes.", "Use type() to inspect a value."],
    example: 'name = "Asha"\nage = 21\nprint(name)\nprint(type(age))',
    practiceNote: "Change variable values and print them to understand how Python stores data."
  },
  3: {
    intro:
      "Operators let you calculate, compare, and combine values. You will use them often in conditions, loops, and functions.",
    keyPoints: ["Arithmetic operators include +, -, *, and /.", "Comparison operators return True or False.", "Logical operators include and, or, and not.", "Use % to find a remainder."],
    example: "marks = 72\nprint(marks >= 50)\nprint(10 % 2 == 0)",
    practiceNote: "Try changing the numbers and predict the output before running the code."
  },
  4: {
    intro:
      "Input and output make programs interactive. input() reads text from the user, and print() displays results.",
    keyPoints: ["input() always returns a string.", "Use int() or float() before doing numeric math.", "Use f-strings for clean sentences.", "Prompt text helps users know what to enter."],
    example: 'name = input("Name: ")\nprint(f"Hello {name}")',
    practiceNote: "Keep inputs small and convert them only when you need numeric operations."
  }
};

const fallbackLesson = {
  keyPoints: [
    "Read the topic description first.",
    "Study the example before starting exercises.",
    "Run code often and compare the output with the expected result.",
    "Use hints only after trying once on your own."
  ]
};

export function getLesson(day: RoadmapDay): Lesson {
  return (
    lessonsByDay[day.day_number] ?? {
      intro: `${day.title} is an important Python topic for writing clearer and more useful programs. Start with the core idea, then practice it in small examples before combining it with earlier topics.`,
      keyPoints: day.learning_objectives?.length ? day.learning_objectives : fallbackLesson.keyPoints,
      example: buildFallbackExample(day.day_number),
      practiceNote:
        "Complete the exercises in order. Keep your solution simple first, then improve variable names and formatting after it works."
    }
  );
}

function buildFallbackExample(dayNumber: number) {
  if (dayNumber <= 6) {
    return 'message = "Practice Python step by step"\nprint(message)';
  }

  if (dayNumber <= 12) {
    return "def show_topic(topic):\n    print(topic)\n\nshow_topic(\"Python practice\")";
  }

  if (dayNumber <= 18) {
    return "numbers = [1, 2, 3]\nresult = [number * 2 for number in numbers]\nprint(result)";
  }

  if (dayNumber <= 24) {
    return "class Learner:\n    def speak(self):\n        print(\"I am practicing Python\")\n\nLearner().speak()";
  }

  return 'project = {"topic": "Python", "status": "practice"}\nprint(project["topic"])';
}
