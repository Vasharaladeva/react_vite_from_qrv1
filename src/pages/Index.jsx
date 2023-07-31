import { useLoaderData } from 'react-router-dom'
import { obtenerClientes } from '../data/clientes'
import Cliente from '../components/Cliente';

export function loader() { 
    const clientes = obtenerClientes()
    return clientes
}

function Index() {
  const clientes = useLoaderData();
  return (
      <>
        <h1 className="font-black text-4xl text-blue-900">Lista de estudiantes</h1>
        <p className="mt-3">Administra tus Estudiantes</p>

        {clientes.length ? (
          <table className='w-full bg-white shadow mt-5 table-auto'>
              <thead className='bg-blue-800 text-white'>
                  <tr>
                      <th className='p-2'>Estudiantes</th>
                      <th className='p-2'>Info</th>
                      <th className='p-2'>Status</th>
                   
                     
                  </tr>
              </thead>

                  <tbody>
                      {clientes.map( cliente => (
                          <Cliente
                              cliente={cliente}
                              key={cliente.id}
                          />
                      ))}
                  </tbody>
          </table>
        ) : (
          <p className="text-center mt-10">No Hay estudiantes aún</p>
        )}
      </>
  )
}

export default Index