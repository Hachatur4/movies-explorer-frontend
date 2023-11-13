import searchLupa from "../../../images/search-icon-lupa.svg";
import FormSearchProcessing from "../FormSearchProcessing/FormSearchProcessing";

function SearchForm({
  SearchData,
  searchMovieFormData,
  seachTabMemoryActive,
  arrayCard,
  setNotSeacrhMovie,
  changeMoviesData,
  setpreloaderActive,
}) {
  const checkboxElement = document.querySelector(".search__form-input-filter");

  const onChange = (e) => {
    SearchData({
      ...searchMovieFormData,
      inputValue: e.target.value,
    });
  };

  function checkboxStatusMemory() {
    if (seachTabMemoryActive) {
      return searchMovieFormData.checkbox && "search__form-input-filter-custom";
    }
  }

  function clickCheckbox() {
    if (
      checkboxElement.classList.contains("search__form-input-filter-custom")
    ) {
      checkboxElement.classList.remove("search__form-input-filter-custom");
      return SearchData({
        ...searchMovieFormData,
        checkbox: "false",
      });
    }
    checkboxElement.classList.add("search__form-input-filter-custom");
    return SearchData({
      ...searchMovieFormData,
      checkbox: "true",
    });
  }

  function submit(e) {
    e.preventDefault();
    const error = document.querySelector(".search-form__input-error");
    if (SearchData.inputValue === "") {
      return (error.style.display = "block");
    }
    error.style.display = "none";
    setpreloaderActive(true);
    FormSearchProcessing({
      searchMovieFormData,
      arrayCard,
      setNotSeacrhMovie,
      changeMoviesData,
      setpreloaderActive,
    });
  }

  return (
    <div className="search-container">
      <section className="search__box">
        <img className="search__lupa" src={searchLupa} alt="Изображение лупа" />
        <form name="search-form" className="search__form" onSubmit={submit}>
          <label className="search__form-field">
            <input
              type="text"
              placeholder="Фильм"
              className="search__form-input"
              onChange={onChange}
              value={searchMovieFormData.inputValue}
            />
            <span className={`search-form__input-error`}>
              Поле не может быть пустым
            </span>
          </label>
          <button type="submit" className="search__form-button">
            Найти
          </button>
          <span className="search__form-line"></span>
          <div className="search__form-box">
            <label className="search__form-field">
              <input
                type="button"
                className={`search__form-input-filter ${checkboxStatusMemory()} `}
                onClick={clickCheckbox}
              />
              <span className="search__form-input-filter-custom"></span>
            </label>
            <p className="search__form-input-filter-title">Короткометражки</p>
          </div>
        </form>
      </section>
      <span className="search__border-line"></span>
    </div>
  );
}

export default SearchForm;
