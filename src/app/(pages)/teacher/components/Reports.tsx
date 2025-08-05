"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  Award,
  Clock,
  Eye,
  Brain,
  Heart,
  Activity,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  X,
  FileText
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";

// Styled Components
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(14, 165, 233, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

const Button = styled.button<{
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
            box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'error':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 1px solid rgba(14, 165, 233, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(14, 165, 233, 0.4);
            transform: translateY(-2px);
          }
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `padding: 0.75rem 1.25rem; font-size: 0.75rem;`;
      case 'lg':
        return `padding: 1rem 2rem; font-size: 1rem;`;
      default:
        return `padding: 0.875rem 1.5rem; font-size: 0.875rem;`;
    }
  }}
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Title = styled.h1<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `font-size: 1.25rem;`;
      case 'lg':
        return `font-size: 2rem;`;
      case 'xl':
        return `font-size: 2.5rem;`;
      default:
        return `font-size: 1.5rem;`;
    }
  }}
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
`;

const Badge = styled.span<{
  variant?: 'success' | 'warning' | 'error' | 'info';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'error':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
    }
  }}
`;

const StudentCard = styled(Card)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  }
`;

const ProgressBar = styled.div<{ progress: number; color: string }>`
  width: 100%;
  height: 0.75rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.color};
    border-radius: 9999px;
    transition: width 0.3s ease;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const StatCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  }
`;

const SubjectCard = styled.div`
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

interface Student {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  attendanceRate: number;
  averageScore: number;
  attentionLevel: number;
  participationRate: number;
  subjects: SubjectPerformance[];
  recentActivities: Activity[];
  teacherNotes: string;
}

interface SubjectPerformance {
  subject: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastQuiz: string;
}

interface Activity {
  id: string;
  type: 'quiz' | 'lesson' | 'assignment';
  title: string;
  date: string;
  score?: number;
  status: 'completed' | 'pending' | 'missed';
}

