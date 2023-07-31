import React, { useState, useEffect } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        // Función para obtener los datos del usuario por su ID
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://form-node-back.onrender.com/estudiante/${id}`);
                setUser(response.data);
                setIsOn(response.data.estatus); // Inicializar el estado del toggle con el estatus del usuario
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error en el componente.
            }
        };

        fetchUserData();
    }, [id]);

    const handleToggleStatus = () => {
        const updatedStatus = !user.estatus;
      
        axios
          .put(`https://form-node-back.onrender.com/estudiante/${id}/cambiar-estatus`, { estatus: updatedStatus })
          .then((response) => {
            setIsOn(updatedStatus); // Actualizar el estado del toggle inmediatamente
            setUser({ ...user, estatus: updatedStatus }); // Actualizar el estado del usuario con el valor del backend
          })
          .catch((error) => {
            console.log('Error al cambiar el estatus del estudiante:', error);
          });
      };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Informacion del Estudiante</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Informacion personal del Estudiante {user._id}</p>

                <div className="flex items-center justify-between">
                    <img className="w-20 h-20 rounded-full" src={`https://form-node-back.onrender.com/${user.imagenPerfil}`} alt="Imagen de perfil" />

                    <div className="flex items-center" onClick={handleToggleStatus}>
                        {/* Toggle Track */}
                        <div
                            className={`w-12 h-6 rounded-full ${isOn ? 'bg-green-400' : 'bg-gray-300'
                                } transition-all`}
                        >
                            {/* Toggle Thumb */}
                            <div
                                className={`w-6 h-6 rounded-full shadow-md transform ${isOn ? 'translate-x-6 bg-white' : 'translate-x-0 bg-green-400'
                                    } transition-all duration-300`}
                            />
                        </div>
                        {/* Toggle Label */}
                        <span className="ml-2 text-gray-700">{isOn ? 'On' : 'Off'}</span>
                        {/* Hidden Checkbox */}
                        <input
                            type="checkbox"
                            checked={user.estatus}// No es necesario ya que el cambio de estado lo maneja handleToggle
                            onChange={() => { }}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nombre </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.nombre}{" "} {user.apellido}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Numero de carnet </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.carnet}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.email}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Telefono</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.telefono}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">colegio</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.colegio}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">promocion</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.promocion}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">destino</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user.destino}</dd>
                    </div>

                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Documentos Adjuntos</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">

                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">Documento de Identidad</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <img
                                            className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2 m-2"
                                            src={`https://form-node-back.onrender.com/${user.imagenDocumento}`} alt="img" />
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">Voleto</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <img
                                            className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2 m-2"
                                            src={`https://form-node-back.onrender.com/${user.imagenVoleto}`} alt="img" />
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">Documento del permiso</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <img
                                            className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2 m-2"
                                            src={`https://form-node-back.onrender.com/${user.imagenPermiso}`} alt="img" />
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        // <div>
        //   <h2>User Profile</h2>
        //   <p>ID del usuario: {id}</p>
        //   {/* Aquí puedes mostrar los datos del usuario */}
        //   <p>ID del usuario: {user.id}</p>
        //   <p>Nombre: {user.nombre}</p>
        //   <p>Email: {user.email}</p>
        //   <img src={`https://form-node-back.onrender.com/${user.imagenDocumento}`} alt="img" />
        //   <img src={`https://form-node-back.onrender.com/${user.imagenVoleto}`} alt="img" />
        //   <img src={`https://form-node-back.onrender.com/${user.imagenPermiso}`} alt="img" />
        //   <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">status:  </span> <input type="checkbox" /></p>
        // </div>

    );
};

export default UserProfile;
