import { Router } from 'express';
import carRoute from './car.route';
import motorcycleRoute from './motorcycle.route';

const router = Router();
router.use('/', carRoute);
router.use('/', motorcycleRoute);

export default router;
