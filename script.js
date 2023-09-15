let isEditMode = false;
let editIndex = -1;

displayUserData();

class Person {
    constructor(firstName, infix, lastName, postalCode, houseNumber, addition, city, streetName) {
        this.firstName = firstName;
        this.infix = infix;
        this.lastName = lastName;
        this.postalCode = postalCode;
        this.houseNumber = houseNumber;
        this.addition = addition;
        this.city = city;
        this.streetName = streetName;
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".popupOverlay").classList.add("active");

    isEditMode = false;
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector(".popupOverlay").classList.remove("active");

    document.getElementById("postalcodeInput").value = "";
    document.getElementById("houseNumberInput").value = "";
    document.getElementById("additionInput").value = "";
    document.getElementById("cityInput").value = "";
    document.getElementById("streetNameInput").value = "";
    document.getElementById("firstNameInput").value = "";
    document.getElementById("infixInput").value = "";
    document.getElementById("lastNameInput").value = "";
}

function saveFormData() {
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const postalcodeInput = document.getElementById("postalcodeInput").value;
    const postalCodeNumbers = postalcodeInput.slice(0, 4);
    const postalCodeLetters = postalcodeInput.slice(4).toUpperCase();

    const formData = new Person(
        capitalizeFirstLetter(document.getElementById("firstNameInput").value),
        document.getElementById("infixInput").value,
        capitalizeFirstLetter(document.getElementById("lastNameInput").value),
        postalCodeNumbers + postalCodeLetters,
        document.getElementById("houseNumberInput").value,
        document.getElementById("additionInput").value,
        capitalizeFirstLetter(document.getElementById("cityInput").value),
        capitalizeFirstLetter(document.getElementById("streetNameInput").value)
    )

    const formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];

    if (isEditMode) {
        formDataArray[editIndex] = formData;
    } else {
        formDataArray.push(formData);
    }

    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

    closeForm();

    isEditMode = false;

    displayUserData();
};

function displayUserData() {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    const userlist = document.getElementById('userlist');
    userlist.innerHTML = '';

    formDataArray.forEach((formData, index) => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';

        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';

        const nameElement = document.createElement('h2');
        nameElement.className = 'name-item';
        nameElement.textContent = `${formData.firstName} ${formData.infix || ''} ${formData.lastName}`;
        nameElement.onclick = () => viewUserDetails(index);

        userItem.appendChild(nameElement);

        const infoButton = document.createElement('button');
        infoButton.className = 'info-button';
        infoButton.innerHTML = '<img src="images/info.png" alt="Info Icon" class="info-icon"/>';
        infoButton.onclick = () => viewUserDetails(index);

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = '<img src="images/circel-pen.png" alt="Bewerken Icon" class="edit-icon"/>';
        editButton.onclick = () => editUser(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<img src="images/circel-delete.png" alt="Verwijderen Icon" class="delete-icon" />';
        deleteButton.onclick = () => removeUser(index);

        userInfo.appendChild(infoButton);
        userInfo.appendChild(editButton);
        userInfo.appendChild(deleteButton);

        userItem.appendChild(userInfo);

        userlist.appendChild(userItem);
    });
}

function viewUserDetails(index) {
    window.location.href = `detail.html?index=${index}`;
}

function removeUser(index) {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    if (index >= 0 && index < formDataArray.length) {
        formDataArray.splice(index, 1);
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray));
        displayUserData();
    }
}

function editUser(index) {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    // Check if the index is valid
    if (index >= 0 && index < formDataArray.length) {
        const userData = formDataArray[index];

        document.getElementById("postalcodeInput").value = userData.postalCode;
        document.getElementById("houseNumberInput").value = userData.houseNumber;
        document.getElementById("additionInput").value = userData.addition;
        document.getElementById("cityInput").value = userData.city;
        document.getElementById("streetNameInput").value = userData.streetName;
        document.getElementById("firstNameInput").value = userData.firstName;
        document.getElementById("infixInput").value = userData.infix;
        document.getElementById("lastNameInput").value = userData.lastName;

        editIndex = index;

        openForm();

        isEditMode = true;
    }
}

