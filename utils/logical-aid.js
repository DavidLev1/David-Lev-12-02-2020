export const isOnlyEnglishLetters = value => {
  const regex = /^[A-Za-z ]*$/;
  const isLegalInput = regex.test(value);

  if (isLegalInput) return true;
};


export const isValidMinLength = (value, minLength) => {
  if (value.trim().length >= minLength) return true;
};


export const isValidUserInput = userInput => {
  const errorElem = document.getElementById("error-elem");

  if (!isOnlyEnglishLetters(userInput)) {
    errorElem.innerText = "Please enter only english letters";
    return false;
  }

  const USER_INPUT_MIN_LENGTH = 3;

  if (!isValidMinLength(userInput, USER_INPUT_MIN_LENGTH)) {
    errorElem.innerText = `Please enter at least ${USER_INPUT_MIN_LENGTH} chars`;
    return false;
  }

  return true;
};


export const removeChildren = parentElem => {
  while (parentElem.firstChild) {
    parentElem.removeChild(parentElem.firstChild);
  }
};


const changePallet = e => {
  let bodyElem = document.getElementsByTagName("body")[0]; 

  if(e.target.innerText === "Show Dark Screen") {
    bodyElem.style.background = 'linear-gradient(90deg, #3D6B69 0%, #185E63 100%)';
    e.target.innerText = "Show Light Screen";
  } else {
    bodyElem.style.background = 'linear-gradient(90deg, #2F8AA9 0%, #8ABECC 100%)';
    e.target.innerText = "Show Dark Screen";
  }
}

const changePalletBtn = document.getElementById("change-pallet-btn");
changePalletBtn.addEventListener("click", changePallet);


export const toggleDegrees = (e, showDegreesElem, weatherData) => {
  if (e.target.innerText === "Show °F") {
    e.target.innerText = "Show °C";
    showDegreesElem.innerText = weatherData.tempF;
  } else {
    e.target.innerText = "Show °F";
    showDegreesElem.innerText = weatherData.tempC;
  } 
}

