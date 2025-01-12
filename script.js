// Input's
const dayInput = document.getElementById("iday");
const monthInput = document.getElementById("imonth");
const yearInput = document.getElementById("iyear");
const inputs = document.querySelectorAll('input[type="text"]');
const spanError = document.querySelectorAll(".error-text");
const labelError = document.querySelectorAll("label");

// Section data-numbers
const btn = document.querySelector("button");
const spanYears = document.getElementById("Pyears");
const spanMonths = document.getElementById("Pmonths");
const spanDays = document.getElementById("Pdays");

const date = new Date();

function calculateAge() {
  const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];

  const dayValue = Number(dayInput.value);
  const monthValue = Number(monthInput.value);
  const yearValue = Number(yearInput.value);

  let dayAge = day - dayValue;
  let monthAge = month - monthValue;
  let yearAge = year - yearValue;

  if (dayAge < 0) {
    monthAge--;
    dayAge += new Date(year, month, 0).getDate();
  }

  if (monthAge < 0) {
    yearAge--;
    monthAge += 12;
  }

  const adjustedMonth = monthValue - 1;
  if (!validationDateInputs(dayValue, adjustedMonth + 1, yearValue)) {
    return;
  }

  if (!validationDateInputs(dayValue, monthValue, yearValue)) {
    return;
  }

  return { dayAge, monthAge, yearAge };
}

function invalidLabel([...element]) {
  element.forEach((element) => (element.style.color = "red"));
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function validationDateInputs(day, month, year) {
  let hasError = false;

  const ArrayInputs = Array.from(inputs);
  const ArraySpanError = Array.from(spanError);

  ArrayInputs.forEach((input, index) => {
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      spanError[index].textContent = "The field is required";
      hasError = true;
    } else {
      input.style.border = "";
      spanError[index].textContent = "";
    }
  });

  if (hasError) {
    return false;
  }

  const lastDay = getLastDayOfMonth(year, month);
  if (lastDay < 1 || day > lastDay) {
    ArrayInputs[0].style.border = "1px solid red";
    ArraySpanError[0].textContent = "Must be a valid day";
    hasError = true;
  } else {
    ArrayInputs[0].style.border = "";
    ArraySpanError[0].textContent = "";
  }

  if (month < 1 || month > 12) {
    ArrayInputs[1].style.border = "1px solid red";
    ArraySpanError[1].textContent = "Must be a valid month";
    hasError = true;
  } else {
    ArrayInputs[1].style.border = "";
    ArraySpanError[1].textContent = "";
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    ArrayInputs[2].style.border = "1px solid red";
    ArraySpanError[2].textContent = "Must be in the past";
    hasError = true;
  } else {
    ArrayInputs[2].style.border = "";
    ArraySpanError[2].textContent = "";
  }
  return !hasError;
}

document.addEventListener("DOMContentLoaded", () => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const result = calculateAge();
    if (!result) {
      invalidLabel(labelError);
      spanError.innerText = "";
      return;
    }

    const { dayAge, monthAge, yearAge } = result;
    spanDays.innerHTML = `${dayAge}`;
    spanMonths.innerHTML = `${monthAge}`;
    spanYears.innerHTML = `${yearAge}`;

    spanDays.style.letterSpacing = "initial";
    spanMonths.style.letterSpacing = "initial";
    spanYears.style.letterSpacing = "initial";

    spanDays.style.marginRight = "10px";
    spanMonths.style.marginRight = "10px";
    spanYears.style.marginRight = "10px";
  });
});
