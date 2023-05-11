export default class FormValidation {
  constructor(config, formElement) {
    this._form = formElement;
    this._input = config.inputSelector;
    this._button = this._form.querySelector(config.submitButtonSelector);
    this._config = config;
    this._inputs = Array.from(this._form.querySelectorAll(this._input));
  }

  _showInputError(input) {
    this._errorTextElement = this._form.querySelector(`#${input.id}-error`);
    this._errorTextElement.classList.add(this._config.errorClass);
    input.classList.add(this._config.inputErrorClass);
    this._errorTextElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    this._errorTextElement = this._form.querySelector(`#${input.id}-error`);
    this._errorTextElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
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
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _enableButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

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
