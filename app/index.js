const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const DATA_FILE = path.join(__dirname, "data.json");

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

//  GET
`localhost:3000/api/`;
router.get("/", (req, res) => {
  const data = readData();
  res.status(200).json(data);
});

// Get by id
`localhost:3000/api/:id`;
router.delete("/:id", (req, res) => {
  const data = readData();
  const item = data.find((d) => d.id === parseInt(req.params.id));
  item
    ? res.status(200).json(item)
    : res.status(404).json({ message: "Item not found" });
});

// POST
router.post("/", (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// PUT
router.put("/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((d) => d.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.status(200).json(data[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE item by id
router.delete("/:id", (req, res) => {
  let data = readData();
  const newData = data.filter((d) => d.id !== parseInt(req.params.id));
  if (newData.length !== data.length) {
    writeData(newData);
    res.status(200).json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});
module.exports = router;
