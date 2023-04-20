import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PicturePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  validationConfig,
  editingProfile,
  addElementePlace,
  inputNameProfile,
  inputHobbyProfile
} from '../components/constants.js';
import './index.css';

const userInfo = new UserInfo('.profile__full-name', '.profile__hobby');

//  Попап редактирования профиля
const popupProfile = new PopupWithForm({
  selectorPopup: '.popup_type_profile',
  handleFormSubmit: formValues => {
    userInfo.setUserInfo(formValues.name, formValues.hobby);
  }
});
popupProfile.setEventListener();

editingProfile.addEventListener('click', () => {
  const valueProfile = userInfo.getUserInfo();
  inputNameProfile.value = valueProfile.name;
  inputHobbyProfile.value = valueProfile.hobby;
  profileFormValidator.removeValidationErrors();
  popupProfile.open();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      cardList.addItem(createCard(item));
    }
  },
  '.places__list'
);

const createCard = item => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      }
    },
    '#place'
  );

  const newCard = card.generateCard();
  return newCard;
};

// попап добавления новой карточки
const popupPlace = new PopupWithForm({
  selectorPopup: '.popup_type_place',
  handleFormSubmit: formValues => {
    const data = {
      name: formValues['name-place'],
      link: formValues['link']
    };
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  }
});

popupPlace.setEventListener();

addElementePlace.addEventListener('click', function () {
  placeFormValidator.removeValidationErrors();
  popupPlace.open();
});

// Добавление карточек из массива
cardList.renderItems();

// Попап для большой картинки
const popupImage = new PopupWithImage('.popup_type_gallery');
popupImage.setEventListener();

// Валидация форм
const profileFormValidator = new FormValidation({
  popupSelector: '.popup_type_profile',
  rest: validationConfig
});

const placeFormValidator = new FormValidation({
  popupSelector: '.popup_type_place',
  rest: validationConfig
});

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();