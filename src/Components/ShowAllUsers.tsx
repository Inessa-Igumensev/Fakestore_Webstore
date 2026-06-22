import SearchUserByID from "./SearchUserByID.tsx";
import api from "../api";
import { useState, useEffect } from "react";
import type { Userdata } from "./Userdata.tsx";

export interface AllUserData extends Userdata {
  role: string;
}

export default function ShowAllUsers() {
const [users, setUsers] = useState<AllUserData[]>([]);
  
const fetchAllUsers = async () => {
    try {
      const response = await api.get("/users.php?all=1");
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
           <tfoot>
            <tr>
              <th colSpan={12}>Insgesamt {users.length} User</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
