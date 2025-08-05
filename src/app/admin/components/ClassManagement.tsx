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
  Briefcase,
  UserPlus,
  Settings,
  Eye
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

interface Class {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  studentCount: number;
  maxStudents: number;
  status: 'active' | 'inactive';
  schedule: string;
  subjects: string[];
  averageScore: number;
  totalLessons: number;
  lastActivity: string;
  students: string[];
}

interface ClassManagementProps {
  onBack: () => void;
}

export default function ClassManagement({ onBack }: ClassManagementProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit' | 'details'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const classes: Class[] = [
    {
      id: '1',
      name: '10-A',
      grade: '10. Sınıf',
      teacher: 'Ayşe Özkan',
      studentCount: 24,
      maxStudents: 30,
      status: 'active',
      schedule: 'Pazartesi, Çarşamba, Cuma',
      subjects: ['Matematik', 'Fizik', 'Kimya'],
      averageScore: 85,
      totalLessons: 45,
      lastActivity: '2 saat önce',
      students: ['Ahmet Yılmaz', 'Zeynep Kaya', 'Mehmet Demir']
    },
    {
      id: '2',
      name: '11-B',
      grade: '11. Sınıf',
      teacher: 'Mehmet Yıldız',
      studentCount: 18,
      maxStudents: 25,
      status: 'active',
      schedule: 'Salı, Perşembe, Cumartesi',
      subjects: ['Fizik', 'Matematik', 'Biyoloji'],
      averageScore: 92,
      totalLessons: 38,
      lastActivity: '1 saat önce',
      students: ['Fatma Demir', 'Ali Yıldız', 'Ayşe Kaya']
    },
    {
      id: '3',
      name: '9-C',
      grade: '9. Sınıf',
      teacher: 'Fatma Demir',
      studentCount: 15,
      maxStudents: 20,
      status: 'inactive',
      schedule: 'Pazartesi, Çarşamba',
      subjects: ['Matematik', 'Türkçe'],
      averageScore: 78,
      totalLessons: 22,
      lastActivity: '3 gün önce',
      students: ['Can Özkan', 'Elif Yılmaz']
    }
  ];

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = () => {
    setActiveTab('add');
  };

  const handleEditClass = (classItem: Class) => {
    setSelectedClass(classItem);
    setActiveTab('edit');
  };

  const handleViewDetails = (classItem: Class) => {
    setSelectedClass(classItem);
    setActiveTab('details');
  };

  const handleToggleStatus = (classId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Sınıf durumu güncellendi!');
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('Bu sınıfı silmek istediğinizden emin misiniz?')) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success('Sınıf silindi!');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSaveClass = (isEdit: boolean = false) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(isEdit ? 'Sınıf güncellendi!' : 'Sınıf eklendi!');
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
          <Title size="lg">Sınıf Yönetimi</Title>
        </div>
        <Button variant="primary" onClick={handleAddClass}>
          <Plus size={20} />
          Yeni Sınıf Ekle
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
                  placeholder="Sınıf ara..."
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

          {/* Classes List */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Title size="md">Sınıf Listesi</Title>
              <Badge variant="info">{filteredClasses.length} sınıf</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredClasses.map((classItem) => (
                <motion.div
                  key={classItem.id}
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
                      background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600
                    }}>
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {classItem.name}
                      </h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                        {classItem.grade} • {classItem.teacher}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <Badge variant="info">{classItem.schedule}</Badge>
                        <Badge variant={classItem.status === 'active' ? 'success' : 'error'}>
                          {classItem.status === 'active' ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {classItem.studentCount}/{classItem.maxStudents}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Öğrenci</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {classItem.averageScore}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ortalama</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {classItem.totalLessons}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ders</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(classItem)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditClass(classItem)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant={classItem.status === 'active' ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => handleToggleStatus(classItem.id)}
                        disabled={isLoading}
                      >
                        {classItem.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </Button>
                      <Button
                        variant="error"
                        size="sm"
                        onClick={() => handleDeleteClass(classItem.id)}
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
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Yeni Sınıf Ekle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf Adı
              </label>
              <Input placeholder="örn: 10-A" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf Seviyesi
              </label>
              <Select>
                <option value="">Sınıf seçin</option>
                <option value="9">9. Sınıf</option>
                <option value="10">10. Sınıf</option>
                <option value="11">11. Sınıf</option>
                <option value="12">12. Sınıf</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Öğretmen
              </label>
              <Select>
                <option value="">Öğretmen seçin</option>
                <option value="ayse-ozkan">Ayşe Özkan - Matematik</option>
                <option value="mehmet-yildiz">Mehmet Yıldız - Fizik</option>
                <option value="fatma-demir">Fatma Demir - Kimya</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Maksimum Öğrenci
              </label>
              <Input type="number" placeholder="30" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ders Programı
              </label>
              <Select>
                <option value="">Program seçin</option>
                <option value="pazartesi-carsamba-cuma">Pazartesi, Çarşamba, Cuma</option>
                <option value="sali-persembe-cumartesi">Salı, Perşembe, Cumartesi</option>
                <option value="pazartesi-carsamba">Pazartesi, Çarşamba</option>
              </Select>
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
            <Button variant="primary" onClick={() => handleSaveClass(false)} disabled={isLoading}>
              Sınıf Ekle
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'edit' && selectedClass && (
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Sınıf Düzenle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf Adı
              </label>
              <Input defaultValue={selectedClass.name} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf Seviyesi
              </label>
              <Select defaultValue={selectedClass.grade}>
                <option value="9. Sınıf">9. Sınıf</option>
                <option value="10. Sınıf">10. Sınıf</option>
                <option value="11. Sınıf">11. Sınıf</option>
                <option value="12. Sınıf">12. Sınıf</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Öğretmen
              </label>
              <Select defaultValue={selectedClass.teacher}>
                <option value="Ayşe Özkan">Ayşe Özkan - Matematik</option>
                <option value="Mehmet Yıldız">Mehmet Yıldız - Fizik</option>
                <option value="Fatma Demir">Fatma Demir - Kimya</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Maksimum Öğrenci
              </label>
              <Input type="number" defaultValue={selectedClass.maxStudents} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ders Programı
              </label>
              <Select defaultValue={selectedClass.schedule}>
                <option value="Pazartesi, Çarşamba, Cuma">Pazartesi, Çarşamba, Cuma</option>
                <option value="Salı, Perşembe, Cumartesi">Salı, Perşembe, Cumartesi</option>
                <option value="Pazartesi, Çarşamba">Pazartesi, Çarşamba</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Durum
              </label>
              <Select defaultValue={selectedClass.status}>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </Select>
            </div>
          </Grid>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              İptal
            </Button>
            <Button variant="primary" onClick={() => handleSaveClass(true)} disabled={isLoading}>
              Güncelle
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'details' && selectedClass && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <Title size="md">{selectedClass.name} - Detaylı Bilgiler</Title>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              ← Geri Dön
            </Button>
          </div>

          <Grid cols={3} gap="1.5rem" style={{ marginBottom: '2rem' }}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedClass.studentCount}/{selectedClass.maxStudents}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Öğrenci</div>
              </div>
            </Card>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedClass.averageScore}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ortalama</div>
              </div>
            </Card>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedClass.totalLessons}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Toplam Ders</div>
              </div>
            </Card>
          </Grid>

          <Grid cols={2} gap="1.5rem">
            <Card>
              <Title size="sm" style={{ marginBottom: '1rem' }}>Sınıf Bilgileri</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Öğretmen</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedClass.teacher}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ders Programı</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedClass.schedule}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Son Aktivite</span>
                  <span style={{ fontWeight: 600, color: '#1f2937' }}>{selectedClass.lastActivity}</span>
                </div>
              </div>
            </Card>

            <Card>
              <Title size="sm" style={{ marginBottom: '1rem' }}>Dersler</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedClass.subjects.map((subject, index) => (
                  <Badge key={index} variant="info" style={{ alignSelf: 'flex-start' }}>
                    {subject}
                  </Badge>
                ))}
              </div>
            </Card>
          </Grid>

          <Card style={{ marginTop: '1.5rem' }}>
            <Title size="sm" style={{ marginBottom: '1rem' }}>Sınıf Öğrencileri</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedClass.students.map((student, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'rgba(249, 250, 251, 0.8)',
                  borderRadius: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', color: '#1f2937' }}>{student}</span>
                  <Button variant="secondary" size="sm">
                    <UserPlus size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </Card>
      )}
    </div>
  );
} 