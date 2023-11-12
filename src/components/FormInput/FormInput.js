import { useState } from "react";
import "./FormInput.js";

const FormInput = (props) => {
  const {
    setErrorStatus,
    errorStatus,
    valueCheck,
    label,
    errorMessage,
    errorMessageClassName,
    onChangeValues,
    id,
    className,
    formFieldClassName,
    pattern,
    value,
    ...inputProps
  } = props;
  const [inputValue, setInputValue] = useState({
    inputName: "",
  });
  const patternTest = pattern;
  const regexPattern = new RegExp(patternTest);
  const errorMessageText = document.querySelector(`.${errorMessageClassName}`);
  const buttonInActive = document.querySelector(`.${props.button}`);

  function valid(e) {
    if (inputValue.inputName === "") {
      buttonInActive.classList.add("form__submit-button-log-reg_unvalid");
      errorMessageText.classList.add("form__input-error_active");
      return setErrorStatus({ ...errorStatus, [e.target.name]: false });
    }
    if (regexPattern.test(inputValue.inputName)) {
      buttonInActive.classList.remove("form__submit-button-log-reg_unvalid");
      errorMessageText.classList.remove("form__input-error_active");
      return setErrorStatus({ ...errorStatus, [e.target.name]: true });
    }
    buttonInActive.classList.add("form__submit-button-log-reg_unvalid");
    errorMessageText.classList.add("form__input-error_active");
    return setErrorStatus({ ...errorStatus, [e.target.name]: false });
  }

  const onChange = (e) => {
    setInputValue({ inputName: e.target.value });
    onChangeValues(e);
  };

  return (
    <label className={formFieldClassName}>
      {label}
      <input
        {...inputProps}
        className={className}
        onChange={onChange}
        pattern={pattern}
        onKeyUp={valid}
        defaultValue={value}
      />
      <span className={`form__input-error ${errorMessageClassName}`}>
        {errorMessage}
      </span>
    </label>
  );
};

export default FormInput;
