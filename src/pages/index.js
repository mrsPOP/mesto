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
  editButton,
  addButton,
  profileForm,
  cardForm,
  settings,
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

const popupNewCard = new PopupWithForm({popupSelector: "#cardPopup", handleSubmit: (evt) => {
  evt.preventDefault();
  const {'new-place-name-input': name, 'new-place-link-input': link} = popupNewCard._getInputValues();
  cardList.addItem(
    createCard(
      {name, link},
      "#card",
      openCard
    )
  );
  popupNewCard.close();
}});

popupNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm({popupSelector: "#profilePopup", handleSubmit: (evt) => {
  evt.preventDefault();
  profileInfo.setUserInfo(popupEditProfile._getInputValues());
  popupEditProfile.close();
}})

popupEditProfile.setEventListeners();

// TO CREATE A NEW CARD

addButton.addEventListener("click", function () {
  popupNewCard.open();
  newCardValidation.resetValidation();
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
  profileValidation.resetValidation();
  popupEditProfile.setInputValues(profileInfo.getUserInfo());
});

// TO SEE CARD-INFO CLOSER

function openCard(name, link) {
  popupOpenCard.open(name, link, imagePopupPhoto, imagePopupDescription);
}

// TO ENABLE VALIDATION

const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardForm);

profileValidation.enableValidation();
newCardValidation.enableValidation();
