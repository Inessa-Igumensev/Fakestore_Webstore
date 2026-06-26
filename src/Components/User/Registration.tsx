import { useState } from "react";
import api from "../../api";

export interface Userprop {
  user_id?: number;
  username: string;
  email: string;
  firstname: string;
  surname: string;
}

interface Registrationsprop{
  registerSuccess:() => void;
}

export default function Registration({registerSuccess}: Registrationsprop) {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [userFirstname, setFirstname] = useState<string>("");
  const [userSurname, setSurname] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post<Userprop>(
        "/users.php",
        {
          username: userName,
          firstname: userFirstname,
          surname: userSurname,
          email: userEmail,
          password: userPassword,
        },
      );
     
      console.log("User Erfolgreich registiert", response.data);
      registerSuccess();
      
    } catch (error: any) {
      console.error(
        "Fehler beim Erstellen:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="registration">
      <form className="signUpFeld" onSubmit={handleSubmit}>
        <h1>Registrieren</h1>
        <div className="signUp-scroller">
          <label>Username</label>
<input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <label>Vorname</label>
        <input
          type="text"
          value={userFirstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Vorname"
        />
        <label>Nachnahme</label>
        <input
          type="text"
          value={userSurname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Nachname"
        />
        <label>E-Mail</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
        />
        <label>Password</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="passwort"
        />
        </div>
        
        <button className="signUpButton" type="submit">
          Registrieren
        </button>
      </form>
    </div>
  );
}
