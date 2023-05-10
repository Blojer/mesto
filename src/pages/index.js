import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  validationConfig,
  editingAvatar,
  editingProfile,
  addElementePlace,
  inputNameProfile,
  inputHobbyProfile
} from '../constants/constants.js';
import './index.css';

const userInfo = new UserInfo('.profile__full-name', '.profile__hobby', '.profile__avatar');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'ae3dc799-cc96-4703-a737-9448cf4b90b2',
    'Content-Type': 'application/json'
  }
});

//  Редактирования профиля
const handlePopupProfile = formValues => {
  popupProfile.renderLoading(true);
  api
    .editUserInfo(formValues)
    .then(res => {
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
    });
};

const popupProfile = new PopupWithForm({
  selectorPopup: '.popup_type_profile',
  handleFormSubmit: handlePopupProfile
});
popupProfile.setEventListener();

const handleProfileEditing = () => {
  const valueProfile = userInfo.getUserInfo();
  inputNameProfile.value = valueProfile.name;
  inputHobbyProfile.value = valueProfile.about;
  profileFormValidator.removeValidationErrors();
  popupProfile.open();
};

editingProfile.addEventListener('click', handleProfileEditing);

// Редактирования аватара
const handleFormAvatar = formValues => {
  popupAvatar.renderLoading(true);

  api
    .editUserAvatar(formValues)
    .then(res => {
      console.log(res);
      userInfo.setUserInfo(res);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
};

const popupAvatar = new PopupWithForm({
  selectorPopup: '.popup_type_avatar',
  handleFormSubmit: handleFormAvatar
});
popupAvatar.setEventListener();

const handlePopupAvatar = () => {
  avatarFormValidator.removeValidationErrors();
  popupAvatar.open();
};

editingAvatar.addEventListener('click', handlePopupAvatar);

const cardList = new Section(
  {
    renderer: (item, id) => {
      cardList.addItem(createCard(item, id));
    }
  },
  '.places__list'
);

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

const handleLikeClick = (id, checkLike, card) => {
  if (checkLike) {
    api
      .dislikeCard(id)
      .then(data => {
        card.setLikes(data.likes);
      })
      .catch(err => console.log(err));
  } else {
    api
      .likeCard(id)
      .then(data => {
        card.setLikes(data.likes);
      })
      .catch(err => console.log(err));
  }
};

// Подтвеждение удаления карточки
const popupWithConfirm = new PopupWithConfirm('.popup_type_delete');
popupWithConfirm.setEventListener();

function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card));
  popupWithConfirm.open();
}

const handlePopupConfirm = (id, card) => {
  api
    .deleteCard(id)
    .then(() => {
      card.deletePlace();
    })
    .catch(err => {
      console.log(err);
    });
};

const createCard = (item, id) => {
  const card = new Card(
    {
      data: item,
      handleCardClick,
      handleLikeClick,
      handleTrashClick
    },
    '#place',
    id
  );
  return card.generateCard();
};

// Добавления новой карточки

const handlePopupPlace = formValues => {
  popupPlace.renderLoading(true);
  api
    .addNewCard(formValues)
    .then(res => {
      console.log(res);
      cardList.addItem(createCard(res, res.owner._id));
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupPlace.renderLoading(false);
    });
};

const popupPlace = new PopupWithForm({
  selectorPopup: '.popup_type_place',
  handleFormSubmit: handlePopupPlace
});
popupPlace.setEventListener();

const handleAddCard = () => {
  placeFormValidator.removeValidationErrors();
  popupPlace.open();
};

addElementePlace.addEventListener('click', handleAddCard);

// Увеличения картинки
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

const avatarFormValidator = new FormValidation({
  popupSelector: '.popup_type_avatar',
  rest: validationConfig
});
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(res => {
    console.log(res[0]._id);

    userInfo.setUserInfo(res[0]);
    cardList.renderItems(res[1], res[0]._id);
  })
  .catch(err => {
    console.log(err);
  });
