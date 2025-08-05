"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  BookOpen,
  Award,
  Clock,
  Star,
  Users
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";

// Styled Components
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(14, 165, 233, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
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
  border-radius: 1rem;
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
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'success':
        return `
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
            box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
            box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'error':
        return `
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
            transform: translateY(-2px);
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
            transform: translateY(-2px);
          }
        `;
    }
  }}
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `padding: 0.75rem 1.25rem; font-size: 0.75rem;`;
      case 'lg':
        return `padding: 1rem 2rem; font-size: 1rem;`;
      default:
        return `padding: 0.875rem 1.5rem; font-size: 0.875rem;`;
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  outline: none;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
`;

const AvatarButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border: 2px solid #0ea5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0ea5e9;
    color: white;
    transform: scale(1.1);
  }
`;

interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  birthDate: string;
  subjects: string[];
  experience: number;
  education: string;
  bio: string;
  avatar: string;
  stats: {
    totalStudents: number;
    totalClasses: number;
    averageRating: number;
    totalHours: number;
  };
}

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile>({
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@upclass.com",
    phone: "+90 532 123 45 67",
    location: "İstanbul, Türkiye",
    birthDate: "1985-03-15",
    subjects: ["Matematik", "Fizik", "Geometri"],
    experience: 8,
    education: "İstanbul Üniversitesi - Matematik Öğretmenliği",
    bio: "8 yıllık deneyimimle öğrencilerimin matematik alanında başarılı olmalarını sağlıyorum. Modern eğitim yöntemleri kullanarak her öğrencinin potansiyelini ortaya çıkarmaya odaklanıyorum.",
    avatar: "AY",
    stats: {
      totalStudents: 45,
      totalClasses: 156,
      averageRating: 4.8,
      totalHours: 1240
    }
  });

  const [formData, setFormData] = useState<TeacherProfile>(profile);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast.success("Profil başarıyla güncellendi!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleInputChange = (field: keyof TeacherProfile, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {/* Header */}
      <Card style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Title size="lg">Profil</Title>
            <Subtitle>Kişisel bilgilerinizi görüntüleyin ve güncelleyin</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {!isEditing ? (
              <Button variant="primary" onClick={handleEdit}>
                <Edit size={20} />
                Düzenle
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={handleCancel}>
                  <X size={20} />
                  İptal
                </Button>
                <Button variant="success" onClick={handleSave}>
                  <Save size={20} />
                  Kaydet
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <ProfileGrid>
        {/* Profile Info */}
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <AvatarContainer>
              <Avatar>
                {profile.avatar}
              </Avatar>
              <AvatarButton>
                <Camera size={16} />
              </AvatarButton>
            </AvatarContainer>
            <Title size="md">{profile.name}</Title>
            <Subtitle>{profile.subjects.join(", ")} Öğretmeni</Subtitle>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
              <Mail size={16} color="#6b7280" />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{profile.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
              <Phone size={16} color="#6b7280" />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{profile.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
              <MapPin size={16} color="#6b7280" />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{profile.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
              <Calendar size={16} color="#6b7280" />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{profile.experience} yıl deneyim</span>
            </div>
          </div>
        </Card>

        {/* Edit Form */}
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>
            {isEditing ? 'Bilgileri Düzenle' : 'Kişisel Bilgiler'}
          </Title>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Ad Soyad
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ad soyadınızı girin"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  E-posta
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Telefon
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Telefon numaranızı girin"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Konum
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Şehir, ülke"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Branşlar
                </label>
                <Input
                  value={formData.subjects.join(", ")}
                  onChange={(e) => handleInputChange('subjects', e.target.value.split(", "))}
                  placeholder="Branşlarınızı virgülle ayırarak girin"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Eğitim
                </label>
                <Input
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="Eğitim bilgilerinizi girin"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem', display: 'block' }}>
                  Hakkımda
                </label>
                <TextArea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın"
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>
                  Eğitim
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' }}>
                  {profile.education}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>
                  Hakkımda
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' }}>
                  {profile.bio}
                </p>
              </div>
            </div>
          )}
        </Card>
      </ProfileGrid>

      {/* Stats */}
      <StatsGrid>
        <StatCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <Users size={24} color="#0ea5e9" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
            {profile.stats.totalStudents}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Toplam Öğrenci
          </div>
        </StatCard>

        <StatCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <BookOpen size={24} color="#22c55e" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
            {profile.stats.totalClasses}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Toplam Ders
          </div>
        </StatCard>

        <StatCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <Star size={24} color="#f97316" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
            {profile.stats.averageRating}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Ortalama Puan
          </div>
        </StatCard>

        <StatCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <Clock size={24} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>
            {profile.stats.totalHours}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Toplam Saat
          </div>
        </StatCard>
      </StatsGrid>
    </>
  );
} 