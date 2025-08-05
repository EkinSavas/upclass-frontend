"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Play, 
  FileText, 
  BarChart3, 
  Video,
  Settings,
  Menu,
  X,
  Home,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Target,
  Clock,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  Star,
  Trophy,
  Target as TargetIcon,
  Activity,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Plus,
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

const Grid = styled.div<{
  cols?: number;
  gap?: string;
  type?: 'stats' | 'quick-access' | 'notifications' | 'events';
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
    } else if (props.type === 'quick-access') {
      return `
        grid-template-columns: repeat(2, 1fr);
        
        @media (min-width: 640px) {
          grid-template-columns: repeat(3, 1fr);
        }
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(5, 1fr);
        }
      `;
    } else if (props.type === 'notifications') {
      return `
        grid-template-columns: 1fr;
        
        @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `;
    } else if (props.type === 'events') {
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

const ProgressCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend, 
  subtitle 
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  trend?: string;
  subtitle?: string;
}) => (
  <Card
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -4 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.5rem 0' }}>{title}</h3>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', margin: '0 0 0.25rem 0' }}>{value}</div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#22c55e', fontWeight: 500 }}>
            <TrendingUp size={12} />
            <span>{trend}</span>
          </div>
        )}
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{subtitle}</div>
        )}
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
        background: color,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

