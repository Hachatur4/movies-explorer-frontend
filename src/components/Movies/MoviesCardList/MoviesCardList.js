import { React, useEffect, useState } from "react";
import arrayCard from "../../../utils/cardArray";
import Card from "../MoviesCard/MoviesCard";

function MoviesCardList({ cardButton }) {
  const [width, setWidth] = useState({});
  const [cardLength, setCardLength] = useState([]);
  const [fullCardArray, setfullCardArray] = useState(arrayCard);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 480px)");
    const tablet = window.matchMedia(
      "(min-width: 481px) and (max-width: 770px)"
    );
    const desk = window.matchMedia("(min-width: 771px)");
    setWidth({
      mobile: mobile.matches,
      tablet: tablet.matches,
      desk: desk.matches,
    });
    windowSize(mobile, tablet, desk);
  }, []);

  function windowSize(mobile, tablet, desk) {
    if (mobile.matches) {
      return addCard(0, 5);
    }
    if (tablet.matches) {
      return addCard(0, 8);
    }
    if (desk.matches) {
      return addCard(0, 16);
    }
  }

  const addCard = (start, limit) => {
    const result = arrayCard.slice(start, limit);
    const card = result.map((card) => {
      return <Card key={card.movieId} card={card} cardButton={cardButton} />;
    });
    setCardLength(card);
    if (cardLength.length === fullCardArray.length) {
      return disabledButton();
    }
  };
  const disabledButton = () => {
    return (document.querySelector(".card-list__button").style.display =
      "none");
  };
  const addCardButton = () => {
    if (width.mobile) {
      return addCard(0, cardLength.length + 2);
    }
    if (width.tablet) {
      return addCard(0, cardLength.length + 4);
    }
    if (width.desk) {
      return addCard(0, cardLength.length + 4);
    }
  };

  return (
    <>
      <section className="card-list">{cardLength}</section>
      <button
        type="button"
        className="card-list__button"
        onClick={() => addCardButton()}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
