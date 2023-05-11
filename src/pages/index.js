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
  addElementePlace
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

const handleSubmit = (request, popupInstance, loadingText = 'Сохранение...') => {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
};

//  Редактирования профиля
const handlePopupProfile = formValues => {
  const makeRequest = () => {
    return api.editUserInfo(formValues).then(userData => {
      userInfo.setUserInfo(userData);
    });
  };
  handleSubmit(makeRequest, popupProfile);
};

const popupProfile = new PopupWithForm({
  selectorPopup: '.popup_type_profile',
  handleFormSubmit: handlePopupProfile
});
popupProfile.setEventListener();

const handleProfileEditing = () => {
  const valueProfile = userInfo.getUserInfo();
  popupProfile.setInputValues(valueProfile);
  formValidators['popup-profile-info'].removeValidationErrors();
  popupProfile.open();
};

editingProfile.addEventListener('click', handleProfileEditing);

// Редактирования аватара
const handleFormAvatar = formValues => {
  const makeRequest = () => {
    return api.editUserAvatar(formValues).then(res => {
      userInfo.setUserInfo(res);
    });
  };
  handleSubmit(makeRequest, popupAvatar);
};

const popupAvatar = new PopupWithForm({
  selectorPopup: '.popup_type_avatar',
  handleFormSubmit: handleFormAvatar
});
popupAvatar.setEventListener();

const handlePopupAvatar = () => {
  formValidators['popup-avatar'].removeValidationErrors();
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
      popupWithConfirm.close();
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
  const makeRequest = () => {
    return api.addNewCard(formValues).then(res => {
      cardList.addItem(createCard(res, res.owner._id));
    });
  };
  handleSubmit(makeRequest, popupPlace);
};

const popupPlace = new PopupWithForm({
  selectorPopup: '.popup_type_place',
  handleFormSubmit: handlePopupPlace
});
popupPlace.setEventListener();

const handleAddCard = () => {
  formValidators['popup-card-place'].removeValidationErrors();
  popupPlace.open();
};

addElementePlace.addEventListener('click', handleAddCard);

// Увеличения картинки
const popupImage = new PopupWithImage('.popup_type_gallery');
popupImage.setEventListener();

// Включение валидации
const formValidators = {};

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidation(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards, userData._id);
  })
  .catch(err => {
    console.log(err);
  });
