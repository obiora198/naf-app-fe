import mongoose from "mongoose";
import Lodge from "../models/Lodge";
import * as dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

// NOTE: Pursuant to user requirements, properties without verifiable real
// images have been removed from the seed data.
const nafLodges = [
  {
    name: "NAF Conference Centre & Suites",
    base: "Headquarters, Abuja",
    state: "FCT",
    address: "Plot 496, Ahmadu Bello Way, Kado, Abuja",
    description:
      "The flagship hospitality facility of the Nigerian Air Force, located in the prestigious Kado district of Abuja. This premier property offers world-class conference facilities, elegantly furnished suites with panoramic city views, a resort-style swimming pool, fine dining restaurants, and state-of-the-art fitness centre. Ideal for official conferences, diplomatic functions, and distinguished guests seeking the finest accommodation in the nation's capital.",
    pricePerNight: 55000,
    phone: "+234 809 000 1111",
    rating: 4.9,
    totalRooms: 120,
    amenities: [
      "Swimming Pool",
      "Conference Halls",
      "Fine Dining",
      "Fitness Centre",
      "Free Wi-Fi",
      "24/7 Room Service",
      "Secure Parking",
      "Business Centre",
      "Spa & Wellness",
      "Airport Shuttle",
    ],
    roomTypes: ["Standard Room", "Deluxe Suite", "Executive Suite", "Presidential Suite"],
    // Real images pulled from nafconsuites.com
    images: [
      "https://nafconsuites.com/wp-content/uploads/2025/01/executive-room-view.jpg",
      "https://nafconsuites.com/wp-content/uploads/2025/01/naf-conference-centre.jpg",
      "https://nafconsuites.com/wp-content/uploads/2025/01/naf-conference-centre-1.jpg",
      "https://nafconsuites.com/wp-content/uploads/2025/01/naf-conference-centre-2.jpg",
    ],
    isAvailable: true,
  }
];

async function seed() {
  try {
    console.log("=> Connecting to database...");
    await mongoose.connect(MONGODB_URI!);
    console.log("=> Connected!");

    console.log("=> Clearing existing lodges...");
    await Lodge.deleteMany({});
    console.log("=> Lodges cleared.");

    console.log("=> Seeding NAF lodge properties...");
    await Lodge.insertMany(nafLodges);
    console.log(`=> Successfully seeded ${nafLodges.length} NAF lodge properties!`);

    console.log("\nSeeded lodges:");
    nafLodges.forEach((lodge, i) => {
      console.log(`  ${i + 1}. ${lodge.name} — ${lodge.state} (₦${lodge.pricePerNight.toLocaleString()}/night)`);
    });

    process.exit(0);
  } catch (error) {
    console.error("=> SEED ERROR:", error);
    process.exit(1);
  }
}

seed();
