/* Global Variables */
const zipeCode = document.getElementById("zip");
const feel = document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
let mainUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = `&appid=${config.apiKey}&units=imperial`;

// Event listener to add function to existing HTML DOM element

const clickBut = document.getElementById("generate");

clickBut.addEventListener("click", generateFunction);

/* Function called by event listener */
function generateFunction() {
  console.log("clicked");
  if (!zipeCode.value || !feel.value) {
    alert("Zip code or felling today not entered");
    return;
  } else {
    getDataWeather(mainUrl, zipeCode.value, apiKey)
      .then((data) => {
        ServerPostData("/addInformation", {
          date: newDate,
          temp: data.main.temp,
          feelings: feel.value,
        }).then(() => {
          console.log("will retrieve data");
          retrieveData();
        });
      })
      .catch((err) => {
        console.log("catch", err);
      });
  }
}

/* Function to GET Web API Data (weather)*/
const getDataWeather = async (mainUrl, code, key) => {
  try {
    const res = await fetch(mainUrl + code + key);
    console.log("getDataWeather, res", res);
    const data = await res.json();
    // if response is successfull return success
    // else return failed
    return new Promise(function (resolve, reject) {
      if (data.cod === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  } catch (err) {
    console.log("error", err);
  }
};

/* Function to POST data of server*/
const ServerPostData = async (url = "", data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: "POST",
    // credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log("server newData", newData);
    return newData;
  } catch (err) {
    console.log("error:", err);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  console.log("retrieveData start");
  const request = await fetch("/getInformation");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log("allData", allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feelings;
    document.getElementById("date").innerHTML = allData.date;
  } catch (err) {
    console.log("error", err);
    // appropriately handle the error
  }
};
