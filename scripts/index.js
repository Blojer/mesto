let editingProfile = document.querySelector('.profile__edit-button');
let popupOpen = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__forms');
let nameInput = document.querySelector('.popup__form_type_name');
let jobInput = document.querySelector('.popup__form_type_hobby');
let nameValue = document.querySelector('.profile__full-name');
let jobValue = document.querySelector('.profile__hobby');

function popupProfileOpen() {
  popupOpen.classList.add('popup_opened');
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

function popupProfileClose() {
  popupOpen.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  popupProfileClose();
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
}

popupClose.addEventListener('click', popupProfileClose);

editingProfile.addEventListener('click', popupProfileOpen);

formElement.addEventListener('submit', handleFormSubmit);
