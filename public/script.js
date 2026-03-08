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
