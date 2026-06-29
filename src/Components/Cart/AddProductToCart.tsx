import Symbol from "../Icon";
import api from "../../api";
import { useState } from "react";

export interface AddProductToCartProps {
  user_id: number;
  product_id: number;
  isCartUpdate?: () => void;
}

export default function AddProductToCart({
  user_id,
  product_id,
  isCartUpdate,
}: AddProductToCartProps) {
  const [nowQty, setNowQty] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuantityChange = (change: number) => {
    setNowQty((prev) => {
      const changeQuantity = prev + change;
      return changeQuantity < 1 ? 1 : changeQuantity;
    });
  };
  const handleAddToCart = async () => {
    if (!user_id) {
      alert("Bitte melde dich zuerst an!");
      return;
    }
    setIsLoading(true);

    try {
      await api.post(`/cart.php`, {
        user_id: user_id,
        product_id: product_id,
        quantity: nowQty,
      });
      if (isCartUpdate) {
        isCartUpdate();
      }
      setNowQty(0);
    } catch (error) {
      console.error("Fehler beim Hinzufügen zum Warenkorb", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-to-cart">
      <div className="qty-Btns">
        <button
          className="qty-count"
          type="button"
          onClick={() => handleQuantityChange(-1)}
        >
          <Symbol name="minus" />
        </button>

        <span className="qty-display">{nowQty}</span>

        <button
          className="qty-count"
          type="button"
          onClick={() => handleQuantityChange(1)}
        >
          <Symbol name="plus" />
        </button>
      </div>

      <button
        className="put-in-cart-Btn"
        onClick={handleAddToCart}
        disabled={isLoading}
      >
        {isLoading ? "Wird hinzugefügt..." : "In den Warenkorb"}
      </button>
    </div>
  );
}
