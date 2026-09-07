const commonLetterFrequency = {
    'A': 12.53,
    'B': 1.42,
    'C': 4.68,
    'D': 5.86,
    'E': 13.68,
    'F': 0.69,
    'G': 1.01,
    'H': 0.70,
    'I': 6.25,
    'J': 0.44,
    'K': 0.02,
    'L': 4.97,
    'M': 3.15,
    'N': 6.71,
    'Ñ': 555,
    'O': 8.68,
    'P': 2.51,
    'Q': 0.88,
    'R': 6.87,
    'S': 7.98,
    'T': 4.63,
    'U': 3.93,
    'V': 0.90,
    'W': 0.01,
    'X': 0.22,
    'Y': 0.90,
    'Z': 0.52
}

const atbashBase = {
    'A': 'Z', 'B': 'Y', 'C': 'X', 'D': 'W', 'E': 'V',
    'F': 'U', 'G': 'T', 'H': 'S', 'I': 'R', 'J': 'Q',
    'K': 'P', 'L': 'O', 'M': 'Ñ', 'N': 'N', 'Ñ': 'M',
    'O': 'L', 'P': 'K', 'Q': 'J', 'R': 'I', 'S': 'H', 'T': 'G',
    'U': 'F', 'V': 'E', 'W': 'D', 'X': 'C', 'Y': 'B', 'Z': 'A'
};

const alphBase = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function detectCipher(text) {
    let frequency = getFrequencies(text);

    console.log(frequency)

    const result = compareFrequencies(frequency, text);

    console.log(result)
}

function getFrequencies(text) {
    let objeto = {}
    let letters = []

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();

        if(/^[a-zA-Z()]+$/.test(char)){
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

function compareFrequencies(frec, text) {
    const eIndex = alphBase.indexOf("E"), aIndex = alphBase.indexOf('A'), oIndex = alphBase.indexOf('O');
    let maxKey, maxValue = 0;
    let predicted = {};
    let result = {text: '', type: '', shift: 0||null};

    for(const [key, value] of Object.entries(frec)) {
        if(value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }

    predicted['E'] = maxKey;
    predicted['A'] = maxKey;
    predicted['O'] = maxKey;

    // console.log("E")
    // if(predicted['E'] == atbashBase['E']) {
    //     result.type = "Atbash";
    //     result.text = atbashCypher(text);
    //     console.log("Atbash E")

    //     return result;
    // } else {
    //     result.type = "Caesar";

    //     for(let i=0; i < alphBase.length; i++){
    //         const {alphShift} = craftShift(i, null);

    //         if(predicted['E'] == alphShift[eIndex]){
    //             result.text = decrypt(text,i,null);
    //             result.shift = i;

    //             console.log("Caesar E")

    //             return result;
    //         }
    //     }
    // }

    console.log("A")
    if(predicted['A'] == atbashBase['A']) {
        result.type = "Atbash";
        result.text = atbashCypher(text);

        console.log("Atbash A")
        return result;
    } else {
        result.type = "Caesar";

        for(let i=0; i < alphBase.length; i++){
            const {alphShift} = craftShift(i, null);

            if(predicted['A'] == alphShift[aIndex]){
                result.text = decrypt(text,i,null);
                result.shift = i;

                console.log("Caesar A")

                return result;
            }
        }
    }

    console.log("O")
    if(predicted['O'] == atbashBase['O']) {
        result.type = "Atbash";
        result.text = atbashCypher(text);
        console.log("Atbash O")

        return result;
    } else {
        result.type = "Caesar";

        for(let i=0; i < alphBase.length; i++){
            const {alphShift} = craftShift(i, null);

            if(predicted['O'] == alphShift[oIndex]){
                result.text = decrypt(text,i,null);
                result.shift = i;

                console.log("Caesar O")

                return result;
            }
        }
    }
}

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

// detectCipher("Qsvfcb nbt mbshb efm ufyup qpsrvf ftqfsp rvf fñ mp hfñfsbm jñdmvtp tj vujmjap pusb mjñfb ef ufyup qvfeb eftdjgsbsmp tjñ qspcmfnb, tj ñp mmpsp");

detectCipher("mb mpt qps vñ dpñ vñb mbt qbsb bm ñp mp bopt ept bop ibtub tpñ ib djvebe tjhmp ibcíb zb puspt qpcmbdjóñ mvhbs vñp njtnp gpsnb nvz dpñusb btí gbnjmjb tjep nbzps cbkp kvñup hsvqp Kvbñ upep nbsap ibñ nvñjdjqjp nbzp dbeb gjñbm pusbt bhptup bcsjm upept kvmjp qbít wjeb kvñjp qspwjñdjb ibdjb ubñup tpmp Mjñdpmñ usbt ijtupsjb Nbsíb ámcvn eíb upubm qbsujep dvbusp wbsjpt nvñep uvwp síp Nbesje pcsb qsjñdjqbm bmhvñpt tvs dpmps cbñeb pusp Dbsmpt Gsbñdjb pgjdjbm apñb nútjdb dbñdjóñ ujqp vñpt Mvjt uíuvmp gúucpm usbcbkp Dpqb bhvb ijap N mbshp dpñebep qbsujs dpñpdjep Zpsl");