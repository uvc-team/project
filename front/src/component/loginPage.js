import React,{ useState, useEffect } from "react";
import Join from "./user/Join";
import Login from "./user/login";

import "./userCss/loginPage.css";
import "../css/front.css";

const LoginPage = () => { 
    const [onClick,setOnClick] = useState(false);
    
    useEffect(() =>{
        if (onClick) {
            console.log("onClick has been triggered");
          }
        else {
            setOnClick(false);
            console.log("!onClick");
        };
        }, [onClick]);
        

        const handleClick = () => {

            setOnClick(!onClick);
          };

             

    return (
        <div className="Background">
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
                onClick={handleClick}
                        style={{
                            fontWeight: '100'
                        }}>로그인</button>
            </div>
              
                </div>
                <div className={`loginPage ${handleClick?"moveLeft":"moveRight"}`} >
                <Login />
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
                        onClick={handleClick}
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
