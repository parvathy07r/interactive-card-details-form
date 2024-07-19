const formData = document.querySelector("#form_data");
const displayNumber = document.querySelector(".display-number");
const displayName = document.querySelector(".display-name");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");
const displayCVC = document.querySelector(".display-cvc");
const error = document.querySelector(".error");
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const cvcInput = document.querySelector("#cvc");
const rowOne = document.querySelector(".row-one");
const rowTwo = document.querySelector(".row-two");
const expiryDate = document.querySelector(".expiry-date");
const cvcData = document.querySelector(".cvc-data");

function setValue(element, value) {
    element.innerText = value
}

nameInput.addEventListener("input", function (event) {
    setValue(displayName, event.target.value);
});

numberInput.addEventListener("input", function (event) {
    displayNumber.innerText = event.target.value;
});

monthInput.addEventListener("input", function (event) {
    displayMonth.innerText = event.target.value;
});

yearInput.addEventListener("input", function (event) {
    displayYear.innerText = event.target.value;
});

cvcInput.addEventListener("input", function (event) {
    displayCVC.innerText = event.target.value;
});

formData.addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const cardName = form["name"].value;
    const cardNumber = form["number"].value;
    const expiryYear = form["year"].value;
    const expiryMonth = form["month"].value;
    const cvc = form["cvc"].value;
    const rowOneError = rowOne.querySelector("p");
    const rowTwoError = rowTwo.querySelector("p");
    const expiryDateError = expiryDate.querySelector("p");
    const cvcError = cvcData.querySelector("p");




    // Validations

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
    }

    if (cardNumber && !/^\d{16}$/.test(cardNumber)) {
        if (rowTwoError) {
            rowTwoError.remove();
        } else {
            rowTwo.innerHTML += `<p> wrong format, numbers only </p>`;
        }
    }

    if (cvc && !/^\d{3}$/.test(cvc)) {
        if (!cvcError) {
            cvcData.innerHTML += `<p> wrong format, numbers only </p>`;
        } else {
            cvcError.remove();
        }
    }

    if(expiryYear && !/^\d{2}$/.test(expiryYear)) {
        if (!expiryDateError) {
            expiryDate.innerHTML += `<p> wrong format, numbers only </p>`;
        } else {
            expiryDateError.remove();
        }
    }

    if(expiryMonth && !/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
        if (!expiryDateError) {
            expiryDate.innerHTML += `<p> wrong format, numbers only </p>`;
        } else {
            expiryDateError.remove();
        }
    }

    const secondDiv = document.querySelector(".second-page");
    const firstDiv = document.querySelector(".container-two");
    const secondDivComputedStyle = window.getComputedStyle(secondDiv);

    if(secondDivComputedStyle.display === 'none') {
        secondDiv.style.display = "inline-flex";
        formData.style.display = "none";
    }

});




