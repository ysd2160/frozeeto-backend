// Sample products daalne ke liye: node seedProducts.js
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import StockLog from "./models/StockLog.js";
import User from "./models/User.js";
import mongoose from "mongoose";

dotenv.config();

// Frozetto: GST 5%, stock tracked
const products = [
  { name: "Paneer Momos", category: "Momos", unit: "packet", costPrice: 70, sellingPrice: 100 },
  { name: "Veg Momos", category: "Momos", unit: "packet", costPrice: 65, sellingPrice: 100 },
  { name: "Cheese Momos", category: "Momos", unit: "packet", costPrice: 70, sellingPrice: 100 },
  { name: "Veg Cheese Momos", category: "Momos", unit: "packet", costPrice: 72, sellingPrice: 100 },
  { name: "Spring Roll", category: "Snacks", unit: "packet", costPrice: 68, sellingPrice: 100 },
].map((p) => ({ ...p, gstPercent: 5, trackStock: true, quantity: 20, lowStockThreshold: 5 }));

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
      console.log(`⏭️  Skipped (already exists): ${p.name}`);
      continue;
    }
    const product = await Product.create({ ...p, createdBy: admin._id });
    if (product.trackStock && product.quantity > 0) {
      await StockLog.create({
        product: product._id,
        type: "IN",
        quantity: product.quantity,
        reason: "Initial stock - seeded",
        performedBy: admin._id,
      });
    }
    console.log(`✅ Added: ${product.name} — ₹${product.sellingPrice}/${product.unit}`);
  }

  console.log("\nDone! Prices, GST%, stock sab Products page se badal sakte ho.");
  mongoose.connection.close();
  process.exit(0);
};

run();
