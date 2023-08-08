import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export async function action() {
  // ... código de la función de acción si es necesario
}

function NuevoCliente() {
  const [scannerResult, setScannerResult] = useState(null);
  const [scannedUsers, setScannedUsers] = useState([]);
  const [statusChanged, setStatusChanged] = useState(false);
  const [activatedUsers, setActivatedUsers] = useState([]); // Estado para almacenar los usuarios activados

  function success(result) {
    if (!scannedUsers.includes(result)) {
      setScannedUsers((prevUsers) => [...prevUsers, result]);
      setScannerResult(result);
      toast.success("¡Usuario escaneado correctamente!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setScannerResult(null);

    }
  }

  function error(err) {
    console.warn(err);

  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    // Limpia el escáner cuando el componente se desmonta
    return () => {
      scanner.clear();
    };
  }, [scannedUsers]);

  const changeStatusOfScannedUsers = (newStatus) => {
    axios.put('http://localhost:2000/estudiante/cambiar-stats', {
      usuarios: scannedUsers,
      nuevoEstado: newStatus,
    })
    .then((response) => {
      setStatusChanged(newStatus); // Cambiar el estado local para mostrar el nuevo estado en el botón

      axios.get(`http://localhost:2000/estudianteact`)
        .then((response) => {
          // Obtener los usuarios activados desde la respuesta de la API
          setActivatedUsers(response.data.usuariosActivados);
        })
        .catch((error) => {
          console.log('Error al obtener usuarios activados:', error);
        });
    })
    .catch((error) => {
      console.log('Error al cambiar el estatus de los usuarios:', error);
    });
  };

  const handleChangeStatus = () => {
    // Cambiar el estado solo de los usuarios escaneados
    changeStatusOfScannedUsers(!statusChanged); // Cambiar el estado al valor opuesto
  };


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Scanear aquí:</h1>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                <div id="reader"></div>

                {scannedUsers.length > 0 && (
                    <>
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-xl font-semibold text-gray-900">
                                                Usuarios escaneados:
                                            </h1>
                                            <div className="flex space-x-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => setScannedUsers([])}
                                                >
                                                    Limpiar lista de usuarios escaneados
                                                </button>
                                                <div className="mt-4 sm:mt-0 sm:flex-none">
                                                    <button
                                                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                        onClick={handleChangeStatus}
                                                    >
                                                        Activar Todo
                                                    </button>
                                                    {statusChanged}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-8 flex flex-col">
                                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                            >
                                                                Estudiantes
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                            >
                                                                Info
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                            >
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {scannedUsers.map((user, index) => (
                                                            <tr key={index}>
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                    <div className="flex items-center">
                                                                        <div className="ml-4">
                                                                            <div className="font-medium text-gray-900">
                                                                                {user}
                                                                            </div>
                                                                            {/* Agrega más información del usuario si lo necesitas */}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {/* Información del usuario */}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {/* Estado del usuario */}
                                                                </td>
                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                    <Link
                                                                        to={`/estudiante/${JSON.stringify(user).replace(/\\/g, "").replace(/""/g, "")}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Perfil
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default NuevoCliente;
