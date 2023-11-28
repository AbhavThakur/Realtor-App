import { Navigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';
function PrivateRedirectProfileRoute({ children }) {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  if (loggedIn) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default PrivateRedirectProfileRoute;
