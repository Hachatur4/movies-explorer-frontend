import { React, useState } from "react";
import FormInput from "../FormInput/FormInput";

function Profile({
  errorText,
  currentUser,
  setProfileErrorText,
  handleUpdateUser,
  handleLogout,
  setpreloaderActive,
}) {
  const [values, setValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [errorStatus, setErrorStatus] = useState({});

  const inputs = [
    {
      id: "name-input",
      name: "name",
      type: "text",
      className: "form__input-profile form__input-profile__name",
      formFieldClassName: "form__field-profile",
      placeholder: "",
      errorMessage: "Некорректное поле Имя",
      errorMessageClassName: "profile-name-input-error",
      label: "",
      pattern: "[A-Za-zА-Яа-яЁё]{2,40}",
      required: true,
      disabled: true,
      value: currentUser.name,
      inputValueValidStart: currentUser.name,
    },
    {
      id: "email-input",
      name: "email",
      type: "email",
      className: "form__input-profile form__input-email",
      formFieldClassName: "form__field-profile",
      placeholder: "",
      errorMessage: "Некорректное поле E-mail",
      errorMessageClassName: "profile-email-input-error",
      label: "",       
      pattern: "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$",
      required: true,
      disabled: true,
      value: currentUser.email,
      inputValueValidStart: currentUser.email,
    },
  ];
  const onChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function finishValidData() {
    if (!(errorStatus.name === true && errorStatus.email === true)) {
      if (errorStatus.name === undefined && errorStatus.email === undefined) {
        return false;
      }
      if (
        (errorStatus.name === true || errorStatus.name === undefined) &&
        (errorStatus.email === true || errorStatus.email === undefined)
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  function submit(e) {
    e.preventDefault();

    if (!finishValidData()) {
      return console.log("ПРОВЕРКА НЕ ПРОЙДЕНА");
    }
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      return setProfileErrorText(
        "Не используйте старое Имя пользователя и E-mail"
      );
    }
    setProfileErrorText("");
    submitButtonActive();
    setpreloaderActive(true);
    handleUpdateUser(values, submitButtonActive);
    return console.log("ПРОВЕРКА ПРОЙДЕНА");
  }

  function submitButtonActive() {
    document.querySelectorAll(".form__input-profile").forEach((input) => {
      return input.setAttribute("disabled", "true");
    });
    document.querySelector(".profile-button-container").style.display = "flex";
    document.querySelector(".form__submit-button-profile").style.display =
      "none";
  }

  function editButton() {
    document.querySelectorAll(".form__input-profile").forEach((input) => {
      return input.removeAttribute("disabled");
    });
    document.querySelector(".profile-button-container").style.display = "none";
    document.querySelector(".form__submit-button-profile").style.display =
      "block";
    setProfileErrorText(false);
  }

  return (
    <section className="profile-page">
      <div className="profile-container">
        <h3 className="page__title">{`Привет, ${currentUser.name}!`}</h3>
        <form
          name="form-profile"
          className="form-profile"
          noValidate
          onSubmit={submit}
        >
          <fieldset className="form-profile__set">
            <div className="form-input-block">
              <div className="form-input-value-box">
                <h3 className="form-input-placeholder">{"Имя"}</h3>
                <h3 className="form-input-placeholder">{"E-mail"}</h3>
              </div>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  onChangeValues={onChangeValues}
                  setErrorStatus={setErrorStatus}
                  errorStatus={errorStatus}
                  valueCheck={values}
                  button="form__submit-button-profile"
                />
              ))}
            </div>
            <div className="buttonErrorBox">
              <span className="serverErrorStatusProfile">{errorText}</span>
              <button type="submit" className={`form__submit-button-profile`}>
                Сохранить
              </button>
            </div>
          </fieldset>
        </form>
        <div className="profile-button-container">
          <button
            type="submit"
            className={`profile-button`}
            onClick={editButton}
          >
            Редактировать
          </button>
          <button
            type="submit"
            className={`profile-button profile-button_exit`}
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;

// if (
//   values.name === currentUser.name ||
//   values.email === currentUser.email
// ) {
//   return setProfileErrorText(
//     "Не используйте старое Имя пользователя и E-mail"
//   );
// }
