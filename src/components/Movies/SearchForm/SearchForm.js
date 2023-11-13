import { useEffect } from "react";
import searchLupa from "../../../images/search-icon-lupa.svg";
import FormSearchProcessing from "../FormSearchProcessing/FormSearchProcessing";

function SearchForm({
  searchData,
  searchMovieFormData,
  arrayCard,
  setNotSeacrhMovie,
  changeMoviesData,
  setpreloaderActive,
  checkedStatusLS,
}) {
  useEffect(() => {
    const аrrayCardForSeacrhLocal = JSON.stringify(arrayCard);
    localStorage.setItem("аrrayCardForSeacrhLocal", аrrayCardForSeacrhLocal);
  }, [arrayCard]);

  useEffect(() => {
    const checkboxElement = document.querySelector(
      ".search__form-input-filter"
    );
    if (searchMovieFormData.checkbox === true) {
      document.querySelector(".search__form-checkbox").checked = true;
      return checkboxElement.classList.add("search__form-input-filter-custom");
    }
    document.querySelector(".search__form-checkbox").checked = false;
    return checkboxElement.classList.remove("search__form-input-filter-custom");
  }, [checkedStatusLS]);

  const checkboxElement = document.querySelector(".search__form-input-filter");
  const checkboxStatus = document.querySelector(".search__form-checkbox");
  const onChange = (e) => {
    searchData({
      ...searchMovieFormData,
      inputValue: e.target.value,
    });
  };

  function clickCheckbox() {
    if (checkboxStatus.checked) {
      checkboxElement.classList.add("search__form-input-filter-custom");
      return submitProcessingData(true);
    } else {
      checkboxElement.classList.remove("search__form-input-filter-custom");
      return submitProcessingData(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    const error = document.querySelector(".search-form__input-error");
    if (searchMovieFormData.inputValue === "") {
      return (error.style.display = "block");
    }
    error.style.display = "none";
    setpreloaderActive(true);
    return clickCheckbox();
  }

  function submitProcessingData(checkStatus) {
    FormSearchProcessing({
      searchMovieFormData,
      arrayCard,
      setNotSeacrhMovie,
      changeMoviesData,
      setpreloaderActive,
      checkStatus,
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
              <span className="search__form-input-filter"></span>
              <input
                type="checkbox"
                className="search__form-checkbox"
                onClick={clickCheckbox}
              />
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
