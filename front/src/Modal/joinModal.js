import React,{ useState } from "react";
import Join from "../component/user/Join";
import '../css/Modal.css';

export default function JoinModal (){
    const [openModal, setOpneModal] = useState(false);

    const toggleModal = () =>{
        setOpneModal(!openModal);
    };

    if (openModal){
        document.body.classList.add('active-modal');
    }else{
        document.body.classList.remove('active-modal');
    }

    return(
        <>
        <button onClick={toggleModal}> openModal</button>
        
        {openModal &&(
            <div className="modalBackground">
            <Join />
            </div>
            
        )}
        </>
        )
}