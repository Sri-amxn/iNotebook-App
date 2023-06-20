import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
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
  const [notes, setNotes] = useState(notesInitial)

  // Add a note
  const addNote = (title, description, tag) => {
    console.log('adding a new note')
    // TODO: API call
     const note = {
      "_id": "648f547c71391b8506e7045c",
      "user": "648c9d7d4b80357a3f6b0b72",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-18T19:01:16.618Z",
      "__v": 0
    }
    setNotes(notes.concat(note))

  }

  // Delete a note

  const deleteNote = (_id) => {

  }

  // Edit a note
  const editNote = (_id) => {

  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>

  )
}

export default NoteState;