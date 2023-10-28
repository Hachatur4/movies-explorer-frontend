import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
function Movies() {
  const cardButton = `card__like-button ${true && "card__like-button_active"}`;
  return (
    <div className="movies-container">
      <SearchForm />
      <MoviesCardList cardButton={cardButton} />
    </div>
  );
}

export default Movies;
