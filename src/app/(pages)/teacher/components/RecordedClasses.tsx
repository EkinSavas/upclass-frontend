"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PlayCircle,
  Clock,
  Users,
  Calendar,
  Download,
  Share,
  Trash2,
  Eye,
  Search,
  Filter,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  MessageSquare,
  Star,
  Award,
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

const RecordedClassesGrid = styled.div<{
  cols?: number;
  gap?: string;
  type?: 'stats' | 'recordings' | 'modal';
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
    } else if (props.type === 'recordings') {
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

const RecordingCard = styled(Card)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
  border: 1px solid rgba(14, 165, 233, 0.1);
  min-height: 400px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: rgba(14, 165, 233, 0.3);
  }
`;

const VideoThumbnail = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
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
  max-width: 1000px;
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

interface Recording {
  id: string;
  title: string;
  subject: string;
  class: string;
  date: string;
  duration: string;
  participants: number;
  fileSize: string;
  thumbnail: string;
  description: string;
  tags: string[];
  views: number;
  downloads: number;
  status: 'processed' | 'processing' | 'failed';
}

export default function RecordedClasses() {
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: "1",
      title: "Matematik - Kesirler Konusu",
      subject: "Matematik",
      class: "9-A",
      date: "2024-01-15",
      duration: "45:32",
      participants: 25,
      fileSize: "256 MB",
      thumbnail: "math-thumb",
      description: "Kesirler konusu detaylı anlatım ve örnek çözümler",
      tags: ["kesirler", "matematik", "9. sınıf"],
      views: 45,
      downloads: 12,
      status: 'processed'
    },
    {
      id: "2",
      title: "Fen Bilgisi - Hücre Yapısı",
      subject: "Fen Bilgisi",
      class: "9-A",
      date: "2024-01-14",
      duration: "38:15",
      participants: 23,
      fileSize: "198 MB",
      thumbnail: "science-thumb",
      description: "Hücre yapısı ve organellerin detaylı incelenmesi",
      tags: ["hücre", "fen bilgisi", "biyoloji"],
      views: 32,
      downloads: 8,
      status: 'processed'
    },
    {
      id: "3",
      title: "Türkçe - Paragraf Analizi",
      subject: "Türkçe",
      class: "9-A",
      date: "2024-01-13",
      duration: "42:08",
      participants: 28,
      fileSize: "224 MB",
      thumbnail: "turkish-thumb",
      description: "Paragraf analizi teknikleri ve uygulama örnekleri",
      tags: ["paragraf", "türkçe", "analiz"],
      views: 38,
      downloads: 15,
      status: 'processed'
    }
  ]);

  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleRecordingClick = (recording: Recording) => {
    setSelectedRecording(recording);
    setShowDetailModal(true);
  };

  const handleDeleteRecording = (recordingId: string) => {
    setRecordings(recordings.filter(r => r.id !== recordingId));
    toast.success("Kayıt silindi!");
  };

  const handleDownloadRecording = (recording: Recording) => {
    toast.success(`${recording.title} indiriliyor...`);
  };

  const handleShareRecording = (recording: Recording) => {
    toast.success(`${recording.title} paylaşıldı!`);
  };

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recording.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || recording.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || recording.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const stats = [
    { title: "Toplam Kayıt", value: recordings.length.toString(), icon: PlayCircle, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "Toplam Süre", value: "2:05:55", icon: Clock, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { title: "Toplam İzlenme", value: recordings.reduce((acc, r) => acc + r.views, 0).toString(), icon: Eye, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Toplam İndirme", value: recordings.reduce((acc, r) => acc + r.downloads, 0).toString(), icon: Download, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" }
  ];

  return (
    <>
      {/* Header */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Kayıtlı Dersler</Title>
            <Subtitle>Geçmiş ders kayıtları ve yönetimi</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary">
              <Upload size={20} />
              Kayıt Yükle
            </Button>
            <Button variant="secondary">
              <Download size={20} />
              Toplu İndir
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchContainer>
          <SearchWrapper>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', zIndex: 1 }} />
            <Input
              placeholder="Kayıt ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '3rem', height: '3rem', fontSize: '1rem' }}
            />
          </SearchWrapper>
          <FilterWrapper>
            <Select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={{ width: '140px', height: '3rem' }}
            >
              <option value="all">Tüm Dersler</option>
              <option value="Matematik">Matematik</option>
              <option value="Fen Bilgisi">Fen Bilgisi</option>
              <option value="Türkçe">Türkçe</option>
            </Select>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '140px', height: '3rem' }}
            >
              <option value="all">Tüm Durumlar</option>
              <option value="processed">İşlenmiş</option>
              <option value="processing">İşleniyor</option>
              <option value="failed">Başarısız</option>
            </Select>
          </FilterWrapper>
        </SearchContainer>
      </Card>

      {/* Stats */}
      <RecordedClassesGrid type="stats" gap="1.5rem" style={{ marginBottom: '2rem' }}>
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
      </RecordedClassesGrid>

      {/* Recordings List */}
      <RecordedClassesGrid type="recordings" gap="2rem">
        {filteredRecordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => handleRecordingClick(recording)}
          >
            <VideoThumbnail>
              <PlayCircle size={56} color="white" style={{ zIndex: 1 }} />
            </VideoThumbnail>
            
            <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', lineHeight: 1.4 }}>
                {recording.title}
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#6b7280' }}>
                {recording.subject} • {recording.class}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} />
                  <span>{recording.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  <span>{recording.duration}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} color="#6b7280" />
                  <span style={{ fontSize: '1rem', color: '#6b7280' }}>{recording.participants}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Eye size={18} color="#6b7280" />
                  <span style={{ fontSize: '1rem', color: '#6b7280' }}>{recording.views}</span>
                </div>
              </div>
              <Badge variant={recording.status === 'processed' ? 'success' : recording.status === 'processing' ? 'warning' : 'error'}>
                {recording.status === 'processed' ? 'İşlenmiş' : recording.status === 'processing' ? 'İşleniyor' : 'Başarısız'}
              </Badge>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadRecording(recording);
                  }}
                >
                  <Download size={18} />
                  İndir
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareRecording(recording);
                  }}
                >
                  <Share size={18} />
                  Paylaş
                </Button>
              </div>
              <Button
                variant="error"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRecording(recording.id);
                }}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </RecordingCard>
        ))}
      </RecordedClassesGrid>

      {/* Recording Detail Modal */}
      {showDetailModal && selectedRecording && (
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
              <Title size="md">{selectedRecording.title}</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowDetailModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            <RecordedClassesGrid type="modal" gap="2rem" style={{ marginBottom: '2rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  Kayıt Bilgileri
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ders</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.subject}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sınıf</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.class}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Tarih</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Süre</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Dosya Boyutu</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.fileSize}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                  İstatistikler
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Katılımcı</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.participants}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>İzlenme</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.views}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>İndirme</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{selectedRecording.downloads}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Durum</span>
                    <Badge variant={selectedRecording.status === 'processed' ? 'success' : selectedRecording.status === 'processing' ? 'warning' : 'error'}>
                      {selectedRecording.status === 'processed' ? 'İşlenmiş' : selectedRecording.status === 'processing' ? 'İşleniyor' : 'Başarısız'}
                    </Badge>
                  </div>
                </div>
              </div>
            </RecordedClassesGrid>
            
            <div>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                Açıklama
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
                {selectedRecording.description}
              </p>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                Etiketler
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedRecording.tags.map((tag, index) => (
                  <Badge key={index} variant="info">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
              <Button variant="primary" onClick={() => handleDownloadRecording(selectedRecording)}>
                <Download size={16} />
                İndir
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
} 