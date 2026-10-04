// // Sample products daalne ke liye: node seedProducts.js
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import Product from "./models/Product.js";
// import StockLog from "./models/StockLog.js";
// import User from "./models/User.js";
// import mongoose from "mongoose";

// dotenv.config();

// // Frozetto: GST 5%, stock tracked
// const products = [
//   { name: "Paneer Momos", category: "Momos", unit: "packet", costPrice: 70, sellingPrice: 100 },
//   { name: "Veg Momos", category: "Momos", unit: "packet", costPrice: 65, sellingPrice: 100 },
//   { name: "Cheese Momos", category: "Momos", unit: "packet", costPrice: 70, sellingPrice: 100 },
//   { name: "Veg Cheese Momos", category: "Momos", unit: "packet", costPrice: 72, sellingPrice: 100 },
//   { name: "Spring Roll", category: "Snacks", unit: "packet", costPrice: 68, sellingPrice: 100 },
// ].map((p) => ({ ...p, gstPercent: 5, trackStock: true, quantity: 20, lowStockThreshold: 5 }));

// const run = async () => {
//   await connectDB();

//   const admin = await User.findOne({ role: "admin" });
//   if (!admin) {
//     console.log("❌ No admin found. Run 'node seedAdmin.js' first.");
//     process.exit(1);
//   }

//   for (const p of products) {
//     const exists = await Product.findOne({ name: p.name });
//     if (exists) {
//       console.log(`⏭️  Skipped (already exists): ${p.name}`);
//       continue;
//     }
//     const product = await Product.create({ ...p, createdBy: admin._id });
//     if (product.trackStock && product.quantity > 0) {
//       await StockLog.create({
//         product: product._id,
//         type: "IN",
//         quantity: product.quantity,
//         reason: "Initial stock - seeded",
//         performedBy: admin._id,
//       });
//     }
//     console.log(`✅ Added: ${product.name} — ₹${product.sellingPrice}/${product.unit}`);
//   }

//   console.log("\nDone! Prices, GST%, stock sab Products page se badal sakte ho.");
//   mongoose.connection.close();
//   process.exit(0);
// };

// run();
// Sample products daalne ke liye: node seedProducts.js

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import StockLog from "./models/StockLog.js";
import User from "./models/User.js";
import mongoose from "mongoose";

dotenv.config();

// Frozetto: GST 5%, 35+ KG wholesale rates
const products = [
  // Kebabs
  {
    name: "Broccoli Corn Kebab",
    category: "Kebabs",
    unit: "packet",
    costPrice: 312,
    sellingPrice: 312,
  },
  {
    name: "Corn Kebab",
    category: "Kebabs",
    unit: "packet",
    costPrice: 312,
    sellingPrice: 312,
  },
  {
    name: "Dahi Kebab",
    category: "Kebabs",
    unit: "packet",
    costPrice: 363,
    sellingPrice: 363,
  },
  {
    name: "Hara Bhara Kebab",
    category: "Kebabs",
    unit: "packet",
    costPrice: 269,
    sellingPrice: 269,
  },

  // Snacks
  {
    name: "Spring Roll",
    category: "Snacks",
    unit: "packet",
    costPrice: 406,
    sellingPrice: 406,
  },
  {
    name: "Falafel",
    category: "Snacks",
    unit: "packet",
    costPrice: 269,
    sellingPrice: 269,
  },
  {
    name: "Vegetable Finger",
    category: "Snacks",
    unit: "packet",
    costPrice: 266,
    sellingPrice: 266,
  },
  {
    name: "Paneer Finger",
    category: "Snacks",
    unit: "packet",
    costPrice: 398,
    sellingPrice: 398,
  },
  {
    name: "Paneer Nuggets",
    category: "Snacks",
    unit: "packet",
    costPrice: 398,
    sellingPrice: 398,
  },
  {
    name: "Pizza Pocket",
    category: "Snacks",
    unit: "packet",
    costPrice: 312,
    sellingPrice: 312,
  },

  // Gravy
  {
    name: "Dal Makhani",
    category: "Gravy",
    unit: "packet",
    costPrice: 312,
    sellingPrice: 312,
  },
  {
    name: "Onion Masala Gravy (Kadhai)",
    category: "Gravy",
    unit: "packet",
    costPrice: 312,
    sellingPrice: 312,
  },
  {
    name: "White Gravy (Shahi)",
    category: "Gravy",
    unit: "packet",
    costPrice: 336,
    sellingPrice: 336,
  },
  {
    name: "Tomato Gravy (Makhani)",
    category: "Gravy",
    unit: "packet",
    costPrice: 244,
    sellingPrice: 244,
  },

  // Burger Patty
  {
    name: "Crunchy Paneer Patty",
    category: "Burger Patty",
    unit: "packet",
    costPrice: 403,
    sellingPrice: 403,
  },
  {
    name: "Spicy Paneer Patty",
    category: "Burger Patty",
    unit: "packet",
    costPrice: 403,
    sellingPrice: 403,
  },
  {
    name: "Veg Burger Patty",
    category: "Burger Patty",
    unit: "packet",
    costPrice: 266,
    sellingPrice: 266,
  },

  // Manchurian
  {
    name: "Manchurian Balls",
    category: "Manchurian",
    unit: "packet",
    costPrice: 237,
    sellingPrice: 237,
  },

  // Momo
  {
    name: "Veg Momo",
    category: "Momos",
    unit: "packet",
    costPrice: 249,
    sellingPrice: 249,
  },
  {
    name: "Veg Cheese Momo",
    category: "Momos",
    unit: "packet",
    costPrice: 309,
    sellingPrice: 309,
  },
  {
    name: "Corn Cheese Momo",
    category: "Momos",
    unit: "packet",
    costPrice: 331,
    sellingPrice: 331,
  },
  {
    name: "Paneer Momo",
    category: "Momos",
    unit: "packet",
    costPrice: 331,
    sellingPrice: 331,
  },

  // Wraps
  {
    name: "Salsa Wrap",
    category: "Wraps",
    unit: "packet",
    costPrice: 340,
    sellingPrice: 340,
  },

  // Sauce
  {
    name: "Red Pasta Sauce",
    category: "Sauce",
    unit: "packet",
    costPrice: 244,
    sellingPrice: 244,
  },
].map((p) => ({
  ...p,
  gstPercent: 5,
  trackStock: true,
  quantity: 20,
  lowStockThreshold: 5,
}));

const run = async () => {
  await connectDB();

  const admin = await User.findOne({ role: "admin" });

  if (!admin) {
    console.log("❌ No admin found. Run 'node seedAdmin.js' first.");
    process.exit(1);
  }

  for (const p of products) {
    const exists = await Product.findOne({ name: p.name });

    if (exists) {
      console.log(`⏭️ Skipped (already exists): ${p.name}`);
      continue;
    }

    const product = await Product.create({
      ...p,
      createdBy: admin._id,
    });

    if (product.trackStock && product.quantity > 0) {
      await StockLog.create({
        product: product._id,
        type: "IN",
        quantity: product.quantity,
        reason: "Initial stock - seeded",
        performedBy: admin._id,
      });
    }

    console.log(
      `✅ Added: ${product.name} — ₹${product.sellingPrice}/${product.unit}`
    );
  }

  console.log(`\nDone! ${products.length} Frozetto products processed.`);

  mongoose.connection.close();
  process.exit(0);
};

run();