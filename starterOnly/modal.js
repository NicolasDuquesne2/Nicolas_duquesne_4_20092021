function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close");
const buttonSubmit = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//launch close modal event

closeButton.addEventListener('click', closeModal);

// launch modal button submit
buttonSubmit.addEventListener('click', submitModal); 

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


// submit the modal

function submitModal(event) {
  event.stopPropagation();
  event.preventDefault();
  formData.forEach(fd => {
    let input =  fd.querySelector("input");
    let inputId = input.getAttribute("id");
    let pattern = "";
    let string = "";
    //for each input, adapted function is called according to its type(text, checkbox, radio)
    switch(inputId) {
      case "first":
        pattern = "\\w{2,}"; //two char at least needed
        string = input.value;
        testTextInput(fd, string, pattern)
        break;
      case "last":
        pattern = "\\w{2,}";
        string = input.value;
        testTextInput(fd, string, pattern)
        break;
      case "email":
        pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"; //email regex
        string = input.value;
        testTextInput(fd, string, pattern)
        break;
      case "birthdate":
        testDateInput(fd, input.value);
        break;
      case "quantity":
        pattern ="\\d+";
        string = input.value;
        testTextInput(fd, string, pattern);
        break;
      case "location1":
        testRadio(fd);
        break;
      case "checkbox1":
        let id = "#checkbox1";
        testCheckButton(fd, id);
        break;
      default:
        break;
    }
  });  
}


// Event actions for text inputs : calls the regex function and and calls the attribute modificator

function testTextInput(fd, string, pattern) {
  let value = "";
  if (regexTest(string, pattern)) {
    value = "false";
  } else {
    value = "true";
  }
  setAtrrValue(fd,"data-error-visible", value);
}

//Event actions for Date inputs : only checks if the date value is not empty and calls the attribute modificator

function testDateInput(fd, string) {
  let value = "";
  if (string) {
    value = "false";
  } else {
    value = "true";
  }
  setAtrrValue(fd,"data-error-visible", value);
}

// Event actions for radio form : checks if one radio button is selected and calls the attribute modificator

function testRadio(fd) {
  let inputs = fd.querySelectorAll("input");
  let value = "";
  for (let i = 0; i< inputs.length; i++) {
    if (inputs[i].checked == true) {
      value = "false";
      break;
    } else {
      value = "true";
    }
  }
  setAtrrValue(fd,"data-error-visible", value);
}

// Event actions for check button : checks if a check button is selected and calls the attribute modificator

function testCheckButton(fd, id) {
  let input = fd.querySelector(id);
  let value ="";
  if (input.checked == true) {
    value = "false";
  } else {
    value = "true";
  }

  setAtrrValue(fd,"data-error-visible", value);
}


//attribute modificator

function setAtrrValue(fd, name, value) {
  fd.setAttribute(name, value);
}

//regex function

function regexTest(string, pattern) {
  const regex = new RegExp(pattern);
  return regex.test(string);
}
