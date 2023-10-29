import iconPromo from "../../../images/Main-Promo-linePicture.svg";
function Promo() {
  return (
    <section className="promo-page">
      <div className="promo-container">
        <h1 className="promo-title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className="promo-icon" src={iconPromo} alt="Иконка Промо" />
      </div>
    </section>
  );
}

export default Promo;
