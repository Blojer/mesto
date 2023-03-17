const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (form, input, rest) => {
  const errorTextElement = form.querySelector(`#${input.name}-error`);
  errorTextElement.classList.add(rest.errorClass);
  input.classList.add(rest.inputErrorClass);
  errorTextElement.textContent = input.validationMessage;
};

const hideInputError = (form, input, rest) => {
  const errorTextElement = form.querySelector(`#${input.name}-error`);
  errorTextElement.classList.remove(rest.errorClass);
  input.classList.remove(rest.inputErrorClass);
  errorTextElement.textContent = '';
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

const isValid = (form, input, rest) => {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
};

const hasInvalidInput = inputs => {
  return inputs.some(input => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (form, inputs, rest) => {
  const buttonElement = form.querySelector(rest.submitButtonSelector);
  if (hasInvalidInput(inputs)) {
    disableButton(buttonElement, rest.inactiveButtonClass);
  } else {
    enableButton(buttonElement, rest.inactiveButtonClass);
  }
};

const setEventListeners = (form, rest) => {
  const inputs = Array.from(form.querySelectorAll(rest.inputSelector));
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, rest);
      toggleButtonState(form, inputs, rest);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    setEventListeners(form, rest);
  });
};
enableValidation(validationConfig);

const clearInputError = (form, rest) => {
  const inputs = Array.from(form.querySelectorAll(rest.inputSelector));
  inputs.forEach(input => {
    hideInputError(form, input, rest);
    toggleButtonState(form, inputs, rest);
  });
};
