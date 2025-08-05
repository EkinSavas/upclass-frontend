"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Play, 
  Target, 
  FileText, 
  Video,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Award,
  TrendingUp,
  Zap,
  MessageSquare,
  ExternalLink
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

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CalendarDayHeader = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  padding: 0.5rem;
`;

const CalendarDay = styled.div<{ 
  isCurrentMonth: boolean; 
  isToday: boolean; 
  hasEvent: boolean;
  isSelected: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  font-weight: ${props => props.isToday ? '700' : '500'};
  
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
    if (!props.isCurrentMonth) {
      return `
        color: #d1d5db;
        background: #f9fafb;
      `;
    }
    return `
      color: #374151;
      background: white;
      border: 1px solid #e5e7eb;
      
      &:hover {
        background: #f3f4f6;
        border-color: #0ea5e9;
      }
    `;
  }}
  
  ${props => props.hasEvent && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0.25rem;
      width: 0.25rem;
      height: 0.25rem;
      background: #ef4444;
      border-radius: 50%;
    }
  `}
`;

const EventCard = styled(Card)<{ priority: 'high' | 'medium' | 'low' }>`
  border-left: 4px solid;
  margin-bottom: 1rem;
  
  ${props => {
    switch (props.priority) {
      case 'high':
        return `border-left-color: #ef4444;`;
      case 'medium':
        return `border-left-color: #f97316;`;
      case 'low':
        return `border-left-color: #22c55e;`;
    }
  }}
`;

const EventTypeBadge = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.type) {
      case 'live-class':
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      case 'assignment':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'quiz':
        return `
          background: #f3e8ff;
          color: #7c3aed;
        `;
      case 'exam':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const MonthYearDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MonthYearText = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const CalendarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
`;

const EventDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
`;

const EventActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
`;

const UpcomingEvents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  
  svg {
    margin: 0 auto 1rem auto;
    color: #d1d5db;
  }
