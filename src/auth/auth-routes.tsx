import { RouteObject } from 'react-router-dom';
import { BrandedLayout } from './layouts/branded';
import { SignInPage } from './pages/signin-page';

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
    ],
  },
];
