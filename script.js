// Popup-form
function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".popupOverlay").classList.add("active");
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector(".popupOverlay").classList.remove("active");
}

let isEditMode = false; // Declare the isEditMode variable
let editIndex = -1;


// Save's the users data to the local storage
const saveFormData = () => {
    const formData = {
        postalCode: document.getElementById("postalcodeInput").value,
        houseNumber: document.getElementById("houseNumberInput").value,
        addition: document.getElementById("additionInput").value,
        city: document.getElementById("cityInput").value,
        streetName: document.getElementById("streetNameInput").value,
        firstName: document.getElementById("firstNameInput").value,
        infix: document.getElementById("infixInput").value,
        lastName: document.getElementById("lastNameInput").value,
    };

    const formDataArray = JSON.parse(localStorage.getItem("formDataArray")) || [];

    if (isEditMode) {
        // If in edit mode, update the existing data
        formDataArray[editIndex] = formData;
    } else {
        // If not in edit mode, add new data
        formDataArray.push(formData);
    }

    localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

    // Close the form
    closeForm();

    // Reset edit mode to false
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
        
        // Wrap the name in a <p> tag with an onclick event
        const nameElement = document.createElement('h2');
        nameElement.className = 'name-item';
        nameElement.textContent = `${formData.firstName} ${formData.infix || ''} ${formData.lastName}`;
        nameElement.onclick = () => viewUserDetails(index);
        
        userItem.appendChild(nameElement);
        
        // Create the "Bewerken" button
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.innerHTML = '<img src="images/pen.png" alt="Bewerken Icon" id="edit-icon" />';
        editButton.onclick = () => editUser(index);
        
        // Create the "Verwijderen" button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<img src="images/delete.png" alt="Verwijderen Icon" id="delete-icon" />';
        deleteButton.onclick = () => removeUser(index);
        
        // Append the buttons to the userItem
        userItem.appendChild(editButton);
        userItem.appendChild(deleteButton);

        userlist.appendChild(userItem);
    });
}


displayUserData();

function viewUserDetails(index) {
    // navigate to detail page onclicking the name
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

        // Show the form for editing
        openForm();

        isEditMode = true;
    }
}
