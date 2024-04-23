import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000

const app = express();

app.use(express.json());

/**
 * Create, using POST, a new exercise with its name, number of times it's been performed,
 * amount of weight used, unit of measurement of the weight (kgs or lbs), and 
 * the date the exercise was performed (in mm-dd-yy formate)
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch (error => {
            console.error(error);
            res.status(500).json({Error: 'Create request has failed.  Please check parameters'});
        });
});


/**
 * Retrieve, using GET, the collection of exercises.
 * 
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.status(200).json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Retrieval request has failed.'});
        });
});


/**
 * Update, using PUT, an exercise with the id provided in the path parameter, and set 
 * its properties to the values provided in the body
 */
app.put('/exercises/:id', (req, res) => {
    exercises.updateExercise(req.params.id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(updated => {
            if (updated === 1) {
                res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
            } else {
                res.status(500).json({Error: 'Exercise was not found.'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Update request has failed. Please check parameters.'});
        });
});

/**
 * Delete the exercise with the given id in the path parameter
 */
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteExercise(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({Error: 'Exercise was not found.'})
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({Error: 'Delete request has failed.'});
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})