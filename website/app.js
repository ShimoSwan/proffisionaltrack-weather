/* Global Variables */
const zipeCode = document.getElementById("zip").value;

// Personal API Key for OpenWeatherMap API
let mainUrl = " api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=637224f33ce63d20700c70de45e9d48b&units=imperial";

// Event listener to add function to existing HTML DOM element

const clickBut = document.getElementById("generate");

clickBut.addEventListener("click", generateFunction);

/* Function called by event listener */
function generateFunction() {
  getFunction(mainUrl, zipeCode, apiKey);
}

/* Function to GET Web API Data*/
const getFunction = async (mainUrl, code, key) => {
  const res = await fetch(mainUrl + code + key);

  try {
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("error", err);
  }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
