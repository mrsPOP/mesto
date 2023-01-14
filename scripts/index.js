let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__button');
let formBackground = document.querySelector('.popup:not(.popup__container)');

editButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  formElement.classList.remove('popup_opened');
});

function formSubmitHandler (evt) {
	evt.preventDefault();

	let nameInput = formElement.querySelector('input[title="name"]');
	let jobInput = formElement.querySelector('input[title="description"]');

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  formElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
