
//Look if the device have NFC
if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
        //Start scaning for NFC tags
        ndef.scan().then(() => {
        console.log("Scan started successfully.");
        
        ndef.onreadingerror = (event) => {
            console.log("Error! Cannot read data from the NFC tag. Try a different one?");
            document.body.style.backgroundColor = "red";
        };

        ndef.onreading = (event) => {
            console.log("NDEF message read.");
            document.body.style.backgroundColor = "green";
        };

        }).catch((error) => {
        console.log(`Error! Scan failed to start: ${error}.`);
    });
}