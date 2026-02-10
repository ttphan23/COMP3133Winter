const express = require("express");
const User = require("../models/User");

const router = express.Router();

// http://localhost:8081/users
router.post("/", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user: created,
    });
  } catch (err) {
    // Duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Validation error",
        details: { email: "email must be unique (already exists)" },
      });
    }

    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const details = {};
      for (const key of Object.keys(err.errors)) {
        details[key] = err.errors[key].message;
      }
      return res.status(400).json({ error: "Validation error", details });
    }

    return res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
