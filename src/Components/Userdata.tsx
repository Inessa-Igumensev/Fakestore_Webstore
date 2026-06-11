import axios from "axios";
import { useState, useEffect } from "react";
import type { Userprop } from "./Registration";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";

import UserdataEdit from "./UserdataEdit";


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
  const [showUpdateBTN, setShowUpdateBTN] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
        }
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

const handleEditClose = async () => {
  setIsUpdate(false);
  await fetchMyUserData();
};

  if (loading) return <p>Lade Profildaten...</p>;
  if (!myInfo) return <p>Keine Profildaten gefunden. Bitte anmelden.</p>;

  return (
    <div className="userdata">
      <div className="myinfo-container">
        <div className="myinfo">
          <h1>Mein Benutzerkonto</h1>

          {isUpdate ? (
            <UserdataEdit onClose={handleEditClose} />
          ) : (
            <>
              <div className="myinfo-header">
                <div className="myinfo-info">
                  <div className="myinfo-icon">
                    <PiUserCircleDuotone />
                  </div>

                  <div className="myinfo-userName">
                    <h2>{myInfo.username}</h2>
                  </div>
                </div>

                <div className="update-container">
                  <button
                    className="myinfo-options"
                    onClick={() => setShowUpdateBTN((prev) => !prev)}
                    aria-expanded={showUpdateBTN}
                  >
                    <BiDotsVerticalRounded />
                  </button>

                  {showUpdateBTN && (
                    <div className="update-option">
                      <button
                        className="updatebtn"
                        onClick={() => {
                          setIsUpdate(true);
                          setShowUpdateBTN(false);
                        }}
                      >
                        <span className="useredit-icon" aria-hidden="true">
                          <LiaUserEditSolid />
                        </span>
                        Profil Bearbeiten
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="myinfo-body">
                <p>Vorname: {myInfo.firstname}</p>
                <p>Nachname: {myInfo.surname}</p>
                <p>E-Mail: {myInfo.email}</p>
                <p>Land: {myInfo.country}</p>
                <p>Straße: {myInfo.street}</p>
                <p>Postleitzahl: {myInfo.postal_code}</p>
                <p>Mobil Nummer: {myInfo.mobile}</p>
                <p>Erstellt am: {myInfo.created_at}</p>
              </div>
            </>
          )}
        </div>
        <div className = "deleteUser">
          <button className="deletebtn">
            <span className="delete-icon">
              <RiDeleteBin6Line />
            </span>
            
          </button>
        </div>
      </div>
    </div>
  );
}