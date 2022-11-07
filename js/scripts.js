const color = document.body;

color.style.backgroundColor = "000000";
//Look if the device have NFC
if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
    color.style.backgroundColor = "#ffff00";
        //Start scaning for NFC tags

        ndef.scan().then(() => {
        console.log("Scan started successfully.");
        color.style.backgroundColor = "#A020F0";
        
        ndef.onreadingerror = (event) => {
            console.log("Error! Cannot read data from the NFC tag. Try a different one?");
            color.style.backgroundColor = "#ff0000";
        };

        ndef.onreading = (event) => {
            console.log("NDEF message read.");
            delay(400).then(() => color.style.backgroundColor = "#00ff00");
        };

        }).catch((error) => {
        console.log(`Error! Scan failed to start: ${error}.`);
        color.style.backgroundColor = "#ff0000";
    });
}
else{
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}