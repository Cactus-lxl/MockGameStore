import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "@/types";
import "../css/Login.css";
import loginLogo from "../assets/loginLogo.png";

function Login({ setIsValid }: LoginProps): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const UN = "Username";
  const PW = "Password";

  const checkInput = (e?: React.FormEvent<HTMLFormElement>): void => {
    if (e) {
      e.preventDefault();
    }
    
    if (userName === UN && password === PW) {
      localStorage.setItem("isLoggedIn", "true");
      setIsValid(true);
      navigate("/home");
    } else {
      alert("Wrong username or password");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLFormElement>): void => {
    if (e.key === 'Enter') {
      checkInput();
    }
  };

  const createAccount = (): void => {
    navigate("/newacc");
  };

  return (
    <div className="input-grid">
      <img src={loginLogo} alt="By Gamers for Gamers" className="login-icon" />

      <div className="login-info-grid">
        <form onSubmit={checkInput} className="login-form" onKeyDown={handleEnterPress}>
          <input 
            type="text"
            placeholder="User name or Email address"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="UN-input"
          />

          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="PW-input"
          />
        </form>

        <button type="button" className="create-acc" onClick={createAccount}>
          Create a new account
        </button>
      </div>
    </div>
  );
}

export default Login;