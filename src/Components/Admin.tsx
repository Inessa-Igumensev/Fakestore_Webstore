import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Userdata } from "./Userdata";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbMoodEdit } from "react-icons/tb";
import ShowAllUsers from "./ShowAllUsers";
import defaultPic from "../assets/defaultProfil.jpg";
import Collapsible from "./Collapsible";
import AddProduct from "./AddProduct";

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
      const response = await axios.get(
        "http://localhost/fakestore_website_API/api/users.php",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
            <MdProductionQuantityLimits />
          </span>
          <span>
            <TbMoodEdit />
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
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
