import { motion } from "framer-motion";
import { Card, Title, Grid, Badge } from "./StyledComponents";
import { HomeworkStatus } from "./types";

interface HomeworkTabProps {
  homeworkStatus: HomeworkStatus[];
}

export const HomeworkTab = ({ homeworkStatus }: HomeworkTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <Title size="md" style={{ marginBottom: '1.5rem' }}>Ödev Durumu</Title>
        <Grid cols={2} gap="1.5rem">
          {homeworkStatus.map((homework, index) => (
            <Card key={homework.id} whileHover={{ scale: 1.02 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{homework.subject}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>{homework.homeworkTitle}</p>
                </div>
                <Badge variant={
                  homework.status === "completed" ? "success" : 
                  homework.status === "pending" ? "warning" : 
                  homework.status === "late" ? "error" : "info"
                }>
                  {homework.status === "completed" ? "Tamamlandı" : 
                   homework.status === "pending" ? "Bekliyor" : 
                   homework.status === "late" ? "Gecikti" : "Başlanmadı"}
                </Badge>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Teslim: {homework.dueDate}</span>
                {homework.grade && (
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>Not: {homework.grade}</span>
                )}
              </div>
              
              {homework.submittedAt && (
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Teslim edildi: {homework.submittedAt}
                </div>
              )}
            </Card>
          ))}
        </Grid>
      </Card>
    </motion.div>
  );
}; 