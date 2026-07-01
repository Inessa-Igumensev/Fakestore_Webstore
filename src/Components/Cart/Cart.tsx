import api, { getImageUrl } from "../../api";
import Symbol from "../Icon";
import { useState, useEffect } from "react";
import type { ProductProp } from "../Products/AddProduct";
import { Link } from "react-router-dom";

export interface CartItems extends ProductProp {
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Cartprops {
  isOpen: boolean;
  onClose: () => void;
  user_id: number;
}

export default function Cart({ isOpen, onClose, user_id }: Cartprops) {
  const [cart, setCart] = useState<{
    items: CartItems[];
    total_cart_price: number;
  }>({
    items: [],
    total_cart_price: 0,
  });
  const [isCouponInput, setIsCouponInput] = useState<boolean>(false);

  function showCouponInput() {
    setIsCouponInput((isCouponInput) => !isCouponInput);
  }

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.get(`/cart.php`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs", error);
    }
  };

  const totalQuantity = () => {
    const items = cart.items || [];
    let totalItems: number = 0;

    for (let i = 0; i < items.length; i++) {
      totalItems += items[i].quantity;
    }
    return totalItems;
  };

  const handleCartUpdate = async (
    product_id: number,
    currentQuantity: number,
    change: number,
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const newQuantity = currentQuantity + change;
    try {
      await api.put(
        `/cart.php`,
        {
          product_id: product_id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Warenkorbes", error);
    }
  };

  const deleteItem = async (product_id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.delete(`/cart.php`, {
        data: {
          product_id: product_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Fehler beim Löschen des Produkts", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, user_id]);

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      <div className={`cart-wrapper ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="cart-header-pad">
            <div className="cart-header-text">
              <h1>Warenkorb</h1>
              <span>({totalQuantity()} Artikel)</span>
            </div>

            <button className="cart-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>

        <div className="cart-products-list">
          {cart.items.length === 0 ? (
            <p className="cart-empty">Dein Warenkorb ist leer</p>
          ) : (
            <ul className="cart-items-ul">
              {cart.items.map((item) => (
                <li className="card-products" key={item.product_id}>
                  <div className="cart-product-img-container">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.label}
                        className="cart-product-image"
                      />
                    ) : (
                      "Kein Bild"
                    )}
                  </div>

                  <div className="cart-items-info">
                    <p>
                      <Link
                        to={`/products/detail/${item.product_id}`}
                        className="cart-product-link"
                        onClick={onClose}
                      >
                        <span> {item.label}</span>
                      </Link>
                    </p>
                    <p>
                      <span>{Number(item.unit_price).toFixed(2)} €</span>
                    </p>
                    <div className="cart-item-quantity-price">
                      <div className="qty-Btns">
                        <button
                          className="qty-count"
                          onClick={() =>
                            handleCartUpdate(item.product_id, item.quantity, -1)
                          }
                        >
                          <Symbol name="minus" />
                        </button>
                        <div className="qty-display">{item.quantity}</div>
                        <button
                          className="qty-count"
                          onClick={() =>
                            handleCartUpdate(item.product_id, item.quantity, +1)
                          }
                        >
                          <Symbol name="plus" />
                        </button>
                      </div>
                      <div className="cart-item-total-price">
                        <span>{Number(item.total_price).toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="delete-cart-item-Btn"
                    onClick={() => deleteItem(item.product_id)}
                    aria-label="Artikel entfernen"
                  >
                    <Symbol name="bin" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-bottom">

          <div className="cart-coupon-container">
            <button className={`coupon-code ${isCouponInput ? 'active-open' : ''}`} 
            onClick={showCouponInput}>
              <Symbol name="tag" className="coupon-tag" />
              <span>Gutscheincode eingeben</span>
            </button>
            {isCouponInput && (
              <div className="coupon-input-wrapper">
                <input className="coupon-input" placeholder="z.B 50SPAREN" />
                <button className="use-coupon-Btn">Anwenden</button>
              </div>
            )}
          </div>

          <span className="total-cart-price">
            Gesamtsumme {Number(cart.total_cart_price).toFixed(2)} €
          </span>
          <button className="checkout-Btn">Zur Kasse</button>
          <button className="show-cart-Btn">Warenkorb ansehen</button>
        </div>
      </div>
    </>
  );
}
