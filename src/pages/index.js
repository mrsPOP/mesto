import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  imagePopupPhoto,
  imagePopupDescription,
  nameInput,
  jobInput,
  editButton,
  addButton,
  popupNameInput,
  popupLinkInput,
  profileForm,
  cardForm,
  initialCards,
} from "../utils/constants.js";

// TO DISPLAY CARDS FROM THE LIST "initialCards"

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, "#card", openCard);
      cardList.addItem(cardElement);
    },
  },
  ".elements-list"
);

cardList.renderItems();

// POPUPS DECLARATION

const popupOpenCard = new PopupWithImage("#imagePopup");
popupOpenCard.setEventListeners();

const popupNewCard = new PopupWithForm("#cardPopup", (evt) => {
  evt.preventDefault();
  cardList.addItem(
    createCard(
      {
        name: popupNameInput.value,
        link: popupLinkInput.value,
      },
      "#card",
      openCard
    )
  );
  popupNewCard.close();
});

popupNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm("#profilePopup", (evt) => {
  evt.preventDefault();
  profileInfo.setUserInfo(nameInput.value, jobInput.value);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

// TO CREATE A NEW CARD

addButton.addEventListener("click", function () {
  popupNewCard.open();
  newCardValidation.toggleButtonState();
});

function createCard(data, cardTemplate, openCard) {
  const card = new Card(data, cardTemplate, openCard);
  return card.generateCard();
}

// TO EDIT PROFILE INFO

const profileInfo = new UserInfo({
  profileName: ".profile__name",
  profileDescription: ".profile__description",
});

editButton.addEventListener("click", function () {
  popupEditProfile.open();
  profileValidation.toggleButtonState();
  nameInput.value = profileInfo.getUserInfo()["name"];
  jobInput.value = profileInfo.getUserInfo()["description"];
});

// TO SEE CARD-INFO CLOSER

function openCard(name, link) {
  popupOpenCard.open(name, link, imagePopupPhoto, imagePopupDescription);
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  imagePopupDescription.textContent = name;
}

// TO ENABLE VALIDATION

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardForm);

profileValidation.enableValidation();
newCardValidation.enableValidation();
