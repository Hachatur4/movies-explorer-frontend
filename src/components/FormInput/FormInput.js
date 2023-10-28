import { useState } from "react";
import "./FormInput.js";

const FormInput = (props) => {
  const { setErrorStatus,
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
    ...inputProps
  } = props;

  const [inputValue, setInputValue] = useState({
    inputName: "",
  })

  const patternTest = pattern;
  const regexPattern = new RegExp(patternTest);
  const errorMessageText = document.querySelector(`.${errorMessageClassName}`)

  function valid (e){
      if (inputValue.inputName === ''){
        errorMessageText.classList.add('form__input-error_active')
        return setErrorStatus({ ...errorStatus, [e.target.name]: false })
      }
      if(regexPattern.test(inputValue.inputName)){
        errorMessageText.classList.remove('form__input-error_active')
        return setErrorStatus({ ...errorStatus, [e.target.name]: true })
      }
      errorMessageText.classList.add('form__input-error_active')
      return setErrorStatus({ ...errorStatus, [e.target.name]: false })
  }

  const onChange = (e) => {
    setInputValue({ inputName: e.target.value });
    onChangeValues(e)
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
        />
        <span className={`form__input-error ${errorMessageClassName}`}>{errorMessage}</span>
      </label>
  );
};

export default FormInput;