import noteContext from "./noteContext";
import React, {useState, useEffect } from "react";


const NoteState = (props) => {
  const port = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  
  // Get all notes
 
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${port}/api/note/fetchallnotes`, {
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
    
    // API Call 
    const response = await fetch(`${port}/api/note/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes([...notes, note]);

    // setNotes(json)
  
    // console.log("Adding a new note")
    
    // setNotes(notes.concat(note))
  }



  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${port}/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
      },
    });
    const json = await response.json();

    console.log(json)
    
    // console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${port}/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzgyYmM2M2Y2ZWIwYmYwYTc2NjVlIn0sImlhdCI6MTY4NzQ1MjYxNH0.rH3ekJyGz0SUDVOnY95PeP9qnYUTexo1sfBy-4hn938"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    setNotes(json)
    
    // logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
        
      }
      setNotes(newNotes)
  }

  return (

    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      
      {props.children}
    </noteContext.Provider>

  )

}


export default NoteState;