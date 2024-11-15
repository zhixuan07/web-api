const express = require("express");
const axios = require("axios");
const cors = require("cors");
const connectDB = require("../dbconn");
const Nutrition =require("../schema/nutrition")
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.post("/api/nutrition", async (req, res) => {
  // Get nutrition data from the Nutritionix API
  try {
    const { query } = req.body;
    const response = await axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "86117b1d",
          "x-app-key": "b994135bb4cd6ca10a1db2dd16d46dbd",
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
});
