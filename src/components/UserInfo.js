export class UserInfo {
  constructor ({profileName, profileDescription}) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo () {
    return {'profile-name-input': this._profileName.textContent, 'profile-description-input': this._profileDescription.textContent}
  }

  setUserInfo (data) {
    this._profileName.textContent = data['profile-name-input'];
    this._profileDescription.textContent = data['profile-description-input'];
  }
}
