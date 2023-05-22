const d = document;

//Constructores

function Seguros(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
}

//Realiza la cotizacion del seguro
Seguros.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    //Tipo de seguro
    if(this.tipo === "basico"){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;

    console.log(cantidad);
    
}

function UI(){
}

//Llenar opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max - 20;

    const selectYear = d.querySelector("#year");
    
    for(let i = max; i > min; i--){
        let opcion = d.createElement("option");
        opcion.value = i;
        opcion.textContent = i; 
        selectYear.appendChild(opcion);
    }
}

//Mostrar alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = d.createElement("div");
    if(tipo === "error"){
        div.classList.add("error");
    }else{
        div.classList.add("correcto");
    }

    div.classList.add("mensaje", "mt-10");
    div.textContent = mensaje;
    
    const formulario = d.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, d.querySelector("#resultado") );

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total) =>{
    const {marca, year} = seguro;
    let textoMarca;

    switch (marca) {
        case "1":
            textoMarca = "Americano";
            break;
        case "2":
            textoMarca = "Asiatico";
            break;
        case "3":
            textoMarca = "Europeo";
            break;    
        default:
            break;
    }
    const div = d.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold b-bottom">Total: <span class="font-normal">$${total}</span></p>
    `;
    const resultadoDiv = d.querySelector("#resultado");
    

    setTimeout(()=>{
        resultadoDiv.appendChild(div);
    }, 3000);
}
//Instanciar UI
const ui = new UI();

d.addEventListener("DOMContentLoaded", ()=>{
    ui.llenarOpciones();
});

eventListeners();
function eventListeners(){
    const formulario = d.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    //Leer marca
    const marca = d.querySelector("#marca").value;
    // console.log(marca);
    
    //Leer año
    const year = d.querySelector("#year").value;

    //Leer tipo de cobertura
    const tipo = d.querySelector("input[name='tipo']:checked").value;
    // console.log(tipo)

    if(marca === ""  || year === "" || tipo ===""){
        ui.mostrarMensaje("Todos los campos deben ser obligatorios", "error");
        return;    
    }

    ui.mostrarMensaje("Cotizando...", "exito");

    //Ocultar cotizaciones previas
    const resultados = d.querySelector("#resultado div");
    if(resultados != null){
        resultados.remove();
    }

    //Instanciar el seguro
    const seguro = new Seguros(marca, year, tipo);
    // console.log(seguro);
    const total = seguro.cotizarSeguro();

    //Prototype para mostrar el total
    ui.mostrarResultado(seguro, total);
}   