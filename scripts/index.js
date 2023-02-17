const profilePopup = document.querySelector("#profilePopup");
const cardPopup = document.querySelector("#cardPopup");
const imagePopup = document.querySelector("#imagePopup");
const popups = Array.from(document.querySelectorAll(".popup"));

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

const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".elements-list");


// TO CREATE A CARD

function createCardInList(item) {
  const card = cardTemplate
    .querySelector(".elements-list__item")
    .cloneNode(true);
  card.querySelector(".element__description").textContent = item.name;

  const cardImage = card.querySelector(".element__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardImage.addEventListener("click", () => openCard(item.name, item.link));

  card
  .querySelector(".element__remove-button")
  .addEventListener("click", removeCard);

  card.querySelector(".element__like")
  .addEventListener("click", toggleLike);

  return card;
}


// TO DISPLAY CARDS ON A PAGE

function addCardToPage(card) {
  cardsContainer.prepend(card);
}


// TO DISPLAY CARDS FROM THE LIST "initialCards"

function addCardsToList() {
  initialCards.forEach((el) => {
    addCardToPage(createCardInList(el));
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
  addCardToPage(createCardInList(takeValuesFromInput()));
  closePopup(cardPopup);
  evt.target.reset();
}

cardForm.addEventListener("submit", handleAddCardFormSubmit);


// TO LIKE A CARD

function toggleLike(evt) {
  evt.target.classList.toggle("element__like_active");
}


// TO REMOVE A CARD

function removeCard(evt) {
  const cardToRemove = evt.target.closest(".elements-list__item");
  cardToRemove.remove();
}


// TO SEE CARD-INFO CLOSER

function openCard(name, link) {
  openPopup(imagePopup);
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  imagePopupDescription.textContent = name;
}
