const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');


router.get('/', (req, res) => {
  Product.find()
    .sort({ dateAdded: -1 })
    .then(products => res.json(products))
    .catch(err => res.status(400).json({ msg: 'Failed to fetch products' }));
});


router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    category: req.body.category,
    stockQuantity: req.body.stockQuantity
  });

  newProduct.save()
    .then(product => res.json(product))
    .catch(err => res.status(400).json({ msg: 'Failed to add product' }));
});


router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ msg: 'Product deleted' })))
    .catch(err => res.status(404).json({ msg: 'Product not found' }));
});


router.put('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.manufacturer = req.body.manufacturer;
      product.category = req.body.category;
      product.stockQuantity = req.body.stockQuantity;

      product.save()
        .then(() => res.json({ msg: 'Product updated' }))
        .catch(err => res.status(400).json({ msg: 'Failed to update product' }));
    })
    .catch(err => res.status(404).json({ msg: 'Product not found' }));
});

module.exports = router;
