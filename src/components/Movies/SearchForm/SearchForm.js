import searchLupa from "../../../images/search-icon-lupa.svg";
function SearchForm() {
  function lala() {
    console.log("1");
  }
  return (
    <div className="search-container">
      <section className="search__box">
        <img className="search__lupa" src={searchLupa} alt="Изображение лупа" />
        <form name="search-form" className="search__form">
          <label className="search__form-field">
            <input
              type="text"
              placeholder="Фильм"
              className="search__form-input"
            />
          </label>

          <button type="submit" className="search__form-button">
            Найти
          </button>
          <span className="search__form-line"></span>
          <div className="search__form-box">
            <label className="search__form-field">
              <input
                type="checkbox"
                className="search__form-input-filter"
                onClick={lala}
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
