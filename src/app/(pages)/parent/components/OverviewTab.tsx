import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  Share, 
  Users, 
  Calendar, 
  Target, 
  Clock, 
  Star, 
  PieChart,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  BookOpen
} from "lucide-react";
import { Card, Title, Grid, Button, StatCard, Badge } from "./StyledComponents";
import { ActivityItem } from "./StyledComponents";
import { WeeklyReport, SubjectPerformance, StudentLog } from "./types";

interface OverviewTabProps {
  currentReport: WeeklyReport;
  subjects: SubjectPerformance[];
  studentLogs: StudentLog[];
  onGenerateReport: () => void;
  onExportPDF: () => void;
  onShareWithTeacher: () => void;
  onRequestGuidance: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (type: string) => React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

export const OverviewTab = ({
  currentReport,
  subjects,
  studentLogs,
  onGenerateReport,
  onExportPDF,
  onShareWithTeacher,
  onRequestGuidance,
  getStatusColor,
  getStatusIcon
}: OverviewTabProps) => {
  return (
    <>
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '2rem' }}
      >
        <Card>
          <Title size="md" style={{ marginBottom: '1rem' }}>Hızlı İşlemler</Title>
          <Grid cols={4} gap="1rem">
            <Button variant="primary" onClick={onGenerateReport}>
              <Download size={20} />
              Detaylı Rapor
            </Button>
            
            <Button variant="success" onClick={onExportPDF}>
              <FileText size={20} />
              PDF İndir
            </Button>
            
            <Button variant="warning" onClick={onShareWithTeacher}>
              <Share size={20} />
              Öğretmenle Paylaş
            </Button>
            
            <Button variant="error" onClick={onRequestGuidance}>
              <Users size={20} />
              Rehber Talebi
            </Button>
          </Grid>
        </Card>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '2rem' }}
      >
        <Grid cols={4} gap="1.5rem">
          {/* ReportCard - Ders Katılımı */}
          <StatCard whileHover={{ scale: 1.02, y: -2 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>Ders Katılımı</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{currentReport.attendanceRate}%</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} />
                Artış
              </div>
            </div>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}>
              <Calendar size={20} />
            </div>
          </StatCard>

          {/* ReportCard - Quiz Başarısı */}
          <StatCard whileHover={{ scale: 1.02, y: -2 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>Quiz Başarısı</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{currentReport.quizSuccessRate}%</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} />
                Artış
              </div>
            </div>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
              <Target size={20} />
            </div>
          </StatCard>

          {/* ReportCard - Çalışma Süresi */}
          <StatCard whileHover={{ scale: 1.02, y: -2 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>Çalışma Süresi</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{currentReport.studyTime}s</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} />
                Artış
              </div>
            </div>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
              <Clock size={20} />
            </div>
          </StatCard>

          {/* ReportCard - Kazanılan XP */}
          <StatCard whileHover={{ scale: 1.02, y: -2 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', margin: '0 0 0.25rem 0' }}>Kazanılan XP</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>{currentReport.xpGained}</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={12} />
                Artış
              </div>
            </div>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <Star size={20} />
            </div>
          </StatCard>
        </Grid>
      </motion.div>

      {/* Subject Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: '2rem' }}
      >
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <Title size="md">Ders Başarıları</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <PieChart size={16} />
              <span>Ortalama: 91%</span>
            </div>
          </div>
          
          <Grid cols={3} gap="1rem">
            {subjects.map((subject, index) => (
              <Card key={index} whileHover={{ scale: 1.02 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{subject.subject}</h4>
                  <div style={{ width: '2rem', height: '2rem', background: subject.color, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={16} color="white" />
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}>{subject.score}%</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: subject.trend === "up" ? '#16a34a' : subject.trend === "down" ? '#dc2626' : '#6b7280' }}>
                    {subject.trend === "up" ? <TrendingUp size={16} /> :
                     subject.trend === "down" ? <TrendingDown size={16} /> :
                     <Activity size={16} />}
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <Title size="md" style={{ marginBottom: '1rem' }}>Son Aktiviteler</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {studentLogs.slice(0, 5).map((log, index) => {
              const IconComponent = getStatusIcon(log.type);
              return (
                <ActivityItem
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', background: '#f3f4f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent size={16} style={{ color: getStatusColor(log.status) }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{log.action}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{log.timestamp}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {log.status === "success" && <CheckCircle size={16} style={{ color: '#22c55e' }} />}
                    {log.status === "warning" && <AlertCircle size={16} style={{ color: '#f59e0b' }} />}
                    {log.status === "error" && <XCircle size={16} style={{ color: '#ef4444' }} />}
                    {log.status === "info" && <AlertCircle size={16} style={{ color: '#3b82f6' }} />}
                  </div>
                </ActivityItem>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </>
  );
}; 