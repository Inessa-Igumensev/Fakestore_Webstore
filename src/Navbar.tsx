import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Components/Login";
import Modal from "./Components/Modal";

export const Navbar = () => {
  const [seen, setSeen] = useState<boolean>(false);
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
  const [showDialog,setShowDialog] = useState<boolean>(false);

  const navigate = useNavigate();

const openLogoutDialog = () => {
    setShowDialog(true); 
  };

  const handelLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    setIsLoggedIn(false);
    setShowDialog(false);
    console.log("Erfolgreich ausgeloggt");
    navigate("/");
  }

  function togglePop() {
    setSeen(!seen);
  }

const role = isLoggedIn ? localStorage.getItem("role") : null;
  const userPath = role === "admin" ? "/admin" : "/user";

useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); 
     }
  }, [seen]); 
  
  return (
    <div className="navbar">
      <Link to="/search">
        <button className="searchProductsBtn">
          <span className=" iconSearch">
            {<FaMagnifyingGlass />}
            <span> Suchen ...</span>
          </span>
        </button>
      </Link>
      <div className="nav-middle">
        <Link to="/">Start</Link>
        <div className="productDropdown">
          <Link to="/products">Shop</Link>
          <div className="dropdown-content">
            <a href="#">Grußkarten</a>
            <a href="#">Notebooks</a>
            <a href="#">Geschenkpapier</a>
            <a href="#">Prints</a>
            <a href="#">Limitierte Auflagen</a>
          </div>
        </div>
        <Link to="/info">Info</Link>
        <Link to="/blog">Blog</Link>
        <a href="#kontakt">Kontakt</a>
      </div>
      <div className="nav-user-cart">
        <Link to={userPath}>
          <span className="iconUser"> {<LuCircleUserRound />}</span>
        </Link>
        {isLoggedIn ? (
            <button className="loginButton" onClick={openLogoutDialog}>
          Abmelden
        </button>
        ) : ( 
   <button className="loginButton" onClick={togglePop}>
          Anmelden
        </button>
        )}
     
        {seen ? <Login toggle={togglePop} /> : null}
        <Link to="/cart">
          <span className="iconCart">{<PiShoppingCartBold />}</span>
        </Link>

        <Modal
        isOpen={showDialog}
        hasCloseBtn onClose={()=> setShowDialog(false)}
        ariaLabelledBy="logout-dialog-title"
        ariaDescribedBy="logout-dialog-description"
        >
          <div
          className="del-container" // Nutzt dieselbe CSS-Struktur wie beim Löschen
          onMouseDown={(event) => event.stopPropagation()}
        >
          <h2 id="logout-dialog-title">Abmelden?</h2>

          <p id="logout-dialog-description">
            Bist du sicher, dass du dich von deinem Konto abmelden möchtest?
          </p>

          <div className="modal-buttons">
            <button
              className="yes-btn"
              type="button"
              onClick={handelLogout}
            >
              Ja
            </button>
            <button
              type="button"
              className="no-btn"
              onClick={() => setShowDialog(false)}
            >
              Nein
            </button>
          </div>
        </div>
        </Modal>

      </div>
    </div>
  );
};
