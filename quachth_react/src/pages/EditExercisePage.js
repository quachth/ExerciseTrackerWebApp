import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';


export const EditExercisePage = ({ exerciseToEdit }) => {
    
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editE = async () => {
        const edited = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(edited),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert(`Exercise is successfully updated, status code = ${response.status}`);
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push('/');
    };

    return (
        <div>
            <h1> Edit Exercise </h1>
            <p> Please change the desired fields and click 'Save Changes' once you are done.</p>
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
                <button onClick = {editE}>Save Changes</button>
            </div>
            <br></br>
            <div>
            <Link to ="/"><button>Go Home</button></Link>
            </div>
        </div>
    );
}

export default EditExercisePage;