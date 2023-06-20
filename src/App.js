import './App.css';
import About from './components/About';
import { Home } from './components/Home';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';


function App() {
  return (    
    <>
   <NoteState>

      <Router>
          <Navbar />
          <Alert/>
<div className="container">
        <Routes>
          <Route exact path="/home" element = {<Home/>} /> 
          <Route exact path="/about"  element = {<About/>} />
        </Routes>
</div>
      </Router>
   </NoteState>
    
    </>

  );
}

export default App;
