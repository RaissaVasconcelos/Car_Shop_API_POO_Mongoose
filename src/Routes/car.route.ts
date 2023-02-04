import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import CarModel from '../Model/CarModel';
import CarService from '../Services/Car.service';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.find(req, res));
route.get('/cars/:id', (req, res) => carController.findById(req, res));
route.put('/cars/:id', (req, res) => carController.updatedCar(req, res));
route.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default route;