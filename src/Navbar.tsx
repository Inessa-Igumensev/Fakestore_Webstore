import Symbol from "./Components/Icon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
import Login from "./Components/User/Login";
import Modal from "./Components/Modal";
import Cart from "./Components/Cart/Cart";

export const Navbar = () => {
  const [seen, setSeen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");
  const [showCart, setShowCart] = useState<boolean>(false);
  const { user_id } = useParams<{ user_id: string }>();

  const navigate = useNavigate();

  const openLogoutDialog = () => {
    setShowDialog(true);
  };

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setShowDialog(false);
    console.log("Erfolgreich ausgeloggt");
    navigate("/");
  };

  const fetchCartquantity = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setQuantity("0");
      return;
    }

    try {
      const response = await api.get(`/cart.php?`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.items && Array.isArray(response.data.items)) {
        let totalItems: number = 0;

        for (let i = 0; i < response.data.items.length; i++) {
          totalItems += response.data.items[i].quantity;
        }

        setQuantity(totalItems.toString());
      } else {
        setQuantity("0");
      }
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs", error);
      setQuantity("0");
    }
  };

  useEffect(() => {
    fetchCartquantity();

    const handleCartUpdateEvent = () => {
      fetchCartquantity();
    };

    window.addEventListener("cartUpdated", handleCartUpdateEvent);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdateEvent);
    };
  }, [user_id]);

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
          <span>
            <Symbol name="magnifyingglass" />
          </span>
          <span> Suchen ...</span>
        </button>
      </Link>
      <div className="nav-middle">
        <Link to="/">Start</Link>
        <div className="productDropdown">
          <Link to="/products">Shop</Link>
          <div className="dropdown-content">
            <Link to="/products/grußkarten">Grußkarten</Link>
            <Link to="/products/notebooks">Notizbücher</Link>
            <Link to="/products/geschenkpapier">Geschenkpapier</Link>
            <Link to="/products/prints">Prints</Link>
            <a href="#">Limitierte Auflagen</a>
          </div>
        </div>
        <Link to="/info">Info</Link>
        <Link to="/blog">Blog</Link>
        <a href="#kontakt">Kontakt</a>
      </div>
      <div className="nav-user-cart">
        <Link to={userPath}>
          <span className="iconUser"> {<Symbol name="user" />}</span>
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

        <div className="cart-container">
          <span className="iconCart" onClick={() => setShowCart(true)}>
            <Symbol name="cart" />
          </span>
          <button
            className="user-cart-Btn"
            type="button"
            onClick={() => setShowCart(true)}
          >
            {quantity}
          </button>
        </div>
        <Cart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          user_id={Number(user_id)}
        />

        <Modal
          isOpen={showDialog}
          hasCloseBtn
          onClose={() => setShowDialog(false)}
          ariaLabelledBy="logout-dialog-title"
          ariaDescribedBy="logout-dialog-description"
        >
          <div
            className="del-container"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 id="logout-dialog-title">Abmelden?</h2>

            <p id="logout-dialog-description">
              Bist du sicher, dass du dich von deinem Konto abmelden möchtest?
            </p>

            <div className="modal-buttons">
              <button className="yes-btn" type="button" onClick={handelLogout}>
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
