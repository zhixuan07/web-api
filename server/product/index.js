const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connectDB = require("../dbconn");
const Product = require("../schema/product");

require("dotenv").config();

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post("/api/product", async (req, res) => {
  const { sku, name, price, description, image_path, category, stock, brand, ingredients } = req.body;
  try {
    await connectDB();
    const existingSKU = await Product.findOne({ sku });
    if (existingSKU) {
      return res.status(400).json({ message: "SKU already exists" });
    } else {
      const product = new Product({
        sku,
        name,
        price,
        image_path,
        description,
        category,
        brand,
        stock,
        ingredients,
      });
      await product.save();
      res.status(200).json({ message: "Product added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
});

app.get("/api/products", async (req,res)=>{
    try {
        await connectDB();
        const products = await Product.find();
        if(products.length === 0){
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });