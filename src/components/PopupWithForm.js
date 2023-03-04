import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.popupForm = this._popup.querySelector('.popup__form');
  }

  setEventListeners () {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", evt => this._handleFormSubmit(evt));
  }

  close () {
    super.close();
    this.popupForm.reset();
  }
}
