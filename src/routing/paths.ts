export const ROUTE_PATHS = {
  HOME: '/',

  ORDER_MANAGEMENT: '/orders',
  ORDER_DETAIL: (orderId: string = ':orderId') =>
    `/${ROUTE_PATHS.ORDER_MANAGEMENT}/${orderId}`,

  AUTH: '/auth',
  ERROR: '/error',
  ERROR_404: '/error/404',

  CHANGE_PASSWORD: '/change-password',
} as const;
