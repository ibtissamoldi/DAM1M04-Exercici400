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