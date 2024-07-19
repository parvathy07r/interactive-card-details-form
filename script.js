// Select the form element containing all input fields
const formData = document.querySelector("#form_data");
// Select elements that display the card details
const displayNumber = document.querySelector(".display-number");
const displayName = document.querySelector(".display-name");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");
const displayCVC = document.querySelector(".display-cvc");
// Select input fields for card details
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const cvcInput = document.querySelector("#cvc");
// Select row elements
const rowOne = document.querySelector(".row-one");
const rowTwo = document.querySelector(".row-two");
const expiryDate = document.querySelector(".expiry-date");
const cvcData = document.querySelector(".cvc-data");
// Select the second page container and get its computed style
const secondDiv = document.querySelector(".second-page");
const secondDivComputedStyle = window.getComputedStyle(secondDiv);
// Select existing error message elements within the rows
const rowOneError = rowOne.querySelector("p");
const rowTwoError = rowTwo.querySelector("p");
const expiryDateError = expiryDate.querySelector("p");
const cvcError = cvcData.querySelector("p");

// Function to set the inner text of a specified element to a given value
function setValue(element, value) {
    element.innerText = value
}

// Event listener for the name input field to update the displayName element
nameInput.addEventListener("input", function (event) {
    setValue(displayName, event.target.value);
});

// Event listener for the number input field to update the displayNumber element
numberInput.addEventListener("input", function (event) {
    displayNumber.innerText = event.target.value;
});

// Event listener for the month input field to update the displayMonth element
monthInput.addEventListener("input", function (event) {
    displayMonth.innerText = event.target.value;
});

// Event listener for the year input field to update the displayYear element
yearInput.addEventListener("input", function (event) {
    displayYear.innerText = event.target.value;
});

// Event listener for the CVC input field to update the displayCVC element
cvcInput.addEventListener("input", function (event) {
    displayCVC.innerText = event.target.value;
});

//submission handler
formData.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const cardName = form["name"].value;
    const cardNumber = form["number"].value;
    const expiryYear = form["year"].value;
    const expiryMonth = form["month"].value;
    const cvc = form["cvc"].value;

    // Validations
		const result = validation(cardName, cardNumber, expiryMonth, expiryYear, cvc);

		//redirect to next page
		if(result) {
			redirect();
		}
    

});

//validations
function validation(cardName, cardNumber, expiryMonth, expiryYear, cvc) {

	let isValid =true;

	//to check if the input fields are empty
	if (!cardName && !cardNumber && !expiryYear && !expiryMonth && !cvc) {

		if (!rowOneError) {
				rowOne.innerHTML += `<p> can't be blank </p>`;
		} else {
				rowOneError.remove();
		}

		if (!rowTwoError) {
				rowTwo.innerHTML += `<p> can't be blank </p>`;
		} else {
				rowTwoError.remove();
		}

		if (!expiryDateError) {
				expiryDate.innerHTML += `<p> can't be blank </p>`;
		} else {
				expiryDateError.remove();
		}

		if (!cvcError) {
				cvcData.innerHTML += `<p> can't be blank </p>`;
		} else {
				cvcError.remove();
		}

		isValid = false;
}

//to check if the card number is in wrong format
if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
		if (rowTwoError) {
				rowTwoError.remove();
		} else {
				rowTwo.innerHTML += `<p> wrong format, numbers only </p>`;
		}

		isValid = false;
}

//to check if the cvc is in the wrong format
if (cvc && !/^\d{3}$/.test(cvc)) {
		if (!cvcError) {
				cvcData.innerHTML += `<p> wrong format, numbers only </p>`;
		} else {
				cvcError.remove();
		}

		isValid =false;
}
			
//to check if the expiryyear is in the wrong format
if(expiryYear && !/^\d{2}$/.test(expiryYear)) {
		if (!expiryDateError) {
				expiryDate.innerHTML += `<p> wrong format, numbers only </p>`;
		} else {
				expiryDateError.remove();
		}

		isValid = false;
}

//to check if the expiry month is in the wrong format
if(expiryMonth && !/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
		if (!expiryDateError) {
				expiryDate.innerHTML += `<p> wrong format, numbers only </p>`;
		} else {
				expiryDateError.remove();
		}

		isValid = false;
}       

return isValid;

}

//function to redirect to next page
function redirect() {
	if(secondDivComputedStyle.display === 'none') {
		secondDiv.style.display = "inline-flex";
		formData.style.display = "none";
}
}




