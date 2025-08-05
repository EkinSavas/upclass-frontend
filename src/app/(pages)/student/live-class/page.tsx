"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff,
  MessageSquare,
  Users,
  Target,
  Clock,
  Star,
  TrendingUp,
  Eye,
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
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  CheckCircle2,
  Circle
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

const MeetPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
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

const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
`;

const PingleAlert = styled.div`
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 1px solid #f59e0b;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

const QuizNotification = styled.div`
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  border: 1px solid #a855f7;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const QuizTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

const QuestionCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const OptionButton = styled.button<{ selected?: boolean; correct?: boolean; showResult?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.showResult) {
      if (props.correct) return '#22c55e';
      if (props.selected && !props.correct) return '#ef4444';
      return '#e5e7eb';
    }
    return props.selected ? '#0ea5e9' : '#e5e7eb';
  }};
  border-radius: 0.75rem;
  background: ${props => {
    if (props.showResult) {
      if (props.correct) return '#dcfce7';
      if (props.selected && !props.correct) return '#fee2e2';
      return 'white';
    }
    return props.selected ? '#dbeafe' : 'white';
  }};
  color: ${props => {
    if (props.showResult) {
      if (props.correct) return '#166534';
      if (props.selected && !props.correct) return '#991b1b';
      return '#374151';
    }
    return props.selected ? '#0ea5e9' : '#374151';
  }};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  
  &:hover:not(:disabled) {
    border-color: ${props => props.showResult ? props.correct ? '#22c55e' : '#e5e7eb' : '#0ea5e9'};
    background: ${props => props.showResult ? props.correct ? '#dcfce7' : '#fee2e2' : '#dbeafe'};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #0ea5e9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export default function StudentLiveClass() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [isPingleAlert, setIsPingleAlert] = useState(false);
  const [isQuizNotification, setIsQuizNotification] = useState(false);
  const [classActive, setClassActive] = useState(true);
  const [classTime, setClassTime] = useState(0);
  
  // Quiz Modal States
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizTime, setQuizTime] = useState(300); // 5 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<{ correct: number; total: number; score: number } | null>(null);

  // Sample quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Kesirlerde toplama işlemi nasıl yapılır?",
      options: [
        "Paydaları eşitleyip payları toplarız",
        "Payları eşitleyip paydaları toplarız", 
        "Pay ve paydaları ayrı ayrı toplarız",
        "Kesirleri çarparız"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "2/3 + 1/6 işleminin sonucu kaçtır?",
      options: [
        "3/9",
        "5/6", 
        "3/6",
        "2/9"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Kesirlerde çarpma işlemi nasıl yapılır?",
      options: [
        "Payları çarpar, paydaları toplar",
        "Payları ve paydaları ayrı ayrı çarpar",
        "Payları toplar, paydaları çarpar",
        "Kesirleri böler"
      ],
      correct: 1
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (classActive) {
      interval = setInterval(() => {
        setClassTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [classActive]);

  // Quiz timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showQuizModal && quizTime > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setQuizTime(prev => {
          if (prev <= 1) {
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQuizModal, quizTime, quizCompleted]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.success(isVideoOn ? "Kamera kapatıldı" : "Kamera açıldı");
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast.success(isMicOn ? "Mikrofon kapatıldı" : "Mikrofon açıldı");
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.success(isScreenSharing ? "Ekran paylaşımı durduruldu" : "Ekran paylaşımı başlatıldı");
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      toast.success("Mesaj gönderildi");
      setChatMessage('');
    }
  };

  const handlePingle = () => {
    setIsPingleAlert(true);
    toast.success("Pingle alındı! Dikkat edin.");
    
    setTimeout(() => {
      setIsPingleAlert(false);
    }, 5000);
  };

  const handleQuiz = () => {
    setIsQuizNotification(true);
    toast.success("Quiz başlatıldı!");
  };

  const openQuizModal = () => {
    setShowQuizModal(true);
    setQuizTime(300); // Reset timer to 5 minutes
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setQuizResults(null);
    setIsQuizNotification(false);
  };

  const closeQuizModal = () => {
    setShowQuizModal(false);
    setQuizTime(300);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setQuizResults(null);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === quizQuestions[index].correct
    ).length;
    
    const totalQuestions = quizQuestions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    setQuizResults({
      correct: correctAnswers,
      total: totalQuestions,
      score: score
    });
    
    setQuizCompleted(true);
    toast.success(`Quiz tamamlandı! Skorunuz: ${score}%`);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const stats = [
    { title: "Ders Süresi", value: formatTime(classTime), icon: Clock, color: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)" },
    { title: "Katılımcı", value: "28", icon: Users, color: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
    { title: "Dikkat Seviyesi", value: "Yüksek", icon: Eye, color: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" },
    { title: "Aktif", value: "Evet", icon: Activity, color: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)" }
  ];

  const chatMessages = [
    { id: 1, user: "Öğretmen", message: "Merhaba öğrenciler! Bugün matematik dersimiz var.", time: "14:30", type: "teacher" },
    { id: 2, user: "Ahmet Yılmaz", message: "Merhaba öğretmenim!", time: "14:31", type: "student" },
    { id: 3, user: "Zeynep Kaya", message: "Hangi konuyu işleyeceğiz?", time: "14:32", type: "student" },
    { id: 4, user: "Öğretmen", message: "Kesirler konusunu işleyeceğiz.", time: "14:33", type: "teacher" }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Title size="lg">Canlı Ders</Title>
        <Subtitle>Matematik - Kesirler Konusu</Subtitle>
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

      {/* Pingle Alert */}
      {isPingleAlert && (
        <PingleAlert>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={20} color="#f59e0b" />
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#92400e' }}>
                Pingle Uyarısı!
              </h4>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#a16207' }}>
                Öğretmeniniz sizi pingledi. Lütfen dikkat edin!
              </p>
            </div>
          </div>
          <Button variant="warning" size="sm" onClick={() => setIsPingleAlert(false)}>
            <CheckCircle size={16} />
            Anladım
          </Button>
        </PingleAlert>
      )}

      {/* Quiz Notification */}
      {isQuizNotification && (
        <QuizNotification>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Target size={20} color="#a855f7" />
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#7c3aed' }}>
                Quiz Başlatıldı!
              </h4>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#8b5cf6' }}>
                Öğretmeniniz bir quiz başlattı. Hemen katılın!
              </p>
            </div>
          </div>
          <Button variant="success" size="sm" onClick={openQuizModal}>
            <Target size={16} />
            Quiz&apos;e Katıl
          </Button>
        </QuizNotification>
      )}

      {/* Live Class Window and Chat */}
      <LiveClassContainer>
        {/* Live Class Window */}
        <Card>
          <MeetWindow>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title size="md">Canlı Ders Penceresi</Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <Monitor size={16} />
                <span>Google Meet</span>
              </div>
            </div>
            
            <LiveClassWindow>
              <MeetPlaceholder>
                <Play size={64} />
                <p style={{ margin: '1rem 0 0 0', fontSize: '1.25rem', fontWeight: 600 }}>Canlı Ders</p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', opacity: 0.9 }}>Ders başlatıldı</p>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
                  <p>Matematik - Kesirler Konusu</p>
                  <p>Öğretmen: Ayşe Öğretmen</p>
                </div>
              </MeetPlaceholder>
            </LiveClassWindow>

            {/* Control Panel */}
            <ControlPanel>
              <Button
                variant={isVideoOn ? "success" : "secondary"}
                size="sm"
                onClick={toggleVideo}
              >
                {isVideoOn ? <Camera size={16} /> : <CameraOff size={16} />}
                {isVideoOn ? "Kamera Açık" : "Kamera Kapalı"}
              </Button>
              
              <Button
                variant={isMicOn ? "success" : "secondary"}
                size="sm"
                onClick={toggleMic}
              >
                {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                {isMicOn ? "Mikrofon Açık" : "Mikrofon Kapalı"}
              </Button>
              
              <Button
                variant={isScreenSharing ? "success" : "secondary"}
                size="sm"
                onClick={toggleScreenShare}
              >
                {isScreenSharing ? <ScreenShareOff size={16} /> : <ScreenShare size={16} />}
                Ekran Paylaş
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePingle}
              >
                <Zap size={16} />
                Pingle Test
              </Button>
              
              <Button
                variant="warning"
                size="sm"
                onClick={handleQuiz}
              >
                <Target size={16} />
                Quiz Test
              </Button>
            </ControlPanel>
          </MeetWindow>
        </Card>

        {/* Chat Panel */}
        <Card>
          <ChatWindow>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title size="md">Sohbet</Title>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                {isChatOpen ? <MessageSquare size={16} /> : <X size={16} />}
              </Button>
            </div>
            
            {isChatOpen && (
              <ChatPanel>
                <ChatMessages>
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

      {/* Class Info */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Title size="md">Ders Bilgileri</Title>
          <Badge variant="success">Aktif</Badge>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Ders Konusu
            </h4>
            <p style={{ margin: 0, fontSize: '1rem', color: '#1f2937' }}>Matematik - Kesirler</p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Öğretmen
            </h4>
            <p style={{ margin: 0, fontSize: '1rem', color: '#1f2937' }}>Ayşe Öğretmen</p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Süre
            </h4>
            <p style={{ margin: 0, fontSize: '1rem', color: '#1f2937' }}>{formatTime(classTime)}</p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.75rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Katılımcı
            </h4>
            <p style={{ margin: 0, fontSize: '1rem', color: '#1f2937' }}>28 öğrenci</p>
          </div>
        </div>
      </Card>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuizModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quiz Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <Title size="md">Matematik Quiz</Title>
                  <Subtitle>Kesirler Konusu - {quizQuestions.length} Soru</Subtitle>
                </div>
                <Button variant="secondary" size="sm" onClick={closeQuizModal}>
                  <X size={16} />
                </Button>
              </div>

              {/* Timer */}
              <QuizTimer>
                <Timer size={20} />
                <span>Kalan Süre: {formatTime(quizTime)}</span>
              </QuizTimer>

              {/* Quiz Results */}
              {quizCompleted && quizResults && (
                <ResultCard>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
                      Quiz Tamamlandı!
                    </h3>
                    <p style={{ margin: 0, fontSize: '1rem', color: '#6b7280' }}>
                      Doğru: {quizResults.correct} / {quizResults.total}
                    </p>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0ea5e9' }}>
                    %{quizResults.score}
                  </div>
                  <Button variant="primary" size="md" onClick={closeQuizModal} style={{ marginTop: '1rem' }}>
                    <CheckCircle size={16} />
                    Tamamla
                  </Button>
                </ResultCard>
              )}

              {/* Quiz Questions */}
              {!quizCompleted && (
                <>
                  <QuestionCard>
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                        Soru {currentQuestion + 1} / {quizQuestions.length}
                      </h4>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#374151', lineHeight: 1.6 }}>
                        {quizQuestions[currentQuestion].question}
                      </p>
                    </div>

                    <div>
                      {quizQuestions[currentQuestion].options.map((option, optionIndex) => (
                        <OptionButton
                          key={optionIndex}
                          selected={selectedAnswers[currentQuestion] === optionIndex}
                          correct={quizQuestions[currentQuestion].correct === optionIndex}
                          showResult={quizCompleted}
                          onClick={() => handleAnswerSelect(currentQuestion, optionIndex)}
                          disabled={quizCompleted}
                        >
                          {selectedAnswers[currentQuestion] === optionIndex ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </QuestionCard>

                  {/* Navigation */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={prevQuestion}
                      disabled={currentQuestion === 0}
                    >
                      <ChevronLeft size={16} />
                      Önceki
                    </Button>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {quizQuestions.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            background: index === currentQuestion 
                              ? '#0ea5e9' 
                              : selectedAnswers[index] !== undefined 
                                ? '#22c55e' 
                                : '#e5e7eb',
                            color: index === currentQuestion ? 'white' : '#374151',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                          onClick={() => setCurrentQuestion(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    {currentQuestion === quizQuestions.length - 1 ? (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={handleQuizSubmit}
                        disabled={selectedAnswers.filter(answer => answer !== undefined).length < quizQuestions.length}
                      >
                        <CheckCircle size={16} />
                        Quiz&apos;i Bitir
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={nextQuestion}
                      >
                        Sonraki
                        <ChevronRight size={16} />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
} 