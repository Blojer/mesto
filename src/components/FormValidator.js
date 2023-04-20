export default class FormValidation {
  constructor({ popupSelector, rest }) {
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(rest.formSelector);
    this._input = rest.inputSelector;
    this._button = this._form.querySelector(rest.submitButtonSelector);
    this._rest = rest;
    this._inputs = Array.from(this._form.querySelectorAll(this._input));
  }

  _showInputError(input) {
    this._errorTextElement = this._form.querySelector(`#${input.name}-error`);
    this._errorTextElement.classList.add(this._rest.errorClass);
    input.classList.add(this._rest.inputErrorClass);
    this._errorTextElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    this._errorTextElement = this._form.querySelector(`#${input.name}-error`);
    this._errorTextElement.classList.remove(this._rest.errorClass);
    input.classList.remove(this._rest.inputErrorClass);
    this._errorTextElement.textContent = '';
  }
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _disableButton() {
    this._button.classList.add(this._rest.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _enableButton() {
    this._button.classList.remove(this._rest.inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }
  _;
  _hasInvalidInput() {
    return this._inputs.some(input => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
  removeValidationErrors() {
    this._inputs.forEach(input => {
      this._hideInputError(input);
      this._toggleButtonState();
    });
  }
}
