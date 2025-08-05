"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  FileText,
  Award,
  Star,
  Clock,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  User,
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
  Activity
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

const StudentsGrid = styled.div<{
  cols?: number;
  gap?: string;
}>`
  display: grid;
  gap: ${props => props.gap || '1rem'};
  
  /* Mobile first approach */
  grid-template-columns: 1fr;
  
  /* Tablet */
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Small desktop */
  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1), 3)}, 1fr);
  }
  
  /* Medium desktop */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1), 4)}, 1fr);
  }
  
  /* Large desktop */
  @media (min-width: 1280px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1), 6)}, 1fr);
  }
  
  /* Extra large desktop */
  @media (min-width: 1536px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1), 8)}, 1fr);
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
  
  @media (min-width: 1280px) {
    padding: 0 2.5rem;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2rem 0;
  
  @media (min-width: 640px) {
    padding: 2.5rem 0;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem 0;
  }
`;

const SearchFilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-direction: column;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    z-index: 1;
  }
  
  input {
    padding-left: 3rem !important;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  background: white;
  min-width: 150px;
  max-width: 200px;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
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

const StudentCard = styled(Card)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
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

interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  class: string;
  level: number;
  xp: number;
  attendanceRate: number;
  averageScore: number;
  subjects: SubjectPerformance[];
  recentAssignments: Assignment[];
  status: 'active' | 'inactive';
  joinDate: string;
}

