"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Star,
  Trophy,
  Target,
  Clock,
  BookOpen,
  Award,
  Calendar,
  Users,
  Eye,
  Brain,
  Heart,
  Zap,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Download,
  Share,
  Filter,
  Search
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TrendIndicator = styled.div<{ trend: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.trend) {
      case 'up':
        return `color: #22c55e;`;
      case 'down':
        return `color: #ef4444;`;
      default:
        return `color: #6b7280;`;
    }
  }}
`;

const ChartContainer = styled.div`
  height: 300px;
  background: #f9fafb;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  margin: 1rem 0;
`;

const SubjectCard = styled(Card)<{ rank: number }>`
  position: relative;
  border-left: 4px solid;
  
  ${props => {
    switch (props.rank) {
      case 1:
        return `border-left-color: #f59e0b;`;
      case 2:
        return `border-left-color: #6b7280;`;
      case 3:
        return `border-left-color: #a855f7;`;
      default:
        return `border-left-color: #e5e7eb;`;
    }
  }}
`;

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  
  ${props => {
    switch (props.rank) {
      case 1:
        return `
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        `;
      case 2:
        return `
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          color: white;
        `;
      case 3:
        return `
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          color: white;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div<{ progress: number; color: string }>`
  height: 100%;
  background: ${props => props.color};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ExamResultCard = styled(Card)<{ score: number }>`
  border-left: 4px solid;
  
  ${props => {
    if (props.score >= 90) return `border-left-color: #22c55e;`;
    if (props.score >= 70) return `border-left-color: #f97316;`;
    return `border-left-color: #ef4444;`;
  }}
