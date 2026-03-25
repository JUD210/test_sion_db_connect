import { Outlet, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import { Toaster } from 'sonner';
import {
  ClipboardCheck, ShieldCheck, Clock, ClipboardList,
  Calendar, FileText, Image, Phone, ChevronLeft, ChevronRight, Home,
  BarChart3, LayoutDashboard, FileInput, GraduationCap
} from 'lucide-react';
import { StoreProvider } from '../../pages/interview/interviewStore';

const NAV_SECTIONS = [
  {
    title: '인사 관리',
    items: [
      { to: '/interview', icon: ClipboardCheck, label: '면접 평가' },
      { to: '/pledge', icon: ShieldCheck, label: '업무/보안 서약서' },
      { to: '/attendance', icon: Clock, label: '출퇴근 관리' },
      { to: '/tesol', icon: GraduationCap, label: 'TESOL 신청' },
    ],
  },
  {
    title: '업무 관리',
    items: [
      { to: '/work-log', icon: ClipboardList, label: '업무일지' },
      { to: '/meetings', icon: Calendar, label: '미팅 관리' },
      { to: '/guidelines', icon: FileText, label: '사내업무지침' },
      { to: '/photo-dashboard', icon: Image, label: '사진모음' },
      { to: '/outbound-calls', icon: Phone, label: '거래처 아웃콜' },
    ],
  },
];

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f3f6fb' }}>
      {/* 사이드바 */}
      <aside
        style={{
          width: collapsed ? 52 : 220,
          minWidth: collapsed ? 52 : 220,
          background: '#fff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s, min-width 0.2s',
          overflow: 'hidden',
        }}
      >
        {/* 로고 */}
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #5ee7ff, #4c2fff)', flexShrink: 0 }} />
          {!collapsed && <span style={{ fontWeight: 700, fontSize: 14 }}>AI Studio</span>}
        </div>

        {/* 네비게이션 */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} style={{ marginBottom: 12 }}>
              {!collapsed && (
                <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 8px', marginBottom: 2 }}>
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: collapsed ? '8px 14px' : '6px 10px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#3b82f6' : '#475569',
                      background: isActive ? '#eff6ff' : 'transparent',
                      marginBottom: 1,
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                    title={item.label}
                  >
                    <item.icon size={16} style={{ flexShrink: 0 }} />
                    {!collapsed && item.label}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 하단 링크 + 접기 */}
        <div style={{ borderTop: '1px solid #e2e8f0', padding: '6px' }}>
          <a
            href="/admin.html"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, fontSize: 12, color: '#64748b', textDecoration: 'none' }}
          >
            <BarChart3 size={14} />
            {!collapsed && '데이터 관리'}
          </a>
          <a
            href="/dashboard.html"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, fontSize: 12, color: '#64748b', textDecoration: 'none' }}
          >
            <LayoutDashboard size={14} />
            {!collapsed && '프로세스'}
          </a>
          <a
            href="/면접_main.html"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, fontSize: 12, color: '#64748b', textDecoration: 'none' }}
          >
            <FileInput size={14} />
            {!collapsed && '면접 폼(입력)'}
          </a>
          <a
            href="/home.html"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, fontSize: 12, color: '#64748b', textDecoration: 'none' }}
          >
            <Home size={14} />
            {!collapsed && '홈으로'}
          </a>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 8, padding: '6px 10px', border: 'none', background: 'none', borderRadius: 6,
              cursor: 'pointer', fontSize: 12, color: '#94a3b8',
            }}
          >
            {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /> 접기</>}
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <StoreProvider>
          <Outlet />
        </StoreProvider>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}
