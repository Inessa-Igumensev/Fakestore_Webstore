import { useEffect, useRef, useState } from "react";
import Registration from "./Registration";
import axios from "axios";

export interface PopUpProps {
  toggle: () => void;
}

export default function Login({ toggle }: PopUpProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeLogin = () => {
    if (isClosing) return;

    setIsClosing(true);

    closeTimer.current = setTimeout(() => {
      toggle();
    },550);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Bitte alles ausfüllen");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/fakestore_website_API/api/login.php",
        {
          username,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      alert("Login erfolgreich!");
      closeLogin();
    } catch (error: any) {
      console.error("Fehler-Status:", error.response?.status);
      console.error("Body:", error.response?.data);
      console.log(error.message);
    }
  };

  return (
    <div className={`login ${isClosing ? "login--closing" : ""}`}>
      <div className="login-container">
        <button
          type="button"
          className="closeButton"
          onClick={closeLogin}
          disabled={isClosing}
        >
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

              <button className="signInButton" type="submit" disabled={isClosing}>
                Anmelden
              </button>
            </form>

            <p className="toggleText">
              Noch nicht registriert?{" "}
              <span className="goToSignIn" onClick={() => setIsLogin(false)}>
                Hier klicken
              </span>
            </p>
          </div>
        ) : (
          <Registration registerSuccess={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}