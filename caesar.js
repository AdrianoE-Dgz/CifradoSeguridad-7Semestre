const caesarLetter = document.getElementById('caesarLetter');
const caesarValue = document.getElementById('caesarShift');

const alphBase = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function encrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(/^[ña-zÑA-Z()]+$/.test(char)){
            let position = 0;

            if (alphKey) {
                position = alphKey.search(char.toUpperCase())
            } else {
                position = alphBase.search(char.toUpperCase())
            }

            if(char == char.toUpperCase()) {
                result += alphShift[position].toUpperCase()
            } else {
                result += alphShift[position].toLowerCase()
            }       
        } else {
            result += char;
        }
    }

    return result;
}

function decrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];

        if(/^[ña-zÑA-Z()]+$/.test(char)){
            let position = alphShift.search(char.toUpperCase());

            if(char == char.toUpperCase()) {
                if (alphKey)
                    result += alphKey[position].toUpperCase()
                else
                    result += alphBase[position].toUpperCase()
            } else {
                if (alphKey)
                    result += alphKey[position].toLowerCase()
                else
                    result += alphBase[position].toLowerCase()
            }
        } else {
            result += char;
        }
    }
    
    return result;
}

function craftShift(shift, letter) {
    let alphShift = alphBase;
    let alphKey = null;

    if(!(letter == '' || letter ==null)){
        alphShift = letter.toUpperCase() + alphShift.split(letter.toUpperCase()).join('');
        alphKey = alphShift;
    }

    const subUpper = alphShift.substring(0,shift);
    alphShift = alphShift.substring(shift,alphShift.length) + subUpper;

    return {alphShift: alphShift, alphKey: alphKey};
}

function doCaesarCipher() {
    const innerText = inputText.value;
    const keyLetter = caesarLetter.value;
    const keyValue = parseInt(caesarValue.value);

    const resultText = encrypt(innerText, keyValue, keyLetter);

    inputResult.value = resultText;
    
}