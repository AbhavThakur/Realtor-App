import {
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { Header } from './components';
import { ErrorPage, Home, Profile, Root, SignIn } from './pages';

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
          path: 'profile',
          element: <Profile />,
        },
      ],
    },

    {
      path: '/signIn',
      element: <SignIn />,
    },
  ]);
  return (
    <>
      <Router>
        <Header />
      </Router>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