interface SubjectPerformance {
  subject: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastAssignment: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  score?: number;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmet Yılmaz",
      avatar: "AY",
      email: "ahmet.yilmaz@email.com",
      phone: "+90 555 123 4567",
      class: "9-A",
      level: 8,
      xp: 1250,
      attendanceRate: 95,
      averageScore: 88,
      subjects: [
        { subject: "Matematik", score: 92, trend: 'up', lastAssignment: "2024-01-15" },
        { subject: "Fen Bilgisi", score: 85, trend: 'stable', lastAssignment: "2024-01-10" },
        { subject: "Türkçe", score: 78, trend: 'down', lastAssignment: "2024-01-12" }
      ],
      recentAssignments: [
        { id: "1", title: "Kesirler Ödevi", subject: "Matematik", dueDate: "2024-01-20", status: "completed", score: 95 },
        { id: "2", title: "Hücre Konusu", subject: "Fen Bilgisi", dueDate: "2024-01-25", status: "pending" }
      ],
      status: 'active',
      joinDate: '2023-09-01'
    },
    {
      id: "2",
      name: "Zeynep Kaya",
      avatar: "ZK",
      email: "zeynep.kaya@email.com",
      phone: "+90 555 987 6543",
      class: "9-A",
      level: 6,
      xp: 980,
      attendanceRate: 88,
      averageScore: 82,
      subjects: [
        { subject: "Matematik", score: 75, trend: 'up', lastAssignment: "2024-01-15" },
        { subject: "Fen Bilgisi", score: 88, trend: 'up', lastAssignment: "2024-01-10" },
        { subject: "Türkçe", score: 85, trend: 'stable', lastAssignment: "2024-01-12" }
      ],
      recentAssignments: [
        { id: "1", title: "Kesirler Ödevi", subject: "Matematik", dueDate: "2024-01-20", status: "completed", score: 78 },
        { id: "2", title: "Hücre Konusu", subject: "Fen Bilgisi", dueDate: "2024-01-25", status: "completed", score: 92 }
      ],
      status: 'active',
      joinDate: '2023-09-01'
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleAssignAssignment = (studentId: string) => {
    setSelectedStudent(students.find(s => s.id === studentId) || null);
    setShowAssignmentModal(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const stats = [
    { title: "Toplam Öğrenci", value: students.length.toString(), icon: Users, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "Aktif Öğrenci", value: students.filter(s => s.status === 'active').length.toString(), icon: User, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { title: "Ortalama Başarı", value: `${Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%`, icon: Award, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Ortalama Katılım", value: `${Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)}%`, icon: Clock, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" }
  ];

  return (
    <PageWrapper>
      <Container>
        {/* Header */}
        <Card style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <Title size="lg">Öğrenciler</Title>
              <Subtitle>Öğrenci listesi, detaylar ve ödev yönetimi</Subtitle>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchFilterWrapper>
            <SearchInputWrapper>
              <Search size={20} className="search-icon" />
              <Input
                placeholder="Öğrenci ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
            <FilterSelect
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">Tüm Sınıflar</option>
              <option value="9-A">9-A</option>
              <option value="9-B">9-B</option>
              <option value="10-A">10-A</option>
            </FilterSelect>
          </SearchFilterWrapper>
        </Card>

        {/* Stats */}
        <StudentsGrid cols={4} gap="1.5rem" style={{ marginBottom: '2rem' }}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>{stat.title}</h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{stat.value}</div>
                </div>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: stat.color }}>
                  <stat.icon size={24} />
                </div>
              </div>
            </Card>
          ))}
        </StudentsGrid>

        {/* Students List */}
        <StudentsGrid cols={2} gap="1.5rem">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleStudentClick(student)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    {student.avatar}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                      {student.name}
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                      {student.class} • {student.email}
                    </p>
                  </div>
                </div>
                <Badge variant={student.status === 'active' ? 'success' : 'error'}>
                  {student.status === 'active' ? 'Aktif' : 'Pasif'}
                </Badge>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                    {student.averageScore}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Ortalama
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                    {student.attendanceRate}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Katılım
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                    {student.xp}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    XP
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={16} color="#f97316" />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Level {student.level}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssignAssignment(student.id);
                    }}
                  >
                    <FileText size={16} />
                    Ödev Ata
                  </Button>
                </div>
              </div>
            </StudentCard>
          ))}
        </StudentsGrid>

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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Title size="md">{selectedStudent.name} - Detaylar</Title>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              
              <StudentsGrid cols={2} gap="2rem" style={{ marginBottom: '2rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                    Kişisel Bilgiler
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{selectedStudent.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{selectedStudent.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <GraduationCap size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{selectedStudent.class}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} color="#6b7280" />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>Katılım: {selectedStudent.joinDate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                    Performans
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama Başarı</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.averageScore}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Katılım Oranı</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.attendanceRate}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Seviye</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.level}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>XP</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedStudent.xp}</span>
                    </div>
                  </div>
                </div>
              </StudentsGrid>
              
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                  Ders Performansları
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedStudent.subjects.map((subject, index) => (
                    <div key={index} style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{subject.subject}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{subject.score}%</span>
                          {subject.trend === 'up' && <TrendingUp size={16} color="#22c55e" />}
                          {subject.trend === 'down' && <TrendingDown size={16} color="#ef4444" />}
                          {subject.trend === 'stable' && <Activity size={16} color="#6b7280" />}
                        </div>
                      </div>
                      <div style={{ width: '100%', height: '0.5rem', background: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${subject.score}%`, height: '100%', background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)', borderRadius: '9999px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}

        {/* Assignment Modal */}
        {showAssignmentModal && selectedStudent && (
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
                <Title size="md">{selectedStudent.name} - Ödev Ata</Title>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              
              <Input
                placeholder="Ödev başlığı"
              />
              
              <Select>
                <option value="">Ders seçin</option>
                <option value="matematik">Matematik</option>
                <option value="fen">Fen Bilgisi</option>
                <option value="turkce">Türkçe</option>
              </Select>
              
              <TextArea
                placeholder="Ödev açıklaması"
              />
              
              <Input
                type="date"
                placeholder="Teslim tarihi"
              />
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <Button
                  variant="secondary"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  İptal
                </Button>
                <Button variant="primary">
                  <Send size={16} />
                  Ödev Ata
                </Button>
              </div>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </PageWrapper>
  );
} 