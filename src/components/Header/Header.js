import LinkIcon from "../../images/Link-icon.svg";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile"
          ? "header-container"
          : "header-container_disabled"
      } ${location.pathname === "/" ? "header-container_theme" : ""}`}
    >
      <Link to="/">
        <img className="signIn__image" src={LinkIcon} alt="Логотип с сылкой" />
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
  );
}

export default Header;
