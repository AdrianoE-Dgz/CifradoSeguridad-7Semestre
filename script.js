const inputText = document.getElementById("initialText");
const inputResult = document.getElementById("inputResult");

const chooseCaesarCheck = document.getElementById("cypher-type-caesar");
const chooseAtbashCheck = document.getElementById("cypher-type-atbash");
const cypherTypeCheck = document.getElementById("cypher-type");

const cypherPaneCaesar = document.getElementById("caesar-cypher-pane");

chooseCaesarCheck.addEventListener("click", () => {
    if(cypherTypeCheck.checked) {
        cypherTypeCheck.checked = false;
        const event = new Event("change");
        cypherTypeCheck.dispatchEvent(event);
    }
});

chooseAtbashCheck.addEventListener("click", () => {
    if(!cypherTypeCheck.checked) {
        cypherTypeCheck.checked = true;
        const event = new Event("change");
        cypherTypeCheck.dispatchEvent(event);
    }
});

cypherTypeCheck.addEventListener("change", () => {
    if(cypherTypeCheck.checked){
        cypherPaneCaesar.style.display = "none";
    } else {
        cypherPaneCaesar.style.display = "inline";
    }

    const event = new Event("input");
    inputText.dispatchEvent(event);
})