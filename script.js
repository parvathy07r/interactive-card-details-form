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

function setValue(element, value){
    element.innerText = value
}

nameInput.addEventListener("input", function(event){
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
    const expiryDate = form["dd"].value;
    const expiryMonth = form["mm"].value;
    const cvc = form["cvc"].value;

    // Validations

});


