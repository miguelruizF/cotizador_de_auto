const d = document;

//Constructores

function Seguros(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo
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
}