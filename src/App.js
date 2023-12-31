import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PrivateRedirectProfileRoute, PrivateRoute } from './components';

import {
  Category,
  CategoryType,
  CreateListing,
  EditListing,
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
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: '/offers',
          element: <Offers />,
        },
        {
          path: '/create-listing',
          element: (
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          ),
        },
        {
          path: '/edit-listing/:listingId',
          element: (
            <PrivateRoute>
              <EditListing />
            </PrivateRoute>
          ),
        },
        {
          path: '/category/:categoryName/:listingId',
          element: <Category />,
        },
        {
          path: '/category/:categoryName',
          element: <CategoryType />,
        },
        {
          path: '/sign-in',
          element: (
            <PrivateRedirectProfileRoute>
              <SignIn />
            </PrivateRedirectProfileRoute>
          ),
        },
        {
          path: '/sign-up',
          element: (
            <PrivateRedirectProfileRoute>
              <SignUp />
            </PrivateRedirectProfileRoute>
          ),
        },
        {
          path: '/forgot-password',
          element: (
            <PrivateRedirectProfileRoute>
              <ForgotPassword />
            </PrivateRedirectProfileRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
