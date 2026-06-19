import SearchUserByID from "./SearchUserByID.tsx";
import axios from "axios";
import { useState, useEffect } from "react";
import type { Userdata } from "./Userdata.tsx";

export interface AllUserData extends Userdata {
  role: string;
}

export default function ShowAllUsers() {
const [users, setUsers] = useState<AllUserData[]>([]);
  
const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/fakestore_website_API/api/users.php",
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Userdaten", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="allUsers">
      <div className="searchUser">
        <SearchUserByID />
      </div>
      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>E-Mail</th>
              <th>Postleitzahl</th>
              <th>Land</th>
              <th>Straße</th>
              <th>Mobilnummer</th>
              <th>Role</th>
              <th>Bearbeiten</th>
              <th>Löschen</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.postal_code}</td>
                <td>{user.country}</td>
                <td>{user.street}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
                <td>Bearbeiten</td>
                <td>Löschen</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
