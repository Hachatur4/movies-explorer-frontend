import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LinkIcon from '../../images/Link-icon.svg'
import FormInput from '../FormInput/FormInput';
import Form from '../Form/Form';

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorStatus, setErrorStatus] = useState({});

  const inputs = [
    {
      id: "email-input",
      name: "email",
      type: "email",
      className: "form__input-log-reg form__input-email",
      formFieldClassName: "form__field",
      placeholder: "",
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
      placeholder: "",
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
    if(!(errorStatus.email === true && errorStatus.password === true)){
      return console.log("ПРОВЕРКА НЕ ПРОЙДЕНА")
    }
      return console.log("ПРОВЕРКА ПРОЙДЕНА")
  }

  return (
    <section className="signInPage">
        <div className="signIn__container">
          <Link to="/">
          <img
            className="signIn__image"
            src={LinkIcon}
            alt="Логотип с сылкой"
          />
        </Link>
          <h3 className="signIn___title">Рады видеть!</h3>
          <Form
            submit={submit}
            inputs={inputs}
            onChangeValues={onChangeValues}
            setErrorStatus={setErrorStatus}
            errorStatus={errorStatus}
            values={values}
            buttonText={'Войти'}
            linkTitle={'Еще не зарегистрированы?'}
            linkRoad={"register"}
            linkRoadTitle={'Регистрация'}
          />
        </div>
      </section>
  );
} 

export default Login