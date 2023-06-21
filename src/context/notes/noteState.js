import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [note, setNotes] = useState(notesInitial)
// Add note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzlkN2Q0YjgwMzU3YTNmNmIwYjcyIn0sImlhdCI6MTY4Njk0MjMzNH0.GF7FgcpLHgk3TH9dYTeMc2S2qLH07Jd9dNlm0MxlZ7U"
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    
      console.log("Adding a new note")
      const note = {
        "_id": "61322f119553781a8ca8d0e08",
        "user": "6131dc5e3e4037cd4734a0664",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      };
      setNotes(note.concat(note))
    }


    // Get all notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzlkN2Q0YjgwMzU3YTNmNmIwYjcyIn0sImlhdCI6MTY4Njk0MjMzNH0.GF7FgcpLHgk3TH9dYTeMc2S2qLH07Jd9dNlm0MxlZ7U"
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }
      
    // Delete a note
    // TODO: API call
    const deleteNote = (id) => {
      // TODO: API Call
      console.log("Deleting the note with id" + id);
      const newNotes = note.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    }
    // Edit a Note



    // Edit a note
    const editNote = async (id, title, description, tag) => {
      // TODO: API call
      // API call
      const response = await fetch(`${host}api/note/updatenote/${id}`, {
        method: 'POST',

        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzlkN2Q0YjgwMzU3YTNmNmIwYjcyIn0sImlhdCI6MTY4Njk0MjMzNH0.GF7FgcpLHgk3TH9dYTeMc2S2qLH07Jd9dNlm0MxlZ7U"
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      setNotes(json)
    
    
    
    


      // logic to edit in client
      for (let index = 0; index < note.length; index++) {
        const element = note[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      
      }
    }

      return (

        <noteContext.Provider value={{  note, addNote, deleteNote, editNote, getNotes }}>
          {props.children}
        </noteContext.Provider>

      )
       
      }
    
    
  

  

export default NoteState;