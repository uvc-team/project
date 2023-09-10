import React,{ useState, useEffect } from "react";
import Join from "./user/Join";
import Login from "./user/login";
import "./userCss/loginPage.css";
import "../css/front.css";



const LoginPage = () => { 
    const [position, setPosition] = useState(0);
    
    useEffect(() =>{
        if (position) {
            console.log("왼쪽");
          }
        else {
            console.log("오른쪽");
        };
        }, [position]);
        

        const moveLeft = () => {
            setPosition(position - 100); // 왼쪽으로 이동
          };
        
          const moveRight = () => {
            setPosition(position + 100); // 오른쪽으로 이동
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
                onClick={moveRight}
                        style={{
                            fontWeight: '100'
                        }}>로그인</button>
            </div>
            
                </div>
                <div className="loginPage"
                style={{ transform: `translateX(${position}vw)` }} >
                <Login />
                <div className="joinBoxText">
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
                        onClick={moveLeft}
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
