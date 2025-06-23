import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/Login.css"

import loginLogo from "../assets/loginLogo.png"

function Login({setIsValid}){
  const [UserName, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const nav = useNavigate();

  const UN = "Username";
  const PW = "Password";

  function CheckInput(){
    if(UserName == UN && Password == PW){
      localStorage.setItem("isLoggedIn", "true");
      setIsValid(true);
      nav("/Home");
    }else{
      alert("wrong username or password");
    }
  }

  function EnterPress(e){
    if(e.key == 'Enter'){
      CheckInput();
    }
  }

  function CreateAcc(){
    nav("NewAcc")
  }


  return(
    <div className={"input-grid"}>
      <img src={loginLogo} alt={"By Gamers for Gamers"} className={"login-icon"}/>

      <div className={"login-info-grid"}>
        <form onSubmit={CheckInput} className={"login-form"} onKeyDown={EnterPress}>
          <input type={"text"}
                 placeholder={"User name or Emaill address"}
                 value={UserName}
                 onChange={(e) => setUser(e.target.value)}
                 className={"UN-input"}/>

          <input type={"text"}
                 placeholder={"Password"}
                 value={Password}
                 onChange={(e) => setPassword(e.target.value)}
                 className={"PW-input"}/>
        </form>

        <button className={"creat-acc"} onClick={CreateAcc}>Creat a new account</button>
      </div>
    </div>
  )
}

export default Login