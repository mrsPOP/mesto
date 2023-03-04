const imagePopupPhoto = document.querySelector(".popup__card-picture");
const imagePopupDescription = document.querySelector(".popup__card-description");

const nameInput = profilePopup.querySelector(".popup__input_el_name");
const jobInput = profilePopup.querySelector(".popup__input_el_description");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupNameInput = cardPopup.querySelector(".popup__input_card-name");
const popupLinkInput = cardPopup.querySelector(".popup__input_card-link");

const profileForm = document.forms["edit-form"];
const cardForm = document.forms["add-new-place-form"];

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


export {
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
  initialCards
};
