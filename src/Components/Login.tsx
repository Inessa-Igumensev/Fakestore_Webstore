import { useState } from "react";
import Registration from "./Registration";
import axios from "axios";

export interface PopUpProps {
  toggle: () => void;
}

export default function Login({ toggle }: PopUpProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost/fakestore_website_API/login.php", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        alert("Login erfolgreich!");
        toggle();
      })
      .catch((error) => {
        console.error("Fehler-Status:", error.response?.status);
        console.log(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <button className="closeButton" onClick={toggle}>
          &times;
        </button>

        {isLogin ? (
          <div className="signInForm">
            <form className="signInFeld" onSubmit={handleLogin}>
              <h1>Anmelden</h1>
              <div className="input-box">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <button className="signInButton" type="submit">
                Anmelden
              </button>
            </form>
            <p className="toggleText">
              Noch nicht registriert?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Hier klicken
              </span>
            </p>
          </div>
        ) : (
          <Registration />
        )}
      </div>
    </div>
  );
}
