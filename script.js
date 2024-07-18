const formData = document.querySelector("#form_data");
const displayNumber = document.querySelector(".display-number");
const displayName = document.querySelector(".display-name");
const displayExpiry = document.querySelector(".display-expiry");
const displayCVC = document.querySelector(".display-cvc");
const error = document.querySelector(".error");

formData.addEventListener("submit", function(event) {
    
    event.preventDefault();

    const form = event.target;
    const cardName = form["name"].value;
    const cardNumber = form["number"].value;
    const expiryDate = form["dd"].value;
    const expiryMonth = form["mm"].value;    
    const cvc = form["cvc"].value;

    displayCVC.innerHTML = "";
    displayExpiry.innerHTML = "";
    displayName.innerHTML = "";
    displayNumber.innerHTML = "";
    error.innerHTML = "";
    
    if(isNaN(cardNumber)){
        error.append(enterDetails("error"));
    }else {
        displayNumber.append(enterDetails(cardNumber));
    }

    if(cardName) {
        displayName.append(enterDetails(cardName));
    }

    if(expiryDate && expiryMonth) {
        displayExpiry.append(enterDetails(`${expiryDate} ${expiryMonth}`));
    }

    if(cvc) {
        displayCVC.append(enterDetails(cvc));
    }

});

function enterDetails(value) {
    const node = document.createElement("p");
    node.innerHTML = value;
    return node;
}

