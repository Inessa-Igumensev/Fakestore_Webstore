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

  const handleProductSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post<ProductProp>(
        "http://localhost/fakestore_website_API/api/products.php",
        {
          category: category,
          label: label,
          description: description,
          stock: stock,
          price: price,
          image: image,
        },
      );

      setCategory("");
      setLabel("");
      setDescription("");
      setStock("");
      setPrice("");
      setImage("");

      console.log("Produkt Erfolgreich hinzugefügt", response.data);
    } catch (error: any) {
      console.error(
        "Fehler beim Erstellen:",
        error.response?.data || error.message,
      );
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="image">Bild:</label>
          <input
            id="image"
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button className="addProduct-Btn" type="submit">
          Hinzufügen
        </button>
      </form>
    </div>
  );
}
