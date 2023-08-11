import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export async function action() {

}

function NuevoCliente() {

    const [scannerResult, setScannerResult] = useState(null)
    const [users, setUser] = useState({});
    // const [groupedUsers, setGroupedUsers] = useState([]); // Estado para almacenar usuarios agrupados
    const [objectList, setObjectList] = useState([]);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        })
        scanner.render(success, error)
        function success(result) {
            scanner.clear()
            setScannerResult(result)
            
        }
        function error(err) {
            console.warn(err)
        }
    }, [])

    const qrId = JSON.stringify(scannerResult).replace(/\\/g, "").replace(/""/g, "")


    useEffect(() => {
        // Función para obtener los datos del usuario por su ID
        const fetchUserData = async () => {
            try {
                await axios.get(`https://52.87.247.113/estudiante/${qrId}`)
                    .then(response => {
                        const receivedObject = response.data;
                        setUser(receivedObject);
                        // Agregar el objeto recibido a la lista
                        setObjectList([...objectList, receivedObject]);
                    })
               

                // Agregar el objeto recibido a la lista
              
                // if (response.data.length > 0) {
                //     setUser(response.data[0]); // Obtener el primer usuario de la respuesta
                // }

            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error en el componente.
            }
        };

        fetchUserData();
    }, [qrId]);
   
    const length = scannerResult && scannerResult.length || 0
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Scanear aqui:</h1>
            <p className="mt-3">Mostrar</p>

            <div id="reader"> </div>
            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {
                    
                     length > 0 && (
                                            <div>
                        <h2>Detalles del Estudiante</h2>
                        {users ? (
                        <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Estudiantes
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Info
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Status
                            </th>

                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {objectList.map((person) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={`http://localhost:2000/${person.imagenPerfil}`} alt="" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">{person.nombre} {person.apellido}</div>
                                    <div className="text-gray-500">{person.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="text-gray-900">{person.colegio}</div>
                                <div className="text-gray-500">{person.destino}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${person.estatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {person.estatus ? 'Activo' : 'Inactivo'}
                                </span>
                              </td>

                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <Link to={`/estudiante/${person._id}`} className="text-indigo-600 hover:text-indigo-900">
                                  Perfil
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                        ) : (
                            <p>Cargando datos del usuario...</p>
                        )}
                    </div>
                     )

                }



            </div>
        </>
    )
}

export default NuevoCliente


