export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleTrashClick },
    cardTemplateSelector,
    userId
  ) {
    this._link = data.link;
    this._name = data.name;
    this._idOwner = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashClick = handleTrashClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
  }

  _checkLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  setLikes(data) {
    this.element.querySelector('.place__likes-count').textContent = data.length;
    this._likes = data;
    if (this._checkLike()) {
      this.likeButton.classList.add('place__button-like_active');
    } else {
      this.likeButton.classList.remove('place__button-like_active');
    }
  }

  _handleCardLike() {
    this.likeButton.classList.toggle('place__button-like_active');
  }

  deletePlace() {
    this.element.remove();
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
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
    this._deleteButton = this.element.querySelector('.place__delete');
    if (this._userId !== this._idOwner) {
      this._deleteButton.remove();
    }
    this.setLikes(this._likes);
    this._setEventListeners();

    return this.element;
  }
}
