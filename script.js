let score = 0;
let curryScene = 0;
let placedPin = null
let scenePin = null;
let resultLine = null;
let canGuess = true;
let resultTimer = null;
let isGameOver = false;

function doku(x) {
    return document.getElementById(x);
}

class Scene {
    constructor(location, latitude, longitude, heading, pitch, fov) {
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.heading = heading;
        this.pitch = pitch;
        this.fov =fov;
    }

    display() {
        doku("frmer").src = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC85tIsOGaNAloHJs2-SFe98xpS2G0Qr54&location=${this.latitude},${this.longitude}&heading=${this.heading}&pitch=${this.pitch}&fov=${this.fov}`; //Pls dont abuse API
    }
}

const scenes = [
    new Scene("Norway",    69.72341810475496,  18.33868581677795,  15.238642697738564, -39.74780329270075, 78),
    new Scene("Japan",     35.50185730343701,  138.8016437014359,   6.26,              -21.51,             78),
    new Scene("Caribbean", 21.79698951896544, -72.18161483332547,  272.0252578385712,  -25.80434151609782, 78),
];

const BOUNDS = L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180));

const map = L.map("map", {
    maxBounds: BOUNDS,
    maxBoundsViscosity: 1.0,
    minZoom: 2,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    dragging: true,
}).setView([0, 0], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //I did not make this stuff myself btw Jose 0 : Internet 1
}

function absoluteDifference(km) {
    return Math.round(5000 * Math.exp(-km / 2000)); //Exponential Decay formula
}

function resultEraser() {
    if(placedPin) {
        map.removeLayer(placedPin);
        placedPin = null;
    };
    if(scenePin) {
        map.removeLayer(scenePin);
        scenePin = null;
    };
    if(resultLine) {
    map.removeLayer(resultLine);
        resultLine = null;
    };
    if(resultTimer) {
        clearTimeout(resultTimer);
        resultTimer = null;
    };
}

function gameOver() {
    isGameOver = true;
    canGuess = false;
    resultEraser();

    doku("frmer").src = "";
    doku("title").innerHTML = `Game over! Final score: ${score}`;
    doku("map").style.display = "none";
}

map.on("click", function(e) {
    if (canGuess === false || isGameOver === true) {
        return;
    };
    if(BOUNDS.contains(e.latlng) === false) {
        return;
    }

    canGuess = false;
    resultEraser();

    placedPin = L.marker(e.latlng).addTo(map);

    const scene = scenes[curryScene];
    const km = haversineKm(e.latlng.lat, e.latlng.lng, scene.latitude, scene.longitude);
    const pts = absoluteDifference(km);

    score += pts;
    doku("hi").innerHTML = `Your score: ${score}`;

    scenePin = L.marker([scene.latitude, scene.longitude]).addTo(map);
    resultLine = L.polyline(
        [e.latlng, [scene.latitude, scene.longitude]],
        { weight: 3, opacity: 0.8 }
    ).addTo(map);

    placedPin.bindPopup(
        `${Math.round(km)} km away — +${pts} pts`
    ).openPopup();

    scenePin.bindPopup(
        `Actual location: ${scene.location}`
    );

    resultTimer = setTimeout(() => {
        curryScene++;

        resultEraser();

        if (curryScene < scenes.length) {
            scenes[curryScene].display();
            canGuess = true;
        } else {
            gameOver();
        }
    }, 2500);
});

function startGame() {
    const usr = doku("username").value.trim();
    if (usr === false) {
        alert("Who are you??");
        return;
    }

    score = 0;
    curryScene = 0;
    isGameOver = false;
    canGuess = true;
    resultEraser();

    doku("parent").style.justifyContent = "flex-end";
    doku("username").remove();
    doku("libel").remove();
    doku("startBtn").remove();

    doku("title").innerHTML = `Welcome to Earth Finder, ${usr}!`;

    const userstats = document.createElement("p");
    userstats.id = "hi";
    userstats.innerHTML = `Your score: ${score}`;
    doku("texti").appendChild(userstats);

    doku("gmap").style.display = "block";
    doku("map").style.height = "350px";

    scenes[curryScene].display();

    setTimeout(() => map.invalidateSize(), 100);
}