const users = [
  {
    _id: "670000000000000000000001",
    first_name: "Amine",
    last_name: "Bennani",
    email: "amine.bennani@example.test",
    password: "$2b$10$IAHtTDNrr/yBHn3ml/YcleqL3bJniAEKhqknS/VP.X1fReDd7EZ7m",
    role: "chauffeur",
    isActive: true
  },
  {
    _id: "670000000000000000000002",
    first_name: "Sara",
    last_name: "El Idrissi",
    email: "sara.elidrissi@example.test",
    password: "$2b$10$IAHtTDNrr/yBHn3ml/YcleqL3bJniAEKhqknS/VP.X1fReDd7EZ7m",
    role: "chauffeur",
    isActive: true
  },
  {
    _id: "670000000000000000000003",
    first_name: "Admin",
    last_name: "Demo",
    email: "admin@example.test",
    password: "$2b$10$IAHtTDNrr/yBHn3ml/YcleqL3bJniAEKhqknS/VP.X1fReDd7EZ7m",
    role: "admin",
    isActive: false
  },
  {
    _id: "670000000000000000000004",
    first_name: "Youssef",
    last_name: "Alaoui",
    email: "youssef.alaoui@example.test",
    password: "$2b$10$IAHtTDNrr/yBHn3ml/YcleqL3bJniAEKhqknS/VP.X1fReDd7EZ7m",
    role: "chauffeur",
    isActive: true
  },
  {
    _id: "670000000000000000000005",
    first_name: "Khadija",
    last_name: "Mansouri",
    email: "khadija.mansouri@example.test",
    password: "$2b$10$IAHtTDNrr/yBHn3ml/YcleqL3bJniAEKhqknS/VP.X1fReDd7EZ7m",
    role: "chauffeur",
    isActive: true
  }
];

const camions = [
  {
    _id: "670000000000000000000010",
    number: "DEMO-TRUCK-001",
    brand: "Volvo",
    model: "FH 460",
    consommation: 30,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2022-04-12T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000011",
    number: "DEMO-TRUCK-002",
    brand: "Mercedes-Benz",
    model: "Actros 1845",
    consommation: 32,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2023-06-20T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000012",
    number: "DEMO-TRUCK-003",
    brand: "Renault Trucks",
    model: "T High",
    consommation: 31,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2021-09-08T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000013",
    number: "DEMO-TRUCK-004",
    brand: "MAN",
    model: "TGX 18.510",
    consommation: 29,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2024-02-18T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000014",
    number: "DEMO-TRUCK-005",
    brand: "DAF",
    model: "XF 480",
    consommation: 30,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2022-11-04T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000015",
    number: "DEMO-TRUCK-006",
    brand: "Iveco",
    model: "S-Way",
    consommation: 33,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2023-03-27T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000016",
    number: "DEMO-TRUCK-007",
    brand: "Volvo",
    model: "FH 500",
    consommation: 31,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2021-12-09T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000017",
    number: "DEMO-TRUCK-008",
    brand: "Mercedes-Benz",
    model: "Actros 1851",
    consommation: 32,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2024-05-11T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000018",
    number: "DEMO-TRUCK-009",
    brand: "Scania",
    model: "R 450",
    consommation: 30,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2022-08-22T00:00:00.000Z"),
    isArchived: false
  },
  {
    _id: "670000000000000000000019",
    number: "DEMO-TRUCK-010",
    brand: "DAF",
    model: "XG 480",
    consommation: 29,
    vehicleStatus: "in_use",
    acquisitionDate: new Date("2025-01-16T00:00:00.000Z"),
    isArchived: false
  }
];

