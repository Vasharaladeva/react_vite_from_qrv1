export async function obtenerClientes() {
    const respuesta = await fetch('https://52.87.247.113/estudiante')
    const resultado = await respuesta.json()
    return resultado
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`https://52.87.247.113/estudiante/${id}`)
    const resultado = await respuesta.json()
    return resultado
}

