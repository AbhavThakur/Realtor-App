import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  ErrorPage,
  ForgotPassword,
  Home,
  Offers,
  Profile,
  Root,
  SignIn,
  SignUp,
} from './pages';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          index: true,
          element: <Home />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/offers',
          element: <Offers />,
        },
        {
          path: '/sign-in',
          element: <SignIn />,
        },
        {
          path: '/sign-up',
          element: <SignUp />,
        },
        {
          path: '/forgot-password',
          element: <ForgotPassword />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
