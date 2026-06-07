import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebaseAuth';
import { Leaf } from 'lucide-react';

interface AuthGateProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

export default function AuthGate({ children, requireVerified = true }: AuthGateProps) {
  const [user, setUser] = useState<User | null | 'loading'>('loading');
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  if (user === 'loading') {
    return (
      <div className="min-h-screen bg-[#051424] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#c25a3d] flex items-center justify-center animate-pulse">
            <Leaf size={20} className="text-white" />
          </div>
          <div className="w-8 h-8 border-2 border-[#c25a3d]/30 border-t-[#c25a3d] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerified && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
}
