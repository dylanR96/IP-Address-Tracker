let enteredIp = document.getElementById("input-ip");
const myButton = document.getElementById("button");
const containerDiv = document.getElementById("ip-info-container");
const errorContainer = document.getElementById("errorMessage");
myButton.addEventListener("click", (event) => {
  event.preventDefault();
  containerDiv.textContent = "";
  testIp(enteredIp.value);
});

async function myApi(enteredIp) {
  const geoUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_oFYCxTsdHGChCtTazoopzGKYrhp7M&ipAddress=${enteredIp}`;
  try {
    const response = await fetch(geoUrl);
    const data = await response.json();
    let { lat, lng } = data.location;
    myMap(lat, lng);
    let ipData = enteredIp;
    let locationData = `${data.location.city}, ${data.location.region} ${data.location.country}`;
    let timeZData = `UTC ${data.location.timezone}`;
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
  newDiv = document.createElement("div");
  containerDiv.appendChild(newDiv);
  return newDiv;
}

let map = L.map('map').setView([0, 0], 19);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function myMap(lat, lng) {
  map.panTo([lat, lng]);
}

function testIp(ipAddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    myApi(enteredIp.value);
  } else {
    errorContainer.textContent = "Invalid IP-address!";
  }
}
//91.145.50.107
//139.47.39.174