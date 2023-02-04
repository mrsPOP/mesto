const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formElement = document.querySelector('.popup');
const addPlaceForm = document.querySelector('.popup__form_el_add');
const editForm = document.querySelector('.popup__form_el_edit');
const closeButton = document.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_description');
const cardInfo = document.querySelector('.popup__card-info');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.elements-list');


// TO DISPLAY CARDS FROM THE LIST "initialCards"

function createCardInList (item) {
  const card = cardTemplate.querySelector('.elements-list__item').cloneNode(true);
  card.querySelector('.element__description').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;
  return card;
}

function addCardToPage (card) {
  cardsList.prepend(card);
}

function addCardsToList () {
  initialCards.forEach(function (el) {
    addCardToPage(createCardInList(el))
  });
}

addCardsToList();


// TO CLOSE POPUP

function closePopup () {
  formElement.classList.remove('popup_opened');
  addPlaceForm.classList.remove('popup_content-visible', 'display-none');
  editForm.classList.remove('popup_content-visible', 'display-none');
  cardInfo.classList.remove('popup_content-visible', 'display-none');
}

closeButton.addEventListener('click', closePopup);


// TO EDIT PROFILE INFO

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
  cardInfo.classList.add('display-none');
  addPlaceForm.classList.add('display-none');
  editForm.classList.add('popup_content-visible');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

editForm.addEventListener('submit', formSubmitHandler);


// TO CREATE A NEW CARD

addButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
  editForm.classList.add('display-none');
  cardInfo.classList.add('display-none');
  addPlaceForm.classList.add('popup_content-visible');
});

function addCardToInitialCards () {
  initialCards.unshift({
    name: addPlaceForm.querySelector('.popup__input_card-name').value,
    link: addPlaceForm.querySelector('.popup__input_card-link').value
  });
}

function cardCreateFormHandler (evt) {
  evt.preventDefault();

  addCardToInitialCards();
  const newCard = createCardInList(initialCards[0]);
  newCard.querySelector('.element__like').addEventListener('click', likeToggler);
  newCard.querySelector('.element__remove-button').addEventListener('click', cardRemover);
  newCard.querySelector('.element__image').addEventListener('click', openCard);
  addCardToPage(newCard);
  closePopup();
  evt.target.reset();
}

addPlaceForm.addEventListener('submit', cardCreateFormHandler);


// TO LIKE A CARD

const likes = document.querySelectorAll('.element__like');

function likeToggler (event) {
  event.target.classList.toggle('element__like_active');
}

likes.forEach((el) => {
  el.addEventListener('click', likeToggler);
});


// TO REMOVE A CARD

const removeCardButtons = document.querySelectorAll('.element__remove-button');

function cardRemover (event) {
  const cardToRemove = event.target.closest('.elements-list__item');
  cardToRemove.remove();
}

removeCardButtons.forEach((el) => {
  el.addEventListener('click', cardRemover);
});


// TO SEE CARD-INFO CLOSER

const cardImages = document.querySelectorAll('.element__image');

function openCard (event) {
  formElement.classList.add('popup_opened');
  formElement.classList.add('popup_opacity_total');
  editForm.classList.add('display-none');
  addPlaceForm.classList.add('display-none');

  cardInfo.querySelector('.popup__card-picture').src = event.target.getAttribute('src');
  cardInfo.querySelector('.popup__card-description').textContent = event.target.closest('.element').querySelector('.element__description').textContent;

  cardInfo.classList.add('popup_content-visible');
}

cardImages.forEach((el) => {
  el.addEventListener('click', openCard);
});
