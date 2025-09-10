// src/config/app-route.tsx
import { Outlet, Navigate, type RouteObject } from 'react-router-dom';

import AppLayout from '../App';

import DashboardV1 from '../pages/dashboard/dashboard-v1';
import DashboardV2 from '../pages/dashboard/dashboard-v2';

import EmailInbox from '../pages/email/email-inbox';
import EmailCompose from '../pages/email/email-compose';
import EmailDetail from '../pages/email/email-detail';

import Widgets from '../pages/widget/widget';

import ExtraError from '../pages/extra/extra-error';

const AppRoute: RouteObject[] = [
  {
    path: '*',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/v1" replace />,
      },
      {
        path: 'dashboard/*',
        element: <Outlet />,
        children: [
          { path: 'v1', element: <DashboardV1 /> },
          { path: 'v2', element: <DashboardV2 /> },
          { path: '*', element: <ExtraError /> },
        ],
      },
      {
        path: 'email/*',
        element: <Outlet />,
        children: [
          { path: 'inbox', element: <EmailInbox /> },
          { path: 'compose', element: <EmailCompose /> },
          { path: 'detail', element: <EmailDetail /> },
          { path: '*', element: <ExtraError /> },
        ],
      },
      {
        path: 'widgets',
        element: <Widgets />,
      },
      { path: '*', element: <ExtraError /> },
    ],
  },
];

export default AppRoute;
