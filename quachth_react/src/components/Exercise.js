import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'


function Exercise({ exercise, deleteE, editE }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit onClick={() => editE(exercise)} /></td>
            <td><MdDelete onClick={() => deleteE(exercise._id)} /></td>
        </tr>
    );
}

export default Exercise;