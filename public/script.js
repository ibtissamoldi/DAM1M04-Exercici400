let moviments = 0;
const numFiles = 3;
const numColumnes = 3;
const midaCasella = 100;

let tauler = [];
let refTauler;

function init() {
    refTauler = document.getElementById("tauler");
    document.getElementById("btnReset").addEventListener("click", reset);
    reset();
}

function crearTaulerResolt() {
    let valor = 1;
    const t = [];
    for (let fila = 0; fila < numFiles; fila++) {
        t[fila] = [];
        for (let col = 0; col < numColumnes; col++) {
            if (fila === numFiles - 1 && col === numColumnes - 1) t[fila][col] = 0;
            else t[fila][col] = valor++;
        }
    }
    return t;
}

function barrejarTauler() {
    tauler = crearTaulerResolt();

    const seqMoves = [
        {fila: 2, col: 1},
        {fila: 1, col: 1},
        {fila: 1, col: 2},
        {fila: 2, col: 2},
        {fila: 2, col: 1},
        {fila: 1, col: 1},
        {fila: 0, col: 1},
        {fila: 0, col: 2}
    ];

    for (let i = 0; i < seqMoves.length; i++) {
        const move = seqMoves[i];
        if (esAdjacent(move.fila, move.col)) {
            mourePeca(move.fila, move.col, false);
        }
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
        document.getElementById("missatge").textContent = `Puzzle resuelto en ${moviments} movimientos!`;
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
            }

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