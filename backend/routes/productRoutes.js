const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new bid on a product
router.post('/bid/:id', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (Number(amount) > product.actualOffer) {
      product.actualOffer = Number(amount);
      product.bidHistory.push({ name, amount: Number(amount) });
      await product.save();
      res.json(product);
    } else {
      res.status(400).json({ message: 'Bid must be higher than current offer' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all bids for a product
router.delete('/clear-bids/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.bidHistory = [];
    product.actualOffer = product.minimumOffer;
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;