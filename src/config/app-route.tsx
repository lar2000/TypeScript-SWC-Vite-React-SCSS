// src/config/app-route.tsx
import { Outlet, Navigate, type RouteObject } from 'react-router-dom';

import AppLayout from '../App';

import DashboardV1 from '../pages/dashboard/dashboard-v1';
import DashboardV2 from '../pages/dashboard/dashboard-v2';

import EmailInbox from '../pages/email/email-inbox';
import EmailCompose from '../pages/email/email-compose';
import EmailDetail from '../pages/email/email-detail';

import Widgets from '../pages/widget/widget';

// ===========Setting======================

import Company from '../pages/InsuranceData/ins-companies';
import Agent from '../pages/InsuranceData/agent';

import CarType from '../pages/setting/car/car-type';
import Brand from '../pages/setting/car/brand';
import INS_TYPE from '../pages/setting/insurances/ins_typeList';
import OptionList from '../pages/setting/insurances/optionsList';

import ExtraError from '../pages/extra/extra-error';
import Currency from '../pages/setting/currency';

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
      {
        path: 'insuranceData/*',
        element: <Outlet />,
        children: [
          { path: 'companies', element: <Company/> },
          { path: 'agent', element: <Agent /> },
          { path: '2', element: '' },
          { path: '3', element: '' },
          { path: '4', element: '' },
          { path: '5', element: '' },
          { path: '*', element: '' },
        ],
      },
      {
        path: 'report/*',
        element: <Outlet />,
        children: [
          { path: '1', element: '' },
          { path: '2', element: '' },
          { path: '3', element: '' },
          { path: '4', element: '' },
          { path: '5', element: '' },
          { path: '*', element: '' },
        ],
      },
       {
        path: 'setting/*',
        element: <Outlet />,
        children: [
          { path: 'ins_type', element: <INS_TYPE/> },
          { path: 'car_type', element: <CarType/> },
          { path: 'brand', element: <Brand /> },
          { path: 'option/:id', element: <OptionList/> },
          { path: 'currency', element: <Currency/> },
          { path: '*', element: <ExtraError /> },
        ],
      },


      { path: '*', element: <ExtraError /> },
    ],
  },
];

export default AppRoute;
