import { createBrowserRouter, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import { AppLayout } from './components/layout/AppLayout';

const Loading = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b', fontSize: 14 }}>
    로딩 중...
  </div>
);

function lazyPage(importFn: () => Promise<any>) {
  const LazyComponent = lazy(importFn);
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: AppLayout,
      children: [
        { index: true, element: <Navigate to="/interview" replace /> },
        { path: 'interview', element: lazyPage(() => import('./pages/interview/InterviewForm')) },
        { path: 'interview/dashboard', element: lazyPage(() => import('./pages/interview/Dashboard')) },
        { path: 'pledge', element: lazyPage(() => import('./pages/pledge/PledgePage')) },
        { path: 'outbound-calls', element: lazyPage(() => import('./pages/outbound-calls/OutboundCallsPage')) },
        { path: 'meetings', element: lazyPage(() => import('./pages/meetings/MeetingsPage')) },
        { path: 'guidelines', element: lazyPage(() => import('./pages/guidelines/GuidelinesPage')) },
        { path: 'photo-dashboard', element: lazyPage(() => import('./pages/photo-dashboard/PhotoDashboardPage')) },
        { path: 'work-log', element: lazyPage(() => import('./pages/work-log/EmployeePage')) },
        { path: 'work-log/admin', element: lazyPage(() => import('./pages/work-log/AdminPage')) },
        { path: 'attendance', element: lazyPage(() => import('./pages/attendance/AttendancePage')) },
        { path: 'tesol', element: lazyPage(() => import('./pages/tesol/TesolPage')) },
      ],
    },
  ],
  { basename: '/app' }
);
