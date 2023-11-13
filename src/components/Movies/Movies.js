import { React, useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Card from "./MoviesCard/MoviesCard";
import NotMovieTitle from "../SavedMovies/NotMovieTitle/NotMovieTitle";

function Movies({
  arrayCard,
  buttonAction,
  saveArrayCard,
  changeMoviesData,
  windowSizeRange,
  setWindowSizeRange,
  width,
  searchMovieFormData,
  setSearchMovieFormData,
  setpreloaderActive,
  arrayCardForSeacrh,
  checkedStatusLS,
  cardLength,
  setCardLength,
  fullCardArray,
}) {
  const [notSeacrhMovie, setNotSeacrhMovie] = useState(false);

  function cardButtonOptions(item) {
    const ok = saveArrayCard.find((element) => element.movieId === item);
    if (ok) {
      const idElement = document.getElementById(ok.movieId);
      const idElementButton = idElement.querySelector("button");
      return idElementButton.classList.add("card__like-button_active");
    }
  }

  useEffect(() => {
    const disabledButton = () => {
      console.log("отключаюсь кнопка");
      return (document.querySelector(".card-list__button").style.display =
        "none");
    };
    const activateButton = () => {
      console.log("включаюсь кнопка");
      return (document.querySelector(".card-list__button").style.display =
        "block");
    };

    const addCard = (start, limit) => {
      const result = arrayCard.slice(start, limit);
      console.log("arrayCard START-LIMIT", start, "----", limit);
      const cards = result.map((card) => {
        return (
          <Card
            key={card.id}
            country={card.country}
            director={card.director}
            duration={card.duration}
            year={card.year}
            description={card.description}
            image={`https://api.nomoreparties.co/${card.image.url}`}
            trailerLink={card.trailerLink}
            thumbnail={`https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`}
            movieId={card.id}
            saveCardId=""
            nameRU={card.nameRU}
            nameEN={card.nameEN}
            cardButton="card__like-button"
            buttonAction={buttonAction}
            cardButtonOptions={cardButtonOptions}
          />
        );
      });

      setCardLength(cards);
      if (
        cardLength.length === fullCardArray.length - 1 ||
        cardLength.length === fullCardArray.length
      ) {
        console.log("end");
        return disabledButton();
      }return activateButton()

    };
    addCard(windowSizeRange.start, windowSizeRange.limit);
  }, [arrayCard, windowSizeRange]);

  const addCardButton = () => {
    if (width.mobile) {
      return setWindowSizeRange({
        start: 0,
        limit: cardLength.length + 2,
      });
    }
    if (width.tablet) {
      return setWindowSizeRange({
        start: 0,
        limit: cardLength.length + 4,
      });
    }
    if (width.smallDesk) {
      return setWindowSizeRange({
        start: 0,
        limit: cardLength.length + 3,
      });
    }
    if (width.desk) {
      return setWindowSizeRange({
        start: 0,
        limit: cardLength.length + 4,
      });
    }
  };

  return (
    <div className="movies-container">
      <SearchForm
        searchData={setSearchMovieFormData}
        arrayCard={arrayCardForSeacrh}
        searchMovieFormData={searchMovieFormData}
        setNotSeacrhMovie={setNotSeacrhMovie}
        changeMoviesData={changeMoviesData}
        setpreloaderActive={setpreloaderActive}
        checkedStatusLS={checkedStatusLS}
      />
      {notSeacrhMovie ? (
        <NotMovieTitle title={"Ничего не найдено"} />
      ) : (
        <MoviesCardList cardLength={cardLength} addCardButton={addCardButton} />
      )}
    </div>
  );
}

export default Movies;
