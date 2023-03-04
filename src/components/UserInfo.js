export class UserInfo {
  constructor ({profileName, profileDescription}) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo () {
    return {name: this._profileName.textContent, description: this._profileDescription.textContent}
  }

  setUserInfo (newName, newDescription) {
    this._profileName.textContent = newName;
    this._profileDescription.textContent = newDescription;
  }
}
