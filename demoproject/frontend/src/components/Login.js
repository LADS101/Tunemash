import React from 'react';
import Axios from 'axios';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function Login() {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );

    refreshTokenSetup(res);
    alert("Got here")
    const tokenToVerify = (res.getAuthResponse().id_token).toString();
    alert("Got here as well")
    alert(tokenToVerify)
    Axios.get("http://localhost:3002/api/getAuth",  {
        headers: {
            'Authorization': tokenToVerify
        }
      })
      .then((res) => {
        window.location.replace('http://localhost:3000/Home')
        // console.log("Got back to login")
        // redirect('http://localhost:3000/dashboard')
        // console.log(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
    
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;