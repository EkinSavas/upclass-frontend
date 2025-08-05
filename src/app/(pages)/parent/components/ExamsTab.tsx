import { motion } from "framer-motion";
import { Card, Title, Grid, Badge, ProgressBar } from "./StyledComponents";
import { ExamResult } from "./types";

interface ExamsTabProps {
  examResults: ExamResult[];
}

export const ExamsTab = ({ examResults }: ExamsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <Title size="md" style={{ marginBottom: '1.5rem' }}>Sınav Sonuçları</Title>
        <Grid cols={2} gap="1.5rem">
          {examResults.map((exam, index) => (
            <Card key={exam.id} whileHover={{ scale: 1.02 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{exam.subject}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>{exam.examName}</p>
                </div>
                <Badge variant={exam.status === "excellent" ? "success" : exam.status === "passed" ? "info" : "error"}>
                  {exam.status === "excellent" ? "Mükemmel" : exam.status === "passed" ? "Geçti" : "Kaldı"}
                </Badge>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>{exam.score}/{exam.maxScore}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{exam.date}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sınıf Sırası: {exam.rank}/{exam.totalStudents}</span>
                <ProgressBar progress={(exam.score / exam.maxScore) * 100} color={exam.status === "excellent" ? "#22c55e" : exam.status === "passed" ? "#3b82f6" : "#ef4444"} />
              </div>
            </Card>
          ))}
        </Grid>
      </Card>
    </motion.div>
  );
}; 