import Symbol from "../Icon";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import api from "../../api";

export default function DeleteUser() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startDeleteHold = () => {
    if (isDeleting || timer.current) return;

    setIsHolding(true);

    timer.current = setTimeout(() => {
      setIsHolding(false);
      setShowDeleteConfirm(true);
      timer.current = null;
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
    if (isDeleting) return;

    stopDeleteHold();
    setShowDeleteConfirm(false);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      setIsDeleting(true);

      await api.delete("/users.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        <span
          aria-hidden="true"
          className={`hold-overlay ${isHolding ? "hold-overlay--active" : ""}`}
        >
          <Symbol name="bin" className="binIcon" />
          Konto löschen
        </span>
        <Symbol name="bin" className="binIcon" />
        Konto löschen
      </button>

      <Modal
        isOpen={showDeleteConfirm}
        hasCloseBtn
        closeButtonDisabled={isDeleting}
        onClose={closeConfirmation}
        ariaLabelledBy="delete-dialog-title"
        ariaDescribedBy="delete-dialog-description"
      >
        <div
          className="del-container"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <h2 id="delete-dialog-title">Konto löschen?</h2>

          <p id="delete-dialog-description">
            Bist du sicher, dass du dein Konto löschen möchtest? Diese Aktion
            kann nicht rückgängig gemacht werden.
          </p>

          <div className="modal-buttons">
            <button
              className="yes-btn"
              type="button"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Wird gelöscht..." : "Ja"}
            </button>

            <button
              type="button"
              className="no-btn"
              onClick={closeConfirmation}
              disabled={isDeleting}
            >
              Nein
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
