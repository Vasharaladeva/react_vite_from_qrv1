import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesCount, setEstudiantesCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get(`https://form-node-back.onrender.com/estudiante`)
      .then((response) => {
        setEstudiantes(response.data.estudiantes);
        setEstudiantesCount(response.data.estudiantesCount);
      })
      .catch((error) => {
        console.log('Error al obtener usuarios inactivos:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredEstudiantes = estudiantes.filter((person) => {
    const fullName = `${person.nombre} ${person.apellido}`.toLowerCase();
    return fullName.includes(searchValue.toLowerCase());
  });

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                </div>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Buscar"
                      type="search"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>


            </div>

          </div>

          <div className="border-t border-gray-200 pt-4 pb-3">

            <div className="px-4 sm:px-6 lg:px-8">

              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Lista de Estudiantes</h1>
                    <p className="mt-2 text-sm text-gray-700">
                      Lista de estudiantes viajes TRAVELERO.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <h2 className="text-xl font-semibold">Estudiantes totales ({estudiantesCount})</h2>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                            {filteredEstudiantes.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img className="h-10 w-10 rounded-full" src={`https://form-node-back.onrender.com/${person.imagenPerfil}`} alt="" />
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </>
      )}
    </Disclosure>
  )
}

export default User;
