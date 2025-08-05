"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  Play,
  Clock,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  UserCheck,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  Award,
  Star,
  Brain,
  Heart,
  Lightbulb,
  UserPlus,
  UserCog,
  Building,
  Shield,
  Database,
  FileText,
  PieChart
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";
import StudentManagement from "./components/StudentManagement";
import TeacherManagement from "./components/TeacherManagement";
import ClassManagement from "./components/ClassManagement";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(14, 165, 233, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: 600;
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }
  
  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`;

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

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

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: ${props => props.gap || '1rem'};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1) + 1, 4)}, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1) + 2, 6)}, 1fr);
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

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  href?: string;
  onClick?: () => void;
  gradient: string;
  stats?: string;
  color: string;
}

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href,
  onClick,
  gradient,
  stats,
  color
}: DashboardCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    style={{ height: '100%' }}
  >
    {href ? (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: gradient,
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: 'white',
                fontWeight: 600
              }}>
                <Icon size={24} />
              </div>
              <ChevronRight size={20} color="#9ca3af" />
            </div>
            
            <Title size="md" style={{ marginBottom: '0.5rem' }}>{title}</Title>
            <Subtitle style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>{description}</Subtitle>
            
            {stats && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <Sparkles size={16} />
                <span>{stats}</span>
              </div>
            )}
          </div>
          
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
          />
        </Card>
      </Link>
    ) : (
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ height: '100%', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
        onClick={onClick}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: gradient,
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: 'white',
              fontWeight: 600
            }}>
              <Icon size={24} />
            </div>
            <ChevronRight size={20} color="#9ca3af" />
          </div>
          
          <Title size="md" style={{ marginBottom: '0.5rem' }}>{title}</Title>
          <Subtitle style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>{description}</Subtitle>
          
          {stats && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <Sparkles size={16} />
              <span>{stats}</span>
            </div>
          )}
        </div>
        
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}
        />
      </Card>
    )}
  </motion.div>
);

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'students' | 'teachers' | 'classes'>('dashboard');

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  const stats = [
    { title: "Aktif Öğrenci", value: "24", icon: Users, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", trend: "+12% bu hafta" },
    { title: "Aktif Öğretmen", value: "8", icon: UserCog, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", trend: "+2 bu ay" },
    { title: "Aktif Sınıf", value: "12", icon: Building, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", trend: "+3 bu ay" },
    { title: "Toplam XP", value: "12.5K", icon: Trophy, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", trend: "+2.1K bu hafta" }
  ];

  const managementPanels = [
    {
      title: "Öğrenci Yönetimi",
      description: "Öğrenci kaydetme, sınıf atama ve takip işlemleri",
      icon: UserPlus,
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
      stats: "24 aktif öğrenci",
      color: "#0ea5e9",
      onClick: () => setActiveView('students')
    },
    {
      title: "Öğretmen Yönetimi",
      description: "Öğretmen kaydetme, sınıf atama ve performans takibi",
      icon: UserCog,
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      stats: "8 aktif öğretmen",
      color: "#22c55e",
      onClick: () => setActiveView('teachers')
    },
    {
      title: "Sınıf Yönetimi",
      description: "Sınıf oluşturma, öğrenci atama ve sınıf takibi",
      icon: Building,
      gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
      stats: "12 aktif sınıf",
      color: "#a855f7",
      onClick: () => setActiveView('classes')
    }
  ];

  if (activeView === 'students') {
    return <StudentManagement onBack={handleBackToDashboard} />;
  }

  if (activeView === 'teachers') {
    return <TeacherManagement onBack={handleBackToDashboard} />;
  }

  if (activeView === 'classes') {
    return <ClassManagement onBack={handleBackToDashboard} />;
  }

  return (
    <PageWrapper>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <LogoIcon>
              <GraduationCap size={24} />
            </LogoIcon>
            <LogoText>
              <h1>UpClass Admin</h1>
              <p>Modern Eğitim Platformu</p>
            </LogoText>
          </LogoContainer>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Badge variant="success">
              Sistem Aktif
            </Badge>
            <Button variant="secondary" size="sm" style={{ padding: '0.5rem' }}>
              <Settings size={20} />
            </Button>
            <Button variant="secondary" size="sm" style={{ padding: '0.5rem' }}>
              <LogOut size={20} />
            </Button>
          </div>
        </HeaderContent>
      </Header>

      <MainContainer>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Title size="xl" style={{ marginBottom: '0.5rem' }}>
            Admin Paneli 👋
          </Title>
          <Subtitle style={{ marginBottom: '2rem' }}>
            CanlıDers+ platformunu yönetin. Hangi işlemi yapmak istiyorsunuz?
          </Subtitle>
        </motion.div>

        {/* Quick Stats */}
        <Grid cols={4} gap="1.5rem" style={{ marginBottom: '2rem' }}>
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
                {stat.trend && (
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <TrendingUp size={14} />
                    {stat.trend}
                  </div>
                )}
              </div>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: stat.color }}>
                <stat.icon size={24} />
              </div>
            </StatCard>
          ))}
        </Grid>

        {/* Management Panels */}
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Yönetim İşlemleri</Title>
          <Grid cols={3} gap="1.5rem">
            {managementPanels.map((panel, index) => (
              <DashboardCard
                key={index}
                {...panel}
              />
            ))}
          </Grid>
        </Card>
      </MainContainer>
    </PageWrapper>
  );
} 