const remorques = [
  {
    _id: "670000000000000000000020",
    registrationNumber: "DEMO-TRAILER-001",
    brand: "Schmitz",
    model: "S.KO",
    status: "in_use",
    acquisitionDate: new Date("2022-05-03T00:00:00.000Z"),
    camion: camions[0]._id
  },
  {
    _id: "670000000000000000000021",
    registrationNumber: "DEMO-TRAILER-002",
    brand: "Krone",
    model: "Cool Liner",
    status: "in_use",
    acquisitionDate: new Date("2023-07-15T00:00:00.000Z"),
    camion: camions[1]._id
  },
  {
    _id: "670000000000000000000022",
    registrationNumber: "DEMO-TRAILER-003",
    brand: "Kogel",
    model: "Cargo",
    status: "in_use",
    acquisitionDate: new Date("2021-06-14T00:00:00.000Z"),
    camion: camions[2]._id
  },
  {
    _id: "670000000000000000000023",
    registrationNumber: "DEMO-TRAILER-004",
    brand: "Schmitz",
    model: "S.CS",
    status: "in_use",
    acquisitionDate: new Date("2024-01-25T00:00:00.000Z"),
    camion: camions[3]._id
  },
  {
    _id: "670000000000000000000024",
    registrationNumber: "DEMO-TRAILER-005",
    brand: "Krone",
    model: "Profi Liner",
    status: "in_use",
    acquisitionDate: new Date("2022-10-30T00:00:00.000Z"),
    camion: camions[4]._id
  },
  {
    _id: "670000000000000000000025",
    registrationNumber: "DEMO-TRAILER-006",
    brand: "Lamberet",
    model: "SR2",
    status: "in_use",
    acquisitionDate: new Date("2023-02-07T00:00:00.000Z"),
    camion: camions[5]._id
  },
  {
    _id: "670000000000000000000026",
    registrationNumber: "DEMO-TRAILER-007",
    brand: "Chereau",
    model: "Reefer",
    status: "in_use",
    acquisitionDate: new Date("2021-11-19T00:00:00.000Z"),
    camion: camions[6]._id
  },
  {
    _id: "670000000000000000000027",
    registrationNumber: "DEMO-TRAILER-008",
    brand: "Kassbohrer",
    model: "SCS",
    status: "in_use",
    acquisitionDate: new Date("2024-04-02T00:00:00.000Z"),
    camion: camions[7]._id
  },
  {
    _id: "670000000000000000000028",
    registrationNumber: "DEMO-TRAILER-009",
    brand: "Benalu",
    model: "Bulk Liner",
    status: "in_use",
    acquisitionDate: new Date("2022-07-12T00:00:00.000Z"),
    camion: camions[8]._id
  },
  {
    _id: "670000000000000000000029",
    registrationNumber: "DEMO-TRAILER-010",
    brand: "Fruehauf",
    model: "Dry Van",
    status: "in_use",
    acquisitionDate: new Date("2025-02-05T00:00:00.000Z"),
    camion: camions[9]._id
  },
  {
    _id: "670000000000000000000033",
    registrationNumber: "DEMO-TRAILER-011",
    brand: "Schmitz",
    model: "S.KO",
    status: "in_use",
    acquisitionDate: new Date("2023-10-09T00:00:00.000Z"),
    camion: camions[0]._id
  },
  {
    _id: "670000000000000000000034",
    registrationNumber: "DEMO-TRAILER-012",
    brand: "Krone",
    model: "Cool Liner",
    status: "in_use",
    acquisitionDate: new Date("2024-08-17T00:00:00.000Z"),
    camion: camions[1]._id
  },
  {
    _id: "670000000000000000000035",
    registrationNumber: "DEMO-TRAILER-013",
    brand: "Kogel",
    model: "Cargo",
    status: "in_use",
    acquisitionDate: new Date("2022-03-21T00:00:00.000Z"),
    camion: camions[2]._id
  },
  {
    _id: "670000000000000000000036",
    registrationNumber: "DEMO-TRAILER-014",
    brand: "Lamberet",
    model: "SR2",
    status: "in_use",
    acquisitionDate: new Date("2025-03-13T00:00:00.000Z"),
    camion: camions[3]._id
  },
  {
    _id: "670000000000000000000037",
    registrationNumber: "DEMO-TRAILER-015",
    brand: "Chereau",
    model: "Reefer",
    status: "in_use",
    acquisitionDate: new Date("2024-12-01T00:00:00.000Z"),
    camion: camions[4]._id
  }
];

