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
		if(result) {
			redirect();
		}

    if(!result) {
      nameInput.style.border = "1px solid red";
      numberInput.style.border = "1px solid red";
      monthInput.style.border = "1px solid red";
      yearInput.style.border = "1px solid red";
      cvcInput.style.border = "1px solid red";
    }

});

//function to validate cardname, cardnumber,expirymonth, expiryyear, cvc
function validation(cardName, cardNumber, expiryMonth, expiryYear, cvc) {

	let isValid =true;

    //validations
		if(!cardName) {
			setBlankError("can't be blank", nameError);
			isValid = false;
		}

		if(!cardNumber) {
			setBlankError("can't be blank", numberError);
			isValid = false;
		}
    
    if(cardNumber) {
      setWrongFormatError(/^\d{16}$/, cardNumber, numberError, "wrong format, numbers only");
      if(!outcome) {
        isValid =false;
      }
    }

		if(!expiryMonth) {
			setBlankError("can't be blank", dateError);
			isValid = false;
		}

    if(expiryMonth) {
      setWrongFormatError(/^(0[1-9]|1[0-2])$/, expiryMonth, dateError, "wrong format, numbers only", isValid);
      if(!outcome) {
        isValid =false;
      }
    }

		if(!expiryYear) {
			setBlankError("can't be blank", dateError);
			isValid = false;
		}
    
    if(expiryYear) {
      setWrongFormatError(/^\d{2}$/, expiryYear,dateError, "wrong format, numbers only", isValid);
      if(!outcome) {
        isValid =false;
      }
    }
      
		if(!cvc) {
			setBlankError("can't be blank", cvcError);
			isValid = false;
		}
    
    if(cvc) {
      setWrongFormatError(/^\d{3}$/, cvc, cvcError, "wrong format, numbers only", isValid);
      if(!outcome) {
        isValid =false;
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

	if(!regex.test(inputValue)) {
		element.innerHTML  = `<p> ${errorMessage} </p>`;
    outcome = false;
  }else {
    outcome = true;
  }

  return outcome;

}

//function to redirect to next page
function redirect() {
	if(secondDivComputedStyle.display === 'none') {
		secondPage.style.display = "inline-flex";
		formData.style.display = "none";
  }
}




