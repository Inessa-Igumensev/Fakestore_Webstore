export function Subscribe() {
  return (
    <div className="subscribe-content">
      <h3>Dem Club der Papierliebhaber beitreten</h3>
      <p>Aktuelle Infos über Neuigkeiten</p>
      
      <form className="subscribe-form">
        <div className="input-group">
          <label htmlFor="email">E-Mail-Adresse *</label>
          <input id="email" type="email" required />
        </div>
        
        <button type="submit">Abonnieren</button>
      </form>
    </div>
  );
}