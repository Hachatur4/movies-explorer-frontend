import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Card({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  saveCardId,
  nameRU,
  nameEN,
  cardButton,
  buttonAction,
  cardButtonOptions
}) {
  const [cardData, setCardData] = useState({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    saveCardId,
    nameRU,
    nameEN,
  });

  useEffect(() => {
    cardButtonOptions(movieId);
  }, []);

  function cardButtonAction() {
    buttonAction(cardData);
  }

  function timeCard() {
    const time = duration;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <article id={movieId} className="card">
      <Link to={trailerLink} target="_blank">
        <img
          className="card__image"
          src={image}
          alt="Изображение карточки фильма"
        />
      </Link>
      <div className="card__description">
        <h2 className="card__title">{nameRU}</h2>
        <button
          type="button"
          className={`card__action-button ${cardButton}`}
          onClick={cardButtonAction}
        />
      </div>
      <span className="card__duration">{timeCard()}</span>
    </article>
  );
}

export default Card;
