"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen as BookOpenIcon,
  Target as TargetIcon,
  BarChart3,
  Download,
  Upload,
  Send,
  Bell,
  X,
  TrendingUp,
  TrendingDown,
  Activity,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  Star,
  Award,
  Target,
  PlayCircle,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  PieChart,
  LineChart,
  BarChart,
  Minus,
  Check,
  ArrowRight,
  ArrowLeft,
  ChevronUp
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

const AssignmentsGrid = styled.div<{
  cols?: number;
  gap?: string;
  type?: 'stats' | 'assignments' | 'modal';
}>`
  display: grid;
  gap: ${props => props.gap || '1rem'};
  
  ${props => {
    if (props.type === 'stats') {
      return `
        grid-template-columns: repeat(2, 1fr);
        
        @media (min-width: 640px) {
          grid-template-columns: repeat(4, 1fr);
        }
      `;
    } else if (props.type === 'assignments') {
      return `
        grid-template-columns: 1fr;
        
        @media (min-width: 640px) {
          grid-template-columns: repeat(2, 1fr);
        }
        
        @media (min-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }
        
        @media (min-width: 1280px) {
          grid-template-columns: repeat(3, 1fr);
        }
        
        @media (min-width: 1536px) {
          grid-template-columns: repeat(4, 1fr);
        }
      `;
    } else if (props.type === 'modal') {
      return `
        grid-template-columns: 1fr;
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `;
    } else {
      return `
        grid-template-columns: repeat(${props.cols || 1}, 1fr);
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(${Math.min((props.cols || 1) + 1, 4)}, 1fr);
        }
        
        @media (min-width: 1024px) {
          grid-template-columns: repeat(${Math.min((props.cols || 1) + 2, 6)}, 1fr);
        }
      `;
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

const Badge = styled.span<{
  variant?: 'success' | 'warning' | 'error' | 'info';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StatsCard = styled(Card)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid rgba(14, 165, 233, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const AssignmentCard = styled(Card)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid rgba(14, 165, 233, 0.1);
  min-height: 380px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    border-color: rgba(14, 165, 233, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%);
    border-radius: 1rem 1rem 0 0;
  }
`;

const AssignmentIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 16px -4px rgba(14, 165, 233, 0.4);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
    border-radius: 1rem;
  }
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 3px;
  background: #e5e7eb;
  border-radius: 1.5px;
  overflow: hidden;
  margin: 0.125rem 0;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
    border-radius: 1.5px;
    transition: width 0.3s ease;
  }
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 9999px;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          color: #166534;
          border: 1px solid #86efac;
        `;
      case 'completed':
        return `
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #1e40af;
          border: 1px solid #93c5fd;
        `;
      case 'overdue':
        return `
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #991b1b;
          border: 1px solid #fca5a5;
        `;
      default:
        return `
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          color: #374151;
          border: 1px solid #d1d5db;
        `;
    }
  }}
`;

