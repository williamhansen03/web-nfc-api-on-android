const color = document.body;
const text = document.querySelector("h1");
const nfcText = document.querySelector("p");
const ndef = new NDEFReader();


nfcText.innerHTML = nfcPermission.state;

color.style.backgroundColor = "#000000";
//Look if the device have NFC


async function startScanning(){
    
    ndef.scan().then(() => {
        text.innerHTML = "Scan started successfully.";
        console.log("Scan started successfully.");
        color.style.backgroundColor = "#A020F0";
        
        
        ndef.onreadingerror = (event) => {
            text.innerHTML = "Error! Cannot read data from the NFC tag. Try a different one?";
            console.log("Error! Cannot read data from the NFC tag. Try a different one?");
            color.style.backgroundColor = "#ff0000";
            
        };

        ndef.onreading = (event) => {
            text.innerHTML = "NDEF message read.";
            console.log("NDEF message read.");
            delay(400).then(() => color.style.backgroundColor = "#00ff00");
            
        };

        }).catch((error) => {
        text.innerHTML = `Error! Scan failed to start: ${error}.`;
        console.log(`Error! Scan failed to start: ${error}.`);
        color.style.backgroundColor = "#ff0000";
        
    });
}


if ('NDEFReader' in window) {
    text.innerHTML = "Look if the device have NFC";
    

    const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });

    color.style.backgroundColor = "#ffff00";
    
    if (nfcPermissionStatus.state === "granted") {
        // NFC access was previously granted, so we can start NFC scanning now.
        startScanning();
      } else {
        // Show a "scan" button.
        document.querySelector("#scanButton").style.display = "block";
        document.querySelector("#scanButton").onclick = event => {
          // Prompt user to allow UA to send and receive info when they tap NFC devices.
          startScanning();
        };
      }
        //Start scaning for NFC tags

        
}
else{
    text.innerHTML = "No nfc reader or browser does not support NDEFReader";
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

