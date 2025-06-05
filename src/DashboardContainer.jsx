import React from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';

import ClientDashboard from './components/ClientDashboard.jsx';
import SalesDashboard from './components/SalesDashboard.jsx';
import FinanceDashboard from './components/FinanceDashboard.jsx';
import DeveloperDashboard from './components/DeveloperDashboard.jsx';
import InvestorDashboard from './components/InvestorDashboard.jsx';
import PartnerDashboard from './components/PartnerDashboard.jsx';

const dashboards = [
  { path: 'client', name: 'Client Dashboard', component: <ClientDashboard /> },
  { path: 'sales', name: 'Sales Dashboard', component: <SalesDashboard /> },
  { path: 'finance', name: 'Finance Dashboard', component: <FinanceDashboard /> },
  { path: 'developer', name: 'Developer Dashboard', component: <DeveloperDashboard /> },
  { path: 'investor', name: 'Investor Dashboard', component: <InvestorDashboard /> },
  { path: 'partner', name: 'Partner Dashboard', component: <PartnerDashboard /> },
];


const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="dashboard-platform">
      <div className="dashboard-sidebar">
        <h2>Dashboards</h2>
        <ul>
          <li>
            <Link to="." className={location.pathname.endsWith('/dashboards') ? 'active' : ''}>
              Admin Dashboard
            </Link>
          </li>
          {dashboards.map((dashboard) => (
            <li key={dashboard.path}>
              <Link
                to={dashboard.path}
                className={location.pathname.includes(dashboard.path) ? 'active' : ''}
              >
                {dashboard.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

const DashboardContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {dashboards.map((dashboard) => (
          <Route
            key={dashboard.path}
            path={dashboard.path}
            element={dashboard.component}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default DashboardContainer;
