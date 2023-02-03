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

// src/Controllers/Motorcycle.controller.ts
var Motorcycle_controller_exports = {};
__export(Motorcycle_controller_exports, {
  default: () => Motorcycle_controller_default
});
module.exports = __toCommonJS(Motorcycle_controller_exports);

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

// src/Domains/Motorcycle.ts
var Motorcycle = class extends Vehicle {
  constructor(motorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
  getCategory() {
    return this.category;
  }
  getEngineCapacity() {
    return this.engineCapacity;
  }
};

// src/Model/MotorcycleODM.ts
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

// src/Model/MotorcycleODM.ts
var MotorcycleODM = class extends AbstractODM_default {
  constructor() {
    const schema = new import_mongoose2.Schema({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true }
    });
    super(schema, "Motorcycle");
  }
};
var MotorcycleODM_default = MotorcycleODM;

// src/Services/Motorcycle.service.ts
var MotorcycleService = class {
  constructor() {
    this.motorcycleOdm = new MotorcycleODM_default();
  }
  motocyrcleDomain(motorcycle) {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }
  async create(motorcycle) {
    const newMotorcycle = await this.motorcycleOdm.create(motorcycle);
    return this.motocyrcleDomain(newMotorcycle);
  }
  async find() {
    const motorcycles = await this.motorcycleOdm.findAll();
    const arrMotorcycles = motorcycles.map((motorcycle) => this.motocyrcleDomain(motorcycle));
    return arrMotorcycles;
  }
  async findById(id) {
    const motorcycle = await this.motorcycleOdm.findById(id);
    return this.motocyrcleDomain(motorcycle);
  }
  async update(id, update) {
    const updated = await this.motorcycleOdm.updated(id, update);
    const result = this.motocyrcleDomain(updated);
    return result;
  }
  async delete(id) {
    return await this.motorcycleOdm.delete(id);
  }
};
var Motorcycle_service_default = MotorcycleService;

// src/Controllers/Motorcycle.controller.ts
var MotorcycleController = class {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new Motorcycle_service_default();
  }
  async create() {
    try {
      const motorcycle = this.req.body;
      const newmotorcycle = await this.service.create(motorcycle);
      return this.res.status(201 /* CREATE */).json(newmotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
  async find() {
    try {
      const motorcycles = await this.service.find();
      return this.res.status(200 /* OK */).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }
  async findById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.findById(id);
      if (!motorcycle) {
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Motorcycle not found" });
      }
      return this.res.status(200 /* OK */).json(motorcycle);
    } catch (error) {
      const err = error.message;
      if (err.includes("ObjectId failed for value")) {
        return this.res.status(422 /* UNPROCESSABLE_ENTITY */).json({ message: "Invalid mongo id" });
      }
    }
  }
  async updatedMotorcycle() {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;
      const updated = await this.service.update(id, motorcycle);
      if (!updated) {
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Motorcycle not found" });
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
        return this.res.status(404 /* NOT_FOUND */).json({ message: "Motorcycle not found" });
      }
      return this.res.status(204 /* NO_CONTENT */).end();
    } catch (error) {
      const err = error.message;
      if (err.includes("ObjectId failed for value")) {
        return this.res.status(422 /* UNPROCESSABLE_ENTITY */).json({ message: "Invalid mongo id" });
      }
    }
  }
};
var Motorcycle_controller_default = MotorcycleController;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
