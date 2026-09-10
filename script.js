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

let alphBase = [];
let atbashBase = {};

// comment

function cleanInput() {
    inputText.value = "";
    inputResult.value = "";
    inputDecipher.value = "";

    decipherPane.style.display = "none";
}

// comment

function updateResult() {
    const innerText = inputText.value.normalize("NFC").match(/./gu);

    if(innerText == null){
        cleanInput()
    } else {
        if(cipherTypeCheck.checked)
            doAtbashCipher(innerText);
        else
            doCaesarCipher(innerText);
    } 
}

// comment

function setAlphabet() {
    const givenAlph = inputAlph.value.toUpperCase().normalize("NFC").match(/./gu) || null;

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
        alphBase = givenAlph;
        setAtbash(givenAlph);

        inputText.disabled = false;
        caesarLetter.disabled = false;
        caesarValue.disabled = false;
        inputDecipher.disabled = false;
        decipherButton.disabled = false;

        caesarValue.max = alphBase.length - 1;
        caesarLetter.value = alphBase[0];

        if(caesarValue.value > alphBase.length - 1)
            caesarValue.value = alphBase.length - 1;

        inputText.addEventListener("input", updateResult);
        caesarLetter.addEventListener("input", updateResult);
        caesarValue.addEventListener("input", updateResult);
    }
}

// comment

function setAtbash(text) {
    atbashBase = {};

    for (let i = 0; i < text.length; i++) {
        const reverseIndex = text.length - 1 - i;

        const char = text[i];
        const reverseChar = text[reverseIndex].toUpperCase();

        atbashBase[char] = reverseChar;
    }
}

// comment

function matchSymbol(text) {
    for(let i=0;i<alphBase.length;i++) {
        const letter = alphBase[i];
        const compare = text.toUpperCase();
        if(compare == letter){
            return true
        }
    }

    return false
}

// comment

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

    decipherButton.addEventListener("click", () => {
        const textValue = inputDecipher.value.normalize("NFC").match(/./gu);
        const {text,type,shift} = detectCipher(textValue);

        typeDecipher.value = type;

        if(type == "Atbash") {
            shiftDecipherCont.style.display = "none";
        } else if (type == "Caesar") {
            shiftDecipher.value = shift;
            shiftDecipherCont.style.display = "inline";
        }

        inputResult.value = text;
        decipherPane.style.display = "flex";
    });

    inputAlph.addEventListener("input", setAlphabet);
}