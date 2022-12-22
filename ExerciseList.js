import React from 'react'
import Exercise from './Exercise'

function ExerciseList({ exercises, deleteE, editE }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th> Exercise Name </th>
                    <th> Number of Repetitions </th>
                    <th> Amount of Weight </th>
                    <th> Weight Units </th>
                    <th> Last Date Completed </th>
                    <th> Edit </th>
                    <th> Delete </th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise exercise={exercise}
                    deleteE = {deleteE}
                    editE = {editE}
                    key = {i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseList;