export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  home: `/${rootPaths.pageRoot}/home`,
  serviceProvider: `/${rootPaths.pageRoot}/service-provider/:id`, // Dynamic parameter added
  tracking: `/${rootPaths.pageRoot}/tracking/:id`,
  profile: `/${rootPaths.pageRoot}/profile`,
  serviceRequests: `/${rootPaths.pageRoot}/service-requests`,
  serviceRequestsAccepted: `/${rootPaths.pageRoot}/service-requests-accepted`,
  serviceRequestsHistory: `/${rootPaths.pageRoot}/service-requests-history`,

  signin: `/${rootPaths.authRoot}/signin`,
  signup: `/${rootPaths.authRoot}/signup`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,

  serviceProviderDashboard: `/${rootPaths.pageRoot}/sp/dashboard`,
  serviceProviderRequests: `/${rootPaths.pageRoot}/sp/service-requests`,
  serviceProviderRequestsDetails: `/${rootPaths.pageRoot}/sp/service-requests/:id`,

  serviceProviderHistory: `/${rootPaths.pageRoot}/sp/service-history`,
  serviceProviderEarnings: `/${rootPaths.pageRoot}/sp/earnings`,
};
