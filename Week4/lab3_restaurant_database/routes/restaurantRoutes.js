const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/**
4) GET all restaurants (select all columns)
6) Also supports sorting by restaurant_id using query param sortBy=ASC|DESC
*/
router.get("/", async (req, res) => {
  try {
    const sortBy = (req.query.sortBy || "").toUpperCase();

    let sortOption = {};
    if (sortBy === "ASC") sortOption = { restaurant_id: 1 };
    if (sortBy === "DESC") sortOption = { restaurant_id: -1 };

    if (sortBy === "ASC" || sortBy === "DESC") {
      const data = await Restaurant.find(
  {},
  { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
).sort(sortOption);

const mapped = data.map((r) => ({
  id: r._id,
  cuisines: r.cuisine,
  name: r.name,
  city: r.city,
  restaurant_id: r.restaurant_id
}));

return res.json(mapped);


      return res.json(mapped);
    }

    // Otherwise return all columns
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
5) GET restaurants by cuisine (select all columns)
*/
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
7) GET restaurants where cuisine = Delicatessen AND city != Brooklyn
 - select cuisines, name, city (excluding id)
 - sort ASC by name
*/
router.get("/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const restaurants = await Restaurant.find(
  {
    cuisine: cuisine,
    city: { $ne: "Brooklyn" }
  },
  {
    _id: 0,
    cuisine: 1,
    name: 1,
    city: 1
  }
).sort({ name: 1 });

    const mapped = restaurants.map((r) => ({
  cuisines: r.cuisine,
  name: r.name,
  city: r.city
}));

    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
