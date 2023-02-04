import { Router } from 'express';
import MotorcycleController from '../Controllers/Motorcycle.controller';
import MotorcycleModel from '../Model/MotorcycleModel';
import MotorcyleService from '../Services/Motorcycle.service';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcyleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/motorcycles',(req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.find(req, res));
route.get('/motorcycles/:id', (req, res) => motorcycleController.findById(req, res));
route.put('/motorcycles/:id', (req, res) => motorcycleController.updatedMotorcycle(req, res));

export default route;