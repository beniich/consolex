import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import AppLayout from '../components/layout/AppLayout';
import DashboardSkeleton from '../components/ui/DashboardSkeleton';
import FeatureGate from '../components/ui/FeatureGate';
import AuthGate from '../components/ui/AuthGate';

const LandingPage      = lazy(() => import('../pages/LandingPage'));
const RegisterPage     = lazy(() => import('../pages/RegisterPage'));
const LoginPage        = lazy(() => import('../pages/LoginPage'));
const VerifyEmailPage  = lazy(() => import('../pages/VerifyEmailPage'));
const PortailsPage     = lazy(() => import('../pages/PortailsPage'));
const ModulesPage      = lazy(() => import('../pages/ModulesPage'));
const DashboardPage    = lazy(() => import('../pages/DashboardPage'));
const InfraPage        = lazy(() => import('../pages/InfraPage'));
const LogsPage         = lazy(() => import('../pages/LogsPage'));
const SettingsPage     = lazy(() => import('../pages/SettingsPage'));
const AgroBrainPage    = lazy(() => import('../pages/AgroBrainPage'));
const VisionPage       = lazy(() => import('../pages/VisionPage'));
const FinancePage      = lazy(() => import('../pages/FinancePage'));
const TraceabilityPage = lazy(() => import('../pages/TraceabilityPage'));
const UpgradePage      = lazy(() => import('../pages/UpgradePage'));
const BillingPage      = lazy(() => import('../pages/BillingPage'));
const TeamPage         = lazy(() => import('../pages/TeamPage'));
const ReportsPage      = lazy(() => import('../pages/ReportsPage'));
const PricingPage      = lazy(() => import('../pages/PricingPage'));
const AboutPage        = lazy(() => import('../pages/AboutPage'));

const pageVariants = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };
const pageTransition = { duration: 0.2, ease: 'easeInOut' as const };

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} style={{ willChange: 'opacity, transform' }}>
      {children}
    </motion.div>
  );
}

const Loader = () => (
  <div className="min-h-screen bg-[#051424] flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-[#c25a3d]/20 border-t-[#c25a3d] animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#c25a3d] font-mono font-bold text-xs">AM</span>
      </div>
    </div>
    <p className="text-[#c25a3d] font-mono text-xs animate-pulse tracking-widest uppercase">Loading module...</p>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Suspense fallback={<Loader />}><LandingPage /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<Loader />}><RegisterPage /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<Loader />}><LoginPage /></Suspense>} />
        <Route path="/verify-email" element={<Suspense fallback={<Loader />}><VerifyEmailPage /></Suspense>} />
        <Route path="/pricing" element={<Suspense fallback={<Loader />}><PricingPage /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<Loader />}><AboutPage /></Suspense>} />

        {/* Protected app routes */}
        <Route element={<AuthGate><AppLayout /></AuthGate>}>
          <Route path="/dashboard" element={<Suspense fallback={<DashboardSkeleton />}><AnimatedPage><DashboardPage /></AnimatedPage></Suspense>} />
          <Route path="/portails" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="portails"><PortailsPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/modules" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="modules"><ModulesPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/infra" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="infra"><InfraPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/logs" element={<Suspense fallback={<Loader />}><AnimatedPage><LogsPage /></AnimatedPage></Suspense>} />
          <Route path="/settings" element={<Suspense fallback={<Loader />}><AnimatedPage><SettingsPage /></AnimatedPage></Suspense>} />
          <Route path="/agro-brain" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="agro-brain"><AgroBrainPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/vision" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="vision"><VisionPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/finance" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="finance"><FinancePage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/traceability" element={<Suspense fallback={<Loader />}><AnimatedPage><FeatureGate feature="traceability"><TraceabilityPage /></FeatureGate></AnimatedPage></Suspense>} />
          <Route path="/upgrade" element={<Suspense fallback={<Loader />}><AnimatedPage><UpgradePage /></AnimatedPage></Suspense>} />
          <Route path="/billing" element={<Suspense fallback={<Loader />}><AnimatedPage><BillingPage /></AnimatedPage></Suspense>} />
          <Route path="/subscription" element={<Suspense fallback={<Loader />}><AnimatedPage><UpgradePage /></AnimatedPage></Suspense>} />
          <Route path="/team" element={<Suspense fallback={<Loader />}><AnimatedPage><TeamPage /></AnimatedPage></Suspense>} />
          <Route path="/reports" element={<Suspense fallback={<Loader />}><AnimatedPage><ReportsPage /></AnimatedPage></Suspense>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
