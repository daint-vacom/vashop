export const ROUTE_PATHS = {
  HOME: '/',

  ORDER_MANAGEMENT: '/orders',
  ORDER_DETAIL: (orderId: string = ':orderId') => `/orders/${orderId}`,
  ORDER_ADD: `/orders/add`,

  AUTH: '/auth',
  ERROR: '/error',
  ERROR_404: '/error/404',

  CHANGE_PASSWORD: '/change-password',

  CATEGORIES: {
    INDEX: '/categories',
    PARTNER: '/categories/partners',
  },
} as const;
