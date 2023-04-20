import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({ selectorPopup, handleFormSubmit }) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    const formValues = {};

    this._inputs.forEach(input => (formValues[input.name] = input.value));
    return formValues;
  }
  setEventListener() {
    super.setEventListener();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
}

