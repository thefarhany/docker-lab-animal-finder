const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /api/animals?search=lion&category=1
router.get("/", async (req, res, next) => {
  try {
    const { search, category } = req.query;

    let sql = `
      SELECT
        a.id,
        a.name,
        a.species,
        a.description,
        a.habitat,
        a.diet,
        a.image_url,
        c.id AS category_id,
        c.name AS category_name
      FROM animals a
      JOIN categories c ON a.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ` AND (a.name LIKE ? OR a.species LIKE ? OR a.description LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (category) {
      sql += ` AND a.category_id = ?`;
      params.push(category);
    }

    sql += ` ORDER BY a.name ASC`;

    const [rows] = await db.execute(sql, params);
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

// GET /api/animals/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      `
      SELECT
        a.id,
        a.name,
        a.species,
        a.description,
        a.habitat,
        a.diet,
        a.image_url,
        c.id AS category_id,
        c.name AS category_name
      FROM animals a
      JOIN categories c ON a.category_id = c.id
      WHERE a.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
