"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    var re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/app.ts
var import_express4 = __toESM(require("express"));

// src/Routes/index.ts
var import_express3 = require("express");

// src/Routes/car.route.ts
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
};
var Car_controller_default = CarController;

// src/Routes/car.route.ts
var route = (0, import_express.Router)();
route.post("/cars", (req, res, nest) => new Car_controller_default(req, res, nest).create());
route.get("/cars", (req, res, nest) => new Car_controller_default(req, res, nest).find());
route.get("/cars/:id", (req, res, nest) => new Car_controller_default(req, res, nest).findById());
route.put("/cars/:id", (req, res, nest) => new Car_controller_default(req, res, nest).updatedCar());
var car_route_default = route;

// src/Routes/motorcycle.route.ts
var import_express2 = require("express");

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
var import_mongoose3 = require("mongoose");
var MotorcycleODM = class extends AbstractODM_default {
  constructor() {
    const schema = new import_mongoose3.Schema({
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
      const car = this.req.body;
      const updated = await this.service.update(id, car);
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
};
var Motorcycle_controller_default = MotorcycleController;

// src/Routes/motorcycle.route.ts
var route2 = (0, import_express2.Router)();
route2.post("/motorcycles", (req, res, nest) => new Motorcycle_controller_default(req, res, nest).create());
route2.get("/motorcycles", (req, res, nest) => new Motorcycle_controller_default(req, res, nest).find());
route2.get("/motorcycles/:id", (req, res, nest) => new Motorcycle_controller_default(req, res, nest).findById());
route2.put("/motorcycles/:id", (req, res, nest) => new Motorcycle_controller_default(req, res, nest).updatedMotorcycle());
var motorcycle_route_default = route2;

// src/Routes/index.ts
var router = (0, import_express3.Router)();
router.use("/", car_route_default);
router.use("/", motorcycle_route_default);
var Routes_default = router;

// src/Midleware/error.handle.ts
var ErrorHandler = class extends Error {
  static handle(error, _req, res, next) {
    res.status(500 /* INTERNAL_SERVER_ERROR */).json({ message: error.message });
    next();
  }
};
var error_handle_default = ErrorHandler;

// src/app.ts
var app = (0, import_express4.default)();
app.use(import_express4.default.json());
app.use(Routes_default);
app.use(error_handle_default.handle);
var app_default = app;

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/Model/Connection.ts
var import_mongoose4 = __toESM(require("mongoose"));
var MONGO_DB_URL = "mongodb://localhost:27017/CarShop";
var connectToDatabase = (mongoDatabaseURI = process.env.MONGO_URI || MONGO_DB_URL) => import_mongoose4.default.connect(mongoDatabaseURI);
var Connection_default = connectToDatabase;

// src/server.ts
var PORT = process.env.PORT || 3001;
Connection_default().then(() => {
  app_default.listen(PORT, () => console.log(`Running server in ${PORT}`));
}).catch((error) => {
  console.log("Error in Connection");
  console.error(error);
  process.exit(0);
});
app_default.listen();
