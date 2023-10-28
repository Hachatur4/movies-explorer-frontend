import LinkIcon from "../../../images/Link-icon.svg";
import { Link, useLocation } from "react-router-dom";
import burgerIcon from "../../../images/navTab-burger-icon.svg";
function NavTab() {
  const location = useLocation();
  function openMenu() {
    const menuActive = document.querySelector(".navTab-mobile-menu");
    menuActive.classList.add("navTab-mobile-menu_active");
  }
  function closeMenu() {
    const menuActive = document.querySelector(".navTab-mobile-menu");
    menuActive.classList.remove("navTab-mobile-menu_active");
  }

  return (
    <div
      className={`${
        location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile"
          ? "navTab-container"
          : "navTab-container_disabled"
      } ${location.pathname === "/" ? "navTab-container_theme" : ""}`}
    >
      <Link to="/">
        <img className="signIn__image" src={LinkIcon} alt="Логотип с сылкой" />
      </Link>
      <nav className="navTab-box">
        <Link className="navTab-item" to="/movies">
          Фильмы
        </Link>
        <Link className="navTab-item" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </nav>
      <Link
        className={`navTab-profile-item ${
          location.pathname === "/" ? "navTab-profile-item_theme" : ""
        }`}
        to="/profile"
      >
        Аккаунт
        <span
          className={`navTab-item-icon ${
            location.pathname === "/" ? "navTab-item-icon_theme" : ""
          }`}
        ></span>
      </Link>
      <div className="navTab-mobile">
        <img
          className="navTab-mobile__burger"
          src={burgerIcon}
          alt="Кнопка меню"
          onClick={openMenu}
        />
        <section className="navTab-mobile-menu">
          <span
            onClick={closeMenu}
            className="navTab-mobile-menu__close"
          ></span>
          <nav className="navTab-mobile-links">
            <Link className="navTab-mobile-item" to="/" onClick={closeMenu}>
              Главная
            </Link>
            <Link
              className="navTab-mobile-item"
              to="/movies"
              onClick={closeMenu}
            >
              Фильмы
            </Link>
            <Link
              className="navTab-mobile-item"
              to="/saved-movies"
              onClick={closeMenu}
            >
              Сохранённые фильмы
            </Link>
            <Link
              className="navTab-mobile-profile-item"
              to="/profile"
              onClick={closeMenu}
            >
              Аккаунт
              <span
                className={`navTab-item-icon ${
                  location.pathname === "/" ? "navTab-item-icon_theme" : ""
                }`}
              ></span>
            </Link>
          </nav>
        </section>
      </div>
    </div>
  );
}

export default NavTab;
