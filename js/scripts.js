
//Look if the device have NFC
if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
    document.body.style.backgroundColor = "#ffff00"
        //Start scaning for NFC tags

        ndef.scan().then(() => {
        console.log("Scan started successfully.");
        document.body.style.backgroundColor = "#A020F0";
        
        ndef.onreadingerror = (event) => {
            console.log("Error! Cannot read data from the NFC tag. Try a different one?");
            document.body.style.backgroundColor = "#ff0000";
        };

        ndef.onreading = (event) => {
            console.log("NDEF message read.");
            delay(400).then(() => document.body.style.backgroundColor = "#00ff00");
        };

        }).catch((error) => {
        console.log(`Error! Scan failed to start: ${error}.`);
        document.body.style.backgroundColor = "#ff0000";
    });
}
else{
    document.body.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}