export default class UserInfo {
  constructor(nameSelector, hobbySelector) {
    this._name = document.querySelector(nameSelector);
    this._hobby = document.querySelector(hobbySelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      hobby: this._hobby.textContent
    };
  }
  setUserInfo({ name, hobby }) {
    this._name.textContent = name;
    this._hobby.textContent = hobby;
  }
}