`;

const ScoreBadge = styled.span<{ score: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    if (props.score >= 90) {
      return `
        background: #dcfce7;
        color: #166534;
      `;
    }
    if (props.score >= 70) {
      return `
        background: #fef3c7;
        color: #92400e;
      `;
    }
    return `
      background: #fee2e2;
      color: #991b1b;
    `;
  }}
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

interface SubjectPerformance {
  subject: string;
  average: number;
  trend: 'up' | 'down' | 'neutral';
  rank: number;
  color: string;
}

interface ExamResult {
  id: string;
  examName: string;
  subject: string;
  date: Date;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in minutes
  rank: number;
  totalStudents: number;
}

export default function StudentStatistics() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const mainStats = [
    { 
      title: "Genel Ortalama", 
      value: "87.5", 
      unit: "/100",
      icon: Star, 
      color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      trend: 'up' as const,
      change: "+2.3%"
    },
    { 
      title: "Türkiye Sıralaması", 
      value: "1,247", 
      unit: "",
      icon: Trophy, 
      color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      trend: 'up' as const,
      change: "+15"
    },
    { 
      title: "Çalışma Süresi", 
      value: "156", 
      unit: "saat",
      icon: Clock, 
      color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
      trend: 'up' as const,
      change: "+12%"
    },
    { 
      title: "Başarı Oranı", 
      value: "92.3", 
      unit: "%",
      icon: Target, 
      color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
      trend: 'up' as const,
      change: "+5.2%"
    }
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { subject: "Matematik", average: 94.2, trend: 'up', rank: 1, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { subject: "Fen Bilgisi", average: 89.7, trend: 'up', rank: 2, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { subject: "Türkçe", average: 87.3, trend: 'down', rank: 3, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { subject: "Sosyal Bilgiler", average: 85.1, trend: 'neutral', rank: 4, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" },
    { subject: "İngilizce", average: 82.8, trend: 'up', rank: 5, color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }
  ];

  const examResults: ExamResult[] = [
    {
      id: '1',
      examName: 'LGS Deneme Sınavı 1',
      subject: 'Genel',
      date: new Date(2024, 0, 15),
      score: 95,
      totalQuestions: 120,
      correctAnswers: 114,
      timeSpent: 135,
      rank: 15,
      totalStudents: 1250
    },
    {
      id: '2',
      examName: 'Matematik Sınavı',
      subject: 'Matematik',
      date: new Date(2024, 0, 10),
      score: 98,
      totalQuestions: 20,
      correctAnswers: 19,
      timeSpent: 45,
      rank: 3,
      totalStudents: 1250
    },
    {
      id: '3',
      examName: 'Fen Bilgisi Quiz',
      subject: 'Fen Bilgisi',
      date: new Date(2024, 0, 8),
      score: 85,
      totalQuestions: 15,
      correctAnswers: 13,
      timeSpent: 25,
      rank: 28,
      totalStudents: 1250
    },
    {
      id: '4',
      examName: 'Türkçe Test',
      subject: 'Türkçe',
      date: new Date(2024, 0, 5),
      score: 78,
      totalQuestions: 25,
      correctAnswers: 19,
      timeSpent: 35,
      rank: 45,
      totalStudents: 1250
    }
  ];

  const filterTypes = [
    { key: 'all', label: 'Tümü' },
    { key: 'recent', label: 'Son 30 Gün' },
    { key: 'month', label: 'Bu Ay' },
    { key: 'quarter', label: 'Bu Çeyrek' }
  ];

  const timeRanges = [
    { key: 'week', label: 'Haftalık' },
    { key: 'month', label: 'Aylık' },
    { key: 'quarter', label: 'Çeyreklik' },
    { key: 'year', label: 'Yıllık' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ChevronUp size={12} />;
      case 'down':
        return <ChevronDown size={12} />;
      default:
        return <Activity size={12} />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
    if (score >= 70) return "linear-gradient(135deg, #f97316 0%, #ea580c 100%)";
    return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="lg">Genel İstatistikler</Title>
        <Subtitle>Akademik performansınızı ve gelişiminizi takip edin</Subtitle>
      </div>

      {/* Main Stats */}
      <StatsGrid>
        {mainStats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>{stat.title}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937' }}>{stat.value}</span>
                <span style={{ fontSize: '1rem', color: '#6b7280' }}>{stat.unit}</span>
              </div>
              <TrendIndicator trend={stat.trend}>
                {getTrendIcon(stat.trend)}
                {stat.change}
              </TrendIndicator>
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
              isActive={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </FilterButton>
          ))}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Zaman:</span>
            {timeRanges.map(range => (
              <FilterButton
                key={range.key}
                isActive={timeRange === range.key}
                onClick={() => setTimeRange(range.key)}
              >
                {range.label}
              </FilterButton>
            ))}
          </div>
        </FilterSection>
      </Card>

      {/* Subject Performance */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Title size="md">Ders Performansı</Title>
          <Button variant="secondary" size="sm">
            <Download size={16} />
            Rapor İndir
          </Button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {subjectPerformance.map((subject, index) => (
            <SubjectCard
              key={index}
              rank={subject.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RankBadge rank={subject.rank}>
                {subject.rank}
              </RankBadge>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                  {subject.subject}
                </h4>
                <TrendIndicator trend={subject.trend}>
                  {getTrendIcon(subject.trend)}
                </TrendIndicator>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama</span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1f2937' }}>
                  {subject.average}%
                </span>
              </div>
              
              <ProgressBar>
                <ProgressFill progress={subject.average} color={subject.color} />
              </ProgressBar>
            </SubjectCard>
          ))}
        </div>
      </Card>

      {/* Performance Chart */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Title size="md">Performans Grafiği</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Button variant="secondary" size="sm">
              <Share size={16} />
              Paylaş
            </Button>
            <Button variant="secondary" size="sm">
              <Download size={16} />
              İndir
            </Button>
          </div>
        </div>
        
        <ChartContainer>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <BarChart3 size={48} style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ margin: 0, fontSize: '1rem' }}>Performans grafiği burada görüntülenecek</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.7 }}>
              Aylık performans trendi ve gelişim analizi
            </p>
          </div>
        </ChartContainer>
      </Card>

      {/* Exam Results */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Title size="md">Sınav Sonuçları</Title>
          <Button variant="secondary" size="sm">
            <ExternalLink size={16} />
            Tümünü Gör
          </Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {examResults.map((exam, index) => (
            <ExamResultCard
              key={exam.id}
              score={exam.score}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                      {exam.examName}
                    </h4>
                    <ScoreBadge score={exam.score}>
                      {exam.score}/100
                    </ScoreBadge>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: '#6b7280' }}>
                    <span>📚 {exam.subject}</span>
                    <span>📅 {exam.date.toLocaleDateString('tr-TR')}</span>
                    <span>⏱️ {exam.timeSpent} dk</span>
                    <span>🎯 {exam.correctAnswers}/{exam.totalQuestions}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                    <span>🏆 Sıralama: {exam.rank}/{exam.totalStudents}</span>
                    <span>📊 Başarı: {Math.round((exam.correctAnswers / exam.totalQuestions) * 100)}%</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                  <Button variant="secondary" size="sm">
                    <Eye size={14} />
                    Detay
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download size={14} />
                    Sertifika
                  </Button>
                </div>
              </div>
            </ExamResultCard>
          ))}
        </div>
      </Card>

      {/* Achievement Summary */}
      <Card>
        <Title size="md" style={{ marginBottom: '1rem' }}>Başarı Özeti</Title>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center' }}>
            <Trophy size={32} color="#f59e0b" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
              En İyi Ders
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Matematik</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.125rem', fontWeight: 700, color: '#f59e0b' }}>
              94.2%
            </p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center' }}>
            <Target size={32} color="#22c55e" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
              Hedef
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>LGS Başarısı</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.125rem', fontWeight: 700, color: '#22c55e' }}>
              %95+
            </p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center' }}>
            <TrendingUp size={32} color="#0ea5e9" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
              Gelişim
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Bu Ay</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.125rem', fontWeight: 700, color: '#0ea5e9' }}>
              +8.5%
            </p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem', textAlign: 'center' }}>
            <Award size={32} color="#a855f7" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
              Başarılar
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Kazanılan</p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.125rem', fontWeight: 700, color: '#a855f7' }}>
              24/30
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 