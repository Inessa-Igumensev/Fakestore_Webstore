export function Subscribe() {
  return (
    <div className="subscribe-content">
      <div className="subscribe-container">
        <h3>Dem Club der Papierliebhaber beitreten</h3>
        <p>Aktuelle Infos über Neuigkeiten</p>

        <form className="subscribe-form">
          <label htmlFor="email">E-Mail-Adresse *</label>
          <input id="email" type="email" required />
          <div className="abo-newsletter">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">
              Ja, ich möchte Ihren Newsletter abonnieren. *
            </label>
          </div>
          <button type="submit">Abonnieren</button>
        </form>
      </div>
    </div>
  );
}
