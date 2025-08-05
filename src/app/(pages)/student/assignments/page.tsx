"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Settings,
  ChevronRight,
  ChevronLeft,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Target,
  Zap,
  MessageSquare,
  ExternalLink,
  Timer,
  TimerOff,
  Play,
  Pause,
  StopCircle
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";

// Styled Components
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  border: 1px solid rgba(14, 165, 233, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
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
  border-radius: 0.75rem;
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
          box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
            box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.4);
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            box-shadow: 0 10px 15px -3px rgba(34, 197, 94, 0.4);
            transform: translateY(-1px);
          }
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
            box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.4);
            transform: translateY(-1px);
          }
        `;
      case 'error':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
            transform: translateY(-1px);
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
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `padding: 0.5rem 1rem; font-size: 0.75rem;`;
      case 'lg':
        return `padding: 0.75rem 1.5rem; font-size: 1rem;`;
      default:
        return `padding: 0.625rem 1.25rem; font-size: 0.875rem;`;
    }
  }}
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

const AssignmentCard = styled(Card)<{ status: 'pending' | 'in-progress' | 'completed' | 'overdue' }>`
  border-left: 4px solid;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `border-left-color: #6b7280;`;
      case 'in-progress':
        return `border-left-color: #f97316;`;
      case 'completed':
        return `border-left-color: #22c55e;`;
      case 'overdue':
        return `border-left-color: #ef4444;`;
    }
  }}
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
      case 'in-progress':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'completed':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'overdue':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
    }
  }}
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #92400e;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const TimeValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #92400e;
`;

const TimeLabel = styled.span`
  font-size: 0.75rem;
  color: #a16207;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.isActive ? '#0ea5e9' : '#d1d5db'};
  border-radius: 0.5rem;
  background: ${props => props.isActive ? '#dbeafe' : 'white'};
  color: ${props => props.isActive ? '#0ea5e9' : '#6b7280'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isActive ? '#bfdbfe' : '#f9fafb'};
    border-color: ${props => props.isActive ? '#0284c7' : '#9ca3af'};
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  min-width: 200px;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacher: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  timeLimit?: number; // in minutes
  currentTime?: number; // in seconds
  progress: number; // 0-100
  isActive?: boolean;
  attachments?: string[];
  grade?: number;
  feedback?: string;
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Bekliyor';
    case 'in-progress':
      return 'Devam Ediyor';
    case 'completed':
      return 'Tamamlandı';
    case 'overdue':
      return 'Gecikmiş';
    default:
      return 'Bilinmiyor';
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'Yüksek';
    case 'medium':
      return 'Orta';
    case 'low':
      return 'Düşük';
    default:
      return 'Bilinmiyor';
  }
};

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Matematik - Kesirler Ödevi',
      description: 'Sayfa 45-50 arası ödevler. Kesirler konusunu pekiştirmek için çalışın.',
      subject: 'Matematik',
      teacher: 'Ayşe Öğretmen',
      dueDate: new Date(2024, 0, 20),
      status: 'in-progress',
      priority: 'high',
      timeLimit: 60,
      currentTime: 1800, // 30 minutes
      progress: 65,
      isActive: true,
      attachments: ['kesirler_odev.pdf', 'ornek_sorular.docx']
    },
    {
      id: '2',
      title: 'Fen Bilgisi - Deney Raporu',
      description: 'Asit-baz deneyi raporu hazırlayın. Görseller ekleyin.',
      subject: 'Fen Bilgisi',
      teacher: 'Mehmet Öğretmen',
      dueDate: new Date(2024, 0, 18),
      status: 'completed',
      priority: 'medium',
      progress: 100,
      grade: 95,
      feedback: 'Çok güzel bir rapor olmuş. Tebrikler!'
    },
    {
      id: '3',
      title: 'Türkçe - Paragraf Yazma',
      description: 'Verilen konu hakkında 3 paragraf yazın.',
      subject: 'Türkçe',
      teacher: 'Fatma Öğretmen',
      dueDate: new Date(2024, 0, 15),
      status: 'overdue',
      priority: 'high',
      progress: 30
    },
    {
      id: '4',
      title: 'Sosyal Bilgiler - Proje',
      description: 'Osmanlı Devleti konulu proje hazırlayın.',
      subject: 'Sosyal Bilgiler',
      teacher: 'Ali Öğretmen',
      dueDate: new Date(2024, 0, 25),
      status: 'pending',
      priority: 'medium',
      progress: 0
    }
  ]);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssignments(prev => prev.map(assignment => {
        if (assignment.isActive && assignment.currentTime && assignment.timeLimit) {
          const newTime = assignment.currentTime + 1;
          const progress = Math.min(100, (newTime / (assignment.timeLimit * 60)) * 100);
          
          return {
            ...assignment,
            currentTime: newTime,
            progress: progress
          };
        }
        return assignment;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(assignment.status);
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { 
      title: "Toplam Ödev", 
      value: assignments.length.toString(), 
      icon: FileText, 
      color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" 
    },
    { 
      title: "Tamamlanan", 
      value: assignments.filter(a => a.status === 'completed').length.toString(), 
      icon: CheckCircle, 
      color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" 
    },
    { 
      title: "Devam Eden", 
      value: assignments.filter(a => a.status === 'in-progress').length.toString(), 
      icon: Clock, 
      color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" 
    },
    { 
      title: "Gecikmiş", 
      value: assignments.filter(a => a.status === 'overdue').length.toString(), 
      icon: AlertCircle, 
      color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" 
    }
  ];

  const filterTypes = [
    { key: 'pending', label: 'Bekliyor', icon: Clock },
    { key: 'in-progress', label: 'Devam Ediyor', icon: Play },
    { key: 'completed', label: 'Tamamlandı', icon: CheckCircle },
    { key: 'overdue', label: 'Gecikmiş', icon: AlertCircle }
  ];

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const startAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, isActive: true, status: 'in-progress' }
        : assignment
    ));
    setActiveAssignment(assignmentId);
    toast.success("Ödev başlatıldı!");
  };

  const pauseAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, isActive: false }
        : assignment
    ));
    setActiveAssignment(null);
    toast.success("Ödev duraklatıldı!");
  };

  const completeAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'completed', progress: 100, isActive: false }
        : assignment
    ));
    setActiveAssignment(null);
    toast.success("Ödev tamamlandı!");
  };

  const submitAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: 'completed', progress: 100, isActive: false }
        : assignment
    ));
    toast.success("Ödev gönderildi!");
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="lg">Ödevler</Title>
        <Subtitle>Tüm ödevlerinizi takip edin ve yönetin</Subtitle>
      </div>

      {/* Stats */}
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>{stat.title}</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{stat.value}</div>
            </div>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: stat.color }}>
              <stat.icon size={20} />
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      {/* Filters */}
      <Card style={{ marginBottom: '2rem' }}>
        <FilterSection>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="#6b7280" />
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Filtreler:</span>
          </div>
          
          {filterTypes.map(filter => (
            <FilterButton
              key={filter.key}
              isActive={activeFilters.includes(filter.key)}
              onClick={() => toggleFilter(filter.key)}
            >
              <filter.icon size={14} />
              {filter.label}
            </FilterButton>
          ))}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <Search size={16} color="#6b7280" />
            <SearchInput
              placeholder="Ödev ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </FilterSection>
      </Card>

      {/* Assignments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            status={assignment.status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                      {assignment.title}
                    </h3>
                    <StatusBadge status={assignment.status}>
                      {getStatusText(assignment.status)}
                    </StatusBadge>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {assignment.priority === 'high' ? '🔥' : assignment.priority === 'medium' ? '⚡' : '📝'}
                      {getPriorityText(assignment.priority)}
                    </span>
                  </div>
                </div>
                
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5 }}>
                  {assignment.description}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>📚 {assignment.subject}</span>
                  <span>👨‍🏫 {assignment.teacher}</span>
                  <span>📅 {assignment.dueDate.toLocaleDateString('tr-TR')}</span>
                  {assignment.grade && (
                    <span style={{ color: '#22c55e', fontWeight: 600 }}>⭐ {assignment.grade}/100</span>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>İlerleme</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1f2937' }}>{assignment.progress}%</span>
                  </div>
                  <ProgressBar>
                    <ProgressFill progress={assignment.progress} />
                  </ProgressBar>
                </div>
                
                {/* Timer for active assignments */}
                {assignment.isActive && assignment.currentTime && assignment.timeLimit && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    border: '1px solid #f59e0b',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Timer size={16} color="#92400e" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>
                          Kalan Süre
                        </span>
                      </div>
                      <TimerDisplay>
                        <TimeUnit>
                          <TimeValue>
                            {Math.floor((assignment.timeLimit * 60 - assignment.currentTime) / 60)}
                          </TimeValue>
                          <TimeLabel>Dakika</TimeLabel>
                        </TimeUnit>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>:</span>
                        <TimeUnit>
                          <TimeValue>
                            {Math.floor((assignment.timeLimit * 60 - assignment.currentTime) % 60)}
                          </TimeValue>
                          <TimeLabel>Saniye</TimeLabel>
                        </TimeUnit>
                      </TimerDisplay>
                    </div>
                  </div>
                )}
                
                {/* Feedback for completed assignments */}
                {assignment.feedback && (
                  <div style={{ 
                    background: '#dcfce7',
                    border: '1px solid #22c55e',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    marginTop: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <CheckCircle size={14} color="#166534" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534' }}>Öğretmen Geri Bildirimi</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#166534' }}>{assignment.feedback}</p>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                {assignment.status === 'pending' && (
                  <Button variant="primary" size="sm" onClick={() => startAssignment(assignment.id)}>
                    <Play size={14} />
                    Başla
                  </Button>
                )}
                
                {assignment.status === 'in-progress' && assignment.isActive && (
                  <Button variant="warning" size="sm" onClick={() => pauseAssignment(assignment.id)}>
                    <Pause size={14} />
                    Duraklat
                  </Button>
                )}
                
                {assignment.status === 'in-progress' && !assignment.isActive && (
                  <Button variant="success" size="sm" onClick={() => startAssignment(assignment.id)}>
                    <Play size={14} />
                    Devam Et
                  </Button>
                )}
                
                {assignment.status === 'in-progress' && (
                  <Button variant="success" size="sm" onClick={() => submitAssignment(assignment.id)}>
                    <Upload size={14} />
                    Gönder
                  </Button>
                )}
                
                <Button variant="secondary" size="sm">
                  <Eye size={14} />
                  Detay
                </Button>
                
                {assignment.attachments && assignment.attachments.length > 0 && (
                  <Button variant="secondary" size="sm">
                    <Download size={14} />
                    Dosyalar
                  </Button>
                )}
              </div>
            </div>
          </AssignmentCard>
        ))}
        
        {filteredAssignments.length === 0 && (
          <Card>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <FileText size={48} color="#d1d5db" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 600, color: '#6b7280' }}>
                Ödev Bulunamadı
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>
                Seçilen filtrelere uygun ödev bulunmuyor.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 