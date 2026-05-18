import bcrypt from "bcryptjs";
import { connectDb } from "../config/db.js";
import { User } from "../models/user.model.js";
import { Lead } from "../models/lead.model.js";

const seed = async (): Promise<void> => {
  await connectDb();

  const password = await bcrypt.hash("Password123!", 12);

  const users = [
    { name: "Admin User", email: "admin@gigflow.com", password, role: "Admin" as const },
    { name: "Sales User", email: "sales@gigflow.com", password, role: "Sales User" as const }
  ];

  for (const user of users) {
    await User.updateOne({ email: user.email }, { $setOnInsert: user }, { upsert: true });
  }

  const admin = await User.findOne({ email: "admin@gigflow.com" });
  const sales = await User.findOne({ email: "sales@gigflow.com" });

  if (admin && sales) {
    const demoLeads = [
      {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        status: "Qualified",
        source: "Instagram",
        assignedTo: admin._id,
        createdBy: admin._id
      },
      {
        name: "Ayesha Khan",
        email: "ayesha@example.com",
        status: "Contacted",
        source: "Website",
        assignedTo: sales._id,
        createdBy: admin._id
      },
      {
        name: "Karan Patel",
        email: "karan@example.com",
        status: "New",
        source: "Referral",
        assignedTo: sales._id,
        createdBy: admin._id
      }
    ];

    for (const lead of demoLeads) {
      await Lead.updateOne({ email: lead.email }, { $setOnInsert: lead }, { upsert: true });
    }
  }

  console.log("Seed complete");
  process.exit(0);
};

void seed();