const tires = [
  {
    _id: "670000000000000000000030",
    serialNumber: "DEMO-TIRE-001",
    brand: "Michelin",
    size: "315/70 R22.5",
    status: "mounted",
    DateOfDeath: new Date("2028-04-12T00:00:00.000Z"),
    purchaseDate: new Date("2025-04-12T00:00:00.000Z"),
    price: 4200,
    camion: camions[0]._id
  },
  {
    _id: "670000000000000000000031",
    serialNumber: "DEMO-TIRE-002",
    brand: "Continental",
    size: "315/70 R22.5",
    status: "mounted",
    DateOfDeath: new Date("2028-06-20T00:00:00.000Z"),
    purchaseDate: new Date("2025-06-20T00:00:00.000Z"),
    price: 3900,
    camion: camions[1]._id
  },
  {
    _id: "670000000000000000000032",
    serialNumber: "DEMO-TIRE-003",
    brand: "Bridgestone",
    size: "315/70 R22.5",
    status: "in_stock",
    DateOfDeath: new Date("2029-01-10T00:00:00.000Z"),
    purchaseDate: new Date("2026-01-10T00:00:00.000Z"),
    price: 4100,
    camion: null
  }
];

const maintenances = [
  {
    _id: "670000000000000000000040",
    camion: camions[0]._id,
    type: "vidange",
    description: "Demo scheduled oil and filter change",
    maintenanceDate: new Date("2026-08-15T00:00:00.000Z"),
    mileage: 128000,
    cost: 2400,
    status: "completed",
    nextMaintenanceDate: new Date("2027-02-15T00:00:00.000Z"),
    nextMaintenanceMileage: 148000
  },
  {
    _id: "670000000000000000000041",
    remorque: remorques[1]._id,
    type: "freins",
    description: "Demo trailer brake inspection",
    maintenanceDate: new Date("2026-09-10T00:00:00.000Z"),
    mileage: 76000,
    cost: 1800,
    status: "completed",
    nextMaintenanceDate: new Date("2027-03-10T00:00:00.000Z"),
    nextMaintenanceMileage: 96000
  }
];

const routes = [
  ["Casablanca", "Rabat", "Packaged food", 90, 27],
  ["Marrakech", "Agadir", "Building materials", 250, 80],
  ["Tangier", "Fes", "Automotive parts", 300, 96],
  ["Rabat", "Meknes", "Household goods", 150, 45],
  ["Agadir", "Marrakech", "Fresh produce", 250, 78],
  ["Oujda", "Fes", "Textiles", 330, 105],
  ["Casablanca", "El Jadida", "Refrigerated goods", 100, 32],
  ["Kenitra", "Tangier", "Industrial equipment", 250, 79],
  ["Fes", "Rabat", "Medical supplies", 200, 63],
  ["Marrakech", "Casablanca", "Furniture", 240, 75]
];

const trajets = Array.from({ length: 20 }, (_, index) => {
  const route = routes[index % routes.length];
  const remorque = remorques[index % 15];
  const camion = camions[index % 10];
  const departure = new Date(Date.UTC(2026, 9, 15 + index, 8, 0));

  return {
    _id: `6700000000000000000000${(50 + index).toString().padStart(2, "0")}`,
    departureSite: route[0],
    arrivalSite: route[1],
    merchandise: route[2],
    plannedDeparture: departure,
    plannedArrival: new Date(departure.getTime() + 4 * 60 * 60 * 1000),
    chauffeur: users[index % 4]._id,
    camion: remorque.camion || camion._id,
    remorque: remorque._id,
    status: "a_faire",
    distance: route[3],
    gasoilVolume: route[4],
    consommationMoyenne: Number((route[4] / route[3] * 100).toFixed(1)),
    remarque: `Demo seed trajet ${index + 1}`
  };
});

// Demo account password for all users: RoadFleetDemo2026!
module.exports = { users, camions, remorques, tires, maintenances, trajets };
