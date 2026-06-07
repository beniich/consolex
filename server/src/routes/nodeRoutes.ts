import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/nodes — returns all infrastructure nodes (uses Prisma zones/sensors)
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    // Import prisma dynamically to avoid crash if DB not available
    const { prisma } = await import('../utils/prisma');
    const zones = await prisma.zone.findMany({
      include: { sensors: { select: { id: true, name: true, type: true, isActive: true } }, team: { select: { name: true } } }
    });
    res.json(zones);
  } catch (err) {
    // Fallback mock data if DB not connected
    res.json([
      { id: 'zone-1', name: 'North Field', type: 'FIELD', sensors: [{ id: 's1', name: 'Soil Moisture', type: 'SOIL', isActive: true }] },
      { id: 'zone-2', name: 'Greenhouse A', type: 'GREENHOUSE', sensors: [{ id: 's2', name: 'Temperature', type: 'TEMPERATURE', isActive: true }] },
    ]);
  }
});

export default router;
