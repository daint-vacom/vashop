import { RouteObject } from 'react-router-dom';
import { BrandedLayout } from './layouts/branded';
import { SignInPage } from './pages/signin-page';
import { ResetPasswordPage } from './pages/reset-password-page';

// Define the auth routes
export const authRoutes: RouteObject[] = [
  {
    path: '',
    element: <BrandedLayout />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
];
