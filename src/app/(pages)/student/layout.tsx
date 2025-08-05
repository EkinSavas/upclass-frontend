"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Play, 
  FileText, 
  BarChart3, 
  Video, 
  Settings,
  Menu,
  X,
  Home,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Target,
  Clock,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  Zap
} from "lucide-react";
import styled from "styled-components";

// Styled Components
const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(14, 165, 233, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: 600;
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }
  
  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`;

const MainContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(14, 165, 233, 0.1);
  z-index: 100;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  
  @media (min-width: 1024px) {
    transform: translateX(0);
    position: sticky;
    top: 4rem;
    height: calc(100vh - 4rem);
    width: 280px;
    box-shadow: none;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SidebarLogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const SidebarLogoText = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }
  
  p {
    font-size: 0.625rem;
    color: #6b7280;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const NavSectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
`;

const NavItem = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: ${props => props.isActive ? '#1f2937' : '#6b7280'};
  background: ${props => props.isActive ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' : 'transparent'};
  border: 1px solid ${props => props.isActive ? '#0ea5e9' : 'transparent'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
  
  &:hover {
    background: ${props => props.isActive ? 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)' : '#f9fafb'};
    transform: translateX(4px);
  }
  
  svg {
    color: ${props => props.isActive ? '#0ea5e9' : '#6b7280'};
  }
`;

const NotificationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 600;
  margin-left: auto;
`;

const UserSection = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const UserDetails = styled.div`
  flex: 1;
  
  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  p {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #fecaca;
    transform: translateX(4px);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 4rem);
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  
  @media (max-width: 1023px) {
    padding: 1rem;
  }
`;

const MobileOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.5rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background: #ef4444;
  border-radius: 50%;
`;

const navigationItems = [
  {
    section: "Ana Sayfa",
    items: [
      { name: "Dashboard", href: "/student", icon: Home },
      { name: "Canlı Ders", href: "/student/live-class", icon: Play },
      { name: "Takvim", href: "/student/calendar", icon: Calendar },
    ]
  },
  {
    section: "Eğitim",
    items: [
      { name: "Ödevler", href: "/student/assignments", icon: FileText },
      { name: "Ders Kayıtları", href: "/student/recordings", icon: Video },
     
    ]
  },
  {
    section: "İstatistikler",
    items: [
      { name: "Genel İstatistikler", href: "/student/statistics", icon: BarChart3 },

    ]
  }
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <LayoutWrapper>
      {/* Header */}
      <Header>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MobileMenuButton onClick={toggleSidebar}>
              <Menu size={20} />
            </MobileMenuButton>
            <LogoContainer>
              <LogoIcon>
                <BookOpen size={24} />
              </LogoIcon>
              <LogoText>
                <h1>UpClass</h1>
                <p>Öğrenci Paneli</p>
              </LogoText>
            </LogoContainer>
          </div>
          
          <HeaderActions>
            <NotificationButton>
              <Bell size={20} />
              <NotificationDot />
            </NotificationButton>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
              <User size={16} color="#6b7280" />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>Ahmet Yılmaz</span>
            </div>
          </HeaderActions>
        </HeaderContent>
      </Header>

      {/* Mobile Overlay */}
      <MobileOverlay isOpen={sidebarOpen} onClick={closeSidebar} />

      {/* Content */}
      <ContentWrapper>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen}>
          <SidebarContent>
            

            {/* Navigation */}
            {navigationItems.map((section, sectionIndex) => (
              <NavSection key={sectionIndex}>
                <NavSectionTitle>{section.section}</NavSectionTitle>
                {section.items.map((item, itemIndex) => (
                  <NavItem
                    key={itemIndex}
                    href={item.href}
                    isActive={pathname === item.href}
                    onClick={closeSidebar}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                    {item.name === "Canlı Ders" && (
                      <NotificationBadge>3</NotificationBadge>
                    )}
                    {item.name === "Ödevler" && (
                      <NotificationBadge>5</NotificationBadge>
                    )}
                    
                  </NavItem>
                ))}
              </NavSection>
            ))}
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <ContentArea>
          {children}
        </ContentArea>
      </ContentWrapper>
    </LayoutWrapper>
  );
} 