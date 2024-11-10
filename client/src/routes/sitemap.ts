import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
  userTypes?: string[];
}

// Define user types
export type UserType = 'driver' | 'serviceProvider' | undefined;

const sitemap: MenuItem[] = [
  {
    id: 'home',
    subheader: 'Home',
    path: '/',
    icon: 'hugeicons:grid-view',
    active: true,
    userTypes: ['driver'],
  },

  {
    id: 'spRequests',
    subheader: 'Service Requests',
    path: paths.serviceProviderRequests,
    icon: 'mdi:clipboard-text-clock',
    userTypes: ['service_provider'],
  },
  {
    id: 'driverRequests',
    subheader: 'Service Requests',
    path: paths.serviceRequests,
    icon: 'mdi:clipboard-text-clock',
    userTypes: ['driver'],
  },

  {
    id: 'driverRequestsAccepted',
    subheader: 'Ongoing Request',
    path: paths.serviceRequestsAccepted,
    icon: 'mdi:clipboard-text-clock',
    userTypes: ['driver'],
  },

  {
    id: 'driverRequestsHistory',
    subheader: 'Request History',
    path: paths.serviceRequestsHistory,
    icon: 'mdi:clipboard-text-clock',
    userTypes: ['driver'],
  },
  // {
  //   id: 'tracking',
  //   subheader: 'Tracking',
  //   path: paths.tracking,
  //   icon: 'mdi:chart-line',
  //   userTypes: ['driver', 'service_provider'],
  // },

  {
    id: 'spDashboard',
    subheader: 'Dashboard',
    path: paths.serviceProviderDashboard,
    icon: 'mdi:view-dashboard',
    userTypes: ['service_provider'],
  },

  {
    id: 'spHistory',
    subheader: 'Service History',
    path: paths.serviceProviderHistory,
    icon: 'mdi:history',
    userTypes: ['service_provider'],
  },
  {
    id: 'spProfile',
    subheader: 'Profile',
    path: paths.profile,
    icon: 'mdi:account-circle',
    userTypes: ['driver', 'service_provider'],
  },
];

// Function to filter sitemap based on user type
export const filterSitemapByUserType = (userType: UserType): MenuItem[] => {
  return userType ? sitemap.filter((item) => item.userTypes?.includes(userType)) : [];
};

export default sitemap;
