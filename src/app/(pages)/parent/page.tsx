"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BarChart3, 
  Calendar,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  ChevronLeft,
  Settings,
  Download,
  Share,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Award,
  BookOpen,
  Users,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  FileText,
  Send,
  Bell,
  BellOff
} from "lucide-react";
import toast from "react-hot-toast";

// Import styled components
import {
  PageWrapper,
  Header,
  HeaderContent,
  LogoContainer,
  LogoIcon,
  LogoText,
  MainContainer,
  Card,
  Button,
  Grid,
  Title,
  Subtitle
} from "./components/StyledComponents";

// Import types
import {
  WeeklyReport,
  SubjectPerformance,
  ExamResult,
  HomeworkStatus,
  StudentLog,
  ClassRanking,
  GuidanceRequest
} from "./components/types";

// Import tab components
import { OverviewTab } from "./components/OverviewTab";
import { ExamsTab } from "./components/ExamsTab";
import { HomeworkTab } from "./components/HomeworkTab";
import { RankingsTab } from "./components/RankingsTab";
import { LogsTab } from "./components/LogsTab";
import { GuidanceTab } from "./components/GuidanceTab";

export default function ParentPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState("Bu Hafta");
  const [activeTab, setActiveTab] = useState("overview");
  const [showGuidanceModal, setShowGuidanceModal] = useState(false);

  const weeklyReports: WeeklyReport[] = [
    { week: "Bu Hafta", attendanceRate: 85, quizSuccessRate: 92, studyTime: 12.5, xpGained: 450, achievements: 3 },
    { week: "Geçen Hafta", attendanceRate: 78, quizSuccessRate: 88, studyTime: 10.2, xpGained: 380, achievements: 2 },
    { week: "2 Hafta Önce", attendanceRate: 82, quizSuccessRate: 85, studyTime: 11.8, xpGained: 420, achievements: 2 }
  ];

  const subjects: SubjectPerformance[] = [
    { subject: "Matematik", score: 95, trend: "up", color: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
    { subject: "Türkçe", score: 88, trend: "up", color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { subject: "Fen Bilgisi", score: 92, trend: "stable", color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" },
    { subject: "Sosyal Bilgiler", score: 85, trend: "down", color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { subject: "İngilizce", score: 90, trend: "up", color: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" },
    { subject: "Beden Eğitimi", score: 98, trend: "up", color: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)" }
  ];

  // Yeni veri yapıları
  const examResults: ExamResult[] = [
    { id: "1", subject: "Matematik", examName: "1. Dönem 1. Sınav", score: 85, maxScore: 100, date: "2024-01-15", status: "passed", rank: 3, totalStudents: 25 },
    { id: "2", subject: "Türkçe", examName: "1. Dönem 1. Sınav", score: 92, maxScore: 100, date: "2024-01-16", status: "excellent", rank: 1, totalStudents: 25 },
    { id: "3", subject: "Fen Bilgisi", examName: "1. Dönem 1. Sınav", score: 78, maxScore: 100, date: "2024-01-17", status: "passed", rank: 8, totalStudents: 25 },
    { id: "4", subject: "Sosyal Bilgiler", examName: "1. Dönem 1. Sınav", score: 88, maxScore: 100, date: "2024-01-18", status: "passed", rank: 5, totalStudents: 25 },
    { id: "5", subject: "İngilizce", examName: "1. Dönem 1. Sınav", score: 95, maxScore: 100, date: "2024-01-19", status: "excellent", rank: 2, totalStudents: 25 }
  ];

  const homeworkStatus: HomeworkStatus[] = [
    { id: "1", subject: "Matematik", homeworkTitle: "Kesirler Konusu Ödev", dueDate: "2024-01-20", status: "completed", submittedAt: "2024-01-19", grade: 95 },
    { id: "2", subject: "Türkçe", homeworkTitle: "Paragraf Yazma", dueDate: "2024-01-22", status: "pending" },
    { id: "3", subject: "Fen Bilgisi", homeworkTitle: "Deney Raporu", dueDate: "2024-01-18", status: "late", submittedAt: "2024-01-19", grade: 70 },
    { id: "4", subject: "Sosyal Bilgiler", homeworkTitle: "Tarih Araştırması", dueDate: "2024-01-25", status: "not_started" },
    { id: "5", subject: "İngilizce", homeworkTitle: "Vocabulary Quiz", dueDate: "2024-01-21", status: "completed", submittedAt: "2024-01-20", grade: 100 }
  ];

  const studentLogs: StudentLog[] = [
    { id: "1", timestamp: "2024-01-20 09:00", action: "Matematik dersine katıldı", subject: "Matematik", type: "attendance", details: "Kesirler konusu işlendi", status: "success" },
    { id: "2", timestamp: "2024-01-20 10:30", action: "Quiz'i %95 başarı ile tamamladı", subject: "Matematik", type: "quiz", details: "Kesirler quizi - 19/20 doğru", status: "success" },
    { id: "3", timestamp: "2024-01-20 14:00", action: "Ödev teslim etti", subject: "Türkçe", type: "homework", details: "Paragraf yazma ödevi tamamlandı", status: "success" },
    { id: "4", timestamp: "2024-01-20 16:00", action: "Çalışma moduna geçti", type: "study", details: "2 saat aktif çalışma", status: "info" },
    { id: "5", timestamp: "2024-01-20 18:00", action: "Yeni başarı kazandı", type: "achievement", details: "Dikkatli öğrenci rozeti", status: "success" },
    { id: "6", timestamp: "2024-01-19 15:30", action: "Sınav tamamladı", subject: "Fen Bilgisi", type: "exam", details: "1. Dönem 1. Sınav - 78/100", status: "warning" }
  ];

  const classRankings: ClassRanking[] = [
    { subject: "Matematik", currentRank: 3, totalStudents: 25, previousRank: 5, change: "up", score: 85 },
    { subject: "Türkçe", currentRank: 1, totalStudents: 25, previousRank: 2, change: "up", score: 92 },
    { subject: "Fen Bilgisi", currentRank: 8, totalStudents: 25, previousRank: 6, change: "down", score: 78 },
    { subject: "Sosyal Bilgiler", currentRank: 5, totalStudents: 25, previousRank: 7, change: "up", score: 88 },
    { subject: "İngilizce", currentRank: 2, totalStudents: 25, previousRank: 3, change: "up", score: 95 }
  ];

  const guidanceRequests: GuidanceRequest[] = [
    { id: "1", subject: "Matematik", reason: "Kesirler konusunda zorlanıyor", status: "pending", requestedAt: "2024-01-18" },
    { id: "2", subject: "Fen Bilgisi", reason: "Deney konularında yardım gerekli", status: "approved", requestedAt: "2024-01-15", responseAt: "2024-01-16", response: "Rehber öğretmen atandı" }
  ];

  const currentReport = weeklyReports[0];

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(notificationsEnabled ? "Bildirimler kapatıldı" : "Bildirimler açıldı");
  };

  const downloadReport = () => {
    toast.success("Rapor indiriliyor... 📄");
  };

  const shareReport = () => {
    toast.success("Rapor paylaşıldı! 📤");
  };

  const sendEmail = () => {
    toast.success("E-posta gönderildi! 📧");
  };

  // Yeni fonksiyonlar
  const requestGuidance = (subject: string, reason: string) => {
    toast.success(`${subject} dersi için rehber öğretmen talebi gönderildi! 📚`);
    setShowGuidanceModal(false);
  };

  const generateDetailedReport = () => {
    toast.success("Detaylı rapor hazırlanıyor... 📊");
  };

  const exportToPDF = () => {
    toast.success("PDF raporu indiriliyor... 📄");
  };

  const shareWithTeacher = () => {
    toast.success("Öğretmen ile paylaşıldı! 👨‍🏫");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "#22c55e";
      case "warning": return "#f59e0b";
      case "error": return "#ef4444";
      default: return "#3b82f6";
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "attendance": return Calendar;
      case "quiz": return Target;
      case "homework": return FileText;
      case "achievement": return Award;
      case "study": return BookOpen;
      case "exam": return BarChart;
      default: return Activity;
    }
  };

  return (
    <PageWrapper>
      {/* Header */}
      <Header>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', textDecoration: 'none' }}>
              <ChevronLeft size={20} />
              <span>Geri</span>
            </Link>
            <LogoContainer>
              <LogoIcon>
                <BarChart3 size={24} />
              </LogoIcon>
              <LogoText>
                <h1>Veli Paneli</h1>
                <p>Gelişim Takibi</p>
              </LogoText>
            </LogoContainer>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleNotifications}
              style={{ padding: '0.5rem' }}
            >
              {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </Button>
            <Button variant="secondary" size="sm" style={{ padding: '0.5rem' }}>
              <Settings size={20} />
            </Button>
          </div>
        </HeaderContent>
      </Header>

      {/* Main Content */}
      <MainContainer>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2rem' }}
        >
          <Title size="lg">Hoş Geldiniz! 👋</Title>
          <Subtitle>Çocuğunuzun gelişimini takip edin ve detaylı raporları görüntüleyin.</Subtitle>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '2rem' }}
        >
          <Card>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: "overview", label: "Genel Bakış", icon: BarChart3 },
                { id: "exams", label: "Sınav Sonuçları", icon: FileText },
                { id: "homework", label: "Ödev Durumu", icon: BookOpen },
                { id: "rankings", label: "Başarı Sırası", icon: TrendingUp },
                { id: "logs", label: "Öğrenci Logları", icon: Activity },
                { id: "guidance", label: "Rehberlik", icon: Users }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <OverviewTab
            currentReport={currentReport}
            subjects={subjects}
            studentLogs={studentLogs}
            onGenerateReport={generateDetailedReport}
            onExportPDF={exportToPDF}
            onShareWithTeacher={shareWithTeacher}
            onRequestGuidance={() => setShowGuidanceModal(true)}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )}

        {activeTab === "exams" && (
          <ExamsTab examResults={examResults} />
        )}

        {activeTab === "homework" && (
          <HomeworkTab homeworkStatus={homeworkStatus} />
        )}

        {activeTab === "rankings" && (
          <RankingsTab classRankings={classRankings} />
        )}

        {activeTab === "logs" && (
          <LogsTab 
            studentLogs={studentLogs}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )}

        {activeTab === "guidance" && (
          <GuidanceTab 
            guidanceRequests={guidanceRequests}
            onRequestGuidance={() => setShowGuidanceModal(true)}
            getStatusColor={getStatusColor}
          />
        )}

        {/* Guidance Modal */}
        {showGuidanceModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <Card style={{ maxWidth: '500px', width: '90%' }}>
              <Title size="md" style={{ marginBottom: '1rem' }}>Rehber Öğretmen Talebi</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                    Ders Seçin
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}>
                    <option value="">Ders seçin...</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject.subject}>{subject.subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                    Talep Nedeni
                  </label>
                  <textarea
                    placeholder="Rehber öğretmen talebinizin nedenini açıklayın..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      outline: 'none',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <Button variant="secondary" onClick={() => setShowGuidanceModal(false)}>
                    İptal
                  </Button>
                  <Button variant="primary" onClick={() => requestGuidance("Matematik", "Kesirler konusunda zorlanıyor")}>
                    <Send size={16} />
                    Talep Gönder
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </MainContainer>
    </PageWrapper>
  );
} 