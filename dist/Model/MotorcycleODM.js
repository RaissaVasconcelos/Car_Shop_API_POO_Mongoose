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

// src/Model/MotorcycleODM.ts
var MotorcycleODM_exports = {};
__export(MotorcycleODM_exports, {
  default: () => MotorcycleODM_default
});
module.exports = __toCommonJS(MotorcycleODM_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
