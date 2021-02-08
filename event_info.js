import Event from "../models/res_event";
import express from "express";
const router = express.Router();

//POST route for saving event info
router.post('/add/event',(req, res) => {
    Event.create(req.body).then(course => {
        res.status(200).send('Added!');
        console.log("It worked!!!")
    }).catch(err => {
        console.log(err);
    });
});

//GET Request for fetching staff's availability
router.get('/findevent', (req, res, next) => {
    Event.find()
      .then(data => res.json(data))
      .catch(next)
});


export default router;