const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  background: white;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  assignedTo: 'individual' | 'class';
  students?: string[];
  dueDate: string;
  createdAt: string;
  status: 'active' | 'completed' | 'overdue';
  submissions: number;
  totalStudents: number;
  averageScore?: number;
}

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Kesirler Ödevi",
      description: "Kesirler konusu ile ilgili 20 soru çözülecek",
      subject: "Matematik",
      class: "9-A",
      assignedTo: "class",
      dueDate: "2024-01-25",
      createdAt: "2024-01-15",
      status: "active",
      submissions: 18,
      totalStudents: 25,
      averageScore: 85
    },
    {
      id: "2",
      title: "Hücre Konusu Araştırması",
      description: "Hücre yapısı hakkında detaylı araştırma yapılacak",
      subject: "Fen Bilgisi",
      class: "9-A",
      assignedTo: "individual",
      students: ["Ahmet Yılmaz", "Zeynep Kaya"],
      dueDate: "2024-01-30",
      createdAt: "2024-01-16",
      status: "active",
      submissions: 2,
      totalStudents: 2,
      averageScore: 92
    },
    {
      id: "3",
      title: "Paragraf Analizi",
      description: "Verilen paragrafların analizi yapılacak",
      subject: "Türkçe",
      class: "9-A",
      assignedTo: "class",
      dueDate: "2024-01-20",
      createdAt: "2024-01-10",
      status: "completed",
      submissions: 25,
      totalStudents: 25,
      averageScore: 78
    }
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterStatus] = useState('all');
  const [filterStatus, setFilterSubject] = useState('all');

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
  };

  const handleCreateAssignment = () => {
    setShowCreateModal(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    toast.success("Ödev silindi!");
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || assignment.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const stats = [
    { title: "Toplam Ödev", value: assignments.length.toString(), icon: FileText, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "Aktif Ödev", value: assignments.filter(a => a.status === 'active').length.toString(), icon: Target, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { title: "Tamamlanan", value: assignments.filter(a => a.status === 'completed').length.toString(), icon: CheckCircle, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Ortalama Başarı", value: `${Math.round(assignments.filter(a => a.averageScore).reduce((acc, a) => acc + (a.averageScore || 0), 0) / assignments.filter(a => a.averageScore).length)}%`, icon: Award, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" }
  ];

  return (
    <>
      {/* Header */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Ödevler</Title>
            <Subtitle>Ödev yönetimi ve takibi</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary" onClick={handleCreateAssignment}>
              <Plus size={20} />
              Yeni Ödev
            </Button>
            <Button variant="secondary">
              <Download size={20} />
              Rapor İndir
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchContainer>
          <SearchWrapper>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', zIndex: 1 }} />
            <Input
              placeholder="Ödev ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '3rem', height: '3rem', fontSize: '1rem' }}
            />
          </SearchWrapper>
          <FilterWrapper>
            <Select
              value={filterSubject}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '140px', height: '3rem' }}
            >
              <option value="all">Tüm Dersler</option>
              <option value="Matematik">Matematik</option>
              <option value="Fen Bilgisi">Fen Bilgisi</option>
              <option value="Türkçe">Türkçe</option>
            </Select>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={{ width: '140px', height: '3rem' }}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="completed">Tamamlanan</option>
              <option value="overdue">Gecikmiş</option>
            </Select>
          </FilterWrapper>
        </SearchContainer>
      </Card>

      {/* Stats */}
      <AssignmentsGrid type="stats" gap="1.5rem" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.5rem 0' }}>{stat.title}</h3>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{stat.value}</div>
              </div>
              <div style={{ 
                width: '3.5rem', 
                height: '3.5rem', 
                borderRadius: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontWeight: 600, 
                background: stat.color,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <stat.icon size={24} />
              </div>
            </div>
          </StatsCard>
        ))}
      </AssignmentsGrid>

      {/* Assignments List */}
      <AssignmentsGrid type="assignments" gap="2rem">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -6 }}
            onClick={() => handleAssignmentClick(assignment)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                <AssignmentIcon>
                  <FileText size={22} />
                </AssignmentIcon>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.375rem', fontWeight: 700, color: '#1f2937', lineHeight: 1.3 }}>
                    {assignment.title}
                  </h4>
                  <p style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#6b7280', fontWeight: 500 }}>
                    {assignment.subject} • {assignment.class}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Badge variant="info" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                      {assignment.assignedTo === 'class' ? 'Sınıf' : 'Bireysel'}
                    </Badge>
                    {assignment.assignedTo === 'individual' && assignment.students && (
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {assignment.students.length} öğrenci
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <StatusBadge status={assignment.status}>
                {assignment.status === 'active' ? 'Aktif' : assignment.status === 'completed' ? 'Tamamlandı' : 'Gecikmiş'}
              </StatusBadge>
            </div>
            
            <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', color: '#6b7280', lineHeight: 1.6 }}>
                {assignment.description}
              </p>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                borderRadius: '0.75rem', 
                padding: '0.875rem',
                border: '1px solid rgba(14, 165, 233, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Calendar size={12} />
                      <span style={{ fontWeight: 500 }}>Teslim: {assignment.dueDate}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Users size={12} />
                      <span style={{ fontWeight: 500 }}>{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                  </div>
                  {assignment.averageScore && (
                    <div style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      color: 'white',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px -1px rgba(34, 197, 94, 0.3)'
                    }}>
                      {assignment.averageScore}%
                    </div>
                  )}
                </div>
                
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.125rem'
                  }}>
                    <span style={{ fontSize: '0.625rem', color: '#6b7280', fontWeight: 500 }}>İlerleme</span>
                    <span style={{ fontSize: '0.625rem', color: '#1f2937', fontWeight: 600 }}>
                      {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                    </span>
                  </div>
                  <ProgressBar progress={(assignment.submissions / assignment.totalStudents) * 100} />
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '0 0.5rem',
              borderTop: '1px solid rgba(14, 165, 233, 0.1)',
              paddingTop: '0.875rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // View submissions
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                    boxShadow: '0 2px 4px -1px rgba(14, 165, 233, 0.3)',
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem'
                  }}
                >
                  <Eye size={14} />
                  Görüntüle
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Edit assignment
                  }}
                  style={{
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem'
                  }}
                >
                  <Edit size={14} />
                  Düzenle
                </Button>
              </div>
              <Button
                variant="error"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAssignment(assignment.id);
                }}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: '0 2px 4px -1px rgba(239, 68, 68, 0.3)',
                  padding: '0.375rem 0.5rem',
                  fontSize: '0.75rem'
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </AssignmentCard>
        ))}
      </AssignmentsGrid>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{ maxWidth: '600px', padding: '2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div>
                <Title size="md" style={{ margin: 0 }}>Yeni Ödev Oluştur</Title>
                <Subtitle style={{ margin: '0.5rem 0 0 0' }}>Ödev detaylarını doldurun</Subtitle>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowCreateModal(false)}
                style={{ 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  padding: 0,
                  borderRadius: '50%'
                }}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Ödev Başlığı
                </label>
                <Input
                  placeholder="Ödev başlığını girin..."
                  style={{ 
                    height: '3rem', 
                    fontSize: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Ders
                  </label>
                  <Select
                    style={{ 
                      height: '3rem', 
                      fontSize: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem'
                    }}
                  >
                    <option value="">Ders seçin</option>
                    <option value="matematik">Matematik</option>
                    <option value="fen">Fen Bilgisi</option>
                    <option value="turkce">Türkçe</option>
                    <option value="sosyal">Sosyal Bilgiler</option>
                    <option value="ingilizce">İngilizce</option>
                  </Select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Sınıf
                  </label>
                  <Select
                    style={{ 
                      height: '3rem', 
                      fontSize: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem'
                    }}
                  >
                    <option value="">Sınıf seçin</option>
                    <option value="9-A">9-A</option>
                    <option value="9-B">9-B</option>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="11-A">11-A</option>
                    <option value="11-B">11-B</option>
                  </Select>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Atama Türü
                  </label>
                  <Select
                    style={{ 
                      height: '3rem', 
                      fontSize: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem'
                    }}
                  >
                    <option value="">Atama türü seçin</option>
                    <option value="class">Sınıfa Ata</option>
                    <option value="individual">Bireysel Ata</option>
                    <option value="group">Grup Ata</option>
                  </Select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Kitap
                  </label>
                  <Select
                    style={{ 
                      height: '3rem', 
                      fontSize: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.75rem'
                    }}
                  >
                    <option value="">Kitap seçin</option>
                    <option value="matematik-9">Matematik 9. Sınıf</option>
                    <option value="matematik-10">Matematik 10. Sınıf</option>
                    <option value="fen-9">Fen Bilgisi 9. Sınıf</option>
                    <option value="fen-10">Fen Bilgisi 10. Sınıf</option>
                    <option value="turkce-9">Türkçe 9. Sınıf</option>
                    <option value="turkce-10">Türkçe 10. Sınıf</option>
                    <option value="sosyal-9">Sosyal Bilgiler 9. Sınıf</option>
                    <option value="ingilizce-9">İngilizce 9. Sınıf</option>
                  </Select>
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Ödev Açıklaması
                </label>
                <TextArea
                  placeholder="Ödev açıklamasını detaylı olarak yazın..."
                  style={{ 
                    minHeight: '120px', 
                    fontSize: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Teslim Tarihi
                </label>
                <Input
                  type="date"
                  placeholder="Teslim tarihi seçin"
                  style={{ 
                    height: '3rem', 
                    fontSize: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem'
                  }}
                />
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '1rem', 
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                İptal
              </Button>
              <Button 
                variant="primary"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                  boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.3)'
                }}
              >
                <Send size={18} />
                Ödev Oluştur
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* Assignment Detail Modal */}
      {showDetailModal && selectedAssignment && (
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title size="md">{selectedAssignment.title}</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDetailModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <AssignmentsGrid type="modal" gap="2rem" style={{ marginBottom: '2rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  Ödev Bilgileri
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ders</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.subject}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sınıf</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.class}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Teslim Tarihi</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.dueDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Oluşturulma</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.createdAt}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  İstatistikler
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Teslim Edilen</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.submissions}/{selectedAssignment.totalStudents}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Teslim Oranı</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{Math.round((selectedAssignment.submissions / selectedAssignment.totalStudents) * 100)}%</span>
                  </div>
                  {selectedAssignment.averageScore && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama Başarı</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedAssignment.averageScore}%</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Durum</span>
                    <Badge variant={selectedAssignment.status === 'active' ? 'success' : selectedAssignment.status === 'completed' ? 'info' : 'error'}>
                      {selectedAssignment.status === 'active' ? 'Aktif' : selectedAssignment.status === 'completed' ? 'Tamamlandı' : 'Gecikmiş'}
                    </Badge>
                  </div>
                </div>
              </div>
            </AssignmentsGrid>
            
            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                Açıklama
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
                {selectedAssignment.description}
              </p>
            </div>
            
            {selectedAssignment.assignedTo === 'individual' && selectedAssignment.students && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                  Atanan Öğrenciler
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedAssignment.students.map((student, index) => (
                    <Badge key={index} variant="info">
                      {student}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
              <Button variant="primary">
                <Eye size={16} />
                Teslimleri Görüntüle
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
} 