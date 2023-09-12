import React,{ useState } from "react";
import Header from "../../Header/header";
import '../userCss/profile.css';

function MasterProfile(){
    const [numValue, setNumValue] = useState(0);

    return(
        <div className="Background">
            <Header numValue={numValue} setNumValue={setNumValue} />
            <div className="proFileBackground">
                <div className="userProfile">
                <p> masterPage입니다.</p>
                </div>
            
            </div>
        

    </div>
    
    )

}

export default MasterProfile;