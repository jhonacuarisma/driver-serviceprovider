/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';
import ProtectedRoute from 'components/guard/ProtectedRoute';

const App = lazy(() => import('App'));
// const Dashboard = lazy(() => import('pages/dashboard'));
const ServiceProvider = lazy(() => import('pages/dashboard/ServiceProvider'));
const Home = lazy(() => import('pages/dashboard/Home'));
const Signin = lazy(() => import('pages/authentication/Signin'));
const Signup = lazy(() => import('pages/authentication/Signup'));
const Tracking = lazy(() => import('pages/dashboard/Tracking'));
const ServiceProviderDashboard = lazy(() => import('pages/dashboard/sp/Dashboard'));
const ServiceRequests = lazy(() => import('pages/dashboard/sp/ServiceRequests'));
const ServiceRequestDetails = lazy(
  () => import('components/sections/serviceProviderRequests/RequestDetails'),
);
const ServiceProviderHistory = lazy(() => import('pages/dashboard/sp/ServiceHistory'));
const ServiceProviderEarnings = lazy(() => import('pages/dashboard/sp/Earnings'));
const Profile = lazy(() => import('pages/dashboard/Profile'));
const ServiceRequestsDriver = lazy(() => import('pages/dashboard/ServiceRequests'));
const ServiceRequestAccepted = lazy(() => import('pages/dashboard/ServiceRequestsAccepted'));
const ServiceRequestsHistory = lazy(() => import('pages/dashboard/ServiceRequestsHistory'));
// Add custom interface extensions

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: paths.serviceProvider,
              element: <ServiceProvider />,
            },
            {
              path: paths.tracking,
              element: <Tracking />,
            },
            {
              path: paths.serviceProviderDashboard,
              element: <ServiceProviderDashboard />,
            },
            {
              path: paths.serviceProviderRequests,
              element: <ServiceRequests />,
            },
            {
              path: paths.serviceProviderRequestsDetails,
              element: <ServiceRequestDetails />,
            },
            {
              path: paths.serviceProviderHistory,
              element: <ServiceProviderHistory />,
            },
            {
              path: paths.serviceProviderEarnings,
              element: <ServiceProviderEarnings />,
            },
            {
              path: paths.profile,
              element: <Profile />,
            },
            {
              path: paths.serviceRequests,
              element: <ServiceRequestsDriver />,
            },
            {
              path: paths.serviceRequestsAccepted,
              element: <ServiceRequestAccepted />,
            },
            {
              path: paths.serviceRequestsHistory,
              element: <ServiceRequestsHistory />,
            },
          ],
        },
        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: paths.signin,
              element: <Signin />,
            },
            {
              path: paths.signup,
              element: <Signup />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/dnx',
  },
);

export default router;
