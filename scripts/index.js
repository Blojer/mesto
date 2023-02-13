let editingProfile = document.querySelector('.profile__edit-button');
let popupOpen = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__full-name');
let jobInput = document.querySelector('.popup__hobby');
let nameValue = document.querySelector('.profile__full-name')
let jobValue = document.querySelector('.profile__hobby');

nameInput.value = nameValue.textContent;
jobInput.value = jobValue.textContent;



editingProfile.addEventListener('click', function() {
  popupOpen.classList.add('popup_opened');
});


popupClose.addEventListener('click', function() {
  popupOpen.classList.remove('popup_opened');
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
});





function handleFormSubmit (evt) {
  popupOpen.classList.remove('popup_opened');
  evt.preventDefault(); 
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);