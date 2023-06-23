import noteContext from "./noteContext";
import React, {useState, useEffect } from "react";
const host = "http://localhost:5000";


const NoteState = (props) => {
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  
  // Get all notes
 
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        
        const json = await response.json();
        setNotes(json);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    fetchNotes();

  }, []);


  
  // Add note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)
    // setNotes(json)
  
    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    }
    setNotes([...notes, note]);
    // setNotes(notes.concat(note))
  }



  // Delete a note
  const deleteNote = (id) => {
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}api/note/updatenote/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    setNotes(json)

    // logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
  }

  return (

    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>

  )

}


export default NoteState;