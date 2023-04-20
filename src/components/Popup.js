export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keyup', _handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
    //поработать над выходом по E
  }

  setEventListener() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
