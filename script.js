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

function setValue(element, value) {
    element.innerText = value
}

//add eventlisteners to the input elements to display card detils real time
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

//form submission handler
formData.addEventListener("submit", function (event) {
  event.preventDefault();

  //extracting input values from the form
  const form = event.target;
  const cardName = form["name"].value;
  const cardNumber = form["number"].value;
  const expiryYear = form["year"].value;
  const expiryMonth = form["month"].value;
  const cvc = form["cvc"].value;

  //calling function  for validating card details
  const result = validation(cardName, cardNumber, expiryMonth, expiryYear, cvc);

  //redirect to next page the validations are true
  if (result) {
    redirect();
  }

});

//function to validate cardname, cardnumber,expirymonth, expiryyear, cvc
function validation(cardName, cardNumber, expiryMonth, expiryYear, cvc) {

  let isValid = true;

  //validations
  if (!cardName) {
    isValid = setBlankError("can't be blank", nameError, nameInput);
  }

  if (!cardNumber) {
    isValid = setBlankError("can't be blank", numberError, numberInput);
  }

  if (cardNumber) {
    isValid = setWrongFormatError(/^\d{16}$/, cardNumber, numberError, "wrong format, input 16 digits only!", numberInput);
  }

  if (!expiryMonth) {
    isValid = setBlankError("can't be blank", dateError, monthInput);
  }

  if (expiryMonth) {
    isValid = setWrongFormatError(/^(0[1-9]|1[0-2])$/, expiryMonth, dateError, "wrong format, input month in MM format only!", monthInput);
  }

  if (!expiryYear) {
    isValid = setBlankError("can't be blank", dateError, yearInput);
  }

  if (expiryYear) {
    isValid = setWrongFormatError(/^\d{2}$/, expiryYear, dateError, "wrong format, input year in YY format only!", yearInput);
  }

  if (!cvc) {
    isValid = setBlankError("can't be blank", cvcError, cvcInput);
  }

  if (cvc) {
    isValid = setWrongFormatError(/^\d{3}$/, cvc, cvcError, "wrong format, input 3 digits only!", cvcInput);
  }

  return isValid;

}

//function to display error message if the input fields are empty
function setBlankError(errorMessage, errorElement, inputElement) {
  errorElement.innerHTML = `<p> ${errorMessage} </p>`;
  inputElement.style.border = "1px solid red";
  return false;
}

//function to display error message if the input values are in wrong format
function setWrongFormatError(regex, inputValue, element, errorMessage, inputElement) {

  const pattern = new RegExp(regex);

  if (!pattern.test(inputValue)) {
    element.innerHTML = `<p> ${errorMessage} </p>`;
    inputElement.style.border = "ipx solid red";
    return false;
  }
}

//function to redirect to next page
function redirect() {
  if (secondDivComputedStyle.display === 'none') {
    secondPage.style.display = "inline-flex";
    formData.style.display = "none";
  }
}

continueButton.addEventListener("click", function(event) {
  location.reload();
});




