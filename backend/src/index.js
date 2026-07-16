const express = require("express");
const cors = require("cors");
require("dotenv").config();

const animalRoutes = require("./routes/animals");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Animal Finder API" });
});

app.use("/api/animals", animalRoutes);

app.get("/api/categories", async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, name FROM categories ORDER BY name ASC`
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
