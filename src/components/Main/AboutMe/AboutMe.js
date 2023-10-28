import { Link } from "react-router-dom";
import AboutMePhoto from "../../../images/AboutMePhoto.jpg";

function AboutMe() {
  return (
    <main className="aboutMe-container">
      <h2 className="aboutMe-title">Студент</h2>
      <section className="aboutMe-info">
        <div className="aboutMe-profile-container">
          <h3 className="aboutMe-profile-title">Хачатур</h3>
          <h2 className="aboutMe-profile-specialization">
            Фулл-стек разработчик
          </h2>
          <p className="aboutMe-profile-text">
            Я родился и живу в Владивостоке. Я люблю слушать музыку, а ещё
            увлекаюсь Архитектурой. Недавно закончил обучение в Yandex по
            специальности Фулл-стек разработчик. И это мой дипломный проект.
          </p>
          <Link
            to="https://github.com/Hachatur4"
            className="aboutMe-profile-link"
            target="_blank"
          >
            Github
          </Link>
        </div>
        <img className="aboutMe-profile-image" src={AboutMePhoto} alt="Фото автора" />
      </section>
    </main>
  );
}

export default AboutMe;
