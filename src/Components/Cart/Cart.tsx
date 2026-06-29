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
    try {
      const response = await api.get(`/cart.php?user_id=${user_id}`);
      setCart(response.data);
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs", error);
    }
  };

  const totalQuantity = () => {
    let totalItems: number = 0;

    for (let i = 0; i < cart.items.length; i++) {
      totalItems += cart.items[i].quantity;
    }
    return totalItems;
  };

  const handleCartUpdate = async (
    product_id: number,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    try {
      await api.put(`/cart.php`, {
        user_id: user_id,
        product_id: product_id,
        quantity: newQuantity,
      });

      fetchCart();
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Warenkorbes", error);
    }
  };

  const deleteItem = async (product_id: number) => {
    try {
      await api.delete(`/cart.php`, {
        data: { user_id: user_id, product_id: product_id },
      });
      fetchCart();
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

      <div className={`cart-container ${isOpen ? "open" : ""}`}>
        <div className="cart-pad">
          <div className="cart-header">
            <h1>Warenkorb</h1>
            <span>{totalQuantity()} Artikel</span>
            <button className="cart-close" onClick={onClose}>
              &times;
            </button>
          </div>
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
                        className="product-image"
                        style={{ maxWidth: "80px", height: "auto" }}
                      />
                    ) : (
                      "Kein Bild"
                    )}
                  </div>
                  <div className="cart-clumn-2">
                    <span>{item.label}</span>
                    <span>{item.unit_price} €</span>
                    <div className="qty-Btns">
                      <button
                        className="qty-count"
                        onClick={() =>
                          handleCartUpdate(item.product_id, item.quantity, -1)
                        }
                      >
                        <Symbol name="minus" />
                      </button>
                      <span>{item.quantity}</span>
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
                    <span className="delete-cart-item" 
                    onClick={() => deleteItem(item.product_id)}
                    >{<Symbol name="bin" />} </span>
                    <span>{item.total_price} €</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="code">Gutschein code eingeben</div>
          <div className="cart-bottom">
            <span>Gesamtsumme {cart.total_cart_price} €</span>
            <button className="cheackout-Btn">Zur Kasse</button>
            <button className="show-cart">Warenkorb ansehen</button>
          </div>
        </div>
      </div>
    </>
  );
}
