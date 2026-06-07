import { Router } from 'express';
// import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// GET /api/nodes — returns all infrastructure nodes
router.get('/', async (req, res, next) => {
  try {
    const { prisma } = await import('../utils/prisma');
    const nodes = await prisma.infrastructureNode.findMany({
      orderBy: { nodeId: 'asc' }
    });
    res.json(nodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch nodes' });
  }
});

export default router;
