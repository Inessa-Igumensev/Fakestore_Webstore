import { useState, useEffect } from "react";
import type { ProductProp } from "./AddProduct";
import api, { getImageUrl } from "../api";
import SearchProductByName from "./SearchProductByName";

export default function ShowAllProducts() {
  const [products, setProducts] = useState<ProductProp[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await api.get("/products.php");

      setProducts(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Productsdaten", error);
    }
  };

  const handleDeleteProducts = async (productId: number) => {
    try {
      const response = await api.delete(`/products.php?id=${productId}`);
      alert(response.data.message);
      fetchAllProducts();
    } catch (error) {
      console.error("Fehler beim Löschen des Produkts", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="all-products">
      <SearchProductByName
        onSearchResults={(results) => setProducts(results)}
        onClearSearch={fetchAllProducts}
      />
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
                      src={getImageUrl(product.image)}
                      alt={product.label}
                      className="product-image"
                      style={{ maxWidth: "80px", height: "auto" }}
                    />
                  ) : (
                    "Kein Bild"
                  )}
                </td>

                <td data-title="Bearbeiten">
                  <button className="product-Update-Btn">Bearbeiten</button>
                </td>

                <td data-title="Löschen">
                  <button
                    className="product-Delte-Btn"
                    onClick={() => handleDeleteProducts(product.product_id)}
                  >
                    Löschen
                  </button>
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
