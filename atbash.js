// 11

function atbashCipher(text) {
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(matchSymbol(char)){
            if(char == char.toUpperCase()) {      
                result += atbashBase[char].toUpperCase().normalize()
            } else {
                char = char.toUpperCase()
                result += atbashBase[char].toLowerCase().normalize()
            }       
        } else {
            result += char;
        }
    }

    return result;
}

// 12

function doAtbashCipher(innerText) {
    const resultText = atbashCipher(innerText);

    inputResult.value = resultText;
}