import axios from "axios";
import { useState, useEffect } from "react";
import type { Userprop } from "./Registration";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { LiaUserEditSolid } from "react-icons/lia";
import DeleteUser from "./UserDelete";
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

  const handleEditClose = async () => {
    setIsUpdate(false);
    await fetchMyUserData();
  };

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
        <p>Keine Profildaten gefunden. Bitte anmelden.</p>
      </div>
    );
  }

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
                    type="button"
                    className="myinfo-options"
                    onClick={() => setShowUpdateBTN((prev) => !prev)}
                    aria-expanded={showUpdateBTN}
                    aria-controls="profile-update-menu"
                  >
                    <BiDotsVerticalRounded />
                  </button>

                  <div
                    id="profile-update-menu"
                    className={`update-option ${
                      showUpdateBTN ? "update-option--open" : ""
                    }`}
                    aria-hidden={!showUpdateBTN}
                  >
                    <button
                      type="button"
                      className="updatebtn"
                      tabIndex={showUpdateBTN ? 0 : -1}
                      onClick={() => {
                        setIsUpdate(true);
                        setShowUpdateBTN(false);
                      }}
                    >
                      <span className="useredit-icon" aria-hidden="true">
                        <LiaUserEditSolid />
                      </span>
                      Profil bearbeiten
                    </button>
                  </div>
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

              <DeleteUser />
            </>
          )}
        </div>
      </div>
    </div>
  );
}