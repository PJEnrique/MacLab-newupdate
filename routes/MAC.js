const express = require('express');
const IMAC = require('../models/IMAC');
const router = express.Router();
// Create a new MAC
router.post('/MAC/post', async (req, res) => {
  try {
    const MAC = new IMAC(req.body);
    await MAC.save();
    res.status(201).json(student);MAC
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all MAC
router.get('/get', async (req, res) => {
    try {
    const macs = await IMAC.find();
    res.json(macs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Read one MAC
router.get('/MAC/getOne/:id', async (req, res) => {
  try {
    const MAC = await IMAC.find();
    res.json(MAC);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a MAC
router.put('/MAC/put/:id', async (req, res) => {
  try {
    const MAC = await IMAC.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(MAC);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a MAC
router.delete('/MAC/delete/:id', async (req, res) => {
  try {
    const MAC = await IMAC.findByIdAndRemove(req.params.id);
    res.json(MAC);
    console.log("deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete All MAC
router.delete('/MAC/deleteAll', async (req, res) => {
  try {
    const MAC = await IMAC.deleteMany(req.params.id);
    res.json(MAC);MAC
    console.log("All data are deleted successfully");
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


module.exports = router