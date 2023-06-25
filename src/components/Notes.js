import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNotes } = context;

  useEffect(() => {
    fetchNotes();
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const [note, setNote] = useState({etitle:"", edescription:"", etag:""})
  const handleClick = (e)=>{
    console.log('updating the note', note)
    e.preventDefault();
}
const onChange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})

}
  const ref = useRef(null)

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">

                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control"  value={note.etitle} name="etitle" onChange={onChange} id="etitle" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.edescription} id="edescription" name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" onChange={onChange}  value={note.etag} id="etag" name="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>

        {notes?.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
