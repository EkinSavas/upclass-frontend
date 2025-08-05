"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Target,
  Trophy,
  Activity,
  BarChart3,
  Clock,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  MapPin,
  Briefcase
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(14, 165, 233, 0.6);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(14, 165, 233, 0.6);
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  }
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

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  status: 'active' | 'inactive';
  joinDate: string;
  totalLessons: number;
  totalAssignments: number;
  averageRating: number;
  totalStudents: number;
  monthlyHours: number;
  lastActivity: string;
  assignedClasses: string[];
}

interface TeacherManagementProps {
  onBack: () => void;
}

export default function TeacherManagement({ onBack }: TeacherManagementProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit' | 'details'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Ayşe Özkan',
      email: 'ayse.ozkan@upclass.com',
      phone: '+90 555 123 4567',
      subject: 'Matematik',
      experience: '8 yıl',
      status: 'active',
      joinDate: '2022-09-01',
      totalLessons: 156,
      totalAssignments: 89,
      averageRating: 4.8,
      totalStudents: 45,
      monthlyHours: 120,
      lastActivity: '2 saat önce',
      assignedClasses: ['10-A', '10-B', '11-A']
    },
    {
      id: '2',
      name: 'Mehmet Yıldız',
      email: 'mehmet.yildiz@upclass.com',
      phone: '+90 555 987 6543',
      subject: 'Fizik',
      experience: '12 yıl',
      status: 'active',
      joinDate: '2021-03-15',
      totalLessons: 203,
      totalAssignments: 124,
      averageRating: 4.9,
      totalStudents: 38,
      monthlyHours: 140,
      lastActivity: '1 saat önce',
      assignedClasses: ['11-B', '12-A', '12-B']
    },
    {
      id: '3',
      name: 'Fatma Demir',
      email: 'fatma.demir@upclass.com',
      phone: '+90 555 456 7890',
      subject: 'Kimya',
      experience: '6 yıl',
      status: 'inactive',
      joinDate: '2023-01-10',
      totalLessons: 89,
      totalAssignments: 56,
      averageRating: 4.6,
      totalStudents: 32,
      monthlyHours: 95,
      lastActivity: '3 gün önce',
      assignedClasses: ['9-A', '9-B']
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = () => {
    setActiveTab('add');
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveTab('edit');
  };

  const handleViewDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveTab('details');
  };

  const handleToggleStatus = (teacherId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Öğretmen durumu güncellendi!');
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('Bu öğretmeni silmek istediğinizden emin misiniz?')) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success('Öğretmen silindi!');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSaveTeacher = (isEdit: boolean = false) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(isEdit ? 'Öğretmen güncellendi!' : 'Öğretmen eklendi!');
      setActiveTab('list');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <Button variant="secondary" onClick={onBack} style={{ marginBottom: '1rem' }}>
            ← Geri Dön
          </Button>
          <Title size="lg">Öğretmen Yönetimi</Title>
        </div>
        <Button variant="primary" onClick={handleAddTeacher}>
          <Plus size={20} />
          Yeni Öğretmen Ekle
        </Button>
      </div>

      {activeTab === 'list' && (
        <>
          {/* Search and Filter */}
          <Card style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <Input
                  placeholder="Öğretmen ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
              <Button variant="secondary">
                <Filter size={20} />
                Filtrele
              </Button>
            </div>
          </Card>

          {/* Teachers List */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Title size="md">Öğretmen Listesi</Title>
              <Badge variant="info">{filteredTeachers.length} öğretmen</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    background: 'rgba(249, 250, 251, 0.8)',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    background: 'rgba(249, 250, 251, 1)',
                    transform: 'translateY(-2px)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600
                    }}>
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {teacher.name}
                      </h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                        {teacher.email} • {teacher.phone}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <Badge variant="info">{teacher.subject}</Badge>
                        <Badge variant="info">{teacher.experience}</Badge>
                        <Badge variant={teacher.status === 'active' ? 'success' : 'error'}>
                          {teacher.status === 'active' ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {teacher.totalLessons}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ders</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {teacher.averageRating}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Puan</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {teacher.monthlyHours}h
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Aylık</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(teacher)}
                      >
                        <BarChart3 size={16} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditTeacher(teacher)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant={teacher.status === 'active' ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => handleToggleStatus(teacher.id)}
                        disabled={isLoading}
                      >
                        {teacher.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </Button>
                      <Button
                        variant="error"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        disabled={isLoading}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </>
      )}

      {activeTab === 'add' && (
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Yeni Öğretmen Ekle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ad Soyad
              </label>
              <Input placeholder="Öğretmen adı ve soyadı" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                E-posta
              </label>
              <Input type="email" placeholder="ornek@upclass.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Telefon
              </label>
              <Input placeholder="+90 555 123 4567" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Branş
              </label>
              <Select>
                <option value="">Branş seçin</option>
                <option value="matematik">Matematik</option>
                <option value="fizik">Fizik</option>
                <option value="kimya">Kimya</option>
                <option value="biyoloji">Biyoloji</option>
                <option value="turkce">Türkçe</option>
                <option value="ingilizce">İngilizce</option>
                <option value="tarih">Tarih</option>
                <option value="cografya">Coğrafya</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Deneyim
              </label>
              <Input placeholder="örn: 5 yıl" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Durum
              </label>
              <Select>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </Select>
            </div>
          </Grid>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              İptal
            </Button>
            <Button variant="primary" onClick={() => handleSaveTeacher(false)} disabled={isLoading}>
              Öğretmen Ekle
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'edit' && selectedTeacher && (
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Öğretmen Düzenle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ad Soyad
              </label>
              <Input defaultValue={selectedTeacher.name} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                E-posta
              </label>
              <Input type="email" defaultValue={selectedTeacher.email} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Telefon
              </label>
              <Input defaultValue={selectedTeacher.phone} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Branş
              </label>
              <Select defaultValue={selectedTeacher.subject}>
                <option value="Matematik">Matematik</option>
                <option value="Fizik">Fizik</option>
                <option value="Kimya">Kimya</option>
                <option value="Biyoloji">Biyoloji</option>
                <option value="Türkçe">Türkçe</option>
                <option value="İngilizce">İngilizce</option>
                <option value="Tarih">Tarih</option>
                <option value="Coğrafya">Coğrafya</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Deneyim
              </label>
              <Input defaultValue={selectedTeacher.experience} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Durum
              </label>
              <Select defaultValue={selectedTeacher.status}>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </Select>
            </div>
          </Grid>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              İptal
            </Button>
            <Button variant="primary" onClick={() => handleSaveTeacher(true)} disabled={isLoading}>
              Güncelle
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'details' && selectedTeacher && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <Title size="md">{selectedTeacher.name} - Detaylı Bilgiler</Title>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              ← Geri Dön
            </Button>
          </div>

          <Grid cols={3} gap="1.5rem" style={{ marginBottom: '2rem' }}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedTeacher.totalLessons}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Toplam Ders</div>
              </div>
            </Card>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedTeacher.totalAssignments}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Toplam Ödev</div>
              </div>
            </Card>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedTeacher.averageRating}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama Puan</div>
              </div>
            </Card>
          </Grid>

          <Grid cols={2} gap="1.5rem">
            <Card>
              <Title size="sm" style={{ marginBottom: '1rem' }}>Aylık Performans</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Aylık Ders Saati</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedTeacher.monthlyHours} saat</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Toplam Öğrenci</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedTeacher.totalStudents} kişi</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Son Aktivite</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedTeacher.lastActivity}</span>
                </div>
              </div>
            </Card>

            <Card>
              <Title size="sm" style={{ marginBottom: '1rem' }}>Atanan Sınıflar</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTeacher.assignedClasses.map((className, index) => (
                  <Badge key={index} variant="info" style={{ alignSelf: 'flex-start' }}>
                    {className}
                  </Badge>
                ))}
              </div>
            </Card>
          </Grid>
        </Card>
      )}
    </div>
  );
} 