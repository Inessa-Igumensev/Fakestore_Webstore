import api, { getImageUrl } from "../../api";
import Symbol from "../Icon";
import { useState, useEffect } from "react";
import type { ProductProp } from "../Products/AddProduct";

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
        <div className="cart-gap">
          <div className="cart-products-list">
            {cart.items.length === 0 ? (
              <p className="cart-empty">Dein Warenkorb ist leer</p>
            ) : (
              
              cart.items.map((item) => (
                <div className="card-products" key={item.product_id}>
                  <div className="cart-product-img">
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

                  <div className="cart-clumn-2">
                    <p>
                      <span>{item.label}</span>
                    </p>
                    <p>
                      <span>{item.unit_price} €</span>
                    </p>
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
                  </div>

                  <div className="cart-clumn-3">
                    <span
                      className="delete-cart-item"
                      onClick={() => deleteItem(item.product_id)}
                    >
                      <Symbol name="bin" />
                    </span>

                    <div className="cart-item-total-price">
                      <span>{item.total_price} €</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="card-bottom">
            <div className="coupon-code">
              <Symbol name="tag" className="coupon-tag" />
              Gutschein code eingeben
            </div>
            <span>Gesamtsumme {cart.total_cart_price} €</span>
            <button className="checkout-Btn">Zur Kasse</button>
            <button className="show-cart-Btn">Warenkorb ansehen</button>
          </div>
        </div>
      </div>
    </>
  );
}
