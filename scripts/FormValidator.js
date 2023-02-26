export class FormValidator{
constructor (settings, formElement) {
  this._inputSelector = settings.inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass;
  this._inputErrorClass = settings.inputErrorClas;
  this._formElement = formElement;
}

_showInputError (inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
}

_hideInputError (inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';
}

_checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
}

_setEventListeners () {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
      this._toggleButtonState(inputList, buttonElement);
    }, 0);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
}

enableValidation () {
  this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners();
}

_hasInvalidInput (inputList) {
  return inputList.some((InputElement) => {
    return !InputElement.validity.valid;
  });
}

_toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
}
