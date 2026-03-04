import type { RouteConfig } from '../routes';

export const CLIENT_ROUTES_CONFIG: RouteConfig = {
  publicRoutes: {},
  privateRoutes: {
    credit: {
      path: '/credit',
      label: 'Solicitar crédito',
      roles: ['admin', 'client'],
    },
  },
} as const;

export const CLIENT_DEFAULT_ROUTES = {
  privateRoute: CLIENT_ROUTES_CONFIG.privateRoutes.credit,
};

export const CLIENT_API_ROUTES = {};
