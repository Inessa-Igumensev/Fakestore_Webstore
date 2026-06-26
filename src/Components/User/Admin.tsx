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
      <div className="admin-container">
        <img
          className="defaultPic"
          src={defaultPic}
          alt="default Picture"
        ></img>
        <div className="myAdmin-info">
          <h1>
            {myInfo?.firstname} {myInfo?.surname}
          </h1>
          <div className="admininfo-body">
            <p>E-Mail: {myInfo.email}</p>
            <p>Land: {myInfo.country}</p>
            <p>Straße: {myInfo.street}</p>
            <p>Postleitzahl: {myInfo.postal_code}</p>
            <p>Mobil Nummer: {myInfo.mobile}</p>
            <p>Erstellt am: {myInfo.created_at}</p>
          </div>
        </div>
        <div className="edit-options">
          <span>
            <Symbol name="edit" />
          </span>
        </div>
        <button className="adminContact-info">Kontakt Infomartionen</button>
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
