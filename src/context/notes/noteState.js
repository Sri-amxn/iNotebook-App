import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    {
      "_id": "1648f546a71391b8506e7045a",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:00:58.707Z",
      "__v": 0
    },
    {
      "_id": "2648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a most updated new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    }
    ,
    {
      "_id": "3648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a most updated new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    },
    {
      "_id": "4648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a most updated new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    },
    {
      "_id": "5648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a most updated new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    },
    {
      "_id": "6648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": "this is a most updated new title",
      "description": "Get your work done jaldi seeeee",
      "tag": "selftag",
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    }
  ]
  const [ setNotes] = useState(notesInitial)

  // Add a note
// eslint-disable-next-line
  const addNote = async (id, title, description, tag) => {
    // TODO: API call
        // API call
        const response = await fetch(`${host}/api/note/addnote`, {
          method: 'POST',
  
          headers: { 
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YzlkN2Q0YjgwMzU3YTNmNmIwYjcyIn0sImlhdCI6MTY4Njk0MjMzNH0.GF7FgcpLHgk3TH9dYTeMc2S2qLH07Jd9dNlm0MxlZ7U"
          },
          body: JSON.stringify({ title, description, tag }),
        });
  
      const json = await response.json();

      setNotes(json)
  

      


    const notes = {
      "_id": "648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    }
    setNotes(notes.concat(notes))



    // Delete a note
    // TODO: API call
    const deleteNote =  (id) => {
      console.log('deleting a note' + id)
      const newNote =  notes.filter((note) => { return note._id !== id })

      setNotes(newNote);
      


    }
    

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
    }
    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
 

  
  return (
    
    <noteContext.Provider value={{notes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>

  )
}
}
export default NoteState;