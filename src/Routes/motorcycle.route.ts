import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';

const route = Router();

route.post('/motorcycles', (req, res, nest) => new MotorcycleController(req, res, nest).create());
route.get('/motorcycles', (req, res, nest) => new MotorcycleController(req, res, nest).find());
route.get('/motorcycles/:id', (req, res, nest) =>
  new MotorcycleController(req, res, nest).findById());
route.put('/motorcycles/:id', (req, res, nest) =>
  new MotorcycleController(req, res, nest).updatedMotorcycle());

export default route;