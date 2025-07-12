import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Sidebar, Navbar } from './components';
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Profile,
  HowItWorks,
} from './pages';
import FrontPage from './pages/Front';
import Admin from './pages/AdminPortal';
import { auth } from './config/auth-firebase';

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showSidebar = [
    '/home',
    '/home/how-it-works',
    '/home/profile',
    '/home/create-campaign',
    '/home/campaign-details/:id',
  ];

  const shouldShowSidebar = showSidebar.some((path) =>
    location.pathname.startsWith(path.replace(':id', ''))
  );

  if (isLoading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="relative sm:-8 p-4 bg-[#ffffff] min-h-screen flex flex-row">
      {isAuthenticated && shouldShowSidebar && (
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Routes>
          {/* Public */}
          <Route path="/" element={<FrontPage />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={<ProtectedRoute component={Admin} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/admin/campaign-details/:id"
            element={
              <ProtectedRoute
                component={(props) => <CampaignDetails {...props} isAdmin />}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* User Routes */}
          <Route
            path="/home"
            element={<ProtectedRoute component={Home} isAuthenticated={isAuthenticated} withNavbar />}
          />
          <Route
            path="/home/how-it-works"
            element={<ProtectedRoute component={HowItWorks} isAuthenticated={isAuthenticated} withNavbar />}
          />
          <Route
            path="/home/profile"
            element={<ProtectedRoute component={Profile} isAuthenticated={isAuthenticated} withNavbar />}
          />
          <Route
            path="/home/create-campaign"
            element={<ProtectedRoute component={CreateCampaign} isAuthenticated={isAuthenticated} withNavbar />}
          />
          <Route
            path="/home/campaign-details/:id"
            element={<ProtectedRoute component={CampaignDetails} isAuthenticated={isAuthenticated} withNavbar />}
          />
        </Routes>
      </div>
    </div>
  );
};

// Protects routes based on Firebase authentication
const ProtectedRoute = ({ component: Component, isAuthenticated, withNavbar }) => {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <>
      {withNavbar && <Navbar />}
      <Component />
    </>
  );
};

export default App;
