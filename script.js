const inputText = document.getElementById("initialText");
const inputResult = document.getElementById("inputResult");
const inputAlph = document.getElementById("inputAlph");

const caesarLetter = document.getElementById('caesarLetter');
const caesarValue = document.getElementById('caesarShift');

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

let alphBase = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
let atbashBase = {};

function cleanInput() {
    inputText.value = "";
    inputResult.value = "";
    inputDecipher.value = "";

    decipherPane.style.display = "none";
}

function setAlphabet() {
    const givenAlph = inputAlph.value.normalize("NFC") || null;

    if(!givenAlph) {
        inputText.disabled = true;
        caesarLetter.disabled = true;
        caesarValue.disabled = true;
        inputDecipher.disabled = true;
        decipherButton.disabled = true;

        caesarValue.max = 1;
        caesarValue.value = 1;

        inputText.removeEventListener("input", updateResult);
        caesarLetter.removeEventListener("input", updateResult);
        caesarValue.removeEventListener("input", updateResult);

        cleanInput();
    } else {
        alphBase = givenAlph.toUpperCase();
        setAtbash(givenAlph.toUpperCase());

        inputText.disabled = false;
        caesarLetter.disabled = false;
        caesarValue.disabled = false;
        inputDecipher.disabled = false;
        decipherButton.disabled = false;

        caesarValue.max = alphBase.length - 1;

        if(caesarValue.value > alphBase.length - 1)
            caesarValue.value = alphBase.length - 1;

        inputText.addEventListener("input", updateResult);
        caesarLetter.addEventListener("input", updateResult);
        caesarValue.addEventListener("input", updateResult);
    }

    console.log(alphBase);
}

function setAtbash(text) {
    atbashBase = {};

    for (let i = 0; i < text.length; i++) {
        const reverseIndex = text.length - 1 - i;

        const char = text[i].toUpperCase().normalize("NFC");
        const reverseChar = text[reverseIndex].toUpperCase();

        atbashBase[char] = reverseChar;
    }
}

function matchSymbol(text) {
    for(let i=0;i<alphBase.length;i++) {
        const letter = alphBase[i];
        const compare = text.toUpperCase();

        if(compare === letter){
            console.log(letter, text.toUpperCase());
            return true
        }
    }

    return false
}

window.onload = () => {
    decipherPane.style.display = "none";
    inputAlph.value = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    setAlphabet();

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

    inputAlph.addEventListener("input", setAlphabet);
}