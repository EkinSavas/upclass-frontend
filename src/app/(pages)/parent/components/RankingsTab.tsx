import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Card, Title, Grid } from "./StyledComponents";
import { ClassRanking } from "./types";

interface RankingsTabProps {
  classRankings: ClassRanking[];
}

export const RankingsTab = ({ classRankings }: RankingsTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <Title size="md" style={{ marginBottom: '1.5rem' }}>Sınıf Başarı Sırası</Title>
        <Grid cols={2} gap="1.5rem">
          {classRankings.map((ranking, index) => (
            <Card key={index} whileHover={{ scale: 1.02 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>{ranking.subject}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: ranking.change === "up" ? '#16a34a' : ranking.change === "down" ? '#dc2626' : '#6b7280' }}>
                  {ranking.change === "up" ? <TrendingUp size={16} /> :
                   ranking.change === "down" ? <TrendingDown size={16} /> :
                   <Activity size={16} />}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>{ranking.currentRank}. Sıra</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{ranking.score} puan</span>
              </div>
              
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Toplam: {ranking.totalStudents} öğrenci • Önceki: {ranking.previousRank}. sıra
              </div>
            </Card>
          ))}
        </Grid>
      </Card>
    </motion.div>
  );
}; 