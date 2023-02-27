export class Card {
  constructor(data, cardTemplate, openCard) {
    this._imageLink = data.link;
    this._imageCaption = data.name;
    this._cardTemplate = cardTemplate;
    this._openCard = openCard;
  }

  _getCardTemplate () {
    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.elements-list__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._imageCaption;
    this._element.querySelector(".element__description").textContent = this._imageCaption;

    return this._element;
  }

  _removeCard () {
    this._element.remove();
  }

  _toggleLike () {
    this._likeButton.classList.toggle("element__like_active");
  }

  _setEventListeners () {
    this._element
      .querySelector(".element__remove-button")
      .addEventListener("click", () => this._removeCard());

    this._cardImage.addEventListener("click", () => this._openCard(this._imageCaption, this._imageLink));

    this._likeButton.addEventListener("click", () => this._toggleLike());
  }
}

