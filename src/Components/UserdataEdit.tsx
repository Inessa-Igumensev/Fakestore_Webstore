import { useState,useEffect } from "react";
import axios from "axios";

type UserdataEditProps = {
  onClose: () => void;
};

export default function UserdataEdit({ onClose }: UserdataEditProps) {

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setEmail] = useState<string>("");
  const [userFirstname, setFirstname] = useState<string>("");
  const [userSurname, setSurname] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userLand, setUserLand] = useState<string>("");
  const [userStreet, setUserStreet] = useState<string>("");
  const [userPostal_code, setuserPostal_code] = useState<string>("");
  const [userMobile, setUserMobile] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Melden Sie sich bitte an");
          return;
        }

        const response = await axios.get(
          "http://localhost/fakestore_website_API/api/users.php",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;

        setUserName(user.username ?? "");
        setEmail(user.email ?? "");
        setFirstname(user.firstname ?? "");
        setSurname(user.surname ?? "");
        setUserLand(user.country ?? "");
        setUserStreet(user.street ?? "");
        setuserPostal_code(user.postal_code ?? "");
        setUserMobile(user.mobile ?? "");
        setUserPassword("");
      } catch (error:any) {
        console.error(
          "Fehler beim Laden der Userdaten:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload: Record<string, string> = {};

      if (userName.trim() !== "") payload.username = userName;
      if (userFirstname.trim() !== "") payload.firstname = userFirstname;
      if (userSurname.trim() !== "") payload.surname = userSurname;
      if (userEmail.trim() !== "") payload.email = userEmail;
      if (userPassword.trim() !== "") payload.password = userPassword;
      if (userLand.trim() !== "") payload.country = userLand;
      if (userStreet.trim() !== "") payload.street = userStreet;
      if (userPostal_code.trim() !== "") payload.postal_code = userPostal_code;
      if (userMobile.trim() !== "") payload.mobile = userMobile;

      if (Object.keys(payload).length === 0) {
        console.log("Keine Änderungen eingegeben");
        return;
      }

      const response = await axios.patch(
        "http://localhost/fakestore_website_API/api/users.php",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Daten wurden aktualisiert", response.data);
      onClose();

    } catch (error: any) {
      console.error(
        "Fehler beim Update:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="userdataEdit">
      <form className="updateForm" onSubmit={handleUpdate}>
        <div className="formRow">
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="formRow">
          <label>Vorname:</label>
          <input
            type="text"
            value={userFirstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Nachnahme:</label>
          <input
            type="text"
            value={userSurname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>E-Mail:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Password:</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Land:</label>
          <input
            type="text"
            value={userLand}
            onChange={(e) => setUserLand(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Straße:</label>
          <input
            type="text"
            value={userStreet}
            onChange={(e) => setUserStreet(e.target.value)}
          />
        </div>
        <div className="formRow">
          <label>Postleitzahl:</label>
          <input
            type="numeric"
            value={userPostal_code}
            onChange={(e) => setuserPostal_code(e.target.value)}
          />
        </div>

        <div className="formRow">
          <label>Telefonnummer:</label>
          <input
            type="numeric"
            value={userMobile}
            onChange={(e) => setUserMobile(e.target.value)}
          />
        </div>

        <button className="sendUpdateBtn" type="submit">
          Absenden
        </button>
      </form>
    </div>
  );
}
