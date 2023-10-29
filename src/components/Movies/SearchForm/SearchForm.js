import { useState } from "react";
import searchLupa from "../../../images/search-icon-lupa.svg";

function SearchForm() {
  const [inputValue, setInputValue] = useState({
    inputName: "",
  });

  const onChange = (e) => {
    setInputValue({ inputName: e.target.value });
  };

  function submit(e) {
    e.preventDefault();
    const error = document.querySelector(".search-form__input-error");
    if (inputValue.inputName === "") {
      return error.style.display = "block";
    }
    error.style.display = "none";
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
            />
            <span className={`search-form__input-error`}>
              Поле не может быть пустым
            </span>
          </label>
          <button type="submit" className="search__form-button" >
            Найти
          </button>
          <span className="search__form-line"></span>
          <div className="search__form-box">
            <label className="search__form-field">
              <input type="checkbox" className="search__form-input-filter" />
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
