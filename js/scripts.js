const color = document.body;
color.style.backgroundColor = "#000000";

const text = document.querySelector("h1");
const info = document.querySelector("h2");
const nfcText = document.querySelector("p");

//Look if the device have NFC
function startScanning(){
    const ndef = new NDEFReader();

    ndef.scan().then(() => {
        text.innerHTML = "Scan started successfully.";
        color.style.backgroundColor = "#A020F0";
        
        ndef.addEventListener("readingerror", () => {
            text.innerHTML = "Error! Cannot read data from the NFC tag. Try a different one?";
            color.style.backgroundColor = "#ff0000";
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            info.innerHTML = message + ", " + serialNumber;
            text.innerHTML = "NDEF message read.";
            delay(400).then(() => color.style.backgroundColor = "#00ff00");
        });

        }).catch((error) => {
        text.innerHTML = `Error! Scan failed to start: ${error}.`;
        color.style.backgroundColor = "#ff0000";
    });
    
}


if ('NDEFReader' in window) {
    text.innerHTML = "Look if the device have NFC";

    color.style.backgroundColor = "#ffff00";

    while(true){
        color.style.backgroundColor = "#00FFFF";
    navigator.permissions.query({name:'nfc'}).then((result) => {
        if (result.state === 'granted') {
          startScanning();
        } else if (result.state === 'prompt') {
            // Show a "scan" button.
            document.querySelector("#scanButton").style.display = "block";
            document.querySelector("#scanButton").onclick = event => {
            // Prompt user to allow UA to send and receive info when they tap NFC devices.
          
            startScanning();
          
          
            };
        }
      });
    
    //Start scaning for NFC tags

    nfcText.innerHTML = navigator.permissions.query({name:'nfc'}).state;
    }
}
else{
    text.innerHTML = "No nfc reader or browser does not support NDEFReader";
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}