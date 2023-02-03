"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Routes/car.route.ts
var car_route_exports = {};
__export(car_route_exports, {
  default: () => car_route_default
});
module.exports = __toCommonJS(car_route_exports);
var import_express = require("express");

// src/Domains/Vehicle.ts
var Vehicle = class {
  constructor(model2) {
    this.id = model2.id;
    this.model = model2.model;
    this.year = model2.year;
    this.status = model2.status;
    this.color = model2.color;
    this.buyValue = model2.buyValue;
  }
  getModel() {
    return this.model;
  }
  getYear() {
    return this.year;
  }
  getColor() {
    return this.color;
  }
  getStatus() {
    return this.status;
  }
  getBuyValue() {
    return this.buyValue;
  }
};

// src/Domains/Car.ts
var Car = class extends Vehicle {
  constructor(car) {
    super(car);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
  getDoorsQty() {
    return this.doorsQty;
  }
  getSeatsQty() {
    return this.seatsQty;
  }
};

// src/Model/CarODM.ts
var import_mongoose2 = require("mongoose");

// src/Model/AbstractODM.ts
var import_mongoose = require("mongoose");
var AbstractODM = class {
  constructor(schema, modelName) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = import_mongoose.models[this.modelName] || (0, import_mongoose.model)(this.modelName, this.schema);
  }
  async create(obj) {
    return this.model.create({ ...obj });
  }
  async findAll() {
    return this.model.find();
  }
  async findById(id) {
    return this.model.findById(id);
  }
  async updated(id, update) {
    const result = this.model.findByIdAndUpdate(
      { _id: id },
      { ...update },
      { new: true }
    );
    return result;
  }
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
};
var AbstractODM_default = AbstractODM;

// src/Model/CarODM.ts
var CarODM = class extends AbstractODM_default {
  constructor() {
    const schema = new import_mongoose2.Schema({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true }
    });
    super(schema, "Car");
  }
};
var CarODM_default = CarODM;

// src/Services/Car.service.ts
var CarService = class {
  constructor() {
    this.carodm = new CarODM_default();
  }
  carsDomain(car) {
    if (car) {
      return new Car(car);
    }
    return null;
  }
  async create(car) {
    const newcar = await this.carodm.create({ ...car, status: car.status || false });
    return this.carsDomain(newcar);
  }
  async find() {
    const cars = await this.carodm.findAll();
    const result = cars.map((car) => this.carsDomain(car));
    return result;
  }
  async findById(id) {
    const car = await this.carodm.findById(id);
    return this.carsDomain(car);
  }
  async updateCar(id, updateCar) {
    const updated = await this.carodm.updated(id, updateCar);
    const result = this.carsDomain(updated);
    return result;
  }
  async delete(id) {
    return await this.carodm.delete(id);
  }
};
var Car_service_default = CarService;

// src/Controllers/Car.controller.ts
var CarController = class {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new Car_service_default();
  }
  async create() {
    const car = this.req.body;
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201 /* CREATE */).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
  async find() {
    try {
      const cars = await this.service.find();
      return this.res.status(200 /* OK */).json(cars);
    } catch (error) {
      this.next(error);
    }
  }
  async findById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.findById(id);
      if (!car) {
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Car not found" });
      }
      return this.res.status(200 /* OK */).json(car);
    } catch (error) {
      const err = error.message;
      if (err.includes("ObjectId failed for value")) {
        return this.res.status(422 /* UNPROCESSABLE_ENTITY */).json({ message: "Invalid mongo id" });
      }
    }
  }
  async updatedCar() {
    try {
      const { id } = this.req.params;
      const car = this.req.body;
      const updated = await this.service.updateCar(id, car);
      if (!updated) {
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Car not found" });
      }
      return this.res.status(200 /* OK */).json(updated);
    } catch (error) {
      const err = error.message;
      if (err.includes("ObjectId failed for value")) {
        return this.res.status(422 /* UNPROCESSABLE_ENTITY */).json({ message: "Invalid mongo id" });
      }
    }
  }
  async delete() {
    try {
      const { id } = this.req.params;
      const deleted = await this.service.delete(id);
      if (!deleted) {
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Car not found" });
      }
      this.res.status(204 /* NO_CONTENT */).end();
      return this.res.status(204).end();
    } catch (error) {
      const err = error.message;
      if (err.includes("ObjectId failed for value")) {
        return this.res.status(422 /* UNPROCESSABLE_ENTITY */).json({ message: "Invalid mongo id" });
      }
    }
  }
};
var Car_controller_default = CarController;

// src/Routes/car.route.ts
var route = (0, import_express.Router)();
route.post("/cars", (req, res, nest) => new Car_controller_default(req, res, nest).create());
route.get("/cars", (req, res, nest) => new Car_controller_default(req, res, nest).find());
route.get("/cars/:id", (req, res, nest) => new Car_controller_default(req, res, nest).findById());
route.put("/cars/:id", (req, res, nest) => new Car_controller_default(req, res, nest).updatedCar());
route.delete("/cars/:id", (req, res, nest) => new Car_controller_default(req, res, nest).delete());
var car_route_default = route;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
