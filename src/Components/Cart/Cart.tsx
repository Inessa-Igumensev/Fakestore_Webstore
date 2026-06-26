export default function Cart() {
  return (
    <div className="cart-container">
      <div className="cart-pad">
        <div className="cart-header">
          <h1>Warenkorb</h1>
          <span>(5 Artikel)</span>
          <button className="cart-close">&times;</button>
        </div>
        <div className="cart-products">
          <div className="cart-product-img">Produkt Bild</div>
          <div className="cart-clumn-2">
            <span>Label</span>
            <span>Price</span>
            <span> anzahl button </span>
          </div>
          <div className="cart-clumn-3">
            <span>delte</span>
            <span>gesamtpreis</span>
          </div>
        </div>
        <div className="code">
            Gutschein code eingeben
        </div>
        <div className="cart-bottom">
            <span>Gesamt summe alles</span>
            <span>zu Kasse</span>
            <span>CartDetails</span>
        </div>
      </div>
    </div>
  );
}
