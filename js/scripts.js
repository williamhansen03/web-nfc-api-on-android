const color = document.body;
const h1 = document.querySelector("h1");

color.style.backgroundColor = "#000000";
//Look if the device have NFC
if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
    color.style.backgroundColor = "#ffff00";
    h1.innerHTML = "Look if the device have NFC";
        //Start scaning for NFC tags

        ndef.scan().then(() => {
        console.log("Scan started successfully.");
        color.style.backgroundColor = "#A020F0";
        h1.innerHTML = "Scan started successfully.";
        
        ndef.onreadingerror = (event) => {
            console.log("Error! Cannot read data from the NFC tag. Try a different one?");
            color.style.backgroundColor = "#ff0000";
            h1.innerHTML = "Error! Cannot read data from the NFC tag. Try a different one?";
        };

        ndef.onreading = (event) => {
            console.log("NDEF message read.");
            delay(400).then(() => color.style.backgroundColor = "#00ff00");
            h1.innerHTML = "NDEF message read.";
        };

        }).catch((error) => {
        console.log(`Error! Scan failed to start: ${error}.`);
        color.style.backgroundColor = "#ff0000";
        h1.innerHTML = `Error! Scan failed to start: ${error}.`;
    });
}
else{
    h1.innerHTML = "No nfc reader or browser does not support NDEFReader";
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}