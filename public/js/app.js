console.log("javascript file loaded !");

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

const submitHandeler = (event) => {
  event.preventDefault();
  const location = searchText.value;
  const url = `http://localhost:3000/weather?address=${location}`;

  messageOne.textContent = "Searching...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
};

weatherForm.addEventListener("submit", submitHandeler);
