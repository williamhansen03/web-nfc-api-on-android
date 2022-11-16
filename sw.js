self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then((cache) => {
            //document.body.style.backgroundColor = "#BFFF00";
            return cache.addAll([/*"./", "manifest.json", "index.html", "js/scripts.js", "image/icon.png", "image/icon72x72.png", "image/icon144x144.png", "image/icon192x192.png"*/]);
        })
    );
    console.log("install dcode");
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            //document.body.style.backgroundColor = "#784212";
            return response || fetch(e.request);
        })
    );
    console.log("Intercepting fetch request for: ${e.request.url}");
});

/*self.addEventListener("activate", event => {

    const color = document.body;

const text = document.querySelector("h1");
const info = document.querySelector("h2");
// Get refercens to nfc reader
const ndef = new NDEFReader();
color.style.backgroundColor = "#00FFFF";

// Start scaning for NFC tags
ndef.scan().then(() => {
    text.innerHTML = "Scan started successfully.";
    
    // If you get a error while reading a tag
    ndef.addEventListener("readingerror", () => {
        text.innerHTML = "Error! Cannot read data from the NFC tag. Try a different one?";
        color.style.backgroundColor = "#ff0000";
        delay(400).then(() => startScanning());
    });
    // If you reading a tag successful 
    ndef.addEventListener("reading", ({ message, serialNumber }) => {
        info.innerHTML = message + ", " + serialNumber;
        text.innerHTML = "NDEF message read.";
        delay(400).then(() => startScanning());
    });

    // If it get a error while starting the scan
    }).catch((error) => {
    text.innerHTML = `Error! Scan failed to start: ${error}.`;
    color.style.backgroundColor = "#ff0000";
    delay(400).then(() => startScanning());
});

	
});*/

