import React,{ useState, useEffect } from "react";
import Join from "./user/Join";
import Login from "./user/login";
import Header from "../Header/header";
import "./userCss/loginPage.css";
import "../css/front.css";

const LoginPage = () => { 
    const [isHidden, setIsHidden] = useState(false);
    const [numValue, setNumValue] = useState(0);
    
        const toggleHidden = () =>{
            setIsHidden(!isHidden);
        }
    // 토큰을 불러와 직급 판단
             

    return (
        <div className="Background">
            <Header numValue={numValue} setNumValue={setNumValue} />
            <div className="pageBox">
                <div className="joinPage">
            <Join />
            <div className="joinBoxText">
                <p className="texStyle"
                    style={{
                        fontSize: "35px",

                    }}>" 환영합니다 "</p>

                <p className="texStyle"
                    style={{
                        fontSize: "19px",
                        fontStyle:"normal",
                    }}>
                    원활한 진행을 위해<br />
                    다음 정보를 기입해 주세요
                </p>
                <p className="texStyle"
                    style={{
                        width: '100%',
                        fontSize: "10px",
                        padding: '5px',
                        marginTop: "40px"
                    }}>가입된 정보가 있으신가요?</p>
                <button className="buttonStyleW"
                onClick={toggleHidden}
                        style={{
                            fontWeight: '100'
                        }}>로그인</button>
            </div>
            
                </div>
                <div className={`loginPage ${isHidden ? "" : "hidden"}`} >
                <Login />
                <div className= "joinBoxText">
                <p className="texStyle"
                    style={{
                        fontSize: "35px",
                    }}>" 안녕하세요 "</p>

                <p className="texStyle"
                    style={{
                        fontSize: "19px",
                        fontStyle:"normal",
                    }}>
                    접근을 허용하려면 로그인하세요
                </p>
                <p className="texStyle"
                    style={{
                        width: '100%',
                        fontSize: "10px",
                        padding: '5px',
                        marginTop: "40px"
                    }}>처음 방문하셨나요?</p>
                <button className="buttonStyleW"
                        onClick={toggleHidden}
                        style={{
                            fontWeight: '100'
                        }}>회원가입</button>         
            </div>      
            </div>
           </div> 
        </div>
    );
};

export default LoginPage;
