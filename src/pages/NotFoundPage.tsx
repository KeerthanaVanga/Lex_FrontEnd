import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center animate-fade-in-up">
          <div className="text-5xl font-black text-sky-600 mb-3">404</div>
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="mt-2 text-sm text-slate-600 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>

          <Button
            onClick={() => navigate('/')}
            fullWidth
            size="lg"
            leftIcon={<Home className="w-5 h-5" />}
          >
            Return to Homepage
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
