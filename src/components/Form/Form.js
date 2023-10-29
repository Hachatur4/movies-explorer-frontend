import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

function Form({
    submit,
    inputs,
    onChangeValues,
    setErrorStatus,
    errorStatus,
    values,
    buttonText,
    linkTitle,
    linkRoad,
    linkRoadTitle
}) {


    return(
        <form name="form-register" className="form form-register" noValidate onSubmit={submit}  >
            <fieldset className="form__set">
                {inputs.map((input) => (
                    <FormInput
                    key={input.id}
                    {...input}
                    onChangeValues={onChangeValues}
                    setErrorStatus={setErrorStatus}
                    errorStatus={errorStatus}
                    valueCheck={values}
                    />
                ))}
                <button type="submit" className={`form__submit-button-log-reg`}>
                    {buttonText}
                </button>
            </fieldset>
            <span className='form-link-title'>{linkTitle} <Link to={`/${linkRoad}`} className="form-link">{linkRoadTitle}</Link></span>
        </form>
    );
  } 
  
  export default Form