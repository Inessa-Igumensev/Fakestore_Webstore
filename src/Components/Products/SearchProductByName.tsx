import api from "../../api";
import { useState } from "react";
import type { ProductProp } from "./AddProduct";

export interface SearchProductProps {
  onSearchResults: (results: ProductProp[]) => void;
  onClearSearch: () => void;
}

export default function SearchProductByName({
  onSearchResults,
  onClearSearch,
}: SearchProductProps) {
  const [searchProduct, setSearchProduct] = useState<string>("");

  const handleProductSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchProduct.trim()) {
      onClearSearch();
      return;
    }

    try {
      const response = await api.get(
        `/products.php?label=${encodeURIComponent(searchProduct)}`,
      );
      onSearchResults(response.data);
    } catch (error) {
      console.error("Fehler beim Suchen des Produkts", error);
      onClearSearch();
    }
  };

  return (
    <div className="searchProducts">
      <form className="search-product-form" onSubmit={handleProductSearch}>
        <input
          type="text"
          placeholder="Produkt Suchen ..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
        <button className="productSearcht" type="submit">
        </button>
      </form>
    </div>
  );
}
