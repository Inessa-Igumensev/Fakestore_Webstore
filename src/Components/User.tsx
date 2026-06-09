import axios from "axios";
import { useState, useEffect } from "react";
import type { Userprop } from "./Registration";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface Userdata extends Userprop {
  created_at: string;
  street: string;
  postal_code: number;
  country: string;
  mobile: number;
}

export default function User() {
  const [myInfo, setMyInfo] = useState<Userdata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchMyUserData = async () => {
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
    fetchMyUserData();
  }, []);

  if (loading) return <p>Lade Profildaten...</p>;
  if (!myInfo) return <p>Keine Profildaten gefunden. Bitte anmelden.</p>;

  return (
    <div className="user">
      <div className="myinfo">
        <h1>Mein Benutzerkonto</h1>

        <div className="myinfo-header">
          <div className="detail-myinfo">
            <div className="myinfo-icon">
              <PiUserCircleDuotone />
            </div>
            <div>
              <span className="userName">{myInfo.username}</span>
              <span className="c-at">{myInfo.created_at}</span>
            </div>
          </div>
          <button className="myinfo-options">
            <BiDotsVerticalRounded />
          </button>
        </div>
        <div className="myinfo-body">
            <p>Vorname:{myInfo.firstname}</p>
            <p>Nachname:{myInfo.surname}</p>
            <p>E-Mail:{myInfo.email}</p>
            <p>Land:{myInfo.country}</p>
            <p>Straße:{myInfo.street}</p>
            <p>Postleitzahl:{myInfo.postal_code}</p>
            <p>Mobil Nummer:{myInfo.mobile}</p>

        </div>
      </div>
    </div>
  );
}
