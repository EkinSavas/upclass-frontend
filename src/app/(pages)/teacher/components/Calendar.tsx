"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Clock,
  Users,
  BookOpen,
  Target,
  Star,
  TrendingUp,
  Eye,
  Mic,
  Camera,
  CameraOff,
  MicOff,
  Share,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Heart,
  Brain,
  Bell,
  Settings,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  X
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

const CalendarGrid = styled.div<{
  cols?: number;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: ${props => props.gap || '1rem'};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CalendarGridComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
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

const CalendarDay = styled.div<{ 
  isToday?: boolean; 
  hasEvent?: boolean; 
  isOtherMonth?: boolean;
  isSelected?: boolean;
  isUpcoming?: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.25rem;
  min-height: 80px;
  
  ${props => {
    if (props.isSelected) {
      return `
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
        color: white;
        box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
      `;
    }
    if (props.isToday) {
      return `
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white;
        box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.3);
      `;
    }
    if (props.hasEvent) {
      if (props.isUpcoming) {
        return `
          background: rgba(34, 197, 94, 0.1);
          color: #166534;
          border: 1px solid rgba(34, 197, 94, 0.3);
          
          &:hover {
            background: rgba(34, 197, 94, 0.15);
            border-color: rgba(34, 197, 94, 0.5);
            transform: scale(1.02);
          }
        `;
      } else {
        return `
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.2);
          
          &:hover {
            background: rgba(107, 114, 128, 0.15);
            border-color: rgba(107, 114, 128, 0.4);
            transform: scale(1.02);
          }
        `;
      }
    }
    if (props.isOtherMonth) {
      return `
        color: #9ca3af;
        background: transparent;
      `;
    }
    return `
      color: #374151;
      background: transparent;
      
      &:hover {
        background: rgba(14, 165, 233, 0.05);
        color: #0ea5e9;
      }
    `;
  }}
  
  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => {
      if (!props.hasEvent) return 'transparent';
      if (props.isUpcoming) return '#22c55e';
      return '#6b7280';
    }};
  }
