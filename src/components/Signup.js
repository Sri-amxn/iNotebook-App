import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success){
        // redirect
        localStorage.setItem('token', json.authtoken)
        navigate("/Noteitem");

    }
    else{
        alert("login with valid credentials")
    }

}
const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  } 
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange}aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange}placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" name="confirm password" id="cpassword"onChange={onChange} placeholder="Confirm Password" />
        </div>

        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default Signup