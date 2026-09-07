const inputText = document.getElementById("initialText");
const inputResult = document.getElementById("inputResult");

const chooseCaesarCheck = document.getElementById("cipher-type-caesar");
const chooseAtbashCheck = document.getElementById("cipher-type-atbash");
const cipherTypeCheck = document.getElementById("cipher-type");

const cipherPaneCaesar = document.getElementById("caesar-cipher-pane");

const inputDecipher = document.getElementById("inputDecrypt");
const typeDecipher = document.getElementById("typeDecrypt");
const shiftDecipher = document.getElementById("shiftDecrypt");
const shiftDecipherCont = document.getElementById("shiftDecrypt-container");
const decipherButton = document.getElementById("doDecrypt");

const decipherPane = document.getElementById("charDecrypt");

const tabButtons = document.getElementsByClassName("nav-link");

function cleanInput() {
    inputText.value = "";
    inputResult.value = "";
    inputDecipher.value = "";

    decipherPane.style.display = "none";
}

window.onload = () => {
    decipherPane.style.display = "none";
}

for(const button of tabButtons){
    button.addEventListener("click", () => cleanInput());
}

chooseCaesarCheck.addEventListener("click", () => {
    if(cipherTypeCheck.checked) {
        cipherTypeCheck.checked = false;
        const event = new Event("change");
        cipherTypeCheck.dispatchEvent(event);
    }
});

chooseAtbashCheck.addEventListener("click", () => {
    if(!cipherTypeCheck.checked) {
        cipherTypeCheck.checked = true;
        const event = new Event("change");
        cipherTypeCheck.dispatchEvent(event);
    }
});

cipherTypeCheck.addEventListener("change", () => {
    if(cipherTypeCheck.checked){
        cipherPaneCaesar.style.display = "none";
    } else {
        cipherPaneCaesar.style.display = "flex";
    }

    const event = new Event("input");
    inputText.dispatchEvent(event);
});