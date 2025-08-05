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
  ChevronDown,
  ChevronUp,
  MoreHorizontal
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

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  class: string;
  status: 'active' | 'inactive';
  joinDate: string;
  totalLessons: number;
  totalAssignments: number;
  averageScore: number;
  lastActivity: string;
}

interface StudentManagementProps {
  onBack: () => void;
}

export default function StudentManagement({ onBack }: StudentManagementProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'edit'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '+90 555 123 4567',
      grade: '10. Sınıf',
      class: '10-A',
      status: 'active',
      joinDate: '2024-01-15',
      totalLessons: 45,
      totalAssignments: 12,
      averageScore: 85,
      lastActivity: '2 saat önce'
    },
    {
      id: '2',
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      phone: '+90 555 987 6543',
      grade: '11. Sınıf',
      class: '11-B',
      status: 'active',
      joinDate: '2024-02-01',
      totalLessons: 38,
      totalAssignments: 15,
      averageScore: 92,
      lastActivity: '1 saat önce'
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      email: 'mehmet@example.com',
      phone: '+90 555 456 7890',
      grade: '9. Sınıf',
      class: '9-C',
      status: 'inactive',
      joinDate: '2023-12-10',
      totalLessons: 22,
      totalAssignments: 8,
      averageScore: 78,
      lastActivity: '1 gün önce'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setActiveTab('add');
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveTab('edit');
  };

  const handleToggleStatus = (studentId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Öğrenci durumu güncellendi!');
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success('Öğrenci silindi!');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSaveStudent = (isEdit: boolean = false) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(isEdit ? 'Öğrenci güncellendi!' : 'Öğrenci eklendi!');
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
          <Title size="lg">Öğrenci Yönetimi</Title>
        </div>
        <Button variant="primary" onClick={handleAddStudent}>
          <Plus size={20} />
          Yeni Öğrenci Ekle
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
                  placeholder="Öğrenci ara..."
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

          {/* Students List */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Title size="md">Öğrenci Listesi</Title>
              <Badge variant="info">{filteredStudents.length} öğrenci</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
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
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600
                    }}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {student.name}
                      </h3>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                        {student.email} • {student.phone}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <Badge variant="info">{student.grade}</Badge>
                        <Badge variant="info">{student.class}</Badge>
                        <Badge variant={student.status === 'active' ? 'success' : 'error'}>
                          {student.status === 'active' ? 'Aktif' : 'Pasif'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {student.totalLessons}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ders</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
                        {student.averageScore}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ortalama</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant={student.status === 'active' ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => handleToggleStatus(student.id)}
                        disabled={isLoading}
                      >
                        {student.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </Button>
                      <Button
                        variant="error"
                        size="sm"
                        onClick={() => handleDeleteStudent(student.id)}
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
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Yeni Öğrenci Ekle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ad Soyad
              </label>
              <Input placeholder="Öğrenci adı ve soyadı" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                E-posta
              </label>
              <Input type="email" placeholder="ornek@email.com" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Telefon
              </label>
              <Input placeholder="+90 555 123 4567" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf
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
                Şube
              </label>
              <Select>
                <option value="">Şube seçin</option>
                <option value="A">A Şubesi</option>
                <option value="B">B Şubesi</option>
                <option value="C">C Şubesi</option>
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
            <Button variant="primary" onClick={() => handleSaveStudent(false)} disabled={isLoading}>
              Öğrenci Ekle
            </Button>
          </div>
        </Card>
      )}

      {activeTab === 'edit' && selectedStudent && (
        <Card>
          <Title size="md" style={{ marginBottom: '1.5rem' }}>Öğrenci Düzenle</Title>
          
          <Grid cols={2} gap="1rem" style={{ marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Ad Soyad
              </label>
              <Input defaultValue={selectedStudent.name} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                E-posta
              </label>
              <Input type="email" defaultValue={selectedStudent.email} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Telefon
              </label>
              <Input defaultValue={selectedStudent.phone} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Sınıf
              </label>
              <Select defaultValue={selectedStudent.grade}>
                <option value="9. Sınıf">9. Sınıf</option>
                <option value="10. Sınıf">10. Sınıf</option>
                <option value="11. Sınıf">11. Sınıf</option>
                <option value="12. Sınıf">12. Sınıf</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Şube
              </label>
              <Select defaultValue={selectedStudent.class}>
                <option value="9-A">9-A</option>
                <option value="9-B">9-B</option>
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="11-A">11-A</option>
                <option value="11-B">11-B</option>
              </Select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>
                Durum
              </label>
              <Select defaultValue={selectedStudent.status}>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </Select>
            </div>
          </Grid>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setActiveTab('list')}>
              İptal
            </Button>
            <Button variant="primary" onClick={() => handleSaveStudent(true)} disabled={isLoading}>
              Güncelle
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
} 