import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { refreshToken } from "../store/actions/auth/authThunks";
// import LoadingScreen from "../components/Common/LoadingScreen";

const REFRESH_INTERVAL = 5 * 60 * 1000;

const PrivateRoute = ({ children }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authenticated = useSelector((state:any) => state.auth.authenticated);
  const user = useSelector((state:any) => state.auth.user);
  const token = useSelector((state:any) => state.auth.token);

  const [initialized, setInitialized] = useState(false);
  const refreshing = useRef(false);
  const intervalRef = useRef(null);

  const verifySession = async (isInitial = false) => {
    if (!token || !user || !authenticated) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }

    if (refreshing.current) return;
    refreshing.current = true;

    try {
      // await dispatch(refreshToken(null)).unwrap();
      if (isInitial) {
        setInitialized(true);
      }
    } catch (error) {
      console.warn("PrivateRoute: token refresh failed");
      navigate("/login", { replace: true, state: { from: location } });
    } finally {
      refreshing.current = false;
    }
  };

  // useEffect(() => {
  //   verifySession(true);

  //   // intervalRef.current = setInterval(() => {
  //     verifySession(false);
  //   }, REFRESH_INTERVAL);

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, [authenticated, token, user, dispatch, navigate, location]);

  // if (!initialized) {
  //   return <LoadingScreen open={true} />;
  // }

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
