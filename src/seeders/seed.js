require("dotenv").config();

const mongoose = require("mongoose");
const data = require("./data");
const User = require("../models/user.model");
const Camion = require("../models/camion.model");   
const Remorque = require("../models/remorque.model");
const Tire = require("../models/tire.model");
const Maintenance = require("../models/maintenance.model");
const Trajet = require("../models/trajet.model");

const seedConfigurations = [
  { model: User, name: "Users", data: data.users },
  { model: Camion, name: "Camions", data: data.camions },
  { model: Remorque, name: "Remorques", data: data.remorques },
  { model: Tire, name: "Tires", data: data.tires },
  { model: Maintenance, name: "Maintenances", data: data.maintenances },
  { model: Trajet, name: "Trajets", data: data.trajets }
];

async function seedDB() {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not set");
  }

  for (const { model, name, data: documents } of seedConfigurations) {
    for (const document of documents) {
      await new model(document).validate();
    }
    console.log(`${name}: validated ${documents.length} records`);
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected for seeding");

  for (const { model, name, data: documents } of seedConfigurations) {
    const operations = documents.map(({ _id, ...fields }) => ({
      updateOne: {
        filter: { _id },
        update: { $set: fields },
        upsert: true
      }
    }));

    if (operations.length > 0) {
      await model.bulkWrite(operations);
    }
    console.log(`${name}: seeded ${documents.length} records`);
  }
}

seedDB()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });