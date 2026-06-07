import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const pests = await prisma.pestKnowledge.findMany();
    res.json(pests);
  } catch (err) {
    next(err);
  }
});

export default router;