const QuickActionCard = ({ 
  title, 
  icon: Icon, 
  color, 
  href 
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  href: string;
}) => (
  <Card
    as="a"
    href={href}
    style={{ textDecoration: 'none', color: 'inherit' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05, y: -4 }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
      <div style={{ 
        width: '4rem', 
        height: '4rem', 
        borderRadius: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        fontWeight: 600, 
        background: color,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>{title}</h3>
    </div>
  </Card>
);

const NotificationCard = ({ 
  title, 
  message, 
  time, 
  type 
}: {
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
}) => (
  <Card
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
      <div style={{ 
        width: '2.5rem', 
        height: '2.5rem', 
        borderRadius: '0.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        fontWeight: 600, 
        background: type === 'success' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' :
                   type === 'warning' ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' :
                   type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                   'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {type === 'success' ? <CheckCircle size={16} /> :
         type === 'warning' ? <AlertCircle size={16} /> :
         type === 'error' ? <AlertCircle size={16} /> :
         <Bell size={16} />}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', margin: '0 0 0.25rem 0' }}>{title}</h4>
        <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>{message}</p>
        <div style={{ fontSize: '0.625rem', color: '#9ca3af' }}>{time}</div>
      </div>
    </div>
  </Card>
);

export default function StudentDashboard() {
  const [studyMode, setStudyMode] = useState(false);
  const [studyTime, setStudyTime] = useState(0);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleStudyMode = () => {
    setStudyMode(!studyMode);
    if (!studyMode) {
      toast.success("Çalışma modu başlatıldı!");
    } else {
      toast.success("Çalışma modu durduruldu!");
    }
  };

  const quickActions = [
    { title: "Canlı Ders", icon: Play, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", href: "/student/live-class" },
    { title: "Ödevler", icon: FileText, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", href: "/student/assignments" },
    { title: "Takvim", icon: Calendar, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", href: "/student/calendar" },
    { title: "İstatistikler", icon: BarChart3, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", href: "/student/statistics" },
    { title: "Ders Kayıtları", icon: Video, color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", href: "/student/recordings" }
  ];

  const notifications = [
    { title: "Yeni Ödev", message: "Matematik dersinden yeni ödev eklendi", time: "5 dakika önce", type: 'info' as const },
    { title: "Canlı Ders Hatırlatması", message: "10 dakika sonra Fen Bilgisi canlı dersi başlayacak", time: "15 dakika önce", type: 'warning' as const },
    { title: "Quiz Tamamlandı", message: "Türkçe quiz'ini başarıyla tamamladınız", time: "1 saat önce", type: 'success' as const },
    { title: "Sistem Güncellemesi", message: "Yeni özellikler eklendi", time: "2 saat önce", type: 'info' as const }
  ];

  const upcomingEvents = [
    { title: "Matematik Canlı Ders", time: "14:30", type: "live-class" },
    { title: "Fen Bilgisi Ödevi Teslimi", time: "16:00", type: "assignment" },
    { title: "Türkçe Quiz", time: "09:15", type: "quiz" },
    { title: "Sosyal Bilgiler Ders Kaydı", time: "11:00", type: "recording" }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="lg">Hoş Geldin, Ahmet! 👋</Title>
        <Subtitle>Bugünkü öğrenme yolculuğuna devam et</Subtitle>
      </div>

      {/* Performance Stats */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Title size="md">Performans İstatistikleri</Title>
          <Button variant="secondary" size="sm">
            <ExternalLink size={16} />
            Detayları Gör
          </Button>
        </div>
        
        <Grid type="stats" gap="1.5rem">
          <ProgressCard
            title="Genel Ortalama"
            value="87.5"
            icon={Star}
            color="linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
            trend="+2.3% bu hafta"
          />
          <ProgressCard
            title="Türkiye Sıralaması"
            value="1,247"
            icon={Trophy}
            color="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
            trend="+15 sıra"
          />
          <ProgressCard
            title="Çalışma Süresi"
            value={formatTime(studyTime)}
            icon={Clock}
            color="linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)"
            subtitle="Bu oturum"
          />
          <ProgressCard
            title="Başarı Oranı"
            value="%92.3"
            icon={TargetIcon}
            color="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
            trend="+5.2% bu ay"
          />
        </Grid>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="md" style={{ marginBottom: '1rem' }}>Hızlı Erişim</Title>
        <Grid type="quick-access" gap="1.5rem">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              icon={action.icon}
              color={action.color}
              href={action.href}
            />
          ))}
        </Grid>
      </div>

      {/* Study Mode */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <Title size="md">Çalışma Modu</Title>
            <Subtitle>Diğer öğrencilerle birlikte çalışın</Subtitle>
          </div>
          <Button
            variant={studyMode ? 'success' : 'primary'}
            onClick={toggleStudyMode}
          >
            {studyMode ? <CheckCircle size={20} /> : <Play size={20} />}
            {studyMode ? 'Çalışma Modunda' : 'Çalışma Modunu Başlat'}
          </Button>
        </div>
        
        {studyMode && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
            borderRadius: '0.75rem',
            border: '1px solid rgba(14, 165, 233, 0.2)'
          }}>
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Activity size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                Çalışma Süresi: {formatTime(studyTime)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                15 öğrenci şu anda çalışıyor
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Notifications and Events */}
      <Grid type="notifications" gap="2rem">
        {/* Notifications */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Title size="md">Bildirimler</Title>
            <Button variant="secondary" size="sm">
              <Bell size={16} />
              Tümünü Gör
            </Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notifications.map((notification, index) => (
              <NotificationCard
                key={index}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                type={notification.type}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Title size="md">Yaklaşan Etkinlikler</Title>
            <Button variant="secondary" size="sm">
              <Calendar size={16} />
              Takvimi Gör
            </Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                style={{ 
                  padding: '1rem', 
                  background: '#f9fafb', 
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '2.5rem', 
                    height: '2.5rem', 
                    borderRadius: '0.5rem', 
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {event.type === 'live-class' ? <Play size={16} /> :
                     event.type === 'assignment' ? <FileText size={16} /> :
                     event.type === 'quiz' ? <Target size={16} /> :
                     <Video size={16} />}
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {event.time}
                    </div>
                  </div>
                </div>
                
                <Badge variant="info">
                  {event.type === 'live-class' ? 'Canlı Ders' :
                   event.type === 'assignment' ? 'Ödev' :
                   event.type === 'quiz' ? 'Quiz' : 'Kayıt'}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </Grid>
    </div>
  );
} 