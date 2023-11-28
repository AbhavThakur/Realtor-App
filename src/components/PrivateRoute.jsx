import { Navigate } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
function PrivateRoute({ children }) {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return (
      <span className="uppercase text-3xl justify-center ">loading...</span>
    );
  }

  if (loggedIn) {
    return children;
  }

  return <Navigate to="/sign-in" />;
}

export default PrivateRoute;
