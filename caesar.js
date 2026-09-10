// comment

function encrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(matchSymbol(char)){
            let position = 0;

            if (alphKey) {
                position = alphKey.indexOf(char.toUpperCase())
            } else {
                position = alphBase.indexOf(char.toUpperCase())
            }

            if(char == char.toUpperCase()) {
                result += alphShift[position].toUpperCase().normalize()
            } else {
                result += alphShift[position].toLowerCase().normalize()
            }       
        } else {
            result += char;
        }
    }

    return result;
}

// comment

function decrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];

        if(matchSymbol(char)){
            let position = alphShift.indexOf(char.toUpperCase());

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

// comment

function craftShift(shift, letter) {
    let alphShift = alphBase;
    let alphKey = null;

    if(!(letter == '' || letter == null)){
        const index = alphShift.indexOf(letter);
        alphShift.splice(index,1);
        alphShift.unshift(letter);
        alphKey = alphShift;
    }

    const subShift = alphShift.slice(0,shift);
    const remainingSub = alphShift.slice(shift,alphShift.length)
    alphShift = [...remainingSub, ...subShift];

    return {alphShift: alphShift, alphKey: alphKey};
}

// comment

function doCaesarCipher(innerText) {
    const keyLetter = caesarLetter.value;
    const keyValue = parseInt(caesarValue.value);

    const resultText = encrypt(innerText, keyValue, keyLetter);

    inputResult.value = resultText;
    
}