let moviments = 0

let tauler = [
  [0,1,2],
  [3,4,5],
  [6,7,8]
]

function init(){
    console.log("Joc iniciat")
    pintarTauler()
    refTauler = document.getElementById("tauler")
    const btnReset = document.getElementById("btnReset")
    btnReset.addEventListener("click", reset)
}

const midaCasella = 100

let refTauler

function trobarBuit(){

    for(let fila = 0; fila < 3; fila++){
        for(let columna = 0; columna < 3; columna++){
            if(tauler[fila][columna] === 0){
                return {
                    fila: fila,
                    columna: columna
                }
            }
        }
    }
}

function esAdjacent(fila, columna) {
    let posBuit = trobarBuit()

    if(fila == posBuit.fila && (columna == posBuit.columna + 1 || columna == posBuit.columna - 1)){
        return true
    }

    if(columna == posBuit.columna && (fila == posBuit.fila + 1 || fila == posBuit.fila - 1)){
        return true
    }

    return false
}
function mourePeca(fila, columna){
    if(esAdjacent(fila, columna)){
        let posBuit = trobarBuit()
        let temp = tauler[fila][columna]
        tauler[fila][columna] = tauler[posBuit.fila][posBuit.columna]
        tauler[posBuit.fila][posBuit.columna] = temp

        moviments++
        document.getElementById("moviments").textContent = moviments

        pintarTauler()

        if(estàResolut()){
            alert("Puzle resolt en " + moviments + " moviments!")
        }
    }
}

function clicCasella(fila, columna){

    
    document.getElementById("fila").textContent = fila
    document.getElementById("columna").textContent = columna


    mourePeca(fila, columna)

}
function estàResolut(){

    const resolt = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ]

    for(let fila=0; fila<3; fila++){
        for(let col=0; col<3; col++){
            if(tauler[fila][col] !== resolt[fila][col]){
                return false
            }
        }
    }
    return true
}

function pintarTauler(){
    const fills = refTauler.children
    for(let i = fills.length - 1; i >= 0; i--){
        refTauler.removeChild(fills[i])
    }

    for(let fila = 0; fila < 3; fila++){
        for(let columna = 0; columna < 3; columna++){
            let valor = tauler[fila][columna]
            let peca = document.createElement("div")
            peca.classList.add("peca")
            peca.textContent = valor

            let x = columna * midaCasella
            let y = fila * midaCasella

            peca.style.transform = `translate(${x}px, ${y}px)`

            peca.addEventListener("click", function(){
                clicCasella(fila, columna)
            })
            refTauler.appendChild(peca)
        }
    }
}
function reset(){
    moviments = 0
    document.getElementById("moviments").textContent = moviments
}



