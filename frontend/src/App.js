import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script"

function App() {
  const responseGoogle = respond =>{
    console.log(respond)
    const {code} = respond
    axios.post('/api/create-tokens', {code})
    .then(respond =>{
      console.log(respond.data)
      setSignedIn(true)
    }).catch(error => console.log(error.message))
  }
  const responseError = error =>{
    console.log(error)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('/api/create-event',{
      summary,
      description,
      location,
      startDateTime,
      endDateTime
    }).then(resonse => {
      console.log(resonse.data)
    })
    .catch(error => console.log(error.message))
  }

  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [signedIn, setSignedIn] = useState(false) 

  useEffect(() => {
    const clientId ='282079938425-ltk4kb2l0vgeinup36q8un966228hblu.apps.googleusercontent.com';
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
      <div>
        <div className="App">
          <h1>Calendar Oauth Project</h1>
        </div>
        {
          !signedIn ? (
            <div>
              <GoogleLogin
              clientId='282079938425-ltk4kb2l0vgeinup36q8un966228hblu.apps.googleusercontent.com'
              buttonText='Sign In & Authorise Calendar'
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={'single_host_origin'}
              responseType = 'code'
              accessType= 'offline'
              scope= 'openid email profile https://www.googleapis.com/auth/calendar '
            />
        </div>
          ):(
            <div>
              <form onSubmit={handleSubmit}>
              <lable htmlFor='summary'>Summary</lable>
              <br/>
              <input type='text' id='summary' value={summary} onChange={e => setSummary(e.target.value)}/>
              <br/>
              <lable htmlFor='description'>Description</lable>
              <br/>
              <textarea type='text' id='description' value={description} onChange={e => setDescription(e.target.value)}/>
              <br/>
              <lable htmlFor='location'>Location</lable>
              <br/>
              <input type='text' id='location' value={location} onChange={e => setLocation(e.target.value)}/>
              <br/>
              <lable htmlFor='startDateTime'>Start Date Time</lable>
              <br/>
              <input type='datetime-local' id='startDateTime' value={startDateTime} onChange={e => setStartDateTime(e.target.value)}/>
              <br/>
              <lable htmlFor='endDateTime'>End Date Time</lable>
              <br/>
              <input type='datetime-local' id='endDateTime' value={endDateTime} onChange={e => setEndDateTime(e.target.value)}/>
              <br/>
              </form>
            </div>
          )
        }
    </div>
  );
}

export default App;
