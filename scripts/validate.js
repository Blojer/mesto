const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (errorTextElement, input, rest) => {
  errorTextElement.classList.add(rest.errorClass);
  input.classList.add(rest.inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
};

const hideInputError = (errorTextElement, input, rest) => {
  errorTextElement.classList.remove(rest.errorClass);
  input.classList.remove(rest.inputErrorClass);
  errorTextElement.textContent = '';
};

const disableButton = (buttonElement, rest) => {
  buttonElement.classList.add(rest.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

const enableButton = (buttonElement, rest) => {
  buttonElement.classList.remove(rest.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

const isValid = (input, rest) => {
  const inputName = input.name;
  const errorTextElement = document.querySelector(`#${inputName}-error`);
  if (!input.validity.valid) {
    showInputError(errorTextElement, input, rest);
  } else {
    hideInputError(errorTextElement, input, rest);
  }
};

const hasInvalidInput = inputs => {
  return inputs.some(input => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, buttonElement, rest) => {
  if (hasInvalidInput(inputs)) {
    disableButton(buttonElement, rest);
  } else {
    enableButton(buttonElement, rest);
  }
};

const setEventListeners = (form, rest) => {
  const inputs = Array.from(form.querySelectorAll(rest.inputSelector));
  const buttonElement = form.querySelector(rest.submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(input, rest);
      toggleButtonState(inputs, buttonElement, rest);
      console.log(buttonElement);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    setEventListeners(form, rest);
  });
};
enableValidation(obj);
