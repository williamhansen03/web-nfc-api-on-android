const color = document.body;

const text = document.querySelector("h1");
const info = document.querySelector("h2");

let message = "";

// Kod ska till service worker 

// Function scan after a nfc tag
function startScanning(){
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
            delay(1000).then(() => startScanning());
        });
        // If you reading a tag successful 
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            info.innerHTML = message + ", " + serialNumber;
            text.innerHTML = "NDEF message read.";
            delay(1000).then(() => startScanning());
        });

        // If it get a error while starting the scan
        }).catch((error) => {
        text.innerHTML = `Error! Scan failed to start: ${error}.`;
        color.style.backgroundColor = "#ff0000";
        delay(1000).then(() => startScanning());
    });
    
}

// Slut på koden som ska till service worker

const inputButton = document.querySelector(".inputButton");

function inputFunction(){
    const input = document.querySelector("#write");
    const p = document.querySelector("p");
    color.style.backgroundColor = "white";
    text.style.color = "black";
    info.style.color = "black";

    if(input.value === "Write"){
        p.innerHTML = "Write";
        writeFunction();
    }
    else if (input.value === "Scan"){
        p.innerHTML = "Scan";
        startScanning();
    }
}


// Look if the device have NFC
if ('NDEFReader' in window) {
    text.innerHTML = "Look if the device have NFC";

    color.style.backgroundColor = "#ffff00";

    // Look if have permissions for a nfc is granted or not if permissions is not granded make a button that give browser permissions for nfc
    navigator.permissions.query({name:'nfc'}).then((result) => {
        if (result.state === 'granted') {
            color.style.backgroundColor = "hotpink";
            inputButton.addEventListener(`click`, inputFunction);
          
        } else if (result.state === 'prompt') {
            // Show a scan button.
            document.querySelector("#scanButton").style.display = "block";
            document.querySelector("#scanButton").onclick = event => {
            // Prompt user to allow to send and receive info when they tap NFC devices.
                document.querySelector("#scanButton").style.display = "none";
                color.style.backgroundColor = "black";
                text.style.color = "white";
                info.style.color = "whtie";
                inputButton.addEventListener(`click`, inputFunction);
            };
        }
      });
    
}
else{
    // If device have no nfc reader or browser does not support NDEFReader
    text.innerHTML = "No nfc reader or browser does not support NDEFReader";
    color.style.backgroundColor = "#0000ff";
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function writeFunction(){

    const messageButton = document.querySelector(".messageButton");
    messageButton.addEventListener("click", function(){
        const input = document.querySelector("#message");
        message = input.value;
        info.innerHTML = message;
    });
    const ndef = new NDEFReader();
    ndef.write(message).then(() => {
        text.innerHTML = "Message written.";

    }).catch(error => {
        text.innerHTML = `Write failed. try again: ${error}.`;

    });
}