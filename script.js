const VAR_A = document.getElementById("initialText");
const VAR_B = document.getElementById("VAR_B");
const VAR_C = document.getElementById("VAR_C");

const VAR_D = document.getElementById('VAR_D');
const VAR_E = document.getElementById('caesarShift');

const VAR_F = document.getElementById("cipher-type-caesar");
const VAR_G = document.getElementById("cipher-type-atbash");
const VAR_H = document.getElementById("cipher-type");
const VAR_I = document.getElementById("caesar-cipher-pane");

const VAR_J = document.getElementById("inputDecrypt");
const VAR_K = document.getElementById("typeDecrypt");
const VAR_M = document.getElementById("shiftDecrypt");
const VAR_N = document.getElementById("shiftDecrypt-container");
const decipherButton = document.getElementById("doDecrypt");
const decipherPane = document.getElementById("charDecrypt");

const tabButtons = document.getElementsByClassName("nav-link");

let alphBase = [];
let atbashBase = {};

// 1

function cleanInput() {
    VAR_A.value = "";
    VAR_B.value = "";
    VAR_J.value = "";

    decipherPane.style.display = "none";
}

// 2

function updateResult() {
    const innerText = VAR_A.value.normalize("NFC").match(/./gu);

    if(innerText == null){
        cleanInput()
    } else {
        if(VAR_H.checked)
            doAtbashCipher(innerText);
        else
            doCaesarCipher(innerText);
    } 
}

// 3

function setAlphabet() {
    const givenAlph = VAR_C.value.trim().match(/./gu) || null;

    if(!givenAlph) {
        VAR_A.disabled = true;
        VAR_D.disabled = true;
        VAR_E.disabled = true;
        VAR_J.disabled = true;
        decipherButton.disabled = true;

        VAR_E.max = 1;
        VAR_E.value = 1;

        VAR_A.removeEventListener("input", updateResult);
        VAR_D.removeEventListener("input", updateResult);
        VAR_E.removeEventListener("input", updateResult);

        cleanInput();
    } else {
        alphBase = givenAlph;
        setAtbash(givenAlph);

        VAR_A.disabled = false;
        VAR_D.disabled = false;
        VAR_E.disabled = false;
        VAR_J.disabled = false;
        decipherButton.disabled = false;

        VAR_E.max = alphBase.length - 1;
        VAR_D.value = alphBase[0];

        if(VAR_E.value > alphBase.length - 1)
            VAR_E.value = alphBase.length - 1;

        VAR_A.addEventListener("input", updateResult);
        VAR_D.addEventListener("input", updateResult);
        VAR_E.addEventListener("input", updateResult);
    }
}

// 4

function setAtbash(text) {
    atbashBase = {};

    for (let i = 0; i < text.length; i++) {
        const reverseIndex = text.length - 1 - i;

        const char = text[i];
        const reverseChar = text[reverseIndex];

        atbashBase[char] = reverseChar;
    }
}

// 5

function matchSymbol(text) {
    for(let i=0;i<alphBase.length;i++) {
        const letter = alphBase[i];
        const compare = text;

        if(compare == letter){
            return true
        }
    }

    return false
}

// 6

window.onload = () => {
    decipherPane.style.display = "none";
    VAR_C.value = "abcdefghijklmnñopqrstuvwxyz";

    setAlphabet();

    for(const button of tabButtons){
        button.addEventListener("click", () => cleanInput());
    }

    VAR_F.addEventListener("click", () => {
        if(VAR_H.checked) {
            VAR_H.checked = false;
            const event = new Event("change");
            VAR_H.dispatchEvent(event);
        }
    });

    VAR_G.addEventListener("click", () => {
        if(!VAR_H.checked) {
            VAR_H.checked = true;
            const event = new Event("change");
            VAR_H.dispatchEvent(event);
        }
    });

    VAR_H.addEventListener("change", () => {
        if(VAR_H.checked){
            VAR_I.style.display = "none";
        } else {
            VAR_I.style.display = "flex";
        }

        const event = new Event("input");
        VAR_A.dispatchEvent(event);
    });

    decipherButton.addEventListener("click", () => {
        const textValue = VAR_J.value.trim().match(/./gu);
        const {text,type,shift} = detectCipher(textValue);

        VAR_K.value = type;

        if(type == "Atbash") {
            VAR_N.style.display = "none";
        } else if (type == "Caesar") {
            VAR_M.value = shift;
            VAR_N.style.display = "inline";
        }

        VAR_B.value = text;
        decipherPane.style.display = "flex";
    });

    VAR_C.addEventListener("input", setAlphabet);
}