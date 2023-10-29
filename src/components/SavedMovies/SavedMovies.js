import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
function SavedMovies() {
  const cardButton = 'card__delete-button';
  return (
    <div className="movies-container">
      <SearchForm />
      <MoviesCardList cardButton={cardButton} />
    </div>
  );
}

export default SavedMovies;