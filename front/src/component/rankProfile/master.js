import React,{ useState } from "react";
import Header from "../../Header/header";
import '../userCss/profile.css';
import Logout from "../user/Logout";

function MasterProfile(){
    const [numValue, setNumValue] = useState(0);

    return(
        <div className='proFileBackground'>
        <Header numValue={numValue} setNumValue={setNumValue} /> 
        <div className='profileBox'>
            <div className='userProfile'>
                <h2>안녕하세요 OO님</h2>
            <div className='userImg' />
            <p className='userTextBox'>
              <p>사람 </p>
              <p style={{
                fontSize: '5px',
              }}>123@email.com</p>
          </p>
          <Logout />
        </div>

      </div>
      
    </div>
        
    
    )

}

export default MasterProfile;