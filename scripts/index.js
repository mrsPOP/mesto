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


const cardTemplate = document.querySelector('#card').content;
const cardsList = document.querySelector('.elements-list');

function createCardInList (item) {
  const card = cardTemplate.querySelector('.elements-list__item').cloneNode(true);
  card.querySelector('.element__description').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  cardsList.prepend(card);
}

function addCardsToList () {
  initialCards.forEach(createCardInList);
}

addCardsToList();


const formElement = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

function closePopup () {
  formElement.classList.remove('popup_opened');
  form.classList.remove('popup__form_visible');
}

closeButton.addEventListener('click', function () {
  closePopup();
});

formElement.addEventListener('submit', formSubmitHandler);


const editButton = document.querySelector('.profile__edit-button');
const form = document.querySelector('.profile__add-button');
const addPlaceForm = document.querySelector('.popup__form_el_add');
const editForm = document.querySelector('.popup__form_el_edit');

editButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
  editForm.classList.add('popup__form_visible');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});


const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
  addPlaceForm.classList.add('popup__form_visible');
});
