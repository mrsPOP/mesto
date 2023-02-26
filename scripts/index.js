import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const profilePopup = document.querySelector("#profilePopup");
const cardPopup = document.querySelector("#cardPopup");
const imagePopup = document.querySelector("#imagePopup");
const popups = Array.from(document.querySelectorAll(".popup"));

const forms = Array.from(document.forms);
const profileForm = document.forms["edit-form"];
const cardForm = document.forms["add-new-place-form"];

const popupNameInput = cardPopup.querySelector(".popup__input_card-name");
const popupLinkInput = cardPopup.querySelector(".popup__input_card-link");
const nameInput = profilePopup.querySelector(".popup__input_el_name");
const jobInput = profilePopup.querySelector(".popup__input_el_description");
const cardInfo = document.querySelector(".popup__card-info");
const imagePopupPhoto = cardInfo.querySelector(".popup__card-picture");
const imagePopupDescription = cardInfo.querySelector(".popup__card-description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const cardsContainer = document.querySelector(".elements-list");


// TO DISPLAY CARD ON A PAGE

function addCardToPage(card) {
  cardsContainer.prepend(card);
}


// TO DISPLAY CARDS FROM THE LIST "initialCards"

function addCardsToList() {
  initialCards.forEach((el) => {
    const card = new Card(el, '.elements-list__item', openCard);
    addCardToPage(card.generateCard());
  });
}

addCardsToList();


// TO CLOSE POPUP

function closePopup(popupToClose) {
  popupToClose.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close-button'))) {
          closePopup(popup);
        }
    });
});

function findOpenedPopup () {
  return popups.find((popup) => {
    return popup.classList.contains('popup_opened');
  });
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(findOpenedPopup());
  }
}


// TO OPEN POPUP

function openPopup(popupToOpen) {
  popupToOpen.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}


// TO EDIT PROFILE INFO

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(profilePopup);
}

editButton.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

profileForm.addEventListener("submit", handleEditFormSubmit);


// TO CREATE A NEW CARD

addButton.addEventListener("click", function (evt) {
  openPopup(cardPopup);
});

function takeValuesFromInput () {
  return {
    name: popupNameInput.value,
    link: popupLinkInput.value
  };
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(takeValuesFromInput(), '.elements-list__item', openCard);
  addCardToPage(card.generateCard());
  closePopup(cardPopup);
  evt.target.reset();
}

cardForm.addEventListener("submit", handleAddCardFormSubmit);


// TO SEE CARD-INFO CLOSER

function openCard(name, link) {
  openPopup(imagePopup);
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  imagePopupDescription.textContent = name;
}


// TO ENABLE VALIDATION

const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error'
};

forms.forEach((form) => {
  const formToValidate = new FormValidator(settings, form);
  formToValidate.enableValidation();
});
