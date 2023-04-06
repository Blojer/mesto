import Card from './Card.js';
import FormValidation from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';

const editingProfile = document.querySelector('.profile__edit-button');
const addElementePlace = document.querySelector('.profile__add-ellement');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupGallery = document.querySelector('.popup_type_gallery');
const popupGalleryImage = popupGallery.querySelector('.popup__image');
const popupGalleryImageHeading = popupGallery.querySelector('.popup__image-header');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formElementProfile = document.querySelector('form[name = "popup-profile-info"]');
const formElementPlace = document.querySelector('form[name = "popup-card-place"]');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputHobbyProfile = document.querySelector('.popup__input_type_hobby');
const inputNamePlace = document.querySelector('.popup__input_type_name-place');
const inputLinkPlace = document.querySelector('.popup__input_type_link-place');
const valueNameProfile = document.querySelector('.profile__full-name');
const valueHobbyProfile = document.querySelector('.profile__hobby');
const editPlaceElement = document.querySelector('.places__list');

const closePopupEscape = evt => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

editingProfile.addEventListener('click', () => {
  inputNameProfile.value = valueNameProfile.textContent;
  inputHobbyProfile.value = valueHobbyProfile.textContent;
  profileFormValidator.removeValidationErrors();
  openPopup(popupProfile);
});

popupCloseButtons.forEach(item => {
  item.addEventListener('click', function () {
    const popupClose = this.closest('.popup');
    closePopup(popupClose);
  });
});

popups.forEach(item => {
  item.addEventListener('mousedown', function (evt) {
    const clickPopup = evt.target;
    if (clickPopup.classList.contains('popup')) {
      closePopup(this);
    }
  });
});

addElementePlace.addEventListener('click', function () {
  formElementPlace.reset();
  placeFormValidator.removeValidationErrors();
  openPopup(popupPlace);
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  valueNameProfile.textContent = inputNameProfile.value;
  valueHobbyProfile.textContent = inputHobbyProfile.value;
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  closePopup(popupPlace);
  const name = inputNamePlace.value;
  const link = inputLinkPlace.value;
  const item = { name, link };
  renderPlace(item);
}

formElementPlace.addEventListener('submit', handleFormPlaceSubmit);

const openPopupImage = (name, link) => {
  popupGalleryImage.src = link;
  popupGalleryImage.alt = name;
  popupGalleryImageHeading.textContent = name;
  openPopup(popupGallery);
};

const renderPlace = item => {
  const card = new Card(item, '#place', openPopupImage);
  const cardElement = card.generateCard();
  editPlaceElement.prepend(cardElement);
};

initialCards.forEach(renderPlace);

const profileFormValidator = new FormValidation(popupProfile, validationConfig);
const placeFormValidator = new FormValidation(popupPlace, validationConfig);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
