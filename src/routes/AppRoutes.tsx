import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Settings from "../pages/Settings/Settings";
import NotFoundPage from '../pages/Not-Found/NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotAuthorized from '../pages/NotAuthorizedPage/NotAuthorize';

const basename = import.meta.env.PROD ? '/console' : '';

const AppRoutes = () => (
  <Router basename={basename}>
    <Routes>

      <Route path="/" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />

      <Route path="/home" element={
        <Home />
        // <PrivateRoute>
        // </PrivateRoute>
      } />

      <Route path="/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />

      <Route path="/not-authorized" element={<NotAuthorized />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;