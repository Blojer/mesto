export default class UserInfo {
  constructor(nameSelector, hobbySelector) {
    this._name = document.querySelector(nameSelector);
    this._hobby = document.querySelector(hobbySelector);
  }

  getUserInfo() {
    this._object = { name: this._name.textContent, hobby: this._hobby.textContent };
    return this._object;
  }
  setUserInfo(nameProfile, hobbyProfile) {
    this._name.textContent = nameProfile;
    this._hobby.textContent = hobbyProfile;
  }
}
