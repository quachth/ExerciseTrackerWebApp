import ExerciseList from '../components/ExerciseList'
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'


function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }


    const editE = exercise => {
        setExerciseToEdit(exercise);
        history.push('/edit-exercise');
    }
    

    const deleteE = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(exercise => exercise._id !== _id));
        } else {
            console.error(`Exercise with _id=${_id} failed to be deleted, status code = ${response.status}`);
        }
    };


    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h1> Home Page </h1>
            <p> Welcome to my CS290 Assignment #4 Exercise Tracker! This is a Full-stack MERN application.</p>
            <p> You can add an exercise to the tracker by clicking the button 'Add Exercise'. </p>
            <p> Next to each added exercise, you can choose to edit the exercise or delete it from the tracker.</p>
            <br></br>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} deleteE={deleteE} editE={editE}></ExerciseList>
            <Link to ="/create-exercise"><button>Add Exercise</button></Link>
            <br></br>
            <footer id="name"> by Theresa Quach</footer>
        </>
    );
}       

export default HomePage;