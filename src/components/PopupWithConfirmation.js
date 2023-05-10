import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._сonfirm = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListener() {
    super.setEventListener();
    this._сonfirm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();
    });
  }
}
