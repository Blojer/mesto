import Popup from './Popup';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._placeImage = this._popup.querySelector('.popup__image');
    this._placeHeading = this._popup.querySelector('.popup__image-header');
  }

  open(name, link) {
    this._placeHeading.textContent = name;
    this._placeImage.alt = name;
    this._placeImage.src = link;
    super.open();
  }
}
