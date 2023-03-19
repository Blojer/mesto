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
const submitButtonPlace = formElementPlace.querySelector('.popup__save');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputHobbyProfile = document.querySelector('.popup__input_type_hobby');
const inputNamePlace = document.querySelector('.popup__input_type_name-place');
const inputLinkPlace = document.querySelector('.popup__input_type_link-place');
const valueNameProfile = document.querySelector('.profile__full-name');
const valueHobbyProfile = document.querySelector('.profile__hobby');
const placeTemplate = document.querySelector('#place').content.querySelector('.place');
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
  removeValidationErrors(formElementProfile, validationConfig);
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
  removeValidationErrors(formElementPlace, validationConfig);
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

function deletePlace(event) {
  const button = event.target;
  const place = button.closest('.place');
  place.remove();
}

function createPlace(item) {
  const placeElement = placeTemplate.cloneNode(true);
  const placeHeading = placeElement.querySelector('.place__title');
  placeHeading.textContent = item.name;
  const placeImage = placeElement.querySelector('.place__image');
  placeImage.setAttribute('alt', item.name);
  placeImage.setAttribute('src', item.link);
  const deleteButton = placeElement.querySelector('.place__delete');
  deleteButton.addEventListener('click', deletePlace);
  placeElement.querySelector('.place__button-like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__button-like_active');
  });
  placeImage.addEventListener('click', function () {
    popupGalleryImage.src = this.src;
    popupGalleryImage.alt = this.alt;
    popupGalleryImageHeading.textContent = this.alt;
    openPopup(popupGallery);
  });
  return placeElement;
}

function renderPlace(item) {
  editPlaceElement.prepend(createPlace(item));
}

initialCards.forEach(renderPlace);
