
import { useState } from "react"
import toast from 'react-hot-toast';
import axios from 'axios'

export default function Example() {


  //guardar el estudiante en el state
  const [estudiante, setEstudiante] = useState({
    nombre: '',
    apellido: '',
    email: '',
    carnet: '',
    telefono: '',
    colegio: '',
    promocion: '',
    destino: '',
  })

  //guadar imagen al state
  const [archivo , setArchivo] = useState('')

  //almacena nuevo estudiante al servidor 
  const agregarEstudiante = async e => {
    e.preventDefault()
    // crear un form data
    const formData = new FormData()
    formData.append('nombre', estudiante.nombre)
    formData.append('apellido', estudiante.apellido)
    formData.append('email', estudiante.email)
    formData.append('carnet', estudiante.carnet)
    formData.append('telefono', estudiante.telefono)
    formData.append('colegio', estudiante.colegio)
    formData.append('promocion', estudiante.promocion)
    formData.append('destino', estudiante.destino)
    formData.append('imagen', archivo)

    //almacenar en la base de datos
    try {
       axios.post("http://localhost:2000/estudiantes", formData)
      .then((response) => {
        console.log('Imagen enviada exitosamente:', response.data);
        // Puedes hacer algo con la respuesta del servidor aquí, si es necesario.
      })


      if(res.status === 200){
        toast.success('Estudiante agregado correctamente')
      }

    }catch(error){
      toast.error(error)
    }

  }

  //leer los datos del formulario
  const leerInformacionEstudiante = e => {
    setEstudiante({
      //optener una copia del state y agregar el nuevo
      ...estudiante,
      [e.target.name]: e.target.value
    })

  }

  //coloca la imagen en el state

  const leerArchivo = e => {
    
    setArchivo(e.target.files[0])

  }
  
  return (
    <form className="space-y-6" onSubmit={agregarEstudiante} >
       {/* <form className="space-y-6" action="#" method="POST"> */}
      

      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Informacion Personal</h3>
            <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  onChange={leerInformacionEstudiante}
                  id="nombre"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  onChange={leerInformacionEstudiante}
                  id="apellido"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={leerInformacionEstudiante}
                  id="email"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

            
              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                  Colegio
                </label>
                <input
                  type="text"
                  name="colegio"
                  onChange={leerInformacionEstudiante}
                  id="colegio"
                  autoComplete="street-address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Nro de carnet
                </label>
                <input
                  type="text"
                  name="carnet"
                  onChange={leerInformacionEstudiante}
                  id="carnet"
                  autoComplete="address-level2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  telefono
                </label>
                <input
                  type="text"
                  name="telefono"
                  onChange={leerInformacionEstudiante}
                  id="telefono"
                  autoComplete="address-level1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                  Destino
                </label>
                <input
                  type="text"
                  name="destino"
                  onChange={leerInformacionEstudiante}
                  id="destino"
                  autoComplete="postal-code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Fotos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Procure enviar documentos originales no fotocopias
            </p>
          </div>
          <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Documento de identidad o Pasaporte</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imagen"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Subir Imagen</span>
                      <input 
                        id="imagen" 
                        name="imagen"
                        onChange={leerArchivo} 
                        type="file" 
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1"></p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Imagen del voleto</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imagen"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Subir Imagen</span>
                      <input 
                        id="imagen" 
                        name="imagen"
                        onChange={leerArchivo}  
                        type="file" 
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1"></p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">fotografía del estudiante o Permiso menor</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imagen"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Subir Imagen</span>
                      <input 
                        id="imagen" 
                        name="imagen"
                        onChange={leerArchivo}  
                        type="file" 
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1"></p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      <div className="flex justify-end">

        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Enviar
        </button>
      </div>
    </form>
  )
}
