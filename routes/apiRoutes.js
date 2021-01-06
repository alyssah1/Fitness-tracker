const db = require("../models");


module.exports = function (app) {

    //gets all workouts
    app.get("/api/workouts", function(req, res) {

        db.Workout.find({}).then(dbWorkouts => {
            dbWorkouts.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(event => {
                    total += event.duration;
                });
                workout.totalDuration = total;

            });

            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });
    });

    // add an exercise to existing workout
    app.put("/api/workouts/:id", function(req, res) {

        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(dbWorkouts => {
                res.json(dbWorkouts);
            }).catch(err => {
                res.json(err);
            });

    });

    //creates a workout
    app.post("/api/workouts", ({ body }, res) => { 
        db.Workout.create(body).then((dbWorkouts => {
            res.json(dbWorkouts);
        })).catch(err => {
            res.json(err);
        });
    });

    // get workouts in range
    app.get("/api/workouts/range", function(req, res) {

        db.Workout.find({}).then(dbWorkouts => {

            res.json(dbWorkouts);
        }).catch(err => {
            res.json(err);
        });

    });
}