`;

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: string;
  type: 'live-class' | 'assignment' | 'quiz' | 'exam' | 'other';
  priority: 'high' | 'medium' | 'low';
  teacher: string;
  subject: string;
  participants?: number;
  isCompleted?: boolean;
  isReminderSet?: boolean;
}

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case 'live-class':
      return Play;
    case 'assignment':
      return FileText;
    case 'quiz':
      return Target;
    case 'exam':
      return Award;
    default:
      return Calendar;
  }
};

const getEventTypeText = (type: string) => {
  switch (type) {
    case 'live-class':
      return 'Canlı Ders';
    case 'assignment':
      return 'Ödev';
    case 'quiz':
      return 'Quiz';
    case 'exam':
      return 'Sınav';
    default:
      return 'Diğer';
  }
};

export default function StudentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock events data
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Matematik - Kesirler Konusu',
      description: 'Kesirler konusunu işleyeceğiz. Önceden hazırlık yapmayı unutmayın.',
      date: new Date(2024, 0, 15),
      time: '10:30',
      duration: '45 dk',
      type: 'live-class',
      priority: 'high',
      teacher: 'Ayşe Öğretmen',
      subject: 'Matematik',
      participants: 25
    },
    {
      id: '2',
      title: 'Fen Bilgisi Ödevi',
      description: 'Sayfa 45-50 arası ödevler. Çizimler dikkatli yapılacak.',
      date: new Date(2024, 0, 16),
      time: '14:00',
      duration: '60 dk',
      type: 'assignment',
      priority: 'medium',
      teacher: 'Mehmet Öğretmen',
      subject: 'Fen Bilgisi',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Türkçe Quiz',
      description: 'Paragraf konusu quiz. 20 soru, 30 dakika süre.',
      date: new Date(2024, 0, 17),
      time: '09:15',
      duration: '30 dk',
      type: 'quiz',
      priority: 'high',
      teacher: 'Fatma Öğretmen',
      subject: 'Türkçe'
    },
    {
      id: '4',
      title: 'Sosyal Bilgiler - Tarih',
      description: 'Osmanlı Devleti konusu. Görsel materyaller kullanılacak.',
      date: new Date(2024, 0, 18),
      time: '11:00',
      duration: '45 dk',
      type: 'live-class',
      priority: 'medium',
      teacher: 'Ali Öğretmen',
      subject: 'Sosyal Bilgiler',
      participants: 28
    },
    {
      id: '5',
      title: 'Matematik Sınavı',
      description: 'Kesirler ve ondalık sayılar konularından sınav.',
      date: new Date(2024, 0, 20),
      time: '10:00',
      duration: '90 dk',
      type: 'exam',
      priority: 'high',
      teacher: 'Ayşe Öğretmen',
      subject: 'Matematik'
    }
  ];

  const filterTypes = [
    { key: 'live-class', label: 'Canlı Ders', icon: Play },
    { key: 'assignment', label: 'Ödev', icon: FileText },
    { key: 'quiz', label: 'Quiz', icon: Target },
    { key: 'exam', label: 'Sınav', icon: Award }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthDays - i));
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(event.type);
    return matchesSearch && matchesFilter;
  });

  const upcomingEvents = filteredEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const formatMonthYear = (date: Date) => {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="lg">Takvim</Title>
        <Subtitle>Ders programınızı ve etkinliklerinizi takip edin</Subtitle>
      </div>

      {/* Calendar Controls */}
      <Card style={{ marginBottom: '2rem' }}>
        <CalendarControls>
          <MonthYearDisplay>
            <Button variant="secondary" size="sm" onClick={goToPreviousMonth}>
              <ChevronLeft size={20} />
            </Button>
            <MonthYearText>{formatMonthYear(currentDate)}</MonthYearText>
            <Button variant="secondary" size="sm" onClick={goToNextMonth}>
              <ChevronRight size={20} />
            </Button>
          </MonthYearDisplay>
          
          <CalendarActions>
            <Button variant="primary" size="sm" onClick={goToToday}>
              Bugün
            </Button>
            <Button variant="secondary" size="sm">
              <Plus size={16} />
              Etkinlik Ekle
            </Button>
          </CalendarActions>
        </CalendarControls>

        {/* Filters */}
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
              placeholder="Etkinlik ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </FilterSection>

        {/* Calendar Grid */}
        <CalendarHeader>
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
            <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
          ))}
        </CalendarHeader>
        
        <CalendarGrid>
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === today.toDateString();
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const dayEvents = getEventsForDate(day);
            const hasEvent = dayEvents.length > 0;
            
            return (
              <CalendarDay
                key={index}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday}
                hasEvent={hasEvent}
                isSelected={isSelected}
                onClick={() => setSelectedDate(day)}
              >
                <span>{day.getDate()}</span>
                {hasEvent && (
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '0.25rem', 
                    fontSize: '0.625rem',
                    color: isToday || isSelected ? 'white' : '#ef4444'
                  }}>
                    {dayEvents.length}
                  </div>
                )}
              </CalendarDay>
            );
          })}
        </CalendarGrid>
      </Card>

      {/* Selected Date Events */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Title size="md">
            {selectedDate.toLocaleDateString('tr-TR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm">
              <Plus size={16} />
              Etkinlik Ekle
            </Button>
          </div>
        </div>
        
        <EventList>
          {getEventsForDate(selectedDate).length > 0 ? (
            getEventsForDate(selectedDate).map(event => {
              const EventIcon = getEventTypeIcon(event.type);
              
              return (
                <EventCard key={event.id} priority={event.priority}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <EventTime>
                        <Clock size={14} />
                        <span>{event.time} - {event.duration}</span>
                        <EventTypeBadge type={event.type}>
                          <EventIcon size={12} />
                          {getEventTypeText(event.type)}
                        </EventTypeBadge>
                      </EventTime>
                      
                      <EventTitle>{event.title}</EventTitle>
                      <EventDescription>{event.description}</EventDescription>
                      
                      <EventStats>
                        <StatItem>
                          <BookOpen size={12} />
                          <span>{event.subject}</span>
                        </StatItem>
                        <StatItem>
                          <Users size={12} />
                          <span>{event.teacher}</span>
                        </StatItem>
                        {event.participants && (
                          <StatItem>
                            <Users size={12} />
                            <span>{event.participants} katılımcı</span>
                          </StatItem>
                        )}
                        <StatItem>
                          <AlertCircle size={12} />
                          <span>{event.priority === 'high' ? 'Yüksek' : event.priority === 'medium' ? 'Orta' : 'Düşük'} Öncelik</span>
                        </StatItem>
                      </EventStats>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                      {event.type === 'live-class' && (
                        <Button variant="primary" size="sm">
                          <Play size={14} />
                          Katıl
                        </Button>
                      )}
                      {event.type === 'assignment' && !event.isCompleted && (
                        <Button variant="warning" size="sm">
                          <FileText size={14} />
                          Başla
                        </Button>
                      )}
                      {event.type === 'quiz' && (
                        <Button variant="success" size="sm">
                          <Target size={14} />
                          Başla
                        </Button>
                      )}
                      <Button variant="secondary" size="sm">
                        <Bell size={14} />
                        Hatırlat
                      </Button>
                    </div>
                  </div>
                </EventCard>
              );
            })
          ) : (
            <NoEventsMessage>
              <Calendar size={48} />
              <p>Bu tarihte etkinlik bulunmuyor</p>
              <Button variant="primary" size="sm" style={{ marginTop: '1rem' }}>
                <Plus size={16} />
                Etkinlik Ekle
              </Button>
            </NoEventsMessage>
          )}
        </EventList>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Title size="md">Yaklaşan Etkinlikler</Title>
          <Button variant="secondary" size="sm">
            <ExternalLink size={16} />
            Tümünü Gör
          </Button>
        </div>
        
        <UpcomingEvents>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              const EventIcon = getEventTypeIcon(event.type);
              
              return (
                <div key={event.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <EventIcon size={16} />
                    </div>
                    
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                        {event.title}
                      </h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
                        {event.date.toLocaleDateString('tr-TR')} • {event.time}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <EventTypeBadge type={event.type}>
                      <EventIcon size={12} />
                      {getEventTypeText(event.type)}
                    </EventTypeBadge>
                    
                    {event.type === 'live-class' && (
                      <Button variant="primary" size="sm">
                        <Play size={14} />
                        Katıl
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <NoEventsMessage>
              <Calendar size={48} />
              <p>Yaklaşan etkinlik bulunmuyor</p>
            </NoEventsMessage>
          )}
        </UpcomingEvents>
      </Card>
    </div>
  );
} 