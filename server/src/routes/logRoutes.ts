import { Router } from 'express';
// import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/logs — returns recent system logs
router.get('/', async (req, res, next) => {
  try {
    const { prisma } = await import('../utils/prisma');
    const logs = await prisma.systemLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });
    res.json(logs.reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch system logs' });
  }
});

// POST /api/logs — create a new system log
router.post('/', async (req, res, next) => {
  try {
    const { prisma } = await import('../utils/prisma');
    const { level, message } = req.body;
    const log = await prisma.systemLog.create({
      data: { level, message },
    });
    res.json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create log' });
  }
});

export default router;
