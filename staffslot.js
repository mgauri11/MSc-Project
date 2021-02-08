import Staff_Slot from "../models/Staff_slot";
import express from "express";
const router = express.Router();

//POST route for saving staff's availability
router.post('/add',(req, res) => {
    Staff_Slot.create(req.body).then(course => {
        res.status(200).send('Added!');
        console.log("It worked!!!")
    }).catch(err => {
        console.log(err);
    });
});

//GET Request for fetching staff's availability
router.get('/findslot', (req, res, next) => {
    Staff_Slot.find()
      .then(data => res.json(data))
      .catch(next)
});
//DELETE route for deleting released date and time slots.
router.delete('/slot/:id', (req, res, next) => {
    Staff_Slot.findOneAndDelete([{"_id": req.params.id}])
      .then(data => res.json(data).send("Deleted!"))
      .catch(next)
});

export default router;