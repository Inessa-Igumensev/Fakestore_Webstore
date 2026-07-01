import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Userdata } from "./Userdata";
import Symbol from "../Icon";
import ShowAllUsers from "./ShowAllUsers";
import defaultPic from "../../assets/defaultProfil.jpg";
import Collapsible from "../Collapsible";
import AddProduct from "../Products/AddProduct";
import ShowAllProducts from "../Products/ShowAllProducts";
import api from "../../api";

export default function Admin() {
  const [myInfo, setMyInfo] = useState<Userdata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const role = localStorage.getItem("role");

  const fetchMyUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/users.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyInfo(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Userdaten", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyUserData();
  }, []);

  if (role !== "admin") {
    return <Navigate to="/user" replace />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p>Lade Profildaten...</p>
      </div>
    );
  }

  if (!myInfo) {
    return (
      <div className="loading-container">
        <p>Keine Daten gefunden. Bitte anmelden.</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-profil-card">
        <div className="admin-profilC-wrapper">
          <div className="admin-profil-image-container">
            <img className="admin-avatar" src={defaultPic} alt="Admin Avatar" />
          </div>

          <div className="admin-profilC-info">
            <div className="admin-profilC-head">
              <h1>Admin</h1>
              <p className="admin-name">
                {myInfo.firstname} {myInfo.surname}
              </p>
            </div>

            <div className="admin-icons">
              <Symbol name="myuser" />
              <Symbol name="edit" />
            </div>
          </div>
        </div>
      </div>

      <div className="collabsible-set">
        <Collapsible label="Alle User">
          <ShowAllUsers />
        </Collapsible>
        <hr />

        <Collapsible label="Alle Produkte">
          <ShowAllProducts />
        </Collapsible>
        <hr />

        <Collapsible label="Produkt hinzufügen">
          <AddProduct />
        </Collapsible>
        <hr />
      </div>
    </div>
  );
}
