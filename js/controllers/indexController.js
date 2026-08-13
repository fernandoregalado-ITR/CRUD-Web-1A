import { getPrestamos, agregarPrestamos, deletePrestamo, updatePrestamo, getPRESTAMOS } from "../services/prestamosServices.js";

// Referencia a los elementos de la página (DOM)
const frmAddPrestamos = document.getElementById("frmAddPrestamos"); // tbody

const idPrestamo = document.getElementById("idPrestamo");
const txtSolicitante = document.getElementById("txtSolicitante");
const txtEquipo = document.getElementById("txtEquipo");
const txtFechaPrestamo = document.getElementById("txtFechaPrestamo");
const txtEstado = document.getElementById("txtEstado");
const btnAgregarPrestamo = document.getElementById("btnAgregarPrestamo");
const btnCancel = document.getElementById("btnCancel");

const mensaje = document.getElementById("mensaje");
const tbPrestamos = document.getElementById("tbPrestamos");

// Funcion para cargar a las personas en la tabla
async function cargarPrestamos() {
    try {
        const prestamo = await cargarPrestamos(); // Si se llama una función asincrona se debe hacer la función asincrona
        tbPrestamos.innerHTML = "";

        people.forEach((prestamo) => {
            tbPrestamos.innerHTML += ` 
            <tr>
                <td>${prestamo.id}</td>
                <td>${prestamo.Solicitante}</td>
                <td>${prestamo.Equipo}</td>
                <td>${prestamo.FechaPrestamo}</td>
                <td>${prestamo.Estado}</td>
                <td>
                    <button class= "btn btn-danger" onclick="removePerson(${prestamo.id})">Eliminar</button>
                    <button class= "btn btn-warning" onclick="loadPersonData(${prestamo.id})">Editar</button>
                </td>
            </tr>
            `;
        });
    }
    catch (error) {
        alert(error);
        console.error(error);
    }
}

// Llamamos al loadPeople hasta que el dom se ha cargado
document.addEventListener("DOMContentLoaded", async function () {
    await cargarPrestamos()
})

frmAddPrestamos.addEventListener("submit", async function (event) {

    // Evitamos que el formulario se envie automaticamente
    // Esto se hace porque debemos validar la información antes
    event.preventDefault();

    // Capturamos los valores que estan en los campos en ese momento
    const id = idPrestamo.value.trim(); //Valor del campo Hidden
    const solicitante = txtSolicitante.value.trim();
    const equipo = txtEquipo.value.trim();
    const fechaprestamo = txtFechaPrestamo.value.trim();
    const estado = txtEstado.value.trim();


    // Verificamos que los campos no esten vacios
    if (solicitante == '' || equipo == '' || fechaprestamo == '' || estado == '') {
        alert('Todos los campos son obligatorios');
        return; // Esto detiene la ejecución del código
    }

    // Creamos el objeto que se le enviara a la API
    // Los atributos del objeto deben ser exactamente los mismos que la API envia
    const prestamo = {
        solicitante: solicitante,
        equipo: equipo,
        fechaprestamo: fechaprestamo,
        estado: estado
    }

    try {
        if (id != "") { //Si hay ID, estamos actualizando
            await updatePrestamo(id, solicitante);
            alert("Se ha actualizado el prestamos correctamente");
        }
        else { //Si no hay ID, estamos agregando
            await agregarPrestamos(solicitante);
            alert('Prestamos guardado correctamente');
        }

        resetForm();

        // Es posible que hayas llamado de forma diferente a esta función 
        await getPrestamos();

    } catch (error) {
        alert('No se pudo guardar el prestamo: ' + error);
    }

});

function resetForm() {
    frmAddPrestamos.reset(); //Borrar los campos del formulario
    idPerson.value = ""; //Eliminar el ID del campo escondido
    btnAgregarPrestamo.textContent = "Guardar";
    btnCancel.classList.add("d-none");
}

//Enlazamos el botón con resetForm
btnCancel.addEventListener("click", resetForm);

async function deletePrestamos(id) {
    const confirmar = confirm("¿Desea eliminar este producto?");
    if (!confirmar) return;

    try {
        await deletePrestamo(id);
        alert("Registro eliminado exitosamente"); 
        resetForm();
        await cargarPrestamos();
    }
    catch (error) {
        alert("No se pudo eliminar al producto : " + error);
    }
}

//Función para colocar los valores en los campos del formulario
async function getPrestamos(id) {
    try {
        const person = await getPerson(id);

        //Llenamos los campos del formulario
        idPrestamo.value = prestamo.id;
        txtSolicitante.value = prestamo.solicitante;
        txtEquipo.value = prestamo.equipo;
        txtFechaPrestamo.value = prestamo.fechaprestamo;
        txtEstado.value = prestamo.estado;

        btnAgregarPrestamo.textContent = "Actualizar";
        btnCancel.classList.remove("d-none"); //El botón de Cancelar se mostrará
    }
    catch (error) {
        alert("No se pudo cargar los datos del prestamo: " + error);
        console.error(error);
    }
}

window.deletePrestamo = deletePrestamos;
window.getPrestamos = getPrestamos;