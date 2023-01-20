let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_el_name');
let jobInput = formElement.querySelector('.popup__input_el_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
	evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

function closePopup () {
  formElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  formElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

closeButton.addEventListener('click', function () {
  closePopup();
});

formElement.addEventListener('submit', formSubmitHandler);
