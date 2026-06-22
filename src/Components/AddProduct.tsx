import { useState } from "react";
import api from "../api";

export interface ProductProp {
  product_id: number;
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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleProductSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!imageFile) {
      console.error("Bitte ein Bild auswählen");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("label", label);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("image", imageFile);

    try {
      const response = await api.post("/products.php", formData);

      setCategory("");
      setLabel("");
      setDescription("");
      setStock("");
      setPrice("");
      setImageFile(null);

      event.currentTarget.reset();

      console.log("Produkt erfolgreich hinzugefügt", response.data);
    } catch (error: any) {
      console.error("Status:", error.response?.status);
      console.error("Antwort vom Backend:", error.response?.data);
      console.error("Fehler:", error.message);
    }
  };

  return (
    <div className="add-product">
      <form className="add-product-form" onSubmit={handleProductSubmit}>
        <div className="form-row">
          <label htmlFor="category">Kategorie:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="label">Produkt Name:</label>
          <input
            id="label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="description">Beschreibung:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="stock">Anzahl:</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="price">Preis:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="image">Bild:</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
            }}
          />
        </div>

        <button className="addProduct-Btn" type="submit">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
