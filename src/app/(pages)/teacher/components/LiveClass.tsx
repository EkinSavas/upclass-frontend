"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Play, 
  Pause, 
  Target, 
  Clock,
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
  Plus,
  Calendar,
  BookOpen,
  Award,
  Bell,
  Settings,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Monitor,
  MonitorOff,
  Hand,
  MessageSquare,
  FileText,
  Download,
  Upload,
  ScreenShare,
  ScreenShareOff,
  CircleDot,
  StopCircle,
  Timer,
  TimerOff,
  X,
  ExternalLink,
  Copy,
  RefreshCw,
  Shield
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

const LiveClassGrid = styled.div<{
  cols?: number;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, 1fr);
  gap: ${props => props.gap || '1rem'};
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 641px) and (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1), 2)}, 1fr);
    gap: 1rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1) + 1, 3)}, 1fr);
    gap: 1.25rem;
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: repeat(${props => Math.min((props.cols || 1) + 2, 4)}, 1fr);
    gap: 1.5rem;
  }
`;

const LiveClassContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 1.5fr 1fr;
    gap: 1.5rem;
  }
`;

const MeetWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  
  @media (max-width: 768px) {
    min-height: 400px;
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
`;

const StatusIndicator = styled.div<{ status: 'online' | 'offline' | 'busy' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'online':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'busy':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
  
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
    animation: ${props => props.status === 'online' ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ClassControlIndicator = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-radius: 0.75rem;
  border: 1px solid #22c55e;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const VideoCard = styled.div<{ isActive: boolean }>`
  aspect-ratio: 16/9;
  background: ${props => props.isActive ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' : '#f3f4f6'};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  ${props => props.isActive && `
    box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
  `}
`;

const ChatPanel = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

interface Student {
  id: string;
  name: string;
  avatar: string;
  attentionLevel: "high" | "medium" | "low";
  isOnline: boolean;
  xp: number;
  level: number;
  isSpeaking?: boolean;
  isVideoOn?: boolean;
  isHandRaised?: boolean;
  listeningScore: number;
}

const StudentCardComponent = ({ student, onToggleAttention }: { student: Student; onToggleAttention: (id: string) => void }) => {
  const getAttentionColor = (level: string) => {
    switch (level) {
      case "high": return "#22c55e";
      case "medium": return "#f97316";
      case "low": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getAttentionText = (level: string) => {
    switch (level) {
      case "high": return "Yüksek";
      case "medium": return "Orta";
      case "low": return "Düşük";
      default: return "Bilinmiyor";
    }
  };

  return (
    <StudentCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
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
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '1rem',
              height: '1rem',
              background: getAttentionColor(student.attentionLevel),
              borderRadius: '50%',
              border: '2px solid white'
            }} />
            {student.isSpeaking && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '1rem',
                height: '1rem',
                background: '#22c55e',
                borderRadius: '50%',
                border: '2px solid white',
                animation: 'pulse 2s infinite'
              }}>
                <Mic size={8} color="white" />
              </div>
            )}
            {student.isHandRaised && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '1rem',
                height: '1rem',
                background: '#f97316',
                borderRadius: '50%',
                border: '2px solid white'
              }}>
                <Hand size={8} color="white" />
              </div>
            )}
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{student.name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
              <Star size={12} />
              <span>Level {student.level}</span>
              <span>•</span>
              <span>{student.xp} XP</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {student.isVideoOn ? (
              <Camera size={16} color="#22c55e" />
            ) : (
              <CameraOff size={16} color="#9ca3af" />
            )}
            {student.isSpeaking ? (
              <Mic size={16} color="#22c55e" />
            ) : (
              <MicOff size={16} color="#9ca3af" />
            )}
          </div>
          
          <StatusIndicator status={student.isOnline ? 'online' : 'offline'}>
            {student.isOnline ? 'Online' : 'Offline'}
          </StatusIndicator>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onToggleAttention(student.id)}
            style={{ padding: '0.25rem' }}
          >
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>
      
      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Dikkat Seviyesi:</span>
          <Badge variant={student.attentionLevel === "high" ? "success" : student.attentionLevel === "medium" ? "warning" : "error"}>
            {getAttentionText(student.attentionLevel)}
          </Badge>
        </div>
      </div>
    </StudentCard>
  );
};

// Add new styled component for countdown timer
const CountdownTimer = styled.div`
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
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

const LiveClassWindow = styled.div`
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const MeetIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.75rem;
`;

const MeetPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
`;

