import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Form from './components/Engine';
import { useState } from 'react';
import CreatePost from './components/Create';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp';
import AlertMessage from './components/AlertsMessage';
import { signInWithPopup } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, Providers } from './config/firebase';
import Edit from './components/Edit';
import { useNavigate } from 'react-router-dom';


function App () {
  const [myName, setMyName] = useState('');
  const [myCity, setMyCity] = useState('');

  function updateUserInfo (username, usercity) {
    setMyName(username);
    setMyCity(usercity);
  }

  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now));

    // Function that will update myName and myCity variables with whatever strings are passed into it
    // eslint-disable-next-line no-redeclare
    function updateUserInfo(username, usercity){
        setMyName(username);
        setMyCity(usercity);
    };

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    }

    function logUserIn(){
        setLoggedIn(true);
    }

    function logUserOut(){
      if(loggedIn){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage("You have logged out", "primary");
      }else{
        localStorage.removeItem('email');
        window.location.reload()
      }
    }

  const [value, setValue] = useState('')

  const handleClick=()=>{
      signInWithPopup(auth,Providers).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem('email', data.user.email)
          navigate('/')
          flashMessage('You have successfully logged in', 'success');
      })

  }

  useEffect(() => {
      setValue(localStorage.getItem('email'))
  }, [])

  /*const LogOut=()=>{
    localStorage.removeItem('email');
    window.location.reload()
  }*/

  return (
    <>
      <Navbar city={myCity} value={value}  handleClick={handleClick} name={myName} updateUser={updateUserInfo} loggedIn={loggedIn} logUserOut={logUserOut} />
      <div className="container">
        {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
      <h1 className='text-center'> Car Inventory </h1> 
        <Routes>
          <Route path="/form" element={<Form/>} />
          <Route path="/create" element={<CreatePost value={value} loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/" element={<Home value={value} loggedIn={loggedIn} flashMessage={flashMessage}/>} />
          <Route path="/login" element={<Login handleClick={handleClick} flashMessage={flashMessage} logUserIn={logUserIn}/>} />
          <Route path="/sign_up" element={<SignUp flashMessage={flashMessage}/>} />
          <Route path="/edit" element={<Edit value={value} loggedIn={loggedIn} flashMessage = {flashMessage}/>} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;