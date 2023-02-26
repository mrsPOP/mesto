export class Card {
  constructor(data, cardTemplate, openCard) {
    this._imageLink = data.link;
    this._imageCaption = data.name;
    this._cardTemplate = cardTemplate;
    this._openCard = openCard;
  }

  _getCardTemplate () {
    const cardElement = document
    .querySelector("#card")
    .content
    .querySelector(this._cardTemplate)
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._imageLink;
    cardImage.alt = this._imageCaption;
    this._element.querySelector(".element__description").textContent = this._imageCaption;

    return this._element;
  }
  
  _removeCard () {
    this._element.remove();
  }

  _toggleLike () {
    this._element.querySelector(".element__like").classList.toggle("element__like_active");
  }

  _setEventListeners () {
    this._element
      .querySelector(".element__remove-button")
      .addEventListener("click", () => this._removeCard());

    this._element
    .querySelector(".element__image")
    .addEventListener("click", () => this._openCard(this._imageCaption, this._imageLink));

    this._element.querySelector(".element__like").addEventListener("click", () => this._toggleLike());
  }
}

