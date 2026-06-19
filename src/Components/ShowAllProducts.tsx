import axios from "axios";
import { useState, useEffect } from "react";
import type { ProductProp } from "./AddProduct";

export default function ShowAllProducts() {
  const [products, setProducts] = useState<ProductProp[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost/fakestore_website_API/api/products.php",
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Productsdaten", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="all-products">
      <div className="searchProductsId">Produkt suchen ...</div>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kategorie</th>
              <th>Name</th>
              <th>Beschreibung</th>
              <th>Anzahl</th>
              <th>Preis</th>
              <th>Bild</th>
              <th>Bearbeiten</th>
              <th>Löschen</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td data-title="ID">{product.product_id}</td>
                <td data-title="Kategorie">{product.category}</td>
                <td data-title="Name">{product.label}</td>
                <td data-title="Beschreibung">{product.description}</td>
                <td data-title="Anzahl">{product.stock}</td>
                <td data-title="Preis">{Number(product.price).toFixed(2)}</td>

                <td data-title="Bild">
                  {product.image ? (
                    <img
                      src={`http://localhost/fakestore_website_API/${product.image}`}
                      alt={product.label}
                      className="product-image"
                    />
                  ) : (
                    "Kein Bild"
                  )}
                </td>

                <td data-title="Bearbeiten">
                  <button className="product-Update-Btn">Bearbeiten</button>
                </td>

                <td data-title="Löschen">
                  <button className="product-Delte-Btn">Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={9}>Insgesamt {products.length} Produkte</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
