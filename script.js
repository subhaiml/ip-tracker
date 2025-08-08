const ipDisplay = document.getElementById("ipdisplay");
const locationDisplay = document.getElementById("locationdisplay");
const timezoneDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");
const ipHolder = document.getElementById("ipholder");
let butt = document.getElementById("butt");
const apikey = "at_aN8OOltzHs6PtGXpQ36JPlxISRnP5";
let map = L.map("map").setView([20, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
let marker; 
butt.addEventListener("click", () => {
  const userIp = ipHolder.value.trim();
  getData(userIp);
});
ipHolder.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const userIp = ipHolder.value.trim();
    getData(userIp);
  }
});
async function getData(ip) {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}&ipAddress=${ip}`
    );
    const data = await response.json();
    ipDisplay.textContent = data.ip;
    locationDisplay.textContent = `${data.location.city}, ${data.location.country}`;
    timezoneDisplay.textContent = `UTC ${data.location.timezone}`;
    ispDisplay.textContent = data.isp;
    const lat = data.location.lat;
    const lng = data.location.lng;
    map.setView([lat, lng], 13);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map)
      .bindPopup(`<b>${data.ip}</b><br>${data.location.city}, ${data.location.country}`)
      .openPopup();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData("");