import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, Title, ActivityItem } from "./StyledComponents";
import { StudentLog } from "./types";

interface LogsTabProps {
  studentLogs: StudentLog[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (type: string) => React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

export const LogsTab = ({ studentLogs, getStatusColor, getStatusIcon }: LogsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <Title size="md" style={{ marginBottom: '1.5rem' }}>Öğrenci Aktiviteleri</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {studentLogs.map((log, index) => {
            const IconComponent = getStatusIcon(log.type);
            return (
              <ActivityItem
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2rem', height: '2rem', background: '#f3f4f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComponent size={16} style={{ color: getStatusColor(log.status) }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{log.action}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>{log.details}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>{log.timestamp}</p>
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
  );
}; 