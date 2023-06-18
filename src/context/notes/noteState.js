import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const s1 = {
        "name": "random",
        "class": "12A"
    }

        const [state, setState] = useState(s1);
        const update =()=>{
            setTimeout(() => {
                setState({
                    "name": "chaman",
                    "class": "12B"
                })
            }, 2000);
        }
    
    return(
        <noteContext.Provider value = {{state: state, update: update}}>
        {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;