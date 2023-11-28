import { Navigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';
function PrivateRoute({ children }) {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    return children;
  }

  return <Navigate to="/sign-in" />;
}

export default PrivateRoute;
