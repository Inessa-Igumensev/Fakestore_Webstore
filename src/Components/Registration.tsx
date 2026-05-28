import { useState } from "react";
import axios from "axios";

export interface User {
  id?: number;
  username: string;
  email: string;
  firstname: string;
  surname: string;
}

export default function Registration() {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [userFirstname, setFirstname] = useState<string>("");
  const [userSurname, setSurname] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<User>(
        "http://localhost/fakestore_website_API/index.php",
        {
          username: userName,
          firstname: userFirstname,
          surname: userSurname,
          email: userEmail,
          password: userPassword,
        },
      );
      console.log("User Erfolgreich registiert", response.data);
      setUserName("");
      setEmail("");
      setFirstname("");
      setSurname("");
      setUserPassword("");
    } catch (error: any) {
      console.error(
        "Fehler beim Erstellen:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="registration">
      <form className="signUpFeld" onSubmit={handleSubmit}>
        <h1>Registrieren</h1>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={userFirstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Vorname"
        />
        <input
          type="text"
          value={userSurname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Nachname"
        />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="passwort"
        />
        <button className="signUpButton" type="submit">
          Registrieren
        </button>
      </form>
    </div>
  );
}
