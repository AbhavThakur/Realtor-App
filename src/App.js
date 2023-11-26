import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorPage, Home, Offers, Profile, Root, SignIn } from './pages';

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
          path: '/signIn',
          element: <SignIn />,
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
