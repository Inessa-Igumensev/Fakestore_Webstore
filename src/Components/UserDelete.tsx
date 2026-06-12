import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function DeleteUser() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startDeleteHold = () => {
    if (isDeleting) return;

    setIsHolding(true);

    timer.current = setTimeout(() => {
      setIsHolding(false);
      setShowDeleteConfirm(true);
    }, 2000);
  };

  const stopDeleteHold = () => {
    setIsHolding(false);

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const closeConfirmation = () => {
    setShowDeleteConfirm(false);
    setIsHolding(false);
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      setIsDeleting(true);
      await axios.delete(
        "http://localhost/fakestore_website_API/api/users.php",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.removeItem("token");
      alert("Dein Benutzerkonto wurde gelöscht.");
      window.location.href = "/";
    } catch (error) {
      console.error("Fehler beim Löschen des Benutzerkontos:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div className="deleteUser">
      <button
        type="button"
        className="deletebtn"
        onPointerDown={startDeleteHold}
        onPointerUp={stopDeleteHold}
        onPointerLeave={stopDeleteHold}
        onPointerCancel={stopDeleteHold}
        disabled={isDeleting}
      >
        <span aria-hidden="true" className="hold-overlay">
          <RiDeleteBin6Line className="binIcon" />
        Konto löschen
        </span>
        <RiDeleteBin6Line className="binIcon" />
        Konto löschen
      </button>
      {showDeleteConfirm && (
        <div className="del-popUp" role="alert">
          <button
            className="del-close-btn"
            type="button"
            aria-label="Fenster schließen"
            onClick={closeConfirmation}
          >
            &times;
          </button>
          <div className="del-container">
            <p>Bist du dir sicher das du deinen Acount löschen willst ?</p>
            <div className="del-buttons-group"></div>
            <button
              className="yes-btn"
              type="button"
              onClick={handleDeleteAccount}
            >
              Ja
            </button>
            <button
              type="button"
              className="no-btn"
              onClick={closeConfirmation}
            >
              Nein
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
