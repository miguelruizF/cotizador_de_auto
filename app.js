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
        console.log("no paso la validacion")
    }else{
        console.log("Si paso la validacion")
    }
}