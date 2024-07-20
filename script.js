
const formData = document.querySelector("#form_data");

const displayNumber = document.querySelector(".display-number");
const displayName = document.querySelector(".display-name");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");
const displayCVC = document.querySelector(".display-cvc");

const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const cvcInput = document.querySelector("#cvc");

const nameContainer = document.querySelector(".row-one");
const numberContainer = document.querySelector(".row-two");
const expiryDateContainer = document.querySelector(".expiry-date");
const cvcContainer = document.querySelector(".cvc-data");

const secondDiv = document.querySelector(".second-page");
const secondDivComputedStyle = window.getComputedStyle(secondDiv);

const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const dateError = document.querySelector(".date-error");
const cvcError = document.querySelector(".cvc-error");


function setValue(element, value) {
    element.innerText = value
}

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


formData.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const cardName = form["name"].value;
    const cardNumber = form["number"].value;
    const expiryYear = form["year"].value;
    const expiryMonth = form["month"].value;
    const cvc = form["cvc"].value;

		const result = validation(cardName, cardNumber, expiryMonth, expiryYear, cvc);

		if(result) {
			redirect();
		}
});

//function to validate cardname, cardnumber,expirymonth, expiryyear, cvc
function validation(cardName, cardNumber, expiryMonth, expiryYear, cvc) {

	let isValid =true;

		if(!cardName) {
			setBlankError("can't be blank", nameError);
			isValid = false;
		}

		if(!cardNumber) {
			setBlankError("can't be blank", numberError);
			isValid = false;
		}

		if(!expiryMonth) {
			setBlankError("can't be blank", dateError);
			isValid = false;
		}

		if(!expiryYear) {
			setBlankError("can't be blank", dateError);
			isValid = false;
		}

		if(!cvc) {
			setBlankError("can't be blank", cvcError);
			isValid = false;
		}

		if(cardNumber) {
			setWrongFormatError(/^\d{16}$/, cardNumber, numberError, "wrong format, numbers only");
			isValid = false;
		}
		
		if(expiryMonth) {
			setWrongFormatError(/^(0[1-9]|1[0-2])$/, expiryMonth, dateError, "wrong format, numbers only");
			isValid = false;
		}

		if(expiryYear) {
			setWrongFormatError(/^\d{2}$/, expiryYear,dateError, "wrong format, numbers only");
			isValid = false;
		}

		if(cvc) {
			setWrongFormatError(/^\d{3}$/, cvc, cvcError, "wrong format, numbers only");
			isValid = false;
		}

  return isValid;

}

function setBlankError(errorMessage, element) {
	element.innerHTML = `<p> ${errorMessage} </p>`
}

function setWrongFormatError(regex, inputValue, element, errorMessage) {

	if(!regex.test(inputValue)) {
		element.innerHTML  = `<p> ${errorMessage} </p>`
	}

}

function redirect() {
	if(secondDivComputedStyle.display === 'none') {
		secondDiv.style.display = "inline-flex";
		formData.style.display = "none";
  }
}




