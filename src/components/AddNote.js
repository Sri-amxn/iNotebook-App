import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'



const AddNote = () => {
    
    const context = useContext(noteContext);
    const {addNote}= context;
    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})

    }
    return (
        <div className="container my-3">

            <h2>Add notes</h2>
            <form className='my-3'>
                <div className="mb-3">
                    
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={onChange} id="title" aria-describedby="emailHelp" /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} id="description" name="description" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote