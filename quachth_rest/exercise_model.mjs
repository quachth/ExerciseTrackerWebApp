import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewURL: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once('open', () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

mongoose.set("useCreateIndex", true);


/**
 * Define schema for an Exercise.
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
});


/**
 * Compile Exercise model from Schema
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);


/**
 * Creating an exercise.
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns (a promise that resolves to the JSON object for exercise document created)
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}


/**
 * Retrieve all movies.
 */
const findExercises = async() => {
    const query = Exercise.find()
    return query.exec();
}


/**
 * Update the properties of the movie with the id value provided given 
 * the parameter to be changed.
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise that resolves to the number documents modified
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.nModified;
}


/**
 * Delete the exercise with the provided id.
 * @param {String} _id
 */
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}


export {createExercise, findExercises, updateExercise, deleteExercise};