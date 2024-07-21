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
    nameInput.style.border = "1px solid black";
    numberInput.style.border = "1px solid black";
    monthInput.style.border = "1px solid black";
    yearInput.style.border = "1px solid black";
    cvcInput.style.border = "1px solid black";
    nameError.innerHTML = "";
    numberError.innerHTML = "";
    dateError.innerHTML = "";
    cvcError.innerHTML = "";
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
    setBlankError("can't be blank", nameError);
    isValid = false;
    nameInput.style.border = "1px solid red";
  }

  if (!cardNumber) {
    setBlankError("can't be blank", numberError);
    isValid = false;
    numberInput.style.border = "1px solid red";
  }

  if (cardNumber) {
    setWrongFormatError(/^\d{16}$/, cardNumber, numberError, "wrong format, numbers only");
    if (!outcome) {
      isValid = false;
      numberInput.style.border = "1px solid red";
    }
  }

  if (!expiryMonth) {
    setBlankError("can't be blank", dateError);
    isValid = false;
    monthInput.style.border = "1px solid red";
  }

  if (expiryMonth) {
    setWrongFormatError(/^(0[1-9]|1[0-2])$/, expiryMonth, dateError, "wrong format, numbers only", isValid);
    if (!outcome) {
      isValid = false;
      monthInput.style.border = "1px solid red";
    }
  }

  if (!expiryYear) {
    setBlankError("can't be blank", dateError);
    isValid = false;
    yearInput.style.border = "1px solid red";
  }

  if (expiryYear) {
    setWrongFormatError(/^\d{2}$/, expiryYear, dateError, "wrong format, numbers only", isValid);
    if (!outcome) {
      isValid = false;
      yearInput.style.border = "1px solid red";
    }
  }

  if (!cvc) {
    setBlankError("can't be blank", cvcError);
    isValid = false;
    cvcInput.style.border = "1px solid red";
  }

  if (cvc) {
    setWrongFormatError(/^\d{3}$/, cvc, cvcError, "wrong format, numbers only", isValid);
    if (!outcome) {
      isValid = false;
      cvcInput.style.border = "1px solid red";
    }
  }

  return isValid;

}

//function to display error message if the input fields are empty
function setBlankError(errorMessage, element) {
  element.innerHTML = `<p> ${errorMessage} </p>`
}

//function to display error message if the input values are in wrong format
function setWrongFormatError(value, inputValue, element, errorMessage) {

  const regex = new RegExp(value);

  if (!regex.test(inputValue)) {
    element.innerHTML = `<p> ${errorMessage} </p>`;
    outcome = false;
  } else {
    outcome = true;
  }

  return outcome;

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




