import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LinkIcon from '../../images/Link-icon.svg'
import FormInput from '../FormInput/FormInput';
import Form from '../Form/Form';

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorStatus, setErrorStatus] = useState({});

  const inputs = [
    {
      id: "name-input",
      name: "name",
      type: "text",
      className: "form__input-log-reg form__input-name",
      formFieldClassName: "form__field",
      placeholder: "Имя",
      errorMessage:"Некорректное поле Имя",
      errorMessageClassName: "name-input-error",
      label: "Имя",
      pattern: "[A-Za-zА-Яа-яЁё]{2,40}",
      required: true,
    },
    {
      id: "email-input",
      name: "email",
      type: "email",
      className: "form__input-log-reg form__input-email",
      formFieldClassName: "form__field",
      placeholder: "Email",
      errorMessage:"Некорректное поле E-mail",
      errorMessageClassName: "email-input-error",
      label: "E-mail",
      pattern: "^([^ ]+@[^ ]+\.[a-z]{2,6}|)$",
      required: true,
    },
    {
      id: "password-input",
      name: "password",
      type: "password",
      className: "form__input-log-reg form__input-password",
      formFieldClassName: "form__field",
      placeholder: "Пароль",
      errorMessage: "Некорректное поле Password (Используйте только буквы и цифры)",
      errorMessageClassName: "password-input-error",
      label: "Пароль",
      pattern: "[A-Za-zА-Яа-яЁё0-9]{8,200}",
      required: true,
    }
  ];
  const onChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  function submit (e) {
    e.preventDefault();
    if(!(errorStatus.name === true && errorStatus.email === true && errorStatus.password === true)){
      return console.log("ПРОВЕРКА НЕ ПРОЙДЕНА")
    }
      return console.log("ПРОВЕРКА ПРОЙДЕНА")
  }

  return (
    <div className="signInPage">
        <div className="signIn__container">
          <Link to="/">
          <img
            className="signIn__image"
            src={LinkIcon}
            alt="Логотип с сылкой"
          />
        </Link>
          <h3 className="signIn___title">Добро пожаловать!</h3>
          <Form
            submit={submit}
            inputs={inputs}
            onChangeValues={onChangeValues}
            setErrorStatus={setErrorStatus}
            errorStatus={errorStatus}
            values={values}
            buttonText={'Зарегистрироваться'}
            linkTitle={'Уже зарегистрированы?'}
            linkRoad={"login"}
            linkRoadTitle={'Войти'}
          />
        </div>
      </div>
  );
} 

export default Register