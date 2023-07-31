import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { redirect,Outlet } from 'react-router-dom';

const AddParejaForm = () => {
  const [value, setValue] = useState({
    nombre: '',
    apellido: '',
    email: '',
    carnet: '',
    telefono: '',
    colegio: '',
    promocion: '',
    destino: '',
  });

  const [imageUrls, setImageUrls] = useState({
    imagenDocumento: '',
    imagenVoleto: '',
    imagenPermiso: '',
    imagenPerfil:''
  });

  const [imageFiles, setImageFiles] = useState({
    imagenDocumento: null,
    imagenVoleto: null,
    imagenPermiso: null,
    imagenPerfil:null
  });

  useEffect(() => {
    // Limpiar las URLs temporales cuando el componente se desmonte
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImageSelect = (file, name) => {
    const imageUrl = URL.createObjectURL(file);
    setImageUrls((prevImageUrls) => ({ ...prevImageUrls, [name]: imageUrl }));
    setImageFiles((prevImageFiles) => ({ ...prevImageFiles, [name]: file }));
  };

  const handleImageDrop = (e, name) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageSelect(file, name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(imageFiles).forEach((key) => {
        formData.append(key, imageFiles[key]);
      });
      formData.append('nombre', value.nombre)
      formData.append('apellido', value.apellido)
      formData.append('carnet', value.carnet)
      formData.append('telefono', value.telefono)
      formData.append('colegio', value.colegio)
      formData.append('promocion', value.promocion)
      formData.append('destino', value.destino)
      formData.append('email', value.email)
    

      const respuesta = await axios.post('https://form-node-back.onrender.com/estudiante', formData);
      console.log(respuesta);
      toast.success('El estudiante se agregó correctamente');

      // Limpiar los campos del formulario y las URLs de las imágenes después de agregar exitosamente
      setValue({
        nombre: '',
        apellido: '',
        email: '',
        carnet: '',
        telefono: '',
        colegio: '',
        promocion: '',
        destino: '',
      });
      setImageUrls({
        imagenDocumento: null,
        imagenVoleto: null,
        imagenPermiso: null,
        imagenPerfil:null
      });
      setImageFiles({
        imagenDocumento: null,
        imagenVoleto: null,
        imagenPermiso: null,
        imagenPerfil:null
      });
      redirect('/');
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al agregar el estudiante');
    }
  };

  return (
    <>
      <ToastContainer />

      <form onSubmit={submitForm}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Llenar todos los campos</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Llenar todos los campos y proporcionar sus datos personales.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
                </label>
                <div className="mt-2">
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={value.nombre}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                Apellido
                </label>
                <div className="mt-2">
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={value.apellido}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={value.email}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>              

              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Carnet
                </label>
                <div className="mt-2">
                  <input
                    id="carnet"
                    name="carnet"
                    type="text"
                    value={value.carnet}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Telefono
                </label>
                <div className="mt-2">
                  <input
                    id="telefono"
                    name="telefono"
                    type="text"
                    value={value.telefono}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Colegio
                </label>
                <div className="mt-2">
                  <input
                    id="colegio"
                    name="colegio"
                    type="text"
                    value={value.colegio}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Promocion
                </label>
                <div className="mt-2">
                  <input
                    id="promocion"
                    name="promocion"
                    type="text"
                    value={value.promocion}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Destino
                </label>
                <div className="mt-2">
                  <input
                    id="destino"
                    name="destino"
                    type="text"
                    value={value.destino}
                    onChange={(e) => changeHandler(e)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Imagen documento de identidad
                </label>
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  onDrop={(e) => handleImageDrop(e, 'imagenDocumento')}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                >
                  <div className="text-center">
                    {imageUrls.imagenDocumento ? (
                      <img
                        src={imageUrls.imagenDocumento}
                        alt="Imagen cargada"
                        className="h-32 w-32 mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="imagenDocumento"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir una foto</span>
                        <input id="imagenDocumento" name="imagenDocumento" type="file" className="sr-only" onChange={(e) => handleImageSelect(e.target.files[0], 'imagenDocumento')} {...(!imageFiles.imagenDocumento && { required: 'required' })} />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Voleto de viaje
                </label>
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  onDrop={(e) => handleImageDrop(e, 'imagenVoleto')}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                >
                  <div className="text-center">
                    {imageUrls.imagenVoleto ? (
                      <img
                        src={imageUrls.imagenVoleto}
                        alt="Imagen cargada"
                        className="h-32 w-32 mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="imagenVoleto"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir una foto</span>
                        <input id="imagenVoleto" name="imagenVoleto" type="file" className="sr-only" onChange={(e) => handleImageSelect(e.target.files[0], 'imagenVoleto')} {...(!imageFiles.imagenVoleto && { required: 'required' })}/>
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Permiso de vije si aplica
                </label>
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  onDrop={(e) => handleImageDrop(e, 'imagenPermiso')}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                >
                  <div className="text-center">
                    {imageUrls.imagenPermiso ? (
                      <img
                        src={imageUrls.imagenPermiso}
                        alt="Imagen cargada"
                        className="h-32 w-32 mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="imagenPermiso"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir una foto</span>
                        <input id="imagenPermiso" name="imagenPermiso" type="file" className="sr-only" onChange={(e) => handleImageSelect(e.target.files[0], 'imagenPermiso')} {...(!imageFiles.imagenPermiso && { required: 'required' })}/>
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
                  </div>
                </div>
              </div>


              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Foto de perfil fondo blanco de frente
                </label>
                <div
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                  onDrop={(e) => handleImageDrop(e, 'imagenPerfil')}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragEnter={(e) => handleDragEnter(e)}
                >
                  <div className="text-center">
                    {imageUrls.imagenPerfil ? (
                      <img
                        src={imageUrls.imagenPerfil}
                        alt="Imagen cargada"
                        className="h-32 w-32 mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="imagenPerfil"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Subir una foto</span>
                        <input id="imagenPerfil" name="imagenPerfil" type="file" className="sr-only" onChange={(e) => handleImageSelect(e.target.files[0], 'imagenPerfil')} {...(!imageFiles.imagenPerfil && { required: 'required' })}/>
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
                  </div>
                </div>
              </div>

  

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <p>Espera hasta que nuestro servidor analice sus datos no forzar </p>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enviar
          </button>
          <Outlet />
        </div>
      </form>
    </>

  )
};

export default AddParejaForm;
