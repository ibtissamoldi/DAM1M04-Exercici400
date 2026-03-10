/*declaro algunas variables globales*/
let moviments = 0; /*número de movimientos del jugador*/
const numFiles = 3;
const numColumnes = 3;
const midaCasella = 100;/*el tamaño de cada casilla en píxeles*/

let tauler = [];/*matriz 2D*/
let refTauler;/*referencia del tablero del html*/

/*se ejecuta al cargar la página*/
function init() {
    refTauler = document.getElementById("tauler");
    document.getElementById("btnReset").addEventListener("click", reset);
    reset();/*para iniciar la primera partida */
}
function crearTaulerResolt() {
    let valor = 1;
    const t = [];
    for (let fila = 0; fila < numFiles; fila++) 
    {
        t[fila] = [];
        for (let col = 0; col < numColumnes; col++) 
        {
            if (fila === numFiles - 1 && col === numColumnes - 1) t[fila][col] = 0;
            else t[fila][col] = valor++;
        }
    }
    return t;
}

function barrejarTauler() {
    tauler = crearTaulerResolt();

    for (let i = 0; i < 50; i++) {

        const buit = trobarBuit();

        const possibles = [
            { fila: buit.fila - 1, col: buit.col },
            { fila: buit.fila + 1, col: buit.col },
            { fila: buit.fila, col: buit.col - 1 },
            { fila: buit.fila, col: buit.col + 1 }
        ];

        const movimentsValids = [];

        for (let p of possibles) {
            if (
                p.fila >= 0 &&
                p.fila < numFiles &&
                p.col >= 0 &&
                p.col < numColumnes
            ) {
                movimentsValids.push(p);
            }
        }

        const randomIndex = Math.floor(Math.random() * movimentsValids.length);
        const move = movimentsValids[randomIndex];

        const posBuit = trobarBuit();

        const temp = tauler[move.fila][move.col];
        tauler[move.fila][move.col] = tauler[posBuit.fila][posBuit.col];
        tauler[posBuit.fila][posBuit.col] = temp;
    }
}

function reset() {
    moviments = 0;
    document.getElementById("moviments").textContent = moviments;
    document.getElementById("missatge").textContent = "";
    barrejarTauler();
    pintarTauler();
}

function trobarBuit() {
    for (let fila = 0; fila < numFiles; fila++) {
        for (let col = 0; col < numColumnes; col++) {
            if (tauler[fila][col] === 0) return { fila: fila, col: col };
        }
    }
}

function esAdjacent(fila, col) {
    const posBuit = trobarBuit();

    if (fila === posBuit.fila && (col === posBuit.col + 1 || col === posBuit.col - 1)) return true;
    if (col === posBuit.col && (fila === posBuit.fila + 1 || fila === posBuit.fila - 1)) return true;

    return false;
}

function mourePeca(fila, col, comptaMoviments = true) {
    if (!esAdjacent(fila, col)) return;

    const posBuit = trobarBuit();
    const temp = tauler[fila][col];
    tauler[fila][col] = tauler[posBuit.fila][posBuit.col];
    tauler[posBuit.fila][posBuit.col] = temp;

    if (comptaMoviments) {
        moviments++;
        document.getElementById("moviments").textContent = moviments;
    }

    pintarTauler();

    if (estàResolut()) {
        document.getElementById("missatge").textContent = `Puzle resolt en ${moviments} moviments!`;
    }
}

function pintarTauler() {
    while (refTauler.firstChild) refTauler.removeChild(refTauler.firstChild);

    for (let fila = 0; fila < numFiles; fila++) {
        for (let col = 0; col < numColumnes; col++) {
            const valor = tauler[fila][col];
            if (valor === 0) continue;

            const peca = document.createElement("div");
            peca.classList.add("peca");
            /*   
            let row = 0;
            let column = 0;
            let count = 1;
            for (let r = 0; r < numFiles; r++) {
                for (let c = 0; c < numColumnes; c++) {
                    if (count === valor) {
                        row = r;
                        column = c;
                    }
                    count++;
                }
            }*/
            let row = Math.floor((valor - 1) / numColumnes);
            let column = (valor - 1) % numColumnes;

            peca.style.backgroundImage = "url('./assets/puzzle.png')";
            peca.style.backgroundPosition = `${-column * midaCasella}px ${-row * midaCasella}px`;

            peca.style.transform = `translate(${col * midaCasella}px, ${fila * midaCasella}px)`;

            peca.addEventListener("click", () => mourePeca(fila, col));

            refTauler.appendChild(peca);
        }
    }
}

function estàResolut() {
    const resolt = crearTaulerResolt();
    for (let fila = 0; fila < numFiles; fila++) {
        for (let col = 0; col < numColumnes; col++) {
            if (tauler[fila][col] !== resolt[fila][col]) return false;
        }
    }
    return true;
}