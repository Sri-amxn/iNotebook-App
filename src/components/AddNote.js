import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'



const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("added successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div className="container my-3">

            <h2>Add notes</h2>
            <form className='my-3'>
                <div className="mb-3">

                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={onChange} value={note.title} id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.description} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.tag} id="tag" name="tag" />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote