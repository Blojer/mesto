const editingProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupGallery = document.querySelector('.popup_type_gallery');
const popupClose = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const formElement = document.querySelector('.popup__forms');
const formElementProfile = document.querySelector('form[name = "popup-profile-info"]');
const formElementPlace = document.querySelector('form[name = "popup-card-place"]');
const nameInputProfile = document.querySelector('.popup__form_type_name');
const jobInputProfile = document.querySelector('.popup__form_type_hobby');
const nameValueProfile = document.querySelector('.profile__full-name');
const jobValueProfile = document.querySelector('.profile__hobby');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

editingProfile.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInputProfile.value = nameValueProfile.textContent;
  jobInputProfile.value = jobValueProfile.textContent;
});

popupCloseButton.forEach(function (item) {
  item.addEventListener('click', function () {
    const popupClose = this.closest('.popup');
    popupClose.classList.remove('popup_opened');
  });
});

popupClose.forEach(function (item) {
  item.addEventListener('click', function () {
    this.classList.remove('popup_opened');
  });
});

document.querySelectorAll('.popup__container').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.stopPropagation();
  });
});

const addElementePlace = document.querySelector('.profile__add-ellement');

addElementePlace.addEventListener('click', function () {
  openPopup(popupPlace);
  formElementPlace.reset();
});

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  nameValueProfile.textContent = nameInputProfile.value;
  jobValueProfile.textContent = jobInputProfile.value;
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormPlaceSubmit(evt) {
  evt.preventDefault();
  closePopup(popupPlace);
  const form = evt.target;
  const name = form.querySelector('.popup__form_type_name-place').value;
  const link = form.querySelector('.popup__form_type_link-place').value;
  const item = { name, link };
  createPlace(item);
}

formElementPlace.addEventListener('submit', handleFormPlaceSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function deletePlace(event) {
  const button = event.target;
  const place = button.closest('.place');
  place.remove();
}

function createPlace(item) {
  const placeTemplate = document.querySelector('#place').content;
  const editPlaceElement = document.querySelector('.places__list');
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
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
  editPlaceElement.prepend(placeElement);
  const clickImagePlace = document.querySelectorAll('.place__image');
  clickImagePlace.forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelector('.popup__image').src = this.src;
      document.querySelector('.popup__image-header').textContent = this.alt;
      openPopup(popupGallery);
    });
  });
}

initialCards.forEach(createPlace);
