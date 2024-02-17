let enteredIp = document.getElementById("input-ip");
const myButton = document.getElementById("button");
const ipInfo = document.getElementById("ipInfo");
const errorContainer = document.getElementById("errorMessage");
myButton.addEventListener("click", (event) => {
  event.preventDefault();
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
    appendIpInfo(ipData, locationData, timeZData, ispData);
    ipInfo.style.display = "flex";
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

function appendIpInfo(ipData, locationData, timeZData, ispData) {
  let ipAddress = document.getElementById("ip-info-address");
  let ipLocation = document.getElementById("ip-info-location");
  let ipTimeZone = document.getElementById("ip-info-timeZone");
  let ipIsp = document.getElementById("ip-info-isp");

  ipAddress.textContent = ipData;
  ipLocation.textContent = locationData;
  ipTimeZone.textContent = timeZData;
  ipIsp.textContent = ispData;
}

let map = L.map('map', { zoomControl: false }).setView([0, 0], 19);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let mapMarker = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize:     [60, 70], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function myMap(lat, lng) {
  L.marker([lat, lng], {icon: mapMarker}).addTo(map);
  map.panTo([lat, lng]);
}

function testIp(ipAddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {
    errorContainer.textContent = "";
    myApi(enteredIp.value);
  } else {
    errorContainer.textContent = "Invalid IP-address!";
  }
}
//91.145.50.107
//139.47.39.174