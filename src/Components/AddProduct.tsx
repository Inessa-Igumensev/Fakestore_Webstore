import { useState } from "react";
import axios from "axios";

export interface ProductProp {
  id?: number;
  category: string;
  label: string;
  description: string;
  stock: number;
  price: number;
  image: string;
}

export default function AddProduct() {
  const [category, setCategory] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");

  return (
    <div className="add-product">
      <form className="add-product-form">
        <label>Produkt Art</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Produkt Name</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <label>Beschreibung</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Anzahl</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <label>Preis</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Bild</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </form>
    </div>
  );
}