export default function ReportsComponent() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmet Yılmaz",
      avatar: "AY",
      level: 8,
      xp: 1250,
      attendanceRate: 95,
      averageScore: 88,
      attentionLevel: 92,
      participationRate: 85,
      subjects: [
        { subject: "Matematik", score: 92, trend: 'up', lastQuiz: "2024-01-15" },
        { subject: "Fen Bilgisi", score: 85, trend: 'stable', lastQuiz: "2024-01-10" },
        { subject: "Türkçe", score: 78, trend: 'down', lastQuiz: "2024-01-12" }
      ],
      recentActivities: [
        { id: "1", type: "quiz", title: "Matematik Quiz", date: "2024-01-15", score: 92, status: "completed" },
        { id: "2", type: "lesson", title: "Fen Bilgisi Dersi", date: "2024-01-14", status: "completed" },
        { id: "3", type: "assignment", title: "Türkçe Ödevi", date: "2024-01-13", status: "pending" }
      ],
      teacherNotes: "Ahmet matematik konusunda çok başarılı. Fen bilgisi derslerinde daha aktif olması gerekiyor."
    },
    {
      id: "2",
      name: "Zeynep Kaya",
      avatar: "ZK",
      level: 6,
      xp: 980,
      attendanceRate: 88,
      averageScore: 82,
      attentionLevel: 78,
      participationRate: 72,
      subjects: [
        { subject: "Matematik", score: 75, trend: 'up', lastQuiz: "2024-01-15" },
        { subject: "Fen Bilgisi", score: 88, trend: 'up', lastQuiz: "2024-01-10" },
        { subject: "Türkçe", score: 85, trend: 'stable', lastQuiz: "2024-01-12" }
      ],
      recentActivities: [
        { id: "1", type: "quiz", title: "Matematik Quiz", date: "2024-01-15", score: 75, status: "completed" },
        { id: "2", type: "lesson", title: "Fen Bilgisi Dersi", date: "2024-01-14", status: "completed" },
        { id: "3", type: "assignment", title: "Türkçe Ödevi", date: "2024-01-13", status: "completed" }
      ],
      teacherNotes: "Zeynep fen bilgisi konusunda gelişme gösteriyor. Matematik derslerinde daha fazla pratik yapması gerekiyor."
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const stats = [
    { title: "Ortalama Başarı", value: `${Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%`, icon: Star, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "Ortalama Katılım", value: `${Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)}%`, icon: Users, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { title: "Ortalama Dikkat", value: `${Math.round(students.reduce((acc, s) => acc + s.attentionLevel, 0) / students.length)}%`, icon: Eye, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Toplam Öğrenci", value: students.length.toString(), icon: Award, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" }
  ];

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleAddNote = (studentId: string) => {
    if (newNote.trim()) {
      setStudents(students.map(s => 
        s.id === studentId 
          ? { ...s, teacherNotes: newNote }
          : s
      ));
      setNewNote('');
      setShowNoteModal(false);
      toast.success("Not eklendi!");
    } else {
      toast.error("Lütfen not yazın");
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} color="#22c55e" />;
      case 'down': return <TrendingDown size={16} color="#ef4444" />;
      default: return <Activity size={16} color="#6b7280" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target size={16} />;
      case 'lesson': return <BookOpen size={16} />;
      case 'assignment': return <FileText size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'pending': return '#f97316';
      case 'missed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <>
      {/* Header */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Öğrenci Raporları</Title>
            <Subtitle>Detaylı öğrenci performans analizi ve gelişim takibi</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="secondary">
              <Download size={20} />
              Rapor İndir
            </Button>
            <Button variant="primary">
              <BarChart3 size={20} />
              Detaylı Analiz
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.5rem 0' }}>{stat.title}</h3>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{stat.value}</div>
              </div>
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                borderRadius: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontWeight: 600, 
                background: stat.color,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
              }}>
                <stat.icon size={28} />
              </div>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      {/* Students List */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <Title size="md">Öğrenci Performansları</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#6b7280', padding: '0.5rem 1rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
            <Users size={16} />
            <span>{students.length} öğrenci</span>
          </div>
        </div>
        
        <StudentsGrid>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => handleViewDetail(student)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)'
                    }}>
                      {student.avatar}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      width: '1.5rem',
                      height: '1.5rem',
                      background: '#22c55e',
                      borderRadius: '50%',
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
                    }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>
                      {student.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                      <Star size={14} />
                      <span>Level {student.level}</span>
                      <span>•</span>
                      <span>{student.xp} XP</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
                      {student.averageScore}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Ortalama
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
                      {student.attendanceRate}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Katılım
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetail(student);
                      }}
                    >
                      <BarChart3 size={16} />
                      Detay
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(student);
                        setShowNoteModal(true);
                      }}
                      style={{ padding: '0.5rem' }}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Ders Performansları</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                  {student.subjects.slice(0, 3).map((subject, index) => (
                    <SubjectCard key={index}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                        {subject.subject}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        {subject.score}%
                        {getTrendIcon(subject.trend)}
                      </div>
                    </SubjectCard>
                  ))}
                </div>
              </div>
            </StudentCard>
          ))}
        </StudentsGrid>
      </Card>

      {/* Charts Section */}
      <ChartsGrid>
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Başarı Dağılımı</Title>
          <ChartContainer>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <PieChart size={64} />
              <p style={{ margin: '1rem 0 0 0', fontSize: '1rem', fontWeight: 500 }}>Başarı grafiği</p>
            </div>
          </ChartContainer>
        </Card>

        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Katılım Trendi</Title>
          <ChartContainer>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <LineChart size={64} />
              <p style={{ margin: '1rem 0 0 0', fontSize: '1rem', fontWeight: 500 }}>Katılım grafiği</p>
            </div>
          </ChartContainer>
        </Card>
      </ChartsGrid>

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <Title size="md">{selectedStudent.name} - Detaylı Rapor</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDetailModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  Genel İstatistikler
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama Başarı</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.averageScore}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Katılım Oranı</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.attendanceRate}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Dikkat Seviyesi</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.attentionLevel}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Aktif Katılım</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.participationRate}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  Ders Performansları
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedStudent.subjects.map((subject, index) => (
                    <div key={index} style={{ padding: '1.25rem', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{subject.subject}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{subject.score}%</span>
                          {getTrendIcon(subject.trend)}
                        </div>
                      </div>
                      <ProgressBar 
                        progress={subject.score} 
                        color="linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                Son Aktiviteler
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedStudent.recentActivities.map((activity) => (
                  <ActivityCard key={activity.id}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      background: getActivityColor(activity.status),
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                        {activity.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {activity.date} {activity.score && `• ${activity.score}%`}
                      </div>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'success' : activity.status === 'pending' ? 'warning' : 'error'}>
                      {activity.status === 'completed' ? 'Tamamlandı' : activity.status === 'pending' ? 'Bekliyor' : 'Kaçırıldı'}
                    </Badge>
                  </ActivityCard>
                ))}
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* Add Note Modal */}
      {showNoteModal && selectedStudent && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <Title size="md">{selectedStudent.name} - Öğretmen Notu</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowNoteModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <TextArea
              placeholder="Öğrenci hakkında notunuzu yazın..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{ minHeight: '180px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button
                variant="secondary"
                onClick={() => setShowNoteModal(false)}
              >
                İptal
              </Button>
              <Button variant="primary" onClick={() => handleAddNote(selectedStudent.id)}>
                Kaydet
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
} 