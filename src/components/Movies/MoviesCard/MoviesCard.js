import React from "react";

function Card({ card, cardButton }) {

  return (
    <article className="card">
      <img
        className="card__image"
        src={card.image}
        alt="Изображение карточки фильма"
      />
      <div className="card__description">
        <h2 className="card__title">{card.nameRU}</h2>
        <button type="button" className={cardButton} />
      </div>
      <span className="card__duration">{card.duration}</span>
    </article>
  );
}

export default Card;
