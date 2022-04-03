const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const results = document.getElementById("title");

function checkInputs(event) {
	const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (!checkPass(passwordValue) || (!checkPass2(passwordValue, password2Value))) {
        event.preventDefault();
    } else {
        showInput();
        event.preventDefault();
    }
}

function checkPass(value) {
    if (!ValidPass(value)) {
        setErrorFor(password, 'Invalid password, use 8-20 characters: a-z, A-Z, 0-9 _,.-:;?!');
        return false;
    } else {
        setSuccessFor(password);
        return true;
    }
}

function checkPass2(value, value2) {
    if(!ValidPass(value2)) {
        setErrorFor(password2, 'Invalid password, use 8-20 characters: a-z, A-Z, 0-9 _,.-:;?!');
        return false;
    } else if (value !== value2) {
        setErrorFor(password2, "Passwords don't match");
        return false;
    } else {
        setSuccessFor(password2);
        return true;
    }
}

function setFocusTo(input){
    var errorFocus = input;
    errorFocus.focus();
    errorFocus.scrollIntoView();
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form_fields error';
    setFocusTo(password);
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form_fields success';
}

function ValidPass(password) {
    return /^[\w!_\\\-;:\.?]{8,20}$/.test(password); 
}

function getHobbies() {
    let values = [];
    let checkboxes = document.querySelectorAll('input[name="hobbyChoice"]:checked');  
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    if (values.length !== 0){
        return document.getElementById('hobbyField').innerText = "\nYour hobbies:\n" + values.join(", ") + "\n";
    } 
}  

function check_optional(field, desc, text) {
    let valuex = document.getElementById(field).value;
    if (valuex.length !== 0) {
        return document.getElementById(desc).innerText = text + valuex + "\n";
    } 
}  

function showInput() {
    document.getElementById("hidden").style.display = "block";
    document.getElementById('nameField').innerText = "\nFull name:\n" + document.getElementById("username").value + "\n";
    document.getElementById('passField').innerText = "\nPassword:\n" + document.getElementById("password").value + "\n";
    document.getElementById('pass2Field').innerText = "\nPassword again:\n" + document.getElementById("password").value + "\n";
    document.getElementById('genderField').innerText = "\nYour gender:\n" + document.querySelector('input[name="gender"]:checked').value + "\n";
    getHobbies();
    check_optional("datepicker", 'dateField', "\nBirth date:\n");
    document.getElementById('heightField').innerText = "\nHeight:\n" + document.getElementById("id_number_output").value + "\n";
    document.getElementById('colorField').innerText = "\nFavorite color:\n" + document.getElementById("favoriteColor").value + "\n";
    document.getElementById('countryField').innerText = "\nCountry:\n" + document.getElementById("country").value + "\n";
    check_optional("profession", 'profField', "\nProfession:\n");
    document.getElementById('msgField').innerText = "\nMessage:\n" + document.getElementById("message").value + "\n";
    setFocusTo(results);
}
