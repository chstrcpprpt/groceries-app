const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Groceries = require("../../models/Groceries");

// Function for sucessful request
function success(res, payload) {
  return res.status(200).json(payload)
};

// API endpoints

// GET - get all groceries
router.get('/', async (req, res, next) => {
  try {
    const groceries = await Groceries.find({})
      .sort({item: 1})
    return success(res, groceries)
  } catch (err) {
    next(
      {
        status: 400,
        message: "Failed to get groceries"
      }
    )
  }
});

// POST - add new grocery to list || private
router.post('/', async (req, res, next) => {
  try {
    const grocery = await Groceries.create(req.body)
    return success(res, grocery)
  } catch (err) {
    next(
      {
        status: 400,
        message: "Failed to create new grocery"
      }
    )
  }
});

// PUT - update grocery with matching id || private
router.put("/:id", async (req, res, next) => {
  try {
    const grocery = await Groceries.findByIdAndUpdate(req.params.id, req.body, {new:true})
    return success(res, grocery)
  } catch (err) {
    next(
      {
        status: 400,
        message: "Failed to create new grocery"
      }
    )
  }
});

// DELETE - remove a grocery with matching id || private
router.delete('/:id', async (req, res, next) => {
  try{
    await Groceries.findByIdAndRemove(req.params.id)
    return success(res, "grocery deleted")
  } catch (err) {
    next(
      {
        status: 400,
        message: "Failed to create new grocery"
      }
    )
  }
});

module.exports = router;