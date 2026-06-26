import Cat from "../../assets/Cat.jpeg";

export default function Info() {
  return (
    <div className="info">
      <div className="blog-headline">
        <h1>Über Beispiel</h1>
      </div>
      <div className="blog-picture">
        <img src={Cat} alt="a cat hanging by its claws"></img>
      </div>
      <div className="infoLowerSection">
        <div className="spacing-infoLowerSection">
          <p>
            <span>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </span>
          </p>

          <p>
            <span>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
