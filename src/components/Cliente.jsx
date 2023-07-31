import { useNavigate, redirect,useParams,Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

import axios from 'axios';

export async function action({params}) {
    await eliminarCliente(params.clienteId)
    return redirect('/')
}

function Cliente({cliente}) {
    
    const navigate = useNavigate()
    const { nombre,apellido,carnet,colegio, email, telefono,} = cliente
    const { id } = useParams();
    const [user, setUser] = useState(null);

    return (
        <tr className="border-b">
            <td className='p-6 space-y-2'>
                
                
             

                <Link to={`/estudiante/${id}`} className="text-indigo-600 hover:text-indigo-800">
                    <p className="text-2xl text-gray-800">{nombre} {apellido}</p>
                 </Link>
            </td>

            <td className="p-6">
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email}  </p>
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono} </p>
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">carnet: </span>{carnet} </p>
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">colegio: </span>{colegio} </p>
            </td>

            <td className="p-6">
                <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">status:  </span> <input type="checkbox" /></p>
            </td>

   
        </tr>
    )
}

export default Cliente