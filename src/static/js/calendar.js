let contadorSemana = 0

function general(paDonde = 0){

let divTable = document.createElement('div');
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

contadorSemana += paDonde

divTable.classList.add('divTabla')
table.classList.add('table')
table.classList.add('table-bordered')

divTable.appendChild(table);
table.appendChild(thead);
table.appendChild(tbody);

let ancho = screen.width<=500;
document.getElementById('body').innerHTML = ''
document.getElementById('body').appendChild(divTable);

let titulos = ["","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
let horas = ["","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00"
    ,"16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
let recuadros = []

function llenaTabla(){
    let contador = 0
    let hoy = new Date()
    let dia = hoy.getDay()

    horas.forEach((elementH, indexH) => {
        
        let row_1 = document.createElement('tr');
        
        titulos.forEach((element, index)=> {

            //TEXT
            if(indexH==0){
                let heading_1 = document.createElement('th');
                if(index != 0){
                    let fecha = new Date()
                    heading_1.style = "aling: center; font-size: 11px;" + ((dia-index+(contadorSemana*-7))==0? "color: red":"")
                    fecha.setDate(fecha.getDate() - (dia-index+(contadorSemana*-7)))
                    heading_1.innerHTML = element.toString() + "<br>" + (fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear())
                }
                row_1.appendChild(heading_1);
            }else{
                let tbody_1 = document.createElement('td');
                if(index == 0)
                    tbody_1.innerHTML = elementH.toString();
                else{
                    //ELEMENTO DE RECUADROS
                    //data-toggle="modal" data-target="#exampleModal"
                    tbody_1.setAttribute("data-toggle", "modal")
                    tbody_1.setAttribute("data-target", "#exampleModal")

                    tbody_1.style = "cursor: pointer;"
                    let fecha = new Date()
                    fecha.setDate(fecha.getDate() - (dia-index+(contadorSemana*-7)))
                    
                    tbody_1.classList.add("classRecuadro")
                    tbody_1.classList.add("fecha"+fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear())
                    tbody_1.id = indexH + "-" + index + "-" + "recuadro-" + contador
                    contador ++
                    recuadros.push(tbody_1)

                }
                row_1.appendChild(tbody_1);
            }
            
        });
        thead.appendChild(row_1);
    })


}

function ejecutaListeners(){
    try{
        document.querySelectorAll(".classRecuadro").forEach(el => {
            try{
                el.addEventListener("click", e => {
                    let id = e.target.getAttribute("id");
                    let indexTocado = id.toString().substring(id.lastIndexOf('-')+1);
                    let nodo = recuadros[indexTocado];
                    setDatosModal(nodo)
                });
            }catch(error){

            }
        });
    }catch(error){

    }
}

function setDatosModal(nodo){
    let titulo = document.getElementById("exampleModalLabel")
    let id = nodo.getAttribute("id")
    let partes = id.split("-")
    let clases = nodo.classList
    let fecha = ''
    clases.forEach(element => {
        if(element.toString().indexOf("fecha")!=-1){
            fecha = element.substring(5)
        }
    })
    titulo.innerHTML =  titulos[partes[1]] + "(" + fecha + ")" + " - " + horas[partes[0]]

    
    document.getElementById("modal-body").innerHTML = ''

    let form = document.createElement("form")
    form.setAttribute("action", "/forward/")
    form.setAttribute("method", "post")

    let nombre = document.createElement("input")
    nombre.setAttribute("type", "text")
    nombre.setAttribute("name", "nombre")
    nombre.setAttribute("id", "nombre")
    nombre.setAttribute("placeholder", "Nombre")
    
    let tipoTrabajo = document.createElement("input")
    tipoTrabajo.setAttribute("type", "text")
    tipoTrabajo.setAttribute("name", "tipoTrabajo")
    tipoTrabajo.setAttribute("id", "tipoTrabajo")
    tipoTrabajo.setAttribute("placeholder", "Tipo Trabajo")
    
    
    let fechaRetoque = document.createElement("input")
    fechaRetoque.setAttribute("type", "date")
    fechaRetoque.setAttribute("name", "fechaRetoque")
    fechaRetoque.setAttribute("id", "fechaRetoque")
    fechaRetoque.setAttribute("placeholder", "Fecha Trabajo")
    
    let partesFecha = fecha.split("/")
    fechaRetoque.value = partesFecha[2] + "-" + 
        (partesFecha[1].length == 1? "0"+partesFecha[1]:partesFecha[1]) + "-" +
        (partesFecha[0].length == 1? "0"+partesFecha[0]:partesFecha[0])

    let boton = document.createElement("input")
    boton.classList.add("btn")
    boton.classList.add("btn-primary")
    boton.classList.add("btn-lg")
    boton.setAttribute("name", "forwardBtn")
    boton.setAttribute("type", "submit")
    boton.innerHTML = "Guardar"

    form.appendChild(nombre)
    form.appendChild(tipoTrabajo)
    form.appendChild(fechaRetoque)
    form.appendChild(boton)

    document.getElementById("modal-body").appendChild(form)
}

llenaTabla()
ejecutaListeners()

}

general()