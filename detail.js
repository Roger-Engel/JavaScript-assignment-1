document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get("index"));

    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const userData = formDataArray[index];

    const userInfoName = document.getElementById("user-nameInfo");
    const userInfoPlace = document.getElementById("user-PlaceInfo");
    const userInfoStreetName = document.getElementById("user-StreetNameInfo");
    const userInfoPostalCode = document.getElementById("user-PostalCodeInfo");
    const userInfoHouseNumber = document.getElementById("user-HouseNumber");

    if (userData) {
        userInfoName.textContent = `Naam: ${userData.firstName} ${userData.infix || ''} ${userData.lastName}\n`;
        userInfoPlace.textContent = `Plaats: ${userData.city}\n `;
        userInfoStreetName.textContent = `Straatnaam: ${userData.streetName}\n`;
        userInfoPostalCode.textContent = `Postcode: ${userData.postalCode}\n`;
        userInfoHouseNumber.textContent = `Huisnummer: ${userData.houseNumber} ${userData.addition}\n`;
    } else {
        userInfoParagraph.textContent = "Gebruiker niet gevonden.";
    }
});
