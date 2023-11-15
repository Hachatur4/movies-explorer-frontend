import { React, useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import NotMovieTitle from "./NotMovieTitle/NotMovieTitle";
import Card from "../Movies/MoviesCard/MoviesCard";

function SavedMovies({
  saveArrayCard,
  buttonAction,
  changeMoviesData,
  windowSizeRange,
  setpreloaderActive,
  saveArrayCardForSeacrh,
  searchSaveMovieFormData,
  setSearchSaveMovieFormData
}) {
  const [cardLength, setCardLength] = useState([]);
  const [notSeacrhMovie, setNotSeacrhMovie] = useState(false);

  function cardButtonOptions(item) {}

  useEffect(() => {
    const addCard = (start, limit) => {
      const result = saveArrayCard.slice(start, limit);
      const card = result.map((card) => {
        return (
          <Card
            key={card._id}
            country={card.country}
            director={card.director}
            duration={card.duration}
            year={card.year}
            description={card.description}
            image={card.image}
            trailerLink={card.trailerLink}
            thumbnail={card.thumbnail}
            movieId={card._id}
            saveCardId={card.movieId}
            nameRU={card.nameRU}
            nameEN={card.nameEN}
            cardButton="card__delete-button"
            buttonAction={buttonAction}
            cardLength={cardLength}
            cardButtonOptions={cardButtonOptions}
          />
        );
      });
      setCardLength(card);
    };

    addCard(windowSizeRange.start, windowSizeRange.limit);
  }, [saveArrayCard, windowSizeRange]);

  return (
    <div className="movies-container">
      <SearchForm
        searchData={setSearchSaveMovieFormData}
        searchMovieFormData={searchSaveMovieFormData}
        setNotSeacrhMovie={setNotSeacrhMovie}
        arrayCard={saveArrayCardForSeacrh}
        changeMoviesData={changeMoviesData}
        setpreloaderActive={setpreloaderActive}
        checkedStatusLS='true'
      />
      {saveArrayCard.length === 0 ? (
        <NotMovieTitle title={"Список сохраненный фильмов пуст"} />
      ) : notSeacrhMovie ? (
        <NotMovieTitle title={"Ничего не найдено"} />
      ) : (
        <MoviesCardList cardLength={cardLength} />
      )}
    </div>
  );
}

export default SavedMovies;
