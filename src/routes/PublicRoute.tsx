import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  // const token = useSelector((state) => state.auth.token);
  const token = "1234";
  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;