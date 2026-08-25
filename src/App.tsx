import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FunnelProvider } from './context/FunnelContext';
import { LandingPage } from './pages/LandingPage';
import { FunnelPage } from './pages/FunnelPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { analytics } from './analytics/analytics';
import { captureAndStoreAttribution } from './utils/attribution';

// PageView tracker component
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Capture any attribution parameters if query params change
    captureAndStoreAttribution();
    // Fire PageView event
    analytics.trackPageView(location.pathname);
    // Scroll to top smoothly on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <FunnelProvider>
        <PageTracker />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/qualify" element={<FunnelPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </FunnelProvider>
    </BrowserRouter>
  );
}

export default App;
