/* istanbul ignore file */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useProtectedRoute = () => {
  const { currentUser, loading, isSurveyCompleted } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Avoid navigation if data is still loading
    if (loading) return;

    // Conditions to avoid unnecessary navigation
    const onLoginPage = location.pathname === '/login';
    const onSurveyPage = location.pathname === '/register-survey';
    const onDashboardPage = location.pathname === '/transtable';

    if (!currentUser && !onLoginPage) {
      navigate('/login', { replace: true, state: { from: location } });
    } else if (currentUser && !isSurveyCompleted && !onSurveyPage) {
      navigate('/register-survey', { replace: true, state: { from: location } });
    } else if (currentUser && isSurveyCompleted && !onDashboardPage) {
      navigate('/transtable', { replace: true, state: { from: location } });
    }
  }, [currentUser, loading, isSurveyCompleted, navigate, location]);
};