const MeetIntegration = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MeetUrlHandler = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const UrlInputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const MeetPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #000;
`;

const MeetOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const MeetControls = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 20;
`;

const MeetButton = styled.button<{ variant?: 'primary' | 'success' | 'error' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: #22c55e;
          color: white;
          
          &:hover {
            background: #16a34a;
          }
        `;
      case 'error':
        return `
          background: #ef4444;
          color: white;
          
          &:hover {
            background: #dc2626;
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `;
      default:
        return `
          background: #0ea5e9;
          color: white;
          
          &:hover {
            background: #0284c7;
          }
        `;
    }
  }}
`;

const StudentRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  @media (min-width: 641px) and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.75rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }
`;

const QuizModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(8px);
`;

const QuizModalContent = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(14, 165, 233, 0.1);
  position: relative;
`;

const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const QuizTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const QuizForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuizSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuizLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuizTextarea = styled.textarea`
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuizOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #0ea5e9;
    background: #f8fafc;
  }
  
  &:focus-within {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const QuizRadio = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #0ea5e9;
  cursor: pointer;
`;

const QuizInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  background: transparent;
  
  &:focus {
    background: #f8fafc;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const QuizTimeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const QuizTimeInput = styled.input`
  width: 100px;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  outline: none;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
  }
`;

const QuizActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f3f4f6;
`;

const QuizButton = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          
          &:hover {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            transform: translateY(-1px);
          }
        `;
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          
          &:hover {
            background: #e5e7eb;
            border-color: #9ca3af;
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
          color: white;
          
          &:hover {
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;

const QuizPreview = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const QuizPreviewTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const QuizPreviewText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const PingleIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: #f97316;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  animation: pulse 2s infinite;
`;

const PingleOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const PingleButton = styled.button<{ isActive?: boolean }>`
  display: inline-flex;
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

const ListeningScore = styled.div<{ score: number }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    const percentage = props.score;
    if (percentage >= 80) {
      return `
        background: #dcfce7;
        color: #166534;
      `;
    } else if (percentage >= 60) {
      return `
        background: #fef3c7;
        color: #92400e;
      `;
    } else {
      return `
        background: #fee2e2;
        color: #991b1b;
      `;
    }
  }}
`;

const MeetInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const MeetErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
  height: 100%;
`;

const MeetErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(239, 68, 68, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const MeetErrorActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const MeetFrameError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
  height: 100%;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
`;

const MeetFrameErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const MeetFrameErrorActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const MeetAlternativeView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
  height: 100%;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
`;

const MeetInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const MeetStatusIndicator = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1rem;
  
  ${props => props.isActive ? `
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  ` : `
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  `}
`;

const StudentCardHorizontal = styled(Card)<{ isSelected?: boolean }>`
  width: 100%;
  min-height: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${props => props.isSelected ? '#0ea5e9' : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.isSelected && `
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
  `}
`;

