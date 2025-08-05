export interface WeeklyReport {
  week: string;
  attendanceRate: number;
  quizSuccessRate: number;
  studyTime: number;
  xpGained: number;
  achievements: number;
}

export interface SubjectPerformance {
  subject: string;
  score: number;
  trend: "up" | "down" | "stable";
  color: string;
}

export interface ExamResult {
  id: string;
  subject: string;
  examName: string;
  score: number;
  maxScore: number;
  date: string;
  status: "passed" | "failed" | "excellent";
  rank: number;
  totalStudents: number;
}

export interface HomeworkStatus {
  id: string;
  subject: string;
  homeworkTitle: string;
  dueDate: string;
  status: "completed" | "pending" | "late" | "not_started";
  submittedAt?: string;
  grade?: number;
  feedback?: string;
}

export interface StudentLog {
  id: string;
  timestamp: string;
  action: string;
  subject?: string;
  type: "attendance" | "quiz" | "homework" | "achievement" | "study" | "exam";
  details: string;
  status: "success" | "warning" | "error" | "info";
}

export interface ClassRanking {
  subject: string;
  currentRank: number;
  totalStudents: number;
  previousRank: number;
  change: "up" | "down" | "stable";
  score: number;
}

export interface GuidanceRequest {
  id: string;
  subject: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  responseAt?: string;
  response?: string;
} 