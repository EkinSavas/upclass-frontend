import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, Title, ActivityItem, Badge, Button } from "./StyledComponents";
import { GuidanceRequest } from "./types";

interface GuidanceTabProps {
  guidanceRequests: GuidanceRequest[];
  onRequestGuidance: () => void;
  getStatusColor: (status: string) => string;
}

export const GuidanceTab = ({ guidanceRequests, onRequestGuidance, getStatusColor }: GuidanceTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <Title size="md">Rehberlik Talepleri</Title>
          <Button variant="primary" onClick={onRequestGuidance}>
            <Users size={20} />
            Yeni Talep
          </Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {guidanceRequests.map((request, index) => (
            <ActivityItem
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: '#f3f4f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} style={{ color: getStatusColor(request.status) }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{request.subject} - {request.reason}</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>Talep tarihi: {request.requestedAt}</p>
                  {request.response && (
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>Yanıt: {request.response}</p>
                  )}
                </div>
              </div>
              <Badge variant={request.status === "approved" ? "success" : request.status === "pending" ? "warning" : "error"}>
                {request.status === "approved" ? "Onaylandı" : request.status === "pending" ? "Bekliyor" : "Reddedildi"}
              </Badge>
            </ActivityItem>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}; 