require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected for seeding...");

  const filePath = path.join(__dirname, "data", "UsersData.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(raw);

  try {
    // ordered:false allow to continue inserting even if some fail
    const result = await User.insertMany(users, { ordered: false });
    console.log(`Inserted ${result.length} users.`);
  } catch (err) {
    console.log("Seeding finished with some errors (duplicates/validation).");
    console.log(err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

seed();
