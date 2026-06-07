import { Router } from 'express';

const router = Router();

// Lazy imports to handle missing dependencies gracefully
const loadRoute = (factory: () => Promise<{ default: Router }>) => {
  return async (req: any, res: any, next: any) => {
    try {
      const mod = await factory();
      mod.default(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

// Public routes (no auth required)
import pricingRoutes from './pricingRoutes';
import aboutRoutes from './aboutRoutes';
import cropRoutes from './cropRoutes';
import pestRoutes from './pestRoutes';
router.use('/pricing', pricingRoutes);
router.use('/about', aboutRoutes);
router.use('/crops', cropRoutes);
router.use('/pests', pestRoutes);

// Protected routes (auth required)
try {
  const authRoutes = require('./authRoutes').default;
  router.use('/auth', authRoutes);
} catch {}

try {
  const sensorRoutes = require('./sensorRoutes').default;
  router.use('/sensors', sensorRoutes);
} catch {}

try {
  const reportRoutes = require('./reportRoutes').default;
  router.use('/reports', reportRoutes);
} catch {}

try {
  const nodeRoutes = require('./nodeRoutes').default;
  router.use('/nodes', nodeRoutes);
} catch {}

try {
  const logRoutes = require('./logRoutes').default;
  router.use('/logs', logRoutes);
} catch {}

export default router;
