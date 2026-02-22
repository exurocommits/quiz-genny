import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SetupPage } from './components/setup/SetupPage';
import { SectionsPage } from './components/sections/SectionsPage';
import { QuestionsPage } from './components/questions/QuestionsPage';
import { PreviewPage } from './components/preview/PreviewPage';
import { LandingPage } from './components/landing/LandingPage';
import { PricingPage } from './components/pricing/PricingPage';
import { TermsOfService } from './components/legal/TermsOfService';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/sections" element={<SectionsPage />} />
          <Route path="/questions/:roundIndex" element={<QuestionsPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
