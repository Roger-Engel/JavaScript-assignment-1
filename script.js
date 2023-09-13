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

// Popup-form
function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".popupOverlay").classList.add("active");

    isEditMode = false;
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector(".popupOverlay").classList.remove("active");

    // Clear the form fields when closing form
    document.getElementById("postalcodeInput").value = "";
    document.getElementById("houseNumberInput").value = "";
    document.getElementById("additionInput").value = "";
    document.getElementById("cityInput").value = "";
    document.getElementById("streetNameInput").value = "";
    document.getElementById("firstNameInput").value =  "";
    document.getElementById("infixInput").value = "";
    document.getElementById("lastNameInput").value = "";
}

// Save's the users data to the local storage
function saveFormData() {
    const formData = new Person(
        document.getElementById("firstNameInput").value,
        document.getElementById("infixInput").value,
        document.getElementById("lastNameInput").value,
        document.getElementById("postalcodeInput").value,
        document.getElementById("houseNumberInput").value,
        document.getElementById("additionInput").value,
        document.getElementById("cityInput").value,
        document.getElementById("streetNameInput").value
    )

    const formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];

    if (isEditMode) {
        // If in edit mode, update the existing data
        formDataArray[editIndex] = formData;
    } else {
        // If not in edit mode, add new data
        formDataArray.push(formData);
    }

    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

    closeForm();

    isEditMode = false;

    // Refresh the user list
    displayUserData();
};

// Makes an information column with edit and delete button for each person that is added
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
        
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = '<img src="images/pen.png" alt="Bewerken Icon" class="edit-icon"/>';
        editButton.onclick = () => editUser(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<img src="images/delete.png" alt="Verwijderen Icon" class="delete-icon" />';
        deleteButton.onclick = () => removeUser(index);
        
        userInfo.appendChild(editButton);
        userInfo.appendChild(deleteButton);

        // Append the userInfo div to the userItem div
        userItem.appendChild(userInfo);

        // Append the userItem to the userlist
        userlist.appendChild(userItem);
    });
}

function viewUserDetails(index) {
    // navigate to detail page on clicking the button
    window.location.href = `detail.html?index=${index}`;
}

function removeUser(index) {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    if (index >= 0 && index < formDataArray.length) {
        formDataArray.splice(index, 1); // Remove the user at the specified index
        localStorage.setItem('formDataArray', JSON.stringify(formDataArray)); // Update Local Storage
        displayUserData(); // Refresh the user list
    }
}

function editUser(index) {
    const formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

    // Check if the index is valid
    if (index >= 0 && index < formDataArray.length) {
        const userData = formDataArray[index];

        // Populate the form fields with the user's data
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

