import SearchUserByID from "./SearchUserByID.tsx";
import api from "../../api.tsx";
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
              <tr key={user.user_id}>
                <td data-title="ID">{user.user_id}</td>
                <td data-title="Username">{user.username}</td>
                <td data-title="Vorname">{user.firstname}</td>
                <td data-title="Nachname">{user.surname}</td>
                <td data-title="E-Mail">{user.email}</td>
                <td data-title="Postleitzahl">{user.postal_code}</td>
                <td data-title="Land">{user.country}</td>
                <td data-title="Straße">{user.street}</td>
                <td data-title="Mobilnummer">{user.mobile}</td>
                <td data-title="Role">{user.role}</td>
                <td data-title="Bearbeiten"><button className="user-Upt-Btn">Bearbeiten</button></td>
                <td data-title="Löschen"><button className="user-Del-Btn">Löschen</button></td>
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
