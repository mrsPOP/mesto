const profilePopup = document.querySelector("#profilePopup");
const cardPopup = document.querySelector("#cardPopup");
const imagePopup = document.querySelector("#imagePopup");

const nameInput = profilePopup.querySelector(".popup__input_el_name");
const jobInput = profilePopup.querySelector(".popup__input_el_description");
const closeButtons = document.querySelectorAll(".popup__close-button");
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
  cardImage.addEventListener("click", openCard);

  card
  .querySelector(".element__remove-button")
  .addEventListener("click", cardRemover);

  card.querySelector(".element__like")
  .addEventListener("click", likeToggler);

  return card;
}


// TO DISPLAY CARDS ON A PAGE

function addCardToPage(card) {
  cardsContainer.prepend(card);
}


// TO DISPLAY CARDS FROM THE LIST "initialCards"

function addCardsToList() {
  initialCards.forEach(function (el) {
    addCardToPage(createCardInList(el));
  });
}

addCardsToList();


// TO CLOSE POPUP

function closePopup(evt) {
  evt.target
  .closest('.popup')
  .classList.remove("popup_opened");
}

closeButtons.forEach((el) => {
  el.addEventListener("click", closePopup);
});


// TO OPEN POPUP

function openPopup(evt) {
  const clickedButton = evt.target;

  if (clickedButton === editButton) {
    profilePopup.classList.add('popup_opened');
  } else if (clickedButton === addButton) {
    cardPopup.classList.add('popup_opened');
  } else if (clickedButton.classList.contains('element__image')) {
    imagePopup.classList.add('popup_opened');
  }
}


// TO EDIT PROFILE INFO

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(evt);
  evt.target.reset();
}

editButton.addEventListener("click", function (evt) {
  openPopup(evt);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

profilePopup.querySelector('.popup__form').addEventListener("submit", handleEditFormSubmit);


// TO CREATE A NEW CARD

addButton.addEventListener("click", function (evt) {
  openPopup(evt);
});

function takeValuesFromInput () {
  return {
    name: cardPopup.querySelector(".popup__input_card-name").value,
    link: cardPopup.querySelector(".popup__input_card-link").value
  };
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCardToPage(createCardInList(takeValuesFromInput()));
  closePopup(evt);
  evt.target.reset();
}

cardPopup.querySelector('.popup__form').addEventListener("submit", handleAddCardFormSubmit);


// TO LIKE A CARD

function likeToggler(evt) {
  evt.target.classList.toggle("element__like_active");
}


// TO REMOVE A CARD

const removeCardButtons = document.querySelectorAll(".element__remove-button");

function cardRemover(event) {
  const cardToRemove = event.target.closest(".elements-list__item");
  cardToRemove.remove();
}

removeCardButtons.forEach((el) => {
  el.addEventListener("click", cardRemover);
});

// TO SEE CARD-INFO CLOSER

const cardImages = document.querySelectorAll(".element__image");

function openCard(evt) {
  openPopup(evt);

  imagePopupPhoto.src = evt.target.getAttribute("src");
  imagePopupDescription.textContent = evt.target
    .closest(".element")
    .querySelector(".element__description").textContent;
}

cardImages.forEach((el) => {
  el.addEventListener("click", openCard);
});
