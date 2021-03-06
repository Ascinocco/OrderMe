  let Models = require('../../models'),
    ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  getDishes(req, res) {
    Models.Dishes.find({}, (err, dishes) => {
      if (dishes.length) {
        res.json(dishes)
      } else {
        res.json([])
      }
    })
  },
  addDish(req, res) {
    Models.Dishes.create(
      {
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type,
        description: req.body.description
      }, (err, dish) => {
      if (err) {
        console.warn(err)
        res.status(500).json({error: err})
      } else {
        res.status(200).json(dish)
      }
    })
  },
  updateDish(req, res){
    Models.Dishes.findOneAndUpdate({ "_id": req.body.id }, {$set: {
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type,
        description: req.body.description
    }}, {new: true}, (err, dish) => {
      if (err) {
        console.warn(err)
        res.status(500).json({error: err})
      } else {
        res.status(200).json(dish)
      }
    })
  },
  deleteDish(req, res){
    Models.Dishes.remove({ "_id" : req.body.dishId }, (err, dish) => {
      if (err){
        console.error(err)
        res.status(500).json({error: err})
      } else {
          res.status(200).json(dish)
      }
    })
  },
}
