import { React, useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFoundError from "../NotFoundError/NotFoundError";
import ProtectedRouteElement from "../ProtectedRoute";
import NavTab from "../Main/NavTab/NavTab";
import * as MoviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [saveArrayCard, setSaveArrayCard] = useState([]);
  const [saveArrayCardForSeacrh, setSaveArrayCardForSeacrh] = useState([]);
  const [arrayCard, setArrayCard] = useState([]);
  const [arrayCardForSeacrh, setArrayCardForSeacrh] = useState([]);
  const [checkedStatusLS, setCheckedStatusLS] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState("");
  const [registerErrorText, setRegisterErrorText] = useState("");
  const [profileErrorText, setProfileErrorText] = useState("");
  const [cardLikeButton, setCardLikeButton] = useState(false);
  const [preloaderActive, setpreloaderActive] = useState(false);
  const [width, setWidth] = useState({});
  const [seachTabMemoryActive, setSeachTabMemoryActive] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [windowSizeRange, setWindowSizeRange] = useState({
    start: "",
    limit: "",
  });
  const [searchMovieFormData, setSearchMovieFormData] = useState({
    inputValue: "",
    checkbox: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res.user);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          setpreloaderActive(false);
          console.log(`catch: ${err}`);
        });
    }
  };

  useEffect(() => {
    const stringArrayMovieSearch = localStorage.getItem("movieArraySearch");
    const arrayMovieSearch = JSON.parse(stringArrayMovieSearch);
    const fullArrayCardForSearch = localStorage.getItem(
      "аrrayCardForSeacrhLocal"
    );
    const arrayCardForSeacrhLocalStor = JSON.parse(fullArrayCardForSearch);

    if (loggedIn) {
      mainApi
        .getAppInfo()
        .then(([movies, userData]) => {
          setSaveArrayCard(movies);
          setSaveArrayCardForSeacrh(movies);
          setCurrentUser(userData.user);
          setArrayCardForSeacrh(arrayCardForSeacrhLocalStor);
        })
        .then((res) => {
          if (arrayMovieSearch == null) {
            return getMoviesData();
          }
          if (arrayMovieSearch.movieArray.length > 0) {
            return localStorageCheck(arrayMovieSearch);
          }
          return getMoviesData();
        })
        .catch((err) => console.log(`catch: ${err}`));
    }
  }, [loggedIn]);

  function localStorageCheck(arrayMovieSearch) {
    setArrayCard(arrayMovieSearch.movieArray);
    setSearchMovieFormData({
      inputValue: arrayMovieSearch.inputValue,
      checkbox: arrayMovieSearch.checkbox,
    });
    setCheckedStatusLS(true);
    return navigate("/movies", { replace: true });
  }

  useEffect(() => {
    if (loggedIn) {
      const mobile = window.matchMedia("(max-width: 480px)");
      const tablet = window.matchMedia(
        "(min-width: 481px) and (max-width: 770px)"
      );

      const desk = window.matchMedia("(min-width: 771px)");
      setWidth({
        mobile: mobile.matches,
        tablet: tablet.matches,
        desk: desk.matches,
      });
      windowSize(mobile, tablet, desk);
    }
  }, [loggedIn]);

  function windowSize(mobile, tablet, desk) {
    if (mobile.matches) {
      return setWindowSizeRange({
        start: 0,
        limit: 5,
      });
    }
    if (tablet.matches) {
      return setWindowSizeRange({
        start: 0,
        limit: 8,
      });
    }
    if (desk.matches) {
      return setWindowSizeRange({
        start: 0,
        limit: 16,
      });
    }
  }

  function getSaveMovieCards() {
    mainApi
      .getInitialCardsMovie()
      .then((movies) => {
        setSaveArrayCard(movies);
        setSaveArrayCardForSeacrh(movies);
      })
      .catch((err) => console.log(`catch: ${err}`));
  }

  function handleUserRegister(values) {
    auth
      .register(values.password, values.email, values.name)
      .then((res) => {
        if (!res || res.statusCode === 400) throw new Error("Что-то не так");
        return res;
      })
      .then((res) => {
        setRegisterErrorText("");
        handleUserLogin(values);
        setpreloaderActive(false);
      })
      .catch((err) => {
        setpreloaderActive(false);
        if (err.statusText === "Conflict") {
          return setRegisterErrorText(
            "Пользователь с данным email уже зарегистрирован"
          );
        }
        setRegisterErrorText(err.message);
      });
  }

  function handleUserLogin(values) {
    auth
      .authorize(values.email, values.password)
      .then((res) => {
        if (!res) throw "На сервере произошла ошибка.";
        if (!res.token)
          throw "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
        localStorage.setItem("jwt", res.token);
        setLoginErrorText("");
        setCurrentUser(res.userData);
        setLoggedIn(true);
        setpreloaderActive(false);
      })
      .catch((err) => {
        setpreloaderActive(false);
        console.log(err);
        if (err.status === 401) {
          return setLoginErrorText("Вы ввели неправильный логин или пароль");
        }
        setLoginErrorText(err);
      });
  }

  function fullMovieButtonAction(cardData) {
    const cardElement = document
      .getElementById(cardData.movieId)
      .querySelector("button");

    if (cardElement.classList.contains("card__like-button_active")) {
      const ok = saveArrayCard.find(
        (element) => element.movieId === cardData.movieId
      );
      return handleCardDelete(ok._id, cardElement);
    }

    return createMovieCard(cardData, cardElement);
  }

  function createMovieCard(card, cardElement) {
    mainApi
      .createCardMovie(card)
      .then((res) => {
        getSaveMovieCards();
        cardElement.classList.add("card__like-button_active");
      })
      .catch((err) => console.log(`catch: ${err}`));
  }

  function handleCardDelete(id, cardElement) {
    mainApi
      .deleteMovie(id)
      .then((newCard) => {
        getSaveMovieCards();
        cardElement.classList.remove("card__like-button_active");
      })
      .catch((err) => console.log(`catch: ${err}`));
  }

  function handleCardDeleteSetting(cardData) {
    handleCardDelete(cardData.movieId, "");
  }

  function handleUpdateUser(data, submitButtonActive) {
    mainApi
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res.user);
        setpreloaderActive(false);
        setTooltipStatus(true);
        submitButtonActive();
      })
      .catch((err) => {
        setpreloaderActive(false);
        console.log(`catch: ${err}`);
        if (err === "Ошибка 409") {
          setProfileErrorText("Данная почта не может быть использованна");
        }
        setProfileErrorText(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate("/login");
    localStorage.clear();
  }

  function changeMoviesData(data) {
    setpreloaderActive(false);
    setArrayCard(data.movieArray);
    const movieArraySearchToLocalStorage = JSON.stringify(data);
    localStorage.setItem("movieArraySearch", movieArraySearchToLocalStorage);
  }
  function changeSaveMoviesData(data) {
    setpreloaderActive(false);
    setSaveArrayCard(data.movieArray);
  }

  function getMoviesData() {
    if (loggedIn) {
      MoviesApi.moviesCards()
        .then((res) => {
          setArrayCard(res);
          setArrayCardForSeacrh(res);
        })
        .then((res) => {
          navigate("/movies", { replace: true });
        })

        .catch((err) => console.log(`catch: ${err}`));
    }
  }

  function selectHeaderAndNavTab() {
    if (loggedIn) {
      return <NavTab />;
    }
    return <Header />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {selectHeaderAndNavTab()}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <Login
                errorText={loginErrorText}
                handleUserLogin={handleUserLogin}
                setpreloaderActive={setpreloaderActive}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                errorText={registerErrorText}
                handleUserRegister={handleUserRegister}
                setpreloaderActive={setpreloaderActive}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                arrayCard={arrayCard}
                setArrayCard={setArrayCard}
                buttonAction={fullMovieButtonAction}
                cardLikeButton={cardLikeButton}
                saveArrayCard={saveArrayCard}
                changeMoviesData={changeMoviesData}
                windowSizeRange={windowSizeRange}
                setWindowSizeRange={setWindowSizeRange}
                width={width}
                searchMovieFormData={searchMovieFormData}
                setSearchMovieFormData={setSearchMovieFormData}
                seachTabMemoryActive={seachTabMemoryActive}
                setpreloaderActive={setpreloaderActive}
                arrayCardForSeacrh={arrayCardForSeacrh}
                checkedStatusLS={checkedStatusLS}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                buttonAction={handleCardDeleteSetting}
                saveArrayCard={saveArrayCard}
                windowSizeRange={windowSizeRange}
                changeMoviesData={changeSaveMoviesData}
                seachTabMemoryActive={seachTabMemoryActive}
                setpreloaderActive={setpreloaderActive}
                saveArrayCardForSeacrh={saveArrayCardForSeacrh}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                handleLogout={handleLogout}
                errorText={profileErrorText}
                currentUser={currentUser}
                handleUpdateUser={handleUpdateUser}
                setProfileErrorText={setProfileErrorText}
                setpreloaderActive={setpreloaderActive}
              />
            }
          />
          <Route
            path="*"
            element={loggedIn ? <Navigate to="/" replace /> : <NotFoundError />}
          />
        </Routes>
        <Footer />
        {preloaderActive && <Preloader />}
        {tooltipStatus && (
          <InfoTooltip
            tooltipStatus={tooltipStatus}
            setTooltipStatus={setTooltipStatus}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
