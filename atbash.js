const atbashBase = {
    'A': 'Z', 'B': 'Y', 'C': 'X', 'D': 'W', 'E': 'V',
    'F': 'U', 'G': 'T', 'H': 'S', 'I': 'R', 'J': 'Q',
    'K': 'P', 'L': 'O', 'M': 'Ñ', 'N': 'N', 'Ñ': 'M',
    'O': 'L', 'P': 'K', 'Q': 'J', 'R': 'I', 'S': 'H', 'T': 'G',
    'U': 'F', 'V': 'E', 'W': 'D', 'X': 'C', 'Y': 'B', 'Z': 'A'
};

function atbashCypher(text) {
    let result="";

    for (let i=0; i<text.length; i++) {
        let char = text[i];
        
        if(/^[ña-zÑA-Z()]+$/.test(char)){
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

function doAtbashCypher() {
    const innerText = inputText.value;
    const resultText = atbashCypher(innerText);

    inputResult.value = resultText;
}

function updateResult() {
    if(cypherTypeCheck.checked)
        doAtbashCypher();
    else
        doCaesarCypher();
}

inputText.addEventListener("input", updateResult);
caesarLetter.addEventListener("input", updateResult);
caesarValue.addEventListener("input", updateResult);