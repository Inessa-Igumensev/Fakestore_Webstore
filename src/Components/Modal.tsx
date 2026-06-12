import {
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
  type SyntheticEvent,
} from "react";

interface Modalprops {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  closeButtonDisabled?: boolean;
  onClose?: () => void;
  children: ReactNode;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export default function Modal({
  isOpen,
  hasCloseBtn = false,
  closeButtonDisabled = false,
  onClose,
  children,
  ariaDescribedBy,
  ariaLabelledBy,
}: Modalprops) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen && !modalElement.open) {
      modalElement.showModal();
    }

    if (!isOpen && modalElement.open) {
      modalElement.close();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (closeButtonDisabled) return;

    onClose?.();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <dialog
      ref={modalRef}
      className="modal-dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onCancel={handleCancel}
      onMouseDown={handleBackdropClick}
    >
      {hasCloseBtn && (
        <button
          type="button"
          className="modal-close"
          aria-label="Fenster schließen"
          onClick={handleCloseModal}
          disabled={closeButtonDisabled}
        >
          &times;
        </button>
      )}

      {children}
    </dialog>
  );
}
