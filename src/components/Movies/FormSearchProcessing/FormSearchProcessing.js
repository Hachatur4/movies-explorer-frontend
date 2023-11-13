function FormSearchProcessing({
  searchMovieFormData,
  arrayCard,
  setNotSeacrhMovie,
  changeMoviesData,
  setpreloaderActive,
}) {
  if (searchMovieFormData.checkbox === true) {
    const moviesSearchDuration = arrayCard.filter((movie) => {
      if (
        movie.nameRU
          .toLowerCase()
          .includes(searchMovieFormData.inputValue.toLowerCase()) ||
        movie.nameEN
          .toLowerCase()
          .includes(searchMovieFormData.inputValue.toLowerCase())
      ) {
        if (movie.duration <= 40) {
          setNotSeacrhMovie(false);
          return movie;
        }
      }
      return setNotSeacrhMovie(true);
    });
    if (moviesSearchDuration.length === 0) {
      setpreloaderActive(false);
      return setNotSeacrhMovie(true);
    }
    setNotSeacrhMovie(false);
    return changeMoviesData(moviesSearchDuration);
  }

  const moviesSearch = arrayCard.filter((movie) => {
    if (
      movie.nameRU
        .toLowerCase()
        .includes(searchMovieFormData.inputValue.toLowerCase()) ||
      movie.nameEN
        .toLowerCase()
        .includes(searchMovieFormData.inputValue.toLowerCase())
    ) {
      setNotSeacrhMovie(false);
      return movie;
    }
    setpreloaderActive(false);
    return setNotSeacrhMovie(true);
  });
  if (moviesSearch.length === 0) {
    setpreloaderActive(false);
    return setNotSeacrhMovie(true);
  }
  setNotSeacrhMovie(false);
  return changeMoviesData(moviesSearch);
}

export default FormSearchProcessing;
