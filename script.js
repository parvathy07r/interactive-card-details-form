//select the form element
const formData = document.querySelector("#form_data");

// Select elements to display card detail
const displayNumber = document.querySelector(".display-number");
const displayName = document.querySelector(".display-name");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");
const displayCVC = document.querySelector(".display-cvc");

//select input elements
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const cvcInput = document.querySelector("#cvc");

//select the second page element
const secondPage = document.querySelector(".second-page");
const secondDivComputedStyle = window.getComputedStyle(secondPage);

//select the elemnt to display errors
const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");

//select continue button
const continueButton = document.querySelector(".continue-button");
let outcome;

/*
description: function to update the card details in the card.
parameters: 
1. element: the html element whose innertext to be updated.
2. value: the value to set. 
*/

function setValue(element, value) {
    element.innerText = value
}


/*
description: add eventlisteners to the input elements to display card detils real time in the card 
*/

nameInput.addEventListener("input", function (event) {
  setValue(displayName, event.target.value);
});

numberInput.addEventListener("input", function (event) {
  setValue(displayNumber, event.target.value);
});

monthInput.addEventListener("input", function (event) {
  setValue(displayMonth, event.target.value);
});

yearInput.addEventListener("input", function (event) {
  setValue(displayYear, event.target.value);
});

cvcInput.addEventListener("input", function (event) {
  setValue(displayCVC, event.target.value);
});

/*
description: form submission handler
*/ 

formData.addEventListener("submit", function (event) {
  event.preventDefault();

  /*
  description: extracting input values from the form
  */

  const form = event.target;
  const cardName = form["name"].value;
  const cardNumber = form["number"].value;
  const expiryYear = form["year"].value;
  const expiryMonth = form["month"].value;
  const cvc = form["cvc"].value;

  /*
  description: calling the function for valudation and storing the result.
  */

  const result = validation(cardName, cardNumber, expiryMonth, expiryYear, cvc);

  /*
  description: calling the function redirect to redirect to next page if the validations are true.
  */

  if (result) {
    redirect();
  }

});

/*
description: function for validation.
parameters: 
1. cardName - for name
2. cardNumber - for card number
3. expiryMonth - for expiry month
4. expiryYear - for expiry year
5.cvc - for cvc
*/

function validation(cardName, cardNumber, expiryMonth, expiryYear, cvc) {

  /*
  description: setting the variable invalid as true.
  */

  let isValid = true;

  /*
  description: calling the function setBlankError if name is empty and storing the result.
  */

  if (!cardName) {
    isValid = setBlankError("can't be blank", nameError, nameInput);
  }

  /*
  description: calling the function setBlankError if card number is empty and storing the result.
  */

  if (!cardNumber) {
    isValid = setBlankError("can't be blank", numberError, numberInput);
  }

  /*
  description: calling the function setWrongFormatError if card number is present to check if it is in wrong format or not and storing the result.
  */

  if (cardNumber) {
    isValid = setWrongFormatError(/^\d{16}$/, cardNumber, numberError, "wrong format, input 16 digits only!", numberInput);
  }

  /*
  description: calling the function setBlankError if expiry month is empty and storing the result.
  */

  if (!expiryMonth) {
    isValid = setBlankError("can't be blank", dateError, monthInput);
  }

  /*
  description: calling the function setWrongFormatError if expiry month is present to check if it is in wrong format or not and storing the result.
  */

  if (expiryMonth) {
    isValid = setWrongFormatError(/^(0[1-9]|1[0-2])$/, expiryMonth, dateError, "wrong format, input month in MM format only!", monthInput);
  }

  /*
  description: calling the function setBlankError if expiry year is empty and storing the result.
  */

  if (!expiryYear) {
    isValid = setBlankError("can't be blank", dateError, yearInput);
  }

  /*
  description: calling the function setWrongFormatError if expiry year is present to check if it is in wrong format or not and storing the result.
  */

  if (expiryYear) {
    isValid = setWrongFormatError(/^\d{2}$/, expiryYear, dateError, "wrong format, input year in YY format only!", yearInput);
  }

  /*
  description: calling the function setBlankError if cvc is empty and storing the result.
  */

  if (!cvc) {
    isValid = setBlankError("can't be blank", cvcError, cvcInput);
  }

  /*
  description: calling the function setWrongFormatError if cvc is present to check if it is in wrong format or not and storing the result.
  */

  if (cvc) {
    isValid = setWrongFormatError(/^\d{3}$/, cvc, cvcError, "wrong format, input 3 digits only!", cvcInput);
  }

  return isValid;

}

/*
description: function to display error message if the input fields are empty
parameters:
1. error message
2. html elemnt to display error message
3. input field
*/

function setBlankError(errorMessage, errorElement, inputElement) {
  errorElement.innerHTML = `<p> ${errorMessage} </p>`;
  inputElement.style.border = "1px solid red";
  return false;
}

/*
description: function to display error message if the inputs are in wrong format
parameters:
1. regex value
2. input value
3. html element to display error message
4. error message
5. input field
*/

function setWrongFormatError(regex, inputValue, element, errorMessage, inputElement) {

  const pattern = new RegExp(regex);

  if (!pattern.test(inputValue)) {
    element.innerHTML = `<p> ${errorMessage} </p>`;
    inputElement.style.border = "ipx solid red";
    return false;
  }

}

/*
description: function to redirect to next page
*/

function redirect() {

  /*
  description: if the computed style of sceon page is none, set the display of second page as inline-flex and form as none
  */

  if (secondDivComputedStyle.display === 'none') {
    secondPage.style.display = "inline-flex";
    formData.style.display = "none";
  }

}

/*
description: adding an event listener to the continue button. If the button is clicked the page is reloaded
*/

continueButton.addEventListener("click", function(event) {

  location.reload();

});




