"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  GraduationCap,
  Users, 
  BookOpen, 
  BarChart3, 
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Zap,
  Target,
  Clock,
  Award
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
`;

const HeroSection = styled.div`
  color: white;
  z-index: 1;
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
`;

const Title = styled.h1<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  font-weight: 700;
  color: ${props => props.size === 'xl' ? 'white' : '#1f2937'};
  margin: 0 0 0.5rem 0;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `font-size: 1.25rem;`;
      case 'lg':
        return `font-size: 2rem;`;
      case 'xl':
        return `font-size: 3rem;`;
      default:
        return `font-size: 1.5rem;`;
    }
  }}
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.6;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button<{
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem 1.5rem;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.4);
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 2px solid rgba(102, 126, 234, 0.2);
          
          &:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(102, 126, 234, 0.4);
            transform: translateY(-1px);
          }
        `;
    }
  }}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

const UserTypeCard = styled(motion.div)<{ selected: boolean }>`
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  ${props => props.selected ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: white;
    transform: scale(1.05);
  ` : `
    background: rgba(255, 255, 255, 0.9);
    border-color: #e5e7eb;
    color: #374151;
    
    &:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }
  `}
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  z-index: 1;
`;

const InputWithIcon = styled(Input)`
  padding-left: 3rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: #667eea;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 1rem;
  }
`;

export default function LandingPage() {
  const [userType, setUserType] = useState<'teacher' | 'student' | 'parent' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    {
      type: 'teacher' as const,
      title: 'Öğretmen',
      description: 'Ders yönetimi ve öğrenci takibi',
      icon: Users,
      color: '#667eea'
    },
    {
      type: 'student' as const,
      title: 'Öğrenci',
      description: 'Ders katılımı ve çalışma modu',
      icon: BookOpen,
      color: '#10b981'
    },
    {
      type: 'parent' as const,
      title: 'Veli',
      description: 'Çocuğunuzun gelişimini takip edin',
      icon: BarChart3,
      color: '#f59e0b'
    }
  ];

  const features = [
    { icon: Sparkles, text: "Canlı ders yönetimi" },
    { icon: Target, text: "Anlık quiz sistemi" },
    { icon: Clock, text: "Gerçek zamanlı takip" },
    { icon: Award, text: "Başarı sistemi" },
    { icon: Star, text: "Modern arayüz" },
    { icon: Zap, text: "Hızlı ve güvenli" }
  ];

  const handleLogin = async () => {
    if (!userType) {
      toast.error('Lütfen kullanıcı tipini seçin');
      return;
    }
    
    if (!email || !password) {
      toast.error('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      toast.success(`${userType === 'teacher' ? 'Öğretmen' : userType === 'student' ? 'Öğrenci' : 'Veli'} olarak giriş yapıldı! 🎉`);
      setIsLoading(false);
      
      // Redirect based on user type
      const redirectPath = userType === 'teacher' ? '/teacher' : 
                          userType === 'student' ? '/student' : '/parent';
      window.location.href = redirectPath;
    }, 1500);
  };

  const handleAdminLogin = () => {
    window.location.href = '/admin';
  };

  return (
    <PageWrapper>
      <Container>
        {/* Hero Section */}
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title size="xl" style={{ marginBottom: '1rem' }}>
              UpClass
          </Title>
          <Subtitle style={{ marginBottom: '2rem' }}>
              Modern eğitim platformu ile öğrenmeyi kolaylaştırın. Canlı dersler, 
              anlık quizler ve gelişmiş takip sistemi ile eğitiminizi bir üst seviyeye taşıyın.
          </Subtitle>
            
            <FeatureList>
              {features.map((feature, index) => (
                <motion.div
              key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                  <FeatureItem>
                    <feature.icon size={20} />
                    <span>{feature.text}</span>
                  </FeatureItem>
                </motion.div>
              ))}
            </FeatureList>
          </motion.div>
        </HeroSection>

        {/* Login Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <LoginCard>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                color: 'white'
              }}>
                <GraduationCap size={32} />
              </div>
              <Title size="lg">Hoş Geldiniz</Title>
              <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                Hesabınıza giriş yapın
              </p>
            </div>

            {/* User Type Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
                Kullanıcı tipinizi seçin:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {userTypes.map((type) => (
                  <UserTypeCard
                    key={type.type}
                    selected={userType === type.type}
                    onClick={() => setUserType(type.type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <type.icon size={24} style={{ margin: '0 auto 0.5rem auto' }} />
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
                      {type.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                      {type.description}
                    </p>
                  </UserTypeCard>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <InputGroup>
              <InputIcon>
                <Mail size={20} />
              </InputIcon>
              <InputWithIcon
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <Lock size={20} />
              </InputIcon>
              <InputWithIcon
                type={showPassword ? 'text' : 'password'}
                placeholder="Şifreniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputGroup>

            <Button
              variant="primary"
              fullWidth
              onClick={handleLogin}
              disabled={isLoading}
              style={{ marginBottom: '1rem' }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: '20px', height: '20px', border: '2px solid transparent', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight size={20} />
                </>
              )}
            </Button>

            <Divider>
              <span>veya</span>
            </Divider>

            <Button
              variant="secondary"
              fullWidth
              onClick={handleAdminLogin}
            >
              Admin Paneli
            </Button>

            <p style={{ textAlign: 'center', margin: '1.5rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Hesabınız yok mu?{' '}
              <Link href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>
                Kayıt olun
              </Link>
            </p>
          </LoginCard>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
