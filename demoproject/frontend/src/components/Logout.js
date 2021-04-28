import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '549984139453-j6d9mqsav0lm63i24roag318a5gk0etm.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    window.location.replace('http://localhost:3000/')
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;