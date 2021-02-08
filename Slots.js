import Slot from "../models/Slot";
import express from "express";
const router = express.Router();

//GET route
router.get('/slots', (req, res, next) => {
  Slot.find({})
    .then(data => res.json(data))
    .catch(next)
});

export default router;