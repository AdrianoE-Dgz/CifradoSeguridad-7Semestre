// 7

function encrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(matchSymbol(char)){
            const position = alphBase.indexOf(char);

            result += alphShift[position];
        } else {
            result += char;
        }
    }

    return result;
}

// 8

function decrypt(text, shift, letter) {
    const {alphShift, alphKey} = craftShift(shift, letter) || null;
    
    let result="";

    for (let i=0; i<text.length; i++) {
        const char = text[i];

        if(matchSymbol(char)){
            let position = alphShift.indexOf(char);
            result += alphBase[position]
        } else {
            result += char;
        }
    }
    
    return result;
}

// 9

function craftShift(shift, letter) {
    let alphShift = alphBase;
    let alphKey = null;

    // if(!(letter == '' || letter == null)){
    //     const index = alphShift.indexOf(letter);
    //     alphShift.splice(index,1);
    //     alphShift.unshift(letter);
    //     alphKey = alphShift;
    // }

    const subShift = alphShift.slice(0,shift);
    const remainingSub = alphShift.slice(shift,alphShift.length)
    alphShift = [...remainingSub, ...subShift];

    return {alphShift: alphShift, alphKey: alphKey};
}

// 10

function doCaesarCipher(innerText) {
    const keyLetter = caesarLetter.value;
    const keyValue = parseInt(caesarValue.value);

    const resultText = encrypt(innerText, keyValue, keyLetter);

    inputResult.value = resultText;
    
}