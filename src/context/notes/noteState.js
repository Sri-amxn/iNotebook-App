import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "648f546a71391b8506e7045a",
          "user": "648c9d7d4b80357a3f6b0b72",
          "title": "this is a new title",
          "description": "Get your work done jaldi seeeee",
          "tag": "selftag",
          "date": "2023-06-18T19:00:58.707Z",
          "__v": 0
        },
        {
          "_id": "648f547c71391b8506e7045c",
          "user": "648c9d7d4b80357a3f6b0b72",
          "title": "this is a most updated new title",
          "description": "Get your work done jaldi seeeee",
          "tag": "selftag",
          "date": "2023-06-18T19:01:16.618Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial)

    
    return(
        <noteContext.Provider value = {{notes, setNotes}}>
        {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;