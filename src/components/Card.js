export default class Card {
  constructor({ data, handleCardClick }, cardTemplateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  _handleCardLike() {
    this.likeButton.classList.toggle('place__button-like_active');
  }

  _deletePlace() {
    this.element.remove();
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleCardLike();
    });

    this.deleteButton.addEventListener('click', () => {
      this._deletePlace();
    });

    this.placeImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this.element = this._getTemplate();
    this.placeImage = this.element.querySelector('.place__image');
    this.placeImage.src = this._link;
    this.placeImage.alt = this._name;
    this.placeHeading = this.element.querySelector('.place__title');
    this.placeHeading.textContent = this._name;
    this.likeButton = this.element.querySelector('.place__button-like');
    this.deleteButton = this.element.querySelector('.place__delete');
    this._setEventListeners();

    return this.element;
  }
}
