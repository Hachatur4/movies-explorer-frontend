import { useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  return (
    <footer
      className={`${
        location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies"
          ? "footer-container"
          : "footer-container_disabled"
      }`}
    >
      <h2 className="footer-title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer-information">
        <p className="footer-information__text footer-information__text-year">
          © 2023
        </p>
        <div className="footer-information__box">
          <p className="footer-information__text">Яндекс.Практикум</p>
          <p className="footer-information__text">Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
