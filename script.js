let enteredIp = document.getElementById("input-ip");
const myButton = document.getElementById("button");
const containerDiv = document.getElementById("ip-info-container");
myButton.addEventListener("click", (event) => {
  event.preventDefault();
  myIp();
});

function myIp() {

  enteredIp = enteredIp.value;
  myApi(enteredIp);
}


async function myApi(enteredIp) {
  const geoUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oFYCxTsdHGChCtTazoopzGKYrhp7M&ipAddress=${enteredIp}`;
  try {
    const response = await fetch(geoUrl);
    const data = await response.json();
    let { lat, lng } = data.location;
    myMap(lat, lng);
    let ipData = enteredIp;
    let locationData = `${data.location.city}, ${data.location.region} ${data.location.country}`;
    let timeZData = data.location.timezone;
    let ispData = data.isp;
    addInfo(ipData, locationData, timeZData, ispData);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function addInfo(ipData, locationData, timeZoneData, ispData) {
  let dataArr = [ipData, locationData, timeZoneData, ispData];
  dataArr.forEach(data => {
    let newDiv = createAndAppend();
    newDiv.textContent = data;
  })
}

function createAndAppend() {
  let newDiv = document.createElement("div");
  containerDiv.appendChild(newDiv);
  return newDiv;
}


function myMap(lat, lng) {
  let map = L.map('map').setView([lat, lng], 19);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}

