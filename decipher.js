// const commonLetterFrequency = {
//     'A': 12.53,
//     'B': 1.42,
//     'C': 4.68,
//     'D': 5.86,
//     'E': 13.68,
//     'F': 0.69,
//     'G': 1.01,
//     'H': 0.70,
//     'I': 6.25,
//     'J': 0.44,
//     'K': 0.02,
//     'L': 4.97,
//     'M': 3.15,
//     'N': 6.71,
//     'Ñ': 555,
//     'O': 8.68,
//     'P': 2.51,
//     'Q': 0.88,
//     'R': 6.87,
//     'S': 7.98,
//     'T': 4.63,
//     'U': 3.93,
//     'V': 0.90,
//     'W': 0.01,
//     'X': 0.22,
//     'Y': 0.90,
//     'Z': 0.52
// }

// const freqOrder = "EAOSRNIDLCTUMPBGVYQHFZJÑXKW";
const freqWords = ['ES','EL','LA','DE','QUE','Y','EN','UN','SER','SE','NO','HABER','POR','CON','SU','SI','LO','HA','YA','YO','LOS','LAS',"AL","SON","SIN","UNO","UNA", "MI", "ME", "MIS", "VE", "VER", "VEN", "ESTO", "ESTA", "ESTE", "MÁS", "MAS", "PREGUNTA", "PUNTO", "PUNTOS", "CÉSAR", "CESAR", "VALOR"];
// 13

function detectCipher(text) {
    let frequency = getFrequencies(text);
    const result = compareFrequencies(frequency, text);

    return result;
}

// 14

function getFrequencies(text) {
    let objeto = {}
    let letters = []

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if(matchSymbol(char)){
            objeto[char] = ++objeto[char] || 1;
        
            if(!(letters.indexOf(char) >= 0))
                letters.push(char);
        }
    }

    for(let i = 0; i < letters.length; i++) {
        const char = letters[i];
        objeto[char] = (objeto[char] / text.length) * 100;
    }

    return objeto;
}

// 15

function compareFrequencies(frec, text) {
    let maxKey, maxValue = 0, wordSearch = 0;
    let result = {text: '', type: '', shift: 0||null};

    for(const [key, value] of Object.entries(frec)) {
        if(value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }

    for(let i=0;i<alphBase.length;i++) {
        const predicted = alphBase[i];

        if (maxKey == atbashBase[predicted]) {
            const deciphered = atbashCipher(text);
            const valor = wordFrequency(deciphered);

            if(valor > wordSearch){
                wordSearch = valor;
                result.type = "Atbash";
                result.text = deciphered;
                result.shift = null;
            }
        } else {
            const letterIndex = i;

            for(let j=1; j<alphBase.length; j++){
                const {alphShift} = craftShift(j, null);

                if(maxKey == alphShift[letterIndex]){
                    const deciphered = decrypt(text,j,null);
                    const valor = wordFrequency(deciphered);
                    
                    if(valor > wordSearch) {
                        wordSearch = valor;
                        result.type = "Caesar";
                        result.text = deciphered;
                        result.shift = j;
                    }
                }
            }
        }
    }

    return result;
}

// 16

function wordFrequency(text) {
    let cont = 0;
    const vector = text.toUpperCase().split(' ');

    for(let i=0;i<freqWords.length;i++){
        for(let j=0;j<vector.length;j++){
            if(freqWords[i] == vector[j])
                cont += vector[j].length;
        }
    }

    return cont;
}