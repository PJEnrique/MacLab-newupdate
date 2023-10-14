const express = require('express');
const IMAC = require('../models/IMAC');
const router = express.Router();
// Create a new MAC
router.post('/post', async (req, res) => {
  try {
    const { id, index, active, timer, identifier, activationDateTime, name, studentNumber } = req.body;

    const requestData = { id, index, active, timer, identifier, activationDateTime, name, studentNumber };
    const mac = new IMAC(requestData);

    await mac.save();
    res.status(201).json(mac);
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
router.delete('/delete/:id', async (req, res) => {
  try {
    const MAC = await IMAC.findByIdAndRemove(req.params.id);
    res.json(MAC);
    console.log("deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete All MAC
router.delete('/deleteAll', async (req, res) => {
  try {
    const result = await IMAC.deleteMany({});
    res.json({ message: 'All data deleted successfully', deletedCount: result.deletedCount });
    console.log('All data are deleted successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router