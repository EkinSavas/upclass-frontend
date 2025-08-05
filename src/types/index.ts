export interface Student {
  id: string;
  name: string;
  avatar: string;
  attentionLevel: "high" | "medium" | "low";
  isOnline: boolean;
  xp: number;
  level: number;
  email?: string;
  parentEmail?: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  subject?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  xpReward: number;
  category: "academic" | "social" | "attendance" | "quiz";
}

export interface ClassSession {
  id: string;
  title: string;
  subject: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  participants: Student[];
  quizzes: Quiz[];
}

export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  isActive: boolean;
  participants: number;
}

export interface ParentReport {
  studentId: string;
  weekStart: Date;
  weekEnd: Date;
  attendanceRate: number;
  quizSuccessRate: number;
  studyTime: number;
  xpGained: number;
  achievements: Achievement[];
}

export interface TeacherPanelProps {
  isClassActive: boolean;
  students: Student[];
  onStartClass: () => void;
  onEndClass: () => void;
  onStartQuiz: () => void;
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz | null) => void;
}

export interface StudentPanelProps {
  studyMode: boolean;
  onToggleStudyMode: () => void;
  studyCount: number;
}

export interface ParentPanelProps {
  studentId?: string;
  reports?: ParentReport[];
} 