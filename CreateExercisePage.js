import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert(`Successfully created exercise, status code = ${response.status}`)
        } else {
            alert(`Failed to create exercise, status code = ${response.status}`)
        }
        history.push('/');
    };

    return (
        <div>
            <h1> Create Exercise</h1>
            <p> Please enter the name of the exercise, the number of repetitions, any weight used, the weight units, and the date the exercise was completed below.</p>
            <br></br>
            <table>
                <thead>
                    <tr>
                        <th> Exercise Name </th>
                        <th> Number of Repetitions </th>
                        <th> Amount of Weight </th>
                        <th> Weight Units </th>
                        <th> Last Date Completed </th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type = "text"
                                placeholder = "Enter exercise name here."
                                value = {name}
                                onChange = {e => setName(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type= "number"
                                placeholder = "Enter number of repetitions here."
                                value = {reps}
                                onChange={e => setReps(e.target.value)} />
                        </td>
                        <td>
                            <input
                                type = "number"
                                placeholder = "Enter amount of weight used here."
                                value = {weight}
                                onChange={e => setWeight(e.target.value)} />
                        </td>
                        <td>
                            <select id="dropdownmenu" onChange={e => setUnit(e.target.value)}>
                                <option value="lbs">Pounds (lbs)</option>
                                <option value="kgs">Kilograms (kgs)</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type = "text"
                                placeholder = "Enter date exercise was last completed here (MM-DD-YYY)."
                                value = {date}
                                onChange={e => setDate(e.target.value)} />
                        </td>
                    </tr>
                </thead>
            </table>
            <div>
                <br></br>
                <button onClick = {addExercise}> Create Exercise</button>
            </div>
            <br></br>
            <div>
            <Link to ="/"><button>Go Home</button></Link>
            </div>
        </div>
    )
}

export default CreateExercisePage;