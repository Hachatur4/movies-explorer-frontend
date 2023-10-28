import LinkIcon from "../../images/Link-icon.svg";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  return (
    <header className={`${
      location.pathname === "/" ||
      location.pathname === "/movies" ||
      location.pathname === "/saved-movies" ||
      location.pathname === "/profile"
        ? "header-page"
        : "header-page_disabled"
    } ${location.pathname === "/" ? "header-page_theme" : ""}`}>
      <div
        className="header-container"
      >
        <Link to="/">
          <img
            className="signIn__image"
            src={LinkIcon}
            alt="Логотип с сылкой"
          />
        </Link>
        <nav className="header-box">
          <Link className="header-item" to="/register">
            Регистрация
          </Link>
          <Link className="header-item" to="/login">
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
