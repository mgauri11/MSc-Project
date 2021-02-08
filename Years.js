import Year from "../models/Year";
import express from "express";
const router = express.Router();

//GET route
router.get('/years', (req, res, next) => {
  Year.find({})
    .then(data => res.json(data))
    .catch(next)
});

export default router;