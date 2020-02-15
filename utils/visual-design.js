export const get2DigitsValue = value => {
  if (value.length < 2) value = "0" + value;
  return value;
};

export const getFormattedDate = rawDateTime => {
  const rawTime = new Date(rawDateTime);

  return (
    get2DigitsValue(rawTime.getDate().toString()) +
    "/" +
    get2DigitsValue((rawTime.getMonth() + 1).toString()) +
    "/" +
    rawTime.getFullYear()
  );
};


export const getDayOfTheWeek = rawDateTime => {
  const rawTime = new Date(rawDateTime);
  const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayOfTheWeek = daysOfTheWeek[rawTime.getDay()];

  return dayOfTheWeek;
}


let timeout;

export const showNotice = text => {
  const noticeElem = document.getElementById("notice");

  let removeText = () => {
    timeout = setTimeout( () => {
      noticeElem.innerText = "";
    }, 5000)
  } 

  if(timeout !== undefined) clearTimeout(timeout);
  noticeElem.innerText = text;
  removeText();
}

