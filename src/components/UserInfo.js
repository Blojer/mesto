export default class UserInfo {
  constructor(nameSelector, hobbySelector, avatarSelecror) {
    this._name = document.querySelector(nameSelector);
    this._hobby = document.querySelector(hobbySelector);
    this._avatar = document.querySelector(avatarSelecror);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._hobby.textContent
    };
  }
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._hobby.textContent = about;
    this._avatar.src = avatar;
  }
}
