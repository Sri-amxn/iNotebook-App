import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes}= context;
  return (
    <div className="container my-3">
    <h2>Your notes</h2>
    {notes.map((note)=>{
      return note.title;
    })}

    </div>
  )
}

export default Notes