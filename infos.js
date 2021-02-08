import Info from "../models/Info";
import express from "express";
const router = express.Router();

//GET route for fetching module related info
router.get('/todos', (req, res, next) => {
  Info.find({})
    .then(data => res.json(data))
    .catch(next)
});

export default router;