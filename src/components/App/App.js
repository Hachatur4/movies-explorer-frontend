import { React, useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Preloader from "../Preloader/Preloader";
import PreloaderPage from "../PreloaderPage/PreloaderPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [saveArrayCard, setSaveArrayCard] = useState([]);
  const [saveArrayCardForSeacrh, setSaveArrayCardForSeacrh] = useState([]);
  const [arrayCard, setArrayCard] = useState([]);
  const [arrayCardForSeacrh, setArrayCardForSeacrh] = useState([]);
  const [fullCardArray, setfullCardArray] = useState(arrayCard);
  const [cardLength, setCardLength] = useState([]);
  const [checkedStatusLS, setCheckedStatusLS] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState("");
  const [registerErrorText, setRegisterErrorText] = useState("");
  const [profileErrorText, setProfileErrorText] = useState("");
  const [defaultMovieView, setDefaultMovieView] = useState("true");
  const [cardLikeButton, setCardLikeButton] = useState(false);
  const [preloaderActive, setpreloaderActive] = useState(false);
  const [preloaderPageActive, setPreloaderPageActive] = useState(false);
  const [width, setWidth] = useState({});
  const [tooltipStatus, setTooltipStatus] = useState(false);
  const [windowSizeRange, setWindowSizeRange] = useState({
    start: "",
    limit: "",
  });
  const [searchMovieFormData, setSearchMovieFormData] = useState({
    inputValue: "",
    checkbox: false,
  });
  const [windowDimension, setWindowDimension] = useState({
    size: window.innerWidth,
  });
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setPreloaderPageActive(false);
      const jwt = localStorage.getItem("jwt");
      return auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res.user);
            setLoggedIn(true);
            setPreloaderPageActive(true);
          }
          setPreloaderPageActive(true);
        })
        .catch((err) => {
          console.log(`catch: ${err}`);
        });
    }
    setPreloaderPageActive(true);
  };
  useEffect(() => {
    const stringArrayMovieSearch = localStorage.getItem("movieArraySearch");
    const arrayMovieSearch = JSON.parse(stringArrayMovieSearch);
    const fullArrayCardForSearch = localStorage.getItem(
      "аrrayCardForSeacrhLocal"
    );
    const arrayCardForSeacrhLocalStor = JSON.parse(fullArrayCardForSearch);
    if (loggedIn) {
      setpreloaderActive(true);
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
    setfullCardArray(arrayMovieSearch.movieArray);
    setSearchMovieFormData({
      inputValue: arrayMovieSearch.inputValue,
      checkbox: arrayMovieSearch.checkbox,
    });
    setCheckedStatusLS(true);
    setpreloaderActive(false);
  }

  function detectSize() {
    setWindowDimension({
      size: window.innerWidth,
    });
  }

  const debounce = function (func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  useEffect(() => {
    window.addEventListener("resize", debounce(detectSize, 300));
    return () => {
      window.removeEventListener("resize", debounce(detectSize, 300));
    };
  }, [windowDimension, arrayCard]);

  useEffect(() => {
    if (loggedIn) {
      const mobile = window.matchMedia("(max-width: 708px)");
      const tablet = window.matchMedia(
        "(min-width: 709px) and (max-width: 849px)"
      );
      const smallDesk = window.matchMedia(
        "(min-width: 850px) and (max-width: 1140px)"
      );
      const desk = window.matchMedia("(min-width: 1141px)");
      setWidth({
        mobile: mobile.matches,
        tablet: tablet.matches,
        smallDesk: smallDesk.matches,
        desk: desk.matches,
      });
      windowSize(mobile, tablet, smallDesk, desk);
      setDefaultMovieView(false);
    }
  }, [loggedIn, windowDimension, defaultMovieView]);

  function windowSize(mobile, tablet, smallDesk, desk) {
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
    if (smallDesk.matches) {
      return setWindowSizeRange({
        start: 0,
        limit: 12,
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
        navigate("/movies", { replace: true });
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

  function changeMoviesData(data) {
    setpreloaderActive(false);
    setArrayCard(data.movieArray);
    setCardLength([]);
    setfullCardArray(data.movieArray);
    setDefaultMovieView(true);
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
          setfullCardArray(res);
        })
        .then((res) => {
          setpreloaderActive(false);
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

  function handleLogout() {
    setLoggedIn(false);
    redirect("/");
    localStorage.clear();
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
              !loggedIn ? (
                <Login
                  errorText={loginErrorText}
                  handleUserLogin={handleUserLogin}
                  setpreloaderActive={setpreloaderActive}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !loggedIn ? (
                <Register
                  errorText={registerErrorText}
                  handleUserRegister={handleUserRegister}
                  setpreloaderActive={setpreloaderActive}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/movies"
            element={
              preloaderPageActive && (
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
                  setpreloaderActive={setpreloaderActive}
                  arrayCardForSeacrh={arrayCardForSeacrh}
                  checkedStatusLS={checkedStatusLS}
                  cardLength={cardLength}
                  setCardLength={setCardLength}
                  fullCardArray={fullCardArray}
                />
              )
            }
          />
          <Route
            path="/saved-movies"
            element={
              preloaderPageActive && (
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  buttonAction={handleCardDeleteSetting}
                  saveArrayCard={saveArrayCard}
                  windowSizeRange={windowSizeRange}
                  changeMoviesData={changeSaveMoviesData}
                  setpreloaderActive={setpreloaderActive}
                  saveArrayCardForSeacrh={saveArrayCardForSeacrh}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              preloaderPageActive && (
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
              )
            }
          />
          <Route path="*" element={<NotFoundError />} />
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
