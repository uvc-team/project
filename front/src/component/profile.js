import React from "react";
import '../css/profile.css';

function Profile({ userEmail}) {
  console.log( userEmail);
  return (
    <div>
      <p> email: { userEmail}</p>
    </div>
  )
}
  
export default Profile;