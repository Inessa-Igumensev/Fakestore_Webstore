import Collapsible from "./Collapsible";
import Symbol from "./Icon";

export default function ProductDetails() {
  return (
    <div className="product-details">
      <div className="product-route">
        <div className="product-routing">Start / Kategorie / Label</div>
        <div className="product-back-more"> Zurück | Weiter</div>
      </div>
      <div className="product-information">
        <div className="product-meta-dates">
          <div className="product-img">Bild</div>
          <div className="product-description">
            <p>
              Ich bin eine Produktbeschreibung. Bewerbe hier dein Produkt und
              gewinne die Aufmerksamkeit deiner Kunden. Beschreibe es klar und
              deutlich in deinen eigenen Worten. Verwende einzigartige Keywords.
            </p>
          </div>
        </div>
        <div className="product-buy-container">
          <div className="product-label">Label</div>
          <div className="product-buy-number">Anzahl</div>
          <button className="put-in-cart-Btn">In den Warenkorb</button>
          <div className="product-collapsible-container">
            <Collapsible label="Produktinfo">Produkinfo</Collapsible>
            <hr />
            <Collapsible label="Rückgaberecht">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </Collapsible>
            <hr />
            <Collapsible label="Versandinformationen">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam.
              </p>
            </Collapsible>
            <div className="social-media-container-svg">
              <Symbol name="facebook" className="Icons-SVG" />
              <Symbol name="pinterest" className="Icons-SVG" />
              <Symbol name="whatsapp" className="Icons-SVG" />
              <Symbol name="twitter" className="Icons-SVG" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
