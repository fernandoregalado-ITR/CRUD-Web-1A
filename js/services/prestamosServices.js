// URL de la API o Endpoint
const API_URL = "https://retoolapi.dev/L5Odyt/Prestamos";

// Función para obtener datos de la API
export async function getPrestamos() {
    try {
        const response = await fetch(API_URL); // GET por defecto

        if (!response.ok) {
            throw new Error("Error al obtener prestamos");
        }

        const prestamos = response.json(); // Convertimos la respuesta de la API a JSON

        return prestamos; // Enviamos el JSON al controller
    }
    catch (error) {
        console.error("Error al obtener personas: " + error);
        throw error; // Propagar el error al Trycatch

    }
}

// Función para agregar prestamos
export async function agregarPrestamos(prestamo) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prestamo)
        });

        if (!response.ok) {
            throw new Error("Error al agregar el registro: " + response.status + "" + response.statusText)
        }

        const nuevoPrestamo = await response.json();

        return nuevoPrestamo; // Retornamos el nuevo registro al controller
    }
    catch (error) {
        console.error("Error al agregar el registro: " + error);
        throw error;
    }
}

// Función para borrar
export async function deletePrestamos(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el prestamo');
        }

        return true;

    } catch (error) {
        console.error('Error al eliminar el prestamo: ', error);
        throw error;
    }
}

//Función para llamar a un registro específico
export async function getPrestamo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`); //GET por defecto

        if (!response.ok) {
            throw new Error("Error al obtener el presamo: " + response.statusText);
        }

        const prestamo = await response.json();
        return prestamo; //Retornamos el JSON al controller
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

//Función para actualizar registros
export async function updatePrestamo(id, prestamo) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(prestamo)
        });

        if(!response.ok){
            throw new Error("Error al actualizar el prestamo: " + response.statusText);
        }

        const updatedPrestamo = await response.json();
        return updatedPrestamo; //Retornamos la persona actualizada al controller
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}