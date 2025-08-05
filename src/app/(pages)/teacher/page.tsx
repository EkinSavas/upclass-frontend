"use client";

import { useState } from "react";
import styled from "styled-components";
import { 
  Users, 
  Calendar, 
  Video, 
  PlayCircle, 
  FileText, 
  BarChart3, 
  User
} from "lucide-react";
import Students from "./components/Students";
import CalendarComponent from "./components/Calendar";
import LiveClass from "./components/LiveClass";
import RecordedClasses from "./components/RecordedClasses";
import Assignments from "./components/Assignments";
import ReportsComponent from "./components/Reports";
import ProfileComponent from "./components/Profile";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f2fe 0%, #f1f5f9 100%);
`;

const Sidebar = styled.nav`
  width: 280px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 1rem 1rem;
  gap: 2rem;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 2;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  
  @media (max-width: 900px) {
    width: 80px;
    padding: 1rem 0.5rem;
    gap: 1rem;
}
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: #0ea5e9;
  margin-bottom: 2rem;
  letter-spacing: -1px;
  padding: 1rem;
  background: rgba(14, 165, 233, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(14, 165, 233, 0.1);
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SidebarMenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${props => props.active ? '#fff' : '#1e293b'};
  background: ${props => props.active ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  position: relative;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' : 'rgba(14, 165, 233, 0.08)'};
    color: ${props => props.active ? '#fff' : '#0ea5e9'};
    transform: translateX(4px);
  }
  
  @media (max-width: 900px) {
    justify-content: center;
    padding: 0.875rem 0.5rem;
    font-size: 0;
    svg { margin: 0; }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 100vw;
  overflow-y: auto;
  
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuickActionButton = styled.button<{ variant?: 'primary' | 'success' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
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
`;

const menu = [
  { key: "students", label: "Öğrenciler", icon: Users, description: "Öğrenci listesi ve detayları" },
  { key: "calendar", label: "Takvim", icon: Calendar, description: "Ders programı ve planlama" },
  { key: "live", label: "Canlı Ders", icon: Video, description: "Aktif ders yönetimi" },
  { key: "recorded", label: "Kayıtlı Dersler", icon: PlayCircle, description: "Geçmiş ders kayıtları" },
  { key: "assignments", label: "Ödevler", icon: FileText, description: "Ödev yönetimi ve takip" },
  { key: "reports", label: "Raporlar", icon: BarChart3, description: "Performans analizi" },
  { key: "profile", label: "Profil", icon: User, description: "Kişisel ayarlar" },
];

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [isLiveClassActive, setIsLiveClassActive] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'startClass':
        setIsLiveClassActive(true);
        setActiveTab('live');
        break;
      case 'newAssignment':
        setActiveTab('assignments');
        break;
      case 'viewStudents':
        setActiveTab('students');
        break;
      case 'viewCalendar':
        setActiveTab('calendar');
        break;
    }
  };

  return (
    <Layout>
      <Sidebar>
        <SidebarHeader>
          <span role="img" aria-label="teacher">🧑‍🏫</span>
          <span style={{ display: 'inline-block' }}>Öğretmen Paneli</span>
        </SidebarHeader>
        
        <SidebarMenu>
          {menu.map(item => (
            <SidebarMenuItem
              key={item.key}
              active={activeTab === item.key}
              onClick={() => setActiveTab(item.key)}
              title={item.description}
            >
              <item.icon size={20} />
              <span style={{ display: 'inline-block' }}>{item.label}</span>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
                
      <Main>
        {/* Quick Actions */}
        <QuickActions>
          <QuickActionButton 
            variant="success" 
            onClick={() => handleQuickAction('startClass')}
                  >
            <Video size={18} />
            Ders Başlat
          </QuickActionButton>
          
          <QuickActionButton 
            variant="primary" 
            onClick={() => handleQuickAction('newAssignment')}
                  >
            <FileText size={18} />
            Yeni Ödev
          </QuickActionButton>
          
          <QuickActionButton 
            onClick={() => handleQuickAction('viewStudents')}
            >
            <Users size={18} />
            Öğrenciler
          </QuickActionButton>
          
          <QuickActionButton 
            onClick={() => handleQuickAction('viewCalendar')}
          >
            <Calendar size={18} />
            Takvim
          </QuickActionButton>
        </QuickActions>

        {/* Content */}
        {activeTab === "students" && <Students />}
        {activeTab === "calendar" && <CalendarComponent />}
        {activeTab === "live" && <LiveClass isActive={isLiveClassActive} />}
        {activeTab === "recorded" && <RecordedClasses />}
        {activeTab === "assignments" && <Assignments />}
        {activeTab === "reports" && <ReportsComponent />}
        {activeTab === "profile" && <ProfileComponent />}
      </Main>
    </Layout>
  );
} 