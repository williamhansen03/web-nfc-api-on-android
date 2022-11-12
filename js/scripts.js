const color = document.body;
color.style.backgroundColor = "#000000";

const text = document.querySelector("h1");
const info = document.querySelector("h2");
const nfcText = document.querySelector("p");

//Look if the device have NFC
function startScanning(){
    const ndef = new NDEFReader();
    color.style.backgroundColor = "#00FFFF";

    ndef.scan().then(() => {
        text.innerHTML = "Scan started successfully.";
        color.style.backgroundColor = "#A020F0";
        
        ndef.addEventListener("readingerror", () => {
            text.innerHTML = "Error! Cannot read data from the NFC tag. Try a different one?";
            color.style.backgroundColor = "#ff0000";
            delay(400).then(() => startScanning());
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            info.innerHTML = message + ", " + serialNumber;
            text.innerHTML = "NDEF message read.";
            delay(400).then(() => color.style.backgroundColor = "#00ff00");
            delay(400).then(() => startScanning());
        });

        }).catch((error) => {
        text.innerHTML = `Error! Scan failed to start: ${error}.`;
        color.style.backgroundColor = "#ff0000";
        delay(400).then(() => startScanning());
    });
    
}


if ('NDEFReader' in window) {
    text.innerHTML = "Look if the device have NFC";

    color.style.backgroundColor = "#ffff00";


    //https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator/permissions
    //https://whatwebcando.today/permissions.html
    //https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query

    navigator.permissions.query({name:'nfc'}).then((result) => {
        if (result.state === 'granted') {
          startScanning();
        } else if (result.state === 'prompt') {
            // Show a "scan" button.
            document.querySelector("#scanButton").style.display = "block";
            document.querySelector("#scanButton").onclick = event => {
            // Prompt user to allow UA to send and receive info when they tap NFC devices.
            nfcText.innerHTML = result.state;
            startScanning();
          
          
            };
        }
      });
    
    //Start scaning for NFC tags

    nfcText.innerHTML = navigator.permissions.query({name:'nfc'}).state;
    
}
else{
    text.innerHTML = "No nfc reader or browser does not support NDEFReader";
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}