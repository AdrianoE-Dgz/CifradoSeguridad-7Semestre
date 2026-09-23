// 11

function atbashCipher(text) {
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(matchSymbol(char)){
            result += atbashBase[char]
        } else {
            result += char;
        }
    }

    return result;
}

// 12

function doAtbashCipher(innerText) {
    const resultText = atbashCipher(innerText);

    VAR_B.value = resultText;
}