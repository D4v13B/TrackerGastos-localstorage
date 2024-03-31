const tiposGastos = ["💊Medicinas", "🎓Estudios", "🥂Fiesta", "🍔Comida", "📱Servicios"]

const formulario = document.querySelector("#formulario")
const sectionGastos = formulario.querySelector("#section-gastos")
let gastos = []
let totalGastado = 0

// Clase
function Gasto(titulo, tipo, costo, id) {
   this.titulo = titulo
   this.tipo = tipo
   this.costo = costo
   this.id = id
}

document.addEventListener("DOMContentLoaded", function () {

   gastos = JSON.parse(localStorage.getItem("gastos")) || []

   tiposGastos.forEach(e => {
      const titulo = e.substring(2)
      const element = `<div class="form-check mb-1">
      <input class="form-check-input" type="radio" name="gasto" id="${titulo}" value="${titulo}">
      <label class="form-check-label" for="${titulo}">
        ${e}
      </label>
    </div>`

      sectionGastos.innerHTML += element
   })

   eventListener()
   actualizarStorage()
   mostrarGastos()

})

function eventListener() {
   formulario.addEventListener("submit", registrarGasto)
}

function registrarGasto(e) {
   e.preventDefault()

   const tipoGasto = formulario.querySelector("input[name=gasto]:checked").value
   const titulo = formulario.querySelector("#titulo").value
   const costo = formulario.querySelector("#costo").value

   const gasto = new Gasto(titulo, tipoGasto, costo, Date.now())

   formulario.reset()
   gastos.push(gasto)
   actualizarStorage()
   mostrarGastos()
}

function mostrarGastos() {
   let total = 0
   let html = ""
   const gastosSection = document.querySelector("#lista-gastos-section")
   let totalGastado = gastos.reduce((total, {costo}) => {
      return total + parseInt(costo)
   }, 0)

   document.querySelector("#total-gastado").textContent = totalGastado

   gastos.forEach(({ titulo, tipo, costo, id }) => {
      let emogie
      switch (tipo) {
         case "Medicinas":
            emogie = "💊"
            break
         case "Servicios":
            emogie = "📱"
            break
         case "Comida":
            emogie = "🍔"
            break
         case "Fiesta":
            emogie = "🥂"
            break
         case "Estudios":
            emogie = "🎓"
            break
         default:
            break;
      }

      html += `<div class="d-flex justify-content-between m-auto col-12 col-md-6 p-3 rounded shadow bg-dark mb-3">
            <span>
               <h6>${emogie}${titulo}</h6>
               <p>Costo: ${costo}$</p>
            </span>
            <span>
               <button class="btn btn-warning" onclick="eliminarGasto(${id})">X</button>
            </span>
         </div>`

   })

   gastosSection.innerHTML = html
}

function actualizarStorage() {
   localStorage.setItem("gastos", JSON.stringify(gastos))
}

function eliminarGasto(id){
   gastos = gastos.filter( e => e.id != id)
   actualizarStorage()
   mostrarGastos()
}