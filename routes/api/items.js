const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');


router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(400).json({ msg: 'Failed to fetch items' }));
});

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({ msg: 'Failed to add item' }));
});


router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ msg: 'Item deleted' })))
    .catch(err => res.status(404).json({ msg: 'Item not found' }));
});


router.put('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.name = req.body.name;
      item.save()
        .then(() => res.json({ msg: 'Item updated' }))
        .catch(err => res.status(400).json({ msg: 'Failed to update item' }));
    })
    .catch(err => res.status(404).json({ msg: 'Item not found' }));
});

module.exports = router;