export default function LiveClass({ isActive = false }: { isActive?: boolean }) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedPingle, setSelectedPingle] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizData, setQuizData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    timeLimit: 30
  });
  const [meetUrl, setMeetUrl] = useState('');
  const [isMeetActive, setIsMeetActive] = useState(false);
  const [meetError, setMeetError] = useState('');
  const [isMeetLoading, setIsMeetLoading] = useState(false);
  const [meetConnectionError, setMeetConnectionError] = useState(false);
  const [meetFrameError, setMeetFrameError] = useState(false);
  const [useAlternativeView, setUseAlternativeView] = useState(true);
  const [classActive, setClassActive] = useState(isActive);
  const [timeUntilNextClass, setTimeUntilNextClass] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock next class time - in real app this would come from API
  const nextClassTime = new Date();
  nextClassTime.setHours(nextClassTime.getHours() + 2);
  nextClassTime.setMinutes(nextClassTime.getMinutes() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextClassTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeUntilNextClass({ hours, minutes, seconds });
      } else {
        setTimeUntilNextClass({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextClassTime]);

  const students: Student[] = [
    { id: "1", name: "Ahmet Yılmaz", avatar: "AY", attentionLevel: "high", isOnline: true, xp: 1250, level: 8, isSpeaking: true, isVideoOn: true, listeningScore: 95 },
    { id: "2", name: "Zeynep Kaya", avatar: "ZK", attentionLevel: "medium", isOnline: true, xp: 980, level: 6, isVideoOn: false, isHandRaised: true, listeningScore: 78 },
    { id: "3", name: "Mehmet Demir", avatar: "MD", attentionLevel: "low", isOnline: false, xp: 750, level: 5, listeningScore: 45 },
    { id: "4", name: "Elif Özkan", avatar: "EÖ", attentionLevel: "high", isOnline: true, xp: 1100, level: 7, isVideoOn: true, listeningScore: 88 },
    { id: "5", name: "Can Arslan", avatar: "CA", attentionLevel: "medium", isOnline: true, xp: 890, level: 6, isVideoOn: true, listeningScore: 62 },
    { id: "6", name: "Selin Yıldız", avatar: "SY", attentionLevel: "low", isOnline: true, xp: 650, level: 4, listeningScore: 35 },
    { id: "7", name: "Burak Öz", avatar: "BÖ", attentionLevel: "medium", isOnline: true, xp: 720, level: 5, listeningScore: 55 },
  ];

  // Sort students by listening score from lowest to highest
  const sortedStudents = [...students].sort((a, b) => a.listeningScore - b.listeningScore);

  const startClass = () => {
    setClassActive(true);
    toast.success("Ders başlatıldı! 🎉");
  };

  const endClass = () => {
    setClassActive(false);
    toast.success("Ders sonlandırıldı!");
  };

  const toggleAttention = (studentId: string) => {
    toast.success("Öğrenci dikkat seviyesi güncellendi!");
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.success(isScreenSharing ? "Ekran paylaşımı durduruldu" : "Ekran paylaşımı başlatıldı");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.success(isRecording ? "Kayıt durduruldu" : "Kayıt başlatıldı");
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      toast.success("Mesaj gönderildi");
      setChatMessage('');
    }
  };

  const validateMeetUrl = (url: string): string | null => {
    if (!url.trim()) return 'URL boş olamaz';
    
    // Google Meet URL patterns
    const meetPatterns = [
      /^https:\/\/meet\.google\.com\/[a-z-]+$/i,
      /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/i,
      /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\?hs=122$/i,
      /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\?authuser=0$/i
    ];
    
    const isValidMeetUrl = meetPatterns.some(pattern => pattern.test(url));
    if (!isValidMeetUrl) return 'Geçerli bir Google Meet URL&apos;si girin';
    
    return null;
  };

  const formatMeetUrl = (url: string): string => {
    // Remove any extra parameters and ensure proper format
    const cleanUrl = url.trim();
    
    // Extract the meeting code
    const match = cleanUrl.match(/meet\.google\.com\/([a-z-]+)/i);
    if (match) {
      const meetingCode = match[1];
      return `https://meet.google.com/${meetingCode}`;
    }
    
    return cleanUrl;
  };

  const startMeet = async () => {
    const error = validateMeetUrl(meetUrl);
    if (error) {
      setMeetError(error);
      toast.error(error);
      return;
    }

    setIsMeetLoading(true);
    setMeetError('');
    setMeetConnectionError(false);
    setMeetFrameError(false);

    try {
      const formattedUrl = formatMeetUrl(meetUrl);
      setMeetUrl(formattedUrl);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since Google Meet blocks iframe embedding, we'll use alternative view
      setUseAlternativeView(true);
      setIsMeetActive(true);
      toast.success("Meet bağlantısı başlatıldı! Yeni sekmede açın.");
    } catch (error) {
      setMeetConnectionError(true);
      setMeetError('Meet bağlantısı başlatılamadı');
      toast.error('Meet bağlantısı başlatılamadı');
    } finally {
      setIsMeetLoading(false);
    }
  };

  const checkMeetAccessibility = async (url: string): Promise<boolean> => {
    // Simulate checking if Meet is accessible
    // In real implementation, this would check if the Meet URL is valid and accessible
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 30% chance of connection failure
        resolve(Math.random() > 0.3);
      }, 500);
    });
  };

  const retryMeetConnection = () => {
    setMeetConnectionError(false);
    setMeetError('');
    startMeet();
  };

  const handleMeetFrameError = () => {
    setMeetFrameError(true);
    setUseAlternativeView(true);
    toast.error('Meet güvenlik politikası nedeniyle iframe içinde açılamıyor');
  };

  const handleMeetFrameLoad = () => {
    setMeetFrameError(false);
    setUseAlternativeView(false);
  };

  const openMeetInNewTab = () => {
    if (meetUrl) {
      window.open(meetUrl, '_blank');
      toast.success('Meet yeni sekmede açılıyor...');
    }
  };

  const copyMeetUrl = () => {
    if (meetUrl) {
      navigator.clipboard.writeText(meetUrl);
      toast.success("Meet URL&apos;si kopyalandı!");
    }
  };

  const resetMeetConnection = () => {
    setIsMeetActive(false);
    setMeetUrl('');
    setMeetError('');
    setMeetConnectionError(false);
    setMeetFrameError(false);
    setUseAlternativeView(true);
    toast.success("Meet bağlantısı sıfırlandı!");
  };

  const stopMeet = () => {
    setIsMeetActive(false);
    setMeetUrl('');
    setMeetError('');
    setMeetConnectionError(false);
    setMeetFrameError(false);
    setUseAlternativeView(true);
    toast.success("Meet bağlantısı sonlandırıldı!");
  };

  const stats = [
    { title: "Aktif Öğrenci", value: students.filter(s => s.isOnline).length.toString(), icon: Users, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "El Kaldıran", value: students.filter(s => s.isHandRaised).length.toString(), icon: Hand, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Konuşan", value: students.filter(s => s.isSpeaking).length.toString(), icon: Mic, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" },
    { title: "Ders Süresi", value: "00:15:32", icon: Clock, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }
  ];

  const chatMessages = [
    { id: 1, user: "Ahmet Yılmaz", message: "Merhaba öğretmenim!", time: "14:30", type: "student" },
    { id: 2, user: "Öğretmen", message: "Merhaba Ahmet! Bugün matematik dersimiz var.", time: "14:31", type: "teacher" },
    { id: 3, user: "Zeynep Kaya", message: "Hangi konuyu işleyeceğiz?", time: "14:32", type: "student" },
    { id: 4, user: "Öğretmen", message: "Kesirler konusunu işleyeceğiz.", time: "14:33", type: "teacher" }
  ];

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handlePingle = (type: 'single' | 'auto') => {
    if (type === 'single' && selectedStudents.length === 0) {
      toast.error('Lütfen en az bir öğrenci seçin!');
      return;
    }
    
    const studentsToPingle = type === 'auto' ? students.map(s => s.id) : selectedStudents;
    
    toast.success(type === 'auto' 
      ? `Tüm öğrenciler (${studentsToPingle.length} kişi) pinglendi!` 
      : `${selectedStudents.length} öğrenci pinglendi!`
    );
    
    // Simulate pingle effect
    setTimeout(() => {
      toast.success('Pingle tamamlandı!');
    }, 2000);
  };

  const handleAttentionTracking = () => {
    toast.success('Dikkat takibi başlatıldı!');
  };

  const handleParticipation = () => {
    toast.success('Katılım takibi başlatıldı!');
  };

  const openQuizModal = () => {
    setIsQuizModalOpen(true);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setQuizData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30
    });
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizData.question.trim()) {
      toast.error('Soru alanı boş olamaz!');
      return;
    }
    
    if (quizData.options.some(option => !option.trim())) {
      toast.error('Tüm seçenekleri doldurun!');
      return;
    }
    
    toast.success('Quiz oluşturuldu ve öğrencilere gönderildi!');
    closeQuizModal();
  };

  const updateQuizOption = (index: number, value: string) => {
    setQuizData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const pingleOptions = [
    { id: 'pingle', label: 'Pingle', icon: Target, action: () => handlePingle('single') },
    { id: 'auto-pingle', label: 'Auto Pingle', icon: Zap, action: () => handlePingle('auto') },
    { id: 'attention', label: 'Dikkat Takibi', icon: Eye, action: handleAttentionTracking },
    { id: 'participation', label: 'Katılım', icon: Hand, action: handleParticipation },
    { id: 'quiz', label: 'Quiz Oluştur', icon: BookOpen, action: openQuizModal },
  ];

  return (
    <>
      {/* Countdown Timer */}
      <Card style={{ marginBottom: '2rem' }}>
        <CountdownTimer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="#92400e" />
              <span style={{ color: '#92400e', fontWeight: 600, fontSize: '1rem' }}>
                Sonraki Derse Kalan Süre
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#a16207' }}>
              <Calendar size={16} />
              <span>Matematik - 10:30</span>
            </div>
          </div>
          
          <TimerDisplay>
            <TimeUnit>
              <TimeValue>{String(timeUntilNextClass.hours).padStart(2, '0')}</TimeValue>
              <TimeLabel>Saat</TimeLabel>
            </TimeUnit>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>:</span>
            <TimeUnit>
              <TimeValue>{String(timeUntilNextClass.minutes).padStart(2, '0')}</TimeValue>
              <TimeLabel>Dakika</TimeLabel>
            </TimeUnit>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#92400e' }}>:</span>
            <TimeUnit>
              <TimeValue>{String(timeUntilNextClass.seconds).padStart(2, '0')}</TimeValue>
              <TimeLabel>Saniye</TimeLabel>
            </TimeUnit>
          </TimerDisplay>
        </CountdownTimer>
      </Card>

      {/* Class Control */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Canlı Ders Yönetimi</Title>
            <Subtitle>Canlı ders kontrolleri ve öğrenci etkileşimi</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {!classActive ? (
              <Button variant="success" onClick={startClass}>
                <Play size={20} />
                Dersi Başlat
              </Button>
            ) : (
              <Button variant="error" onClick={endClass}>
                <Pause size={20} />
                Dersi Bitir
              </Button>
            )}
          </div>
        </div>

        {classActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ClassControlIndicator>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    background: '#22c55e',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />
                  <span style={{ color: '#166534', fontWeight: 600 }}>Ders Aktif</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#16a34a' }}>
                  <Clock size={16} />
                  <span>00:15:32</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button
                  variant={isVideoOn ? "success" : "secondary"}
                  size="sm"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Camera size={16} /> : <CameraOff size={16} />}
                </Button>
                <Button
                  variant={isMicOn ? "success" : "secondary"}
                  size="sm"
                  onClick={() => setIsMicOn(!isMicOn)}
                >
                  {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                </Button>
                <Button
                  variant={isScreenSharing ? "success" : "secondary"}
                  size="sm"
                  onClick={toggleScreenShare}
                >
                  {isScreenSharing ? <ScreenShareOff size={16} /> : <ScreenShare size={16} />}
                </Button>
                <Button
                  variant={isRecording ? "error" : "secondary"}
                  size="sm"
                  onClick={toggleRecording}
                >
                  {isRecording ? <StopCircle size={16} /> : <CircleDot size={16} />}
                </Button>
              </div>
            </ClassControlIndicator>
          </motion.div>
        )}
      </Card>

      {/* Stats */}
      <LiveClassGrid cols={4} gap="1.5rem" style={{ marginBottom: '2rem' }}>
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
      </LiveClassGrid>

      {/* Live Class Window and Chat */}
      <LiveClassContainer>
        {/* Live Class Window */}
        <Card>
          <MeetWindow>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title size="md">Canlı Ders Penceresi</Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <Monitor size={16} />
                <span>Meet Bağlantısı</span>
              </div>
            </div>
            
            {!isMeetActive ? (
              <MeetIntegration>
                <MeetUrlHandler>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                      Meet URL&apos;sini Girin
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      <Monitor size={12} />
                      <span>Google Meet</span>
                    </div>
                  </div>
                  
                  <UrlInputGroup>
                    <MeetInput
                      placeholder="https://meet.google.com/xxx-yyyy-zzz"
                      value={meetUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setMeetUrl(e.target.value);
                        setMeetError('');
                      }}
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && startMeet()}
                      style={{ 
                        borderColor: meetError ? '#ef4444' : '#d1d5db',
                        flex: 1,
                        minWidth: '250px'
                      }}
                    />
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={startMeet}
                      disabled={isMeetLoading}
                    >
                      {isMeetLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '12px', height: '12px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          Yükleniyor...
                        </div>
                      ) : (
                        <>
                          <Play size={16} />
                          Başlat
                        </>
                      )}
                    </Button>
                  </UrlInputGroup>
                  
                  {meetError && (
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
                      {meetError}
                    </div>
                  )}
                  
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    <p style={{ margin: '0 0 0.25rem 0' }}>Desteklenen formatlar:</p>
                    <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                      <li>https://meet.google.com/abc-defg-hij</li>
                      <li>https://meet.google.com/abc-defg-hij?hs=122</li>
                    </ul>
                  </div>
                </MeetUrlHandler>
                
                <LiveClassWindow>
                  <MeetPlaceholder>
                    <Monitor size={64} />
                    <p style={{ margin: '1rem 0 0 0', fontSize: '1.25rem', fontWeight: 600 }}>Meet Penceresi</p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', opacity: 0.9 }}>Meet URL&apos;sini girerek canlı dersi başlatın</p>
                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
                      <p>Örnek: https://meet.google.com/xxx-yyyy-zzz</p>
                    </div>
                  </MeetPlaceholder>
                </LiveClassWindow>
              </MeetIntegration>
            ) : (
              <MeetIntegration>
                <MeetPreview>
                  {meetConnectionError ? (
                    <MeetErrorState>
                      <MeetErrorIcon>
                        <AlertCircle size={40} color="#ef4444" />
                      </MeetErrorIcon>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
                        Bağlantı Reddedildi
                      </h3>
                      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', opacity: 0.8, maxWidth: '300px' }}>
                        Meet bağlantısı kurulamadı. URL&apos;nin doğru olduğundan emin olun ve tekrar deneyin.
                      </p>
                      
                      <MeetErrorActions>
                        <MeetButton variant="primary" onClick={retryMeetConnection}>
                          <RefreshCw size={16} />
                          Tekrar Dene
                        </MeetButton>
                        <MeetButton variant="secondary" onClick={openMeetInNewTab}>
                          <ExternalLink size={16} />
                          Yeni Sekmede Aç
                        </MeetButton>
                        <MeetButton variant="secondary" onClick={copyMeetUrl}>
                          <Copy size={16} />
                          URL Kopyala
                        </MeetButton>
                        <MeetButton variant="error" onClick={resetMeetConnection}>
                          <X size={16} />
                          Sıfırla
                        </MeetButton>
                      </MeetErrorActions>
                    </MeetErrorState>
                  ) : isMeetActive && useAlternativeView ? (
                    <MeetAlternativeView>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Monitor size={32} />
                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
                          Google Meet
                        </h3>
                      </div>
                      
                      <MeetStatusIndicator isActive={true}>
                        <div style={{
                          width: '0.75rem',
                          height: '0.75rem',
                          background: '#22c55e',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite'
                        }} />
                        <span>Bağlantı Aktif</span>
                      </MeetStatusIndicator>
                      
                      <MeetInfoCard>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>
                          Meet Bağlantısı Hazır
                        </h4>
                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', opacity: 0.9 }}>
                          Google Meet güvenlik politikası nedeniyle bu pencerede açılamıyor. 
                          Lütfen aşağıdaki seçeneklerden birini kullanın.
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <MeetButton variant="primary" onClick={openMeetInNewTab}>
                            <ExternalLink size={16} />
                            Yeni Sekmede Aç
                          </MeetButton>
                          <MeetButton variant="secondary" onClick={copyMeetUrl}>
                            <Copy size={16} />
                            URL Kopyala
                          </MeetButton>
                          <MeetButton variant="secondary" onClick={() => {
                            navigator.clipboard.writeText(meetUrl);
                            toast.success('Meet URL&apos;si kopyalandı! Öğrencilerle paylaşabilirsiniz.');
                          }}>
                            <MessageSquare size={16} />
                            Öğrencilerle Paylaş
                          </MeetButton>
                        </div>
                      </MeetInfoCard>
                      
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '1rem' }}>
                        <p>URL: {meetUrl}</p>
                      </div>
                    </MeetAlternativeView>
                  ) : meetFrameError ? (
                    <MeetFrameError>
                      <MeetFrameErrorIcon>
                        <Shield size={40} color="white" />
                      </MeetFrameErrorIcon>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
                        Güvenlik Politikası
                      </h3>
                      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', opacity: 0.9, maxWidth: '300px' }}>
                        Google Meet güvenlik politikası nedeniyle bu pencerede açılamıyor. 
                        Lütfen yeni sekmede açın veya alternatif yöntemleri kullanın.
                      </p>
                      
                      <MeetFrameErrorActions>
                        <MeetButton variant="primary" onClick={openMeetInNewTab}>
                          <ExternalLink size={16} />
                          Yeni Sekmede Aç
                        </MeetButton>
                        <MeetButton variant="secondary" onClick={copyMeetUrl}>
                          <Copy size={16} />
                          URL Kopyala
                        </MeetButton>
                        <MeetButton variant="secondary" onClick={() => {
                          navigator.clipboard.writeText(meetUrl);
                          toast.success('Meet URL&apos;si kopyalandı! Yeni sekmede açabilirsiniz.');
                        }}>
                          <MessageSquare size={16} />
                          URL&apos;yi Paylaş
                        </MeetButton>
                        <MeetButton variant="error" onClick={resetMeetConnection}>
                          <X size={16} />
                          Kapat
                        </MeetButton>
                      </MeetFrameErrorActions>
                    </MeetFrameError>
                  ) : (
                    <MeetIframe
                      src={meetUrl}
                      title="Google Meet"
                      allow="camera; microphone; fullscreen; speaker; display-capture"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      onError={handleMeetFrameError}
                      onLoad={handleMeetFrameLoad}
                    />
                  )}
                  
                  {!meetConnectionError && !meetFrameError && !useAlternativeView && (
                    <MeetControls>
                      <MeetButton variant="secondary" onClick={openMeetInNewTab}>
                        <ExternalLink size={16} />
                        Yeni Sekmede Aç
                      </MeetButton>
                      <MeetButton variant="secondary" onClick={copyMeetUrl}>
                        <Copy size={16} />
                        URL Kopyala
                      </MeetButton>
                      <MeetButton variant="error" onClick={stopMeet}>
                        <X size={16} />
                        Durdur
                      </MeetButton>
                    </MeetControls>
                  )}
                </MeetPreview>
              </MeetIntegration>
            )}
          </MeetWindow>
        </Card>

        {/* Chat Panel */}
        <Card>
          <ChatWindow>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title size="md">Uygulama İçi Sohbet</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                {isChatOpen ? <MessageSquare size={16} /> : <X size={16} />}
              </Button>
            </div>
            
            {isChatOpen && (
              <ChatPanel style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ChatMessages style={{ flex: 1, overflowY: 'auto' }}>
                  {chatMessages.map((msg) => (
                    <div key={msg.id} style={{ 
                      marginBottom: '1rem',
                      padding: '0.75rem',
                      background: msg.type === 'teacher' ? '#dbeafe' : '#f3f4f6',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${msg.type === 'teacher' ? '#0ea5e9' : '#6b7280'}`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{msg.user}</span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{msg.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>{msg.message}</p>
                    </div>
                  ))}
                </ChatMessages>
                
                <ChatInput>
                  <Input
                    placeholder="Mesajınızı yazın..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <Button variant="primary" size="sm" onClick={sendChatMessage}>
                    <MessageSquare size={16} />
                  </Button>
                </ChatInput>
              </ChatPanel>
            )}
          </ChatWindow>
        </Card>
      </LiveClassContainer>

      {/* Student Section */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Title size="md">Öğrenci Takibi</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <Users size={16} />
            <span>{students.filter(s => s.isOnline).length} online</span>
          </div>
        </div>

        {/* Pingle Options */}
        <PingleOptions>
          {pingleOptions.map((option) => (
            <PingleButton
              key={option.id}
              isActive={selectedPingle === option.id}
              onClick={() => {
                if (option.id === 'quiz') {
                  option.action();
                } else {
                  setSelectedPingle(selectedPingle === option.id ? '' : option.id);
                  option.action();
                }
              }}
            >
              <option.icon size={16} />
              {option.label}
            </PingleButton>
          ))}
        </PingleOptions>

        {/* Student Selection Info */}
        {selectedStudents.length > 0 && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#dbeafe',
            borderRadius: '0.5rem',
            border: '1px solid #0ea5e9'
          }}>
            <Users size={16} color="#0ea5e9" />
            <span style={{ fontSize: '0.875rem', color: '#0ea5e9', fontWeight: 500 }}>
              {selectedStudents.length} öğrenci seçildi
            </span>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setSelectedStudents([])}
              style={{ marginLeft: 'auto' }}
            >
              <X size={14} />
              Seçimi Temizle
            </Button>
          </div>
        )}

        {/* Horizontal Student Cards */}
        <StudentRow>
          {sortedStudents.map((student) => (
            <StudentCardHorizontal
              key={student.id}
              isSelected={selectedStudents.includes(student.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleStudentSelection(student.id)}
              style={{ position: 'relative' }}
            >
              {selectedStudents.includes(student.id) && (
                <PingleIndicator>
                  ✓
                </PingleIndicator>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}>
                      {student.avatar}
                    </div>
                    {student.isSpeaking && (
                      <div style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        width: '0.75rem',
                        height: '0.75rem',
                        background: '#22c55e',
                        borderRadius: '50%',
                        border: '2px solid white',
                        animation: 'pulse 2s infinite'
                      }}>
                        <Mic size={6} color="white" />
                      </div>
                    )}
                    {student.isHandRaised && (
                      <div style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '0.75rem',
                        height: '0.75rem',
                        background: '#f97316',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }}>
                        <Hand size={6} color="white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{student.name}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      <Star size={10} />
                      <span>Level {student.level}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {student.isVideoOn ? (
                    <Camera size={14} color="#22c55e" />
                  ) : (
                    <CameraOff size={14} color="#9ca3af" />
                  )}
                  {student.isSpeaking ? (
                    <Mic size={14} color="#22c55e" />
                  ) : (
                    <MicOff size={14} color="#9ca3af" />
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <ListeningScore score={student.listeningScore}>
                  <Brain size={12} />
                  {student.listeningScore}%
                </ListeningScore>
                
                <StatusIndicator status={student.isOnline ? 'online' : 'offline'}>
                  {student.isOnline ? 'Online' : 'Offline'}
                </StatusIndicator>
              </div>
            </StudentCardHorizontal>
          ))}
        </StudentRow>
      </Card>

      {/* Quiz Modal */}
      {isQuizModalOpen && (
        <QuizModal onClick={closeQuizModal}>
          <QuizModalContent onClick={(e) => e.stopPropagation()}>
            <QuizHeader>
              <QuizTitle>
                <BookOpen size={24} color="#0ea5e9" />
                Quiz Oluştur
              </QuizTitle>
              <Button variant="secondary" size="sm" onClick={closeQuizModal}>
                <X size={20} />
              </Button>
            </QuizHeader>
            
            <QuizForm onSubmit={handleQuizSubmit}>
              <QuizSection>
                <QuizLabel>
                  <MessageSquare size={16} />
                  Soru
                </QuizLabel>
                <QuizTextarea
                  placeholder="Öğrencilere soracağınız soruyu buraya yazın..."
                  value={quizData.question}
                  onChange={(e) => setQuizData(prev => ({ ...prev, question: e.target.value }))}
                  required
                />
              </QuizSection>
              
              <QuizSection>
                <QuizLabel>
                  <Target size={16} />
                  Seçenekler
                </QuizLabel>
                <QuizOptions>
                  {quizData.options.map((option, index) => (
                    <QuizOption key={index}>
                      <QuizRadio
                        type="radio"
                        name="correctAnswer"
                        value={index}
                        checked={quizData.correctAnswer === index}
                        onChange={(e) => setQuizData(prev => ({ ...prev, correctAnswer: parseInt(e.target.value) }))}
                      />
                      <QuizInput
                        placeholder={`Seçenek ${index + 1}`}
                        value={option}
                        onChange={(e) => updateQuizOption(index, e.target.value)}
                        required
                      />
                    </QuizOption>
                  ))}
                </QuizOptions>
              </QuizSection>
              
              <QuizSection>
                <QuizLabel>
                  <Clock size={16} />
                  Süre Ayarları
                </QuizLabel>
                <QuizTimeSection>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Süre:
                  </span>
                  <QuizTimeInput
                    type="number"
                    min="10"
                    max="300"
                    value={quizData.timeLimit}
                    onChange={(e) => setQuizData(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    required
                  />
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    saniye
                  </span>
                </QuizTimeSection>
              </QuizSection>
              
              {quizData.question.trim() && (
                <QuizPreview>
                  <QuizPreviewTitle>Önizleme:</QuizPreviewTitle>
                  <QuizPreviewText>
                    <strong>Soru:</strong> {quizData.question}
                  </QuizPreviewText>
                  <QuizPreviewText>
                    <strong>Seçenekler:</strong> {quizData.options.filter(opt => opt.trim()).join(', ')}
                  </QuizPreviewText>
                  <QuizPreviewText>
                    <strong>Doğru Cevap:</strong> Seçenek {quizData.correctAnswer + 1}
                  </QuizPreviewText>
                  <QuizPreviewText>
                    <strong>Süre:</strong> {quizData.timeLimit} saniye
                  </QuizPreviewText>
                </QuizPreview>
              )}
              
              <QuizActions>
                <QuizButton type="button" variant="secondary" onClick={closeQuizModal}>
                  <X size={16} />
                  İptal
                </QuizButton>
                <QuizButton type="submit" variant="success">
                  <BookOpen size={16} />
                  Quiz Oluştur ve Gönder
                </QuizButton>
              </QuizActions>
            </QuizForm>
          </QuizModalContent>
        </QuizModal>
      )}
    </>
  );
} 