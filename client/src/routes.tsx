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
        { index: true, element: <Navigate to="/tesol" replace /> },

        // 소비자 접수
        { path: 'tesol', element: lazyPage(() => import('./pages/tesol/TesolPage')) },
        { path: 'level-test', element: lazyPage(() => import('./pages/level-test/LevelTestPage')) },

        // 직원 도구
        { path: 'work-log', element: lazyPage(() => import('./pages/work-log/EmployeePage')) },
        { path: 'work-log/admin', element: lazyPage(() => import('./pages/work-log/AdminPage')) },
        { path: 'pledge', element: lazyPage(() => import('./pages/pledge/PledgePage')) },
        { path: 'guidelines', element: lazyPage(() => import('./pages/guidelines/GuidelinesPage')) },
        { path: 'lesson-plan', element: lazyPage(() => import('./pages/lesson-plan/LessonPlanPage')) },

        // 관리자 도구
        { path: 'interview', element: lazyPage(() => import('./pages/interview/InterviewForm')) },
        { path: 'interview/dashboard', element: lazyPage(() => import('./pages/interview/Dashboard')) },
        { path: 'attendance', element: lazyPage(() => import('./pages/attendance/AttendancePage')) },
        { path: 'meetings', element: lazyPage(() => import('./pages/meetings/MeetingsPage')) },
        { path: 'outbound-calls', element: lazyPage(() => import('./pages/outbound-calls/OutboundCallsPage')) },
        { path: 'photo-dashboard', element: lazyPage(() => import('./pages/photo-dashboard/PhotoDashboardPage')) },
        { path: 'schedule', element: lazyPage(() => import('./pages/schedule/SchedulePage')) },
        { path: 'rules-mgmt', element: lazyPage(() => import('./pages/rules-mgmt/RulesMgmtPage')) },
        { path: 'rules-editor', element: lazyPage(() => import('./pages/rules-editor/RulesEditorPage')) },
        { path: 'eval-criteria', element: lazyPage(() => import('./pages/eval-criteria/EvalCriteriaPage')) },
        { path: 'admin-system', element: lazyPage(() => import('./pages/admin-system/AdminSystemPage')) },
      ],
    },
  ],
  { basename: '/app' }
);
