import './App.css';
import About from './components/About';
import { Home } from './components/Home';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';


function App() {
  return (    
    <>
   <NoteState>

      <Router>
          <Navbar />
        <Routes>
          <Route exact path="/home" element = {<Home/>} /> 
          <Route exact path="/about"  element = {<About/>} />
        </Routes>
      </Router>
   </NoteState>
    
    </>

  );
}

export default App;