`;

const EventCard = styled(Card)`
  position: relative;
  overflow: hidden;
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
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  subject: string;
  type: 'lesson' | 'quiz' | 'meeting' | 'exam';
  participants: string[];
  location?: string;
  notes?: string;
}

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Matematik Dersi",
      description: "Kesirler konusu işlenecek",
      date: "2024-01-15",
      time: "09:00",
      duration: 45,
      subject: "Matematik",
      type: "lesson",
      participants: ["Ahmet Yılmaz", "Zeynep Kaya", "Mehmet Demir"]
    },
    {
      id: "2",
      title: "Quiz - Fen Bilgisi",
      description: "Hücre konusu quiz'i",
      date: "2024-01-16",
      time: "10:30",
      duration: 30,
      subject: "Fen Bilgisi",
      type: "quiz",
      participants: ["Tüm Sınıf"]
    },
    {
      id: "3",
      title: "Veli Toplantısı",
      description: "Haftalık değerlendirme",
      date: "2024-01-18",
      time: "14:00",
      duration: 60,
      subject: "Genel",
      type: "meeting",
      participants: ["Veliler"]
    },
    {
      id: "4",
      title: "Türkçe Dersi",
      description: "Paragraf analizi teknikleri",
      date: "2024-01-15",
      time: "11:00",
      duration: 40,
      subject: "Türkçe",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "5",
      title: "Fen Bilgisi Dersi",
      description: "Hücre yapısı ve organeller",
      date: "2024-01-16",
      time: "13:30",
      duration: 45,
      subject: "Fen Bilgisi",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "6",
      title: "Matematik Quiz",
      description: "Kesirler konusu quiz'i",
      date: "2024-01-17",
      time: "09:00",
      duration: 25,
      subject: "Matematik",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "7",
      title: "Türkçe Quiz",
      description: "Paragraf analizi quiz'i",
      date: "2024-01-17",
      time: "10:30",
      duration: 20,
      subject: "Türkçe",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "8",
      title: "Öğretmenler Toplantısı",
      description: "Aylık planlama toplantısı",
      date: "2024-01-19",
      time: "15:00",
      duration: 90,
      subject: "Genel",
      type: "meeting",
      participants: ["Öğretmenler"]
    },
    {
      id: "9",
      title: "Matematik Dersi",
      description: "Ondalık sayılar konusu",
      date: "2024-01-20",
      time: "09:00",
      duration: 45,
      subject: "Matematik",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "10",
      title: "Fen Bilgisi Dersi",
      description: "Kimyasal tepkimeler",
      date: "2024-01-20",
      time: "11:00",
      duration: 45,
      subject: "Fen Bilgisi",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "11",
      title: "Türkçe Dersi",
      description: "Cümle türleri ve yapısı",
      date: "2024-01-20",
      time: "13:30",
      duration: 40,
      subject: "Türkçe",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "12",
      title: "Sınav - Matematik",
      description: "Kesirler ve ondalık sayılar sınavı",
      date: "2024-01-22",
      time: "09:00",
      duration: 60,
      subject: "Matematik",
      type: "exam",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "13",
      title: "Sınav - Fen Bilgisi",
      description: "Hücre ve kimyasal tepkimeler sınavı",
      date: "2024-01-22",
      time: "11:00",
      duration: 60,
      subject: "Fen Bilgisi",
      type: "exam",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "14",
      title: "Veli Görüşmesi",
      description: "Bireysel veli görüşmeleri",
      date: "2024-01-23",
      time: "14:00",
      duration: 30,
      subject: "Genel",
      type: "meeting",
      participants: ["Veliler"]
    },
    {
      id: "15",
      title: "Matematik Dersi",
      description: "Yüzde hesaplamaları",
      date: "2024-01-24",
      time: "09:00",
      duration: 45,
      subject: "Matematik",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "16",
      title: "Fen Bilgisi Dersi",
      description: "Elektrik devreleri",
      date: "2024-01-24",
      time: "11:00",
      duration: 45,
      subject: "Fen Bilgisi",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "17",
      title: "Türkçe Dersi",
      description: "Yazım kuralları",
      date: "2024-01-24",
      time: "13:30",
      duration: 40,
      subject: "Türkçe",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "18",
      title: "Quiz - Matematik",
      description: "Yüzde hesaplamaları quiz'i",
      date: "2024-01-25",
      time: "09:00",
      duration: 25,
      subject: "Matematik",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "19",
      title: "Quiz - Fen Bilgisi",
      description: "Elektrik devreleri quiz'i",
      date: "2024-01-25",
      time: "11:00",
      duration: 25,
      subject: "Fen Bilgisi",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "20",
      title: "Quiz - Türkçe",
      description: "Yazım kuralları quiz'i",
      date: "2024-01-25",
      time: "13:30",
      duration: 20,
      subject: "Türkçe",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "21",
      title: "Matematik Dersi",
      description: "Cebirsel ifadeler",
      date: "2024-02-01",
      time: "09:00",
      duration: 45,
      subject: "Matematik",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "22",
      title: "Fen Bilgisi Dersi",
      description: "Kimyasal bağlar",
      date: "2024-02-01",
      time: "11:00",
      duration: 45,
      subject: "Fen Bilgisi",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "23",
      title: "Türkçe Dersi",
      description: "Noktalama işaretleri",
      date: "2024-02-01",
      time: "13:30",
      duration: 40,
      subject: "Türkçe",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "24",
      title: "Quiz - Matematik",
      description: "Cebirsel ifadeler quiz'i",
      date: "2024-02-02",
      time: "09:00",
      duration: 25,
      subject: "Matematik",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "25",
      title: "Quiz - Fen Bilgisi",
      description: "Kimyasal bağlar quiz'i",
      date: "2024-02-02",
      time: "11:00",
      duration: 25,
      subject: "Fen Bilgisi",
      type: "quiz",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "26",
      title: "Veli Toplantısı",
      description: "Şubat ayı değerlendirmesi",
      date: "2024-02-05",
      time: "14:00",
      duration: 60,
      subject: "Genel",
      type: "meeting",
      participants: ["Veliler"]
    },
    {
      id: "27",
      title: "Matematik Dersi",
      description: "Denklem çözme teknikleri",
      date: "2024-02-08",
      time: "09:00",
      duration: 45,
      subject: "Matematik",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "28",
      title: "Fen Bilgisi Dersi",
      description: "Asitler ve bazlar",
      date: "2024-02-08",
      time: "11:00",
      duration: 45,
      subject: "Fen Bilgisi",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "29",
      title: "Türkçe Dersi",
      description: "Anlatım teknikleri",
      date: "2024-02-08",
      time: "13:30",
      duration: 40,
      subject: "Türkçe",
      type: "lesson",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "30",
      title: "Sınav - Matematik",
      description: "Cebirsel ifadeler ve denklemler sınavı",
      date: "2024-02-12",
      time: "09:00",
      duration: 60,
      subject: "Matematik",
      type: "exam",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "31",
      title: "Sınav - Fen Bilgisi",
      description: "Kimyasal bağlar ve asit-baz sınavı",
      date: "2024-02-12",
      time: "11:00",
      duration: 60,
      subject: "Fen Bilgisi",
      type: "exam",
      participants: ["9-A Sınıfı"]
    },
    {
      id: "32",
      title: "Sınav - Türkçe",
      description: "Noktalama ve anlatım teknikleri sınavı",
      date: "2024-02-12",
      time: "13:30",
      duration: 60,
      subject: "Türkçe",
      type: "exam",
      participants: ["9-A Sınıfı"]
    }
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isOtherMonth: true });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isOtherMonth: false });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isOtherMonth: true });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const hasEvent = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const isUpcoming = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const eventsForDate = getEventsForDate(date);
    if (eventsForDate.length > 0) {
      // Show the first event details, but indicate there are more
      setSelectedEvent(eventsForDate[0]);
      setShowEventDetailModal(true);
      toast.success(`${eventsForDate.length} etkinlik bulundu - ${eventsForDate[0].title}`);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast.success("Etkinlik silindi!");
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  return (
    <>
      {/* Header */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Ders Takvimi</Title>
            <Subtitle>Haftalık ve aylık ders planlaması</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="secondary" onClick={() => setViewMode('month')}>
              Ay
            </Button>
            <Button variant="secondary" onClick={() => setViewMode('week')}>
              Hafta
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div style={{ marginBottom: '1rem' }}>
          <CalendarGridComponent>
            {weekDays.map(day => (
              <div key={day} style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>
                {day}
              </div>
            ))}
          </CalendarGridComponent>
          
          <CalendarGridComponent>
            {days.map((day, index) => {
              const eventsForDay = getEventsForDate(day.date);
              return (
                <CalendarDay
                  key={index}
                  isToday={isToday(day.date)}
                  hasEvent={hasEvent(day.date)}
                  isOtherMonth={day.isOtherMonth}
                  isSelected={isSelected(day.date) || false}
                  isUpcoming={isUpcoming(day.date)}
                  onClick={() => handleDateClick(day.date)}
                  title={eventsForDay.length > 0 ? `${eventsForDay.length} etkinlik` : ''}
                >
                  <div style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                    color: day.isOtherMonth ? '#9ca3af' : '#374151'
                  }}>
                    {day.date.getDate()}
                  </div>
                  
                  {eventsForDay.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.125rem',
                      width: '100%',
                      alignItems: 'center'
                    }}>
                      {eventsForDay.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          style={{
                            fontSize: '0.5rem',
                            padding: '0.125rem 0.25rem',
                            borderRadius: '0.25rem',
                            background: isUpcoming(day.date) 
                              ? (event.type === 'lesson' 
                                  ? 'rgba(34, 197, 94, 0.2)' 
                                  : event.type === 'quiz' 
                                  ? 'rgba(249, 115, 22, 0.2)'
                                  : 'rgba(14, 165, 233, 0.2)')
                              : (event.type === 'lesson' 
                                  ? 'rgba(107, 114, 128, 0.2)' 
                                  : event.type === 'quiz' 
                                  ? 'rgba(107, 114, 128, 0.2)'
                                  : 'rgba(107, 114, 128, 0.2)'),
                            color: isUpcoming(day.date)
                              ? (event.type === 'lesson' 
                                  ? '#166534' 
                                  : event.type === 'quiz' 
                                  ? '#92400e'
                                  : '#0ea5e9')
                              : '#6b7280',
                            fontWeight: 600,
                            textAlign: 'center',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            border: `1px solid ${
                              isUpcoming(day.date)
                                ? (event.type === 'lesson' 
                                    ? 'rgba(34, 197, 94, 0.3)' 
                                    : event.type === 'quiz' 
                                    ? 'rgba(249, 115, 22, 0.3)'
                                    : 'rgba(14, 165, 233, 0.3)')
                                : 'rgba(107, 114, 128, 0.3)'
                            }`
                          }}
                          title={`${event.title} - ${event.time}`}
                        >
                          {event.title.length > 8 ? event.title.substring(0, 8) + '...' : event.title}
                        </div>
                      ))}
                      
                      {eventsForDay.length > 2 && (
                        <div style={{
                          fontSize: '0.5rem',
                          padding: '0.125rem 0.25rem',
                          borderRadius: '0.25rem',
                          background: isUpcoming(day.date) ? 'rgba(34, 197, 94, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                          color: isUpcoming(day.date) ? '#166534' : '#6b7280',
                          fontWeight: 600,
                          textAlign: 'center',
                          width: '100%'
                        }}>
                          +{eventsForDay.length - 2} daha
                        </div>
                      )}
                    </div>
                  )}
                </CalendarDay>
              );
            })}
          </CalendarGridComponent>
        </div>
      </Card>

      {/* Events List */}
      <CalendarGrid cols={2} gap="2rem" style={{ height: '600px' }}>
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <Title size="md">Yaklaşan Etkinlikler</Title>
            <Badge variant="info">
              {events.length} etkinlik
            </Badge>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            flex: 1,
            overflowY: 'auto',
            paddingRight: '0.5rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}>
            {events.slice(0, 6).map((event) => (
              <EventCard
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setSelectedDate(new Date(event.date));
                  setShowEventDetailModal(true);
                }}
                style={{ 
                  cursor: 'pointer', 
                  marginBottom: '0.75rem',
                  padding: '1.5rem',
                  borderRadius: '0.875rem',
                  border: '1px solid rgba(14, 165, 233, 0.08)',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 2px 8px -1px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '120px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: event.type === 'lesson' 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                        : event.type === 'quiz'
                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                        : 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.15)',
                      fontSize: '1.5rem'
                    }}>
                      {event.type === 'lesson' ? '📚' : event.type === 'quiz' ? '📝' : '👥'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ 
                        margin: 0, 
                        fontSize: '1.1rem', 
                        fontWeight: 700, 
                        color: '#1f2937',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.3,
                        marginBottom: '0.5rem'
                      }}>
                        {event.title}
                      </h4>
                      <p style={{ 
                        margin: '0 0 0.375rem 0', 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: 500
                      }}>
                        {event.date} • {event.time} • {event.duration} dk
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.8rem', 
                        color: '#9ca3af',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.4
                      }}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <Badge 
                      variant={event.type === 'lesson' ? 'success' : event.type === 'quiz' ? 'warning' : 'info'}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.375rem 0.75rem',
                        borderRadius: '0.5rem'
                      }}
                    >
                      {event.type === 'lesson' ? 'Ders' : event.type === 'quiz' ? 'Quiz' : 'Toplantı'}
                    </Badge>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      fontWeight: 500
                    }}>
                      <Users size={14} />
                      <span>{event.participants.length}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: '4px',
                  background: event.type === 'lesson' 
                    ? 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                    : event.type === 'quiz'
                    ? 'linear-gradient(90deg, #f97316 0%, #ea580c 100%)'
                    : 'linear-gradient(90deg, #0ea5e9 0%, #3b82f6 100%)',
                  borderRadius: '0.875rem 0.875rem 0 0'
                }} />
              </EventCard>
            ))}
          </div>
        </Card>

        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden' }}>
          <Title size="md" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>İstatistikler</Title>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem', 
            flex: 1,
            overflowY: 'auto',
            paddingRight: '0.5rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(14, 165, 233, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(14, 165, 233, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Toplam Ders</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Bu ay</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0ea5e9' }}>
                {events.filter(e => e.type === 'lesson').length}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(249, 115, 22, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(249, 115, 22, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Quiz Sayısı</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Bu ay</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f97316' }}>
                {events.filter(e => e.type === 'quiz').length}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(34, 197, 94, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(34, 197, 94, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Toplantı</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Bu ay</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#22c55e' }}>
                {events.filter(e => e.type === 'meeting').length}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(239, 68, 68, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(239, 68, 68, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Sınav</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Bu ay</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444' }}>
                {events.filter(e => e.type === 'exam').length}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(107, 114, 128, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(107, 114, 128, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Toplam Etkinlik</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Bu ay</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#64748b' }}>
                {events.length}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
              borderRadius: '0.75rem',
              border: '1px solid rgba(14, 165, 233, 0.1)',
              boxShadow: '0 2px 4px -1px rgba(14, 165, 233, 0.1)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Yaklaşan</h4>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Gelecek 7 gün</p>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0ea5e9' }}>
                {events.filter(e => {
                  const eventDate = new Date(e.date);
                  const today = new Date();
                  const nextWeek = new Date(today);
                  nextWeek.setDate(today.getDate() + 7);
                  return eventDate >= today && eventDate <= nextWeek;
                }).length}
              </div>
            </div>
          </div>
        </Card>
      </CalendarGrid>

      {/* Event Detail Modal */}
      {showEventDetailModal && selectedEvent && (
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
              <Title size="md">
                {selectedDate ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : ''} - Etkinlikler
              </Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowEventDetailModal(false)}
              >
                <X size={16} />
              </Button>
            </div>
            
            {selectedDate && getEventsForDate(selectedDate).map((event, index) => (
              <Card
                key={event.id}
                style={{ 
                  marginBottom: '1rem',
                  border: event.id === selectedEvent.id ? '2px solid #0ea5e9' : '1px solid rgba(14, 165, 233, 0.1)',
                  background: event.id === selectedEvent.id ? 'rgba(14, 165, 233, 0.05)' : 'rgba(255, 255, 255, 0.95)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: event.type === 'lesson' 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                        : event.type === 'quiz'
                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                        : 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      {event.type === 'lesson' ? '📚' : event.type === 'quiz' ? '📝' : '👥'}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                        {event.title}
                      </h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                        {event.time} • {event.duration} dk • {event.subject}
                      </p>
                    </div>
                  </div>
                  
                  <Badge variant={event.type === 'lesson' ? 'success' : event.type === 'quiz' ? 'warning' : 'info'}>
                    {event.type === 'lesson' ? 'Ders' : event.type === 'quiz' ? 'Quiz' : 'Toplantı'}
                  </Badge>
                </div>
                
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.5 }}>
                    {event.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                    <Users size={12} />
                    <span>{event.participants.length} katılımcı</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                  <Button
                    variant="error"
                    size="sm"
                    onClick={() => {
                      handleDeleteEvent(event.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                  >
                    <Edit size={14} />
                    Düzenle
                  </Button>
                </div>
              </Card>
            ))}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowEventDetailModal(false)}>
                Kapat
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
} 