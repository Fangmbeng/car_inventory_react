import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar (props) {
  function handleForm (e) {
    e.preventDefault();
    console.log(e);
    //get data from form below
    let name = e.target.username.value;
    let city = e.target.hometown.value;
    //pass data to update function in App.js
    props.updateUser(name, city);
    //resets the input form
    e.target.username.value = "";
    e.target.hometown.value = "";
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
            {
            props.city && props.name?
            <Link className="navbar-brand" to="/"> Welcome {props.name} from {props.city} </Link>:
            <Link className="navbar-brand" to="/"> Welcome Stranger</Link>
            }
            <Link className='nav-link text-danger-emphasis' to='/'>Home</Link>
            {props.loggedIn ? (
                <>
                <Link className='nav-link text-success' to='/form'>Engines</Link>
                <Link className='nav-link text-primary' to='/create'>Add Invzntory</Link>
                <Link className='nav-link text-warning' to='/' onClick={props.logUserOut}>Log Out</Link>
                </>
            ) : (
                <>
                <Link className='nav-link text-success-emphasis' to='/sign_up'>Sign Up</Link>
                <Link className='nav-link text-primary-emphasis' to='/login'>Log In</Link>              </>
            )}
            <form action="" className="row" onSubmit={handleForm}>
                <div className="col">
                    <input type="text"  className="form-control bg-white" name="username"/>
                </div>
                <div className="col">
                    <input type="text"  className="form-control bg-white" name="hometown"/>
                </div>
                <div className="col">
                    <input type="submit"  className="btn btn-success"/>
                </div>
            </form>
            </div>
        </nav>
    </>
  )
}
