function atbashCipher(text) {
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(matchSymbol(char)){
            if(char == char.toUpperCase()) {      
                result += atbashBase[char].toUpperCase()
            } else {
                char = char.toUpperCase()
                result += atbashBase[char].toLowerCase()
            }       
        } else {
            result += char;
        }
    }

    return result;
}

function doAtbashCipher() {
    const innerText = inputText.value;
    const resultText = atbashCipher(innerText);

    inputResult.value = resultText;
}

function updateResult() {
    if(cipherTypeCheck.checked)
        doAtbashCipher();
    else
        doCaesarCipher();
}