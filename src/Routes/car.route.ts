import { Router } from 'express';
import CarController from '../Controllers/Car.controller';

const route = Router();

route.post('/cars', (req, res, nest) => new CarController(req, res, nest).create());
route.get('/cars', (req, res, nest) => new CarController(req, res, nest).find());
route.get('/cars/:id', (req, res, nest) => new CarController(req, res, nest).findById());
route.put('/cars/:id', (req, res, nest) => new CarController(req, res, nest).updatedCar());
route.delete('/cars/:id', (req, res, nest) => new CarController(req, res, nest).delete());

export default route;