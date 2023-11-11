import { React } from "react";

function MoviesCardList({
  cardLength,
  addCardButton,
}) {

  return (
    <>
      <section className="card-list">{cardLength}</section>
      {window.location.pathname === "/movies" && (
        <button
          type="button"
          className="card-list__button"
          onClick={() => addCardButton()}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardList;