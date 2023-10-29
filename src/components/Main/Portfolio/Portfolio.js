import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio-container">
      <h2 className="portfolio-title">Портфолио</h2>
      <div className="portfolio-links">
        <Link
          to="https://github.com/Hachatur4/how-to-learn.git"
          className="portfolio-link-item"
          target="_blank"
        >
          Статичный сайт
          <span className="portfolio-link-icon"></span>
        </Link>
        <Link
          to="https://github.com/Hachatur4/russian-travel.git"
          className="portfolio-link-item"
          target="_blank"
        >
          Адаптивный сайт
          <span className="portfolio-link-icon"></span>
        </Link>
        <Link
          to="https://github.com/Hachatur4/react-mesto-api-full-gha.git"
          className="portfolio-link-item"
          target="_blank"
        >
          Одностраничное приложение
          <span className="portfolio-link-icon"></span>
        </Link>
      </div>
    </section>
  );
}

export default Portfolio;
