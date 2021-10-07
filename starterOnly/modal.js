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
const form = document.forms["reserve"];
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close");
const buttonSubmit = document.querySelector(".btn-submit");
const validContainer = document.querySelector(".validate-container");
const modalBody = document.querySelector(".modal-body");

//variables

let testValues = [];
const currentUrl = document.location.href;

//console.log(document.location.href)
//console.log(document.location.origin + document.location.pathname);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//close the validate modal 

function closeValidateModal() {
  setAtrrValue(validContainer, "validate-text-visible", "false");
  let urlPart = testFormDatas(currentUrl, 1);
  window.location.replace(urlPart);
}

// test url and excute confirm message. If url has the form datas, a modal confirmation message apears and the page is reloaded 


let urlPart = testFormDatas(currentUrl, 2);
if (urlPart) {
  setAtrrValue(validContainer, "validate-text-visible", "true");
} else {
  setAtrrValue(validContainer, "validate-text-visible", "false");
}


// test form datas presence in the url

function testFormDatas(url, group) {
  let pattern = "([a-zA-Z0-9.\\/:%-]+)(\\?first=[a-zA-Z]+[-_ ]?[a-zA-Z0-9]&last=[a-zA-Z]+[-_ ]?[a-zA-Z0-9]&email=[a-zA-Z0-9_.+-]+%40[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+&birthdate=(19[2-9][0-9]|200[0-9])-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])&quantity=([0-9]|[1-9][0-9]+)&location=[a-zA-Z]+[+]?[a-zA-Z0-9]+)";
  let regexResult = regexTest(url, pattern);
  if (regexResult) {
    let textGroups = url.match(pattern);
    let textGroup = textGroups[group];
    return textGroup;
  }
}

// submit the modal

function validate(event) {
  event.stopPropagation();
  let testValue = "";
  formData.forEach(fd => {
    let input =  fd.querySelector("input");
    let inputId = input.getAttribute("id");
    let pattern = "";
    let string = "";
    //for each input, adapted function is called according to its type(text, checkbox, radio)
    switch(inputId) {
      case "first":
        pattern = "^[a-zA-Z]+[-_ ]?[a-zA-Z0-9]$"; //two char at least needed
        string = input.value;
        testValue = testTextInput(fd, string, pattern);
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "last":
        pattern = "^[a-zA-Z]+[-_ ]?[a-zA-Z0-9]$";
        string = input.value;
        testValue = testTextInput(fd, string, pattern)
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "email":
        pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"; //email regex
        string = input.value;
        testValue = testTextInput(fd, string, pattern)
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "birthdate":
        pattern = "^(19[2-9][0-9]|200[0-9])-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$";
        string = input.value;
        testValue = testTextInput(fd, string, pattern);
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "quantity":
        pattern ="^([0-9]|[1-9][0-9]+)$";
        string = input.value;
        testValue = testTextInput(fd, string, pattern);
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "location1":
        testValue = testRadio(fd);
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      case "checkbox1":
        let id = "#checkbox1";
        testValue = testCheckButton(fd, id);
        setAtrrValue(fd,"data-error-visible", testValue);
        break;
      default:
        break;
    }
  });
  if (testValues.indexOf(false) == -1) { 
    return true;
  } else {
    setAtrrValue(validContainer, "validate-text-visible", "false");
    return false;
  }
}


// Event actions for text inputs : calls the regex function and and calls the attribute modificator

function testTextInput(fd, string, pattern) {
  let value = "";
  let regexResult = regexTest(string, pattern);
  testValues.push(regexResult);

  if (regexResult) {
    value = "false";
  } else {
    value = "true";
  }
  return value;
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

  if (value == "true") {
    testValues.push(false);
  }else {
    testValues.push(true);
  }

  return value
}

// Event actions for check button : checks if a check button is selected and calls the attribute modificator

function testCheckButton(fd, id) {
  let input = fd.querySelector(id);
  let value ="";
  if (input.checked == true) {
    value = "false";
    testValues.push(true);
  } else {
    value = "true";
    testValues.push(false);
  }

  return value;
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
