import React from 'react'
import { Navigate, redirect } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import { Fade } from "react-awesome-reveal";
import { Modal } from '@mui/material';
import {useAuth} from '../../../../api/userContext'
import {useEffect , useState} from 'react'

const ModalUser = ({isOpen,setIsOpen,reloadUsers}) => {

   
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [rut, setRut] = useState('');
    const [cargo, setCargo] = useState('');

    const {register} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await register({ username, password1, password2, first_name, last_name, rut, cargo });
          if (response.tipo === 'success') {
            setUsername('');
            setPassword1('');
            setPassword2('');
            setFirstName('');
            setLastName('');
            setRut('');
            setCargo('');
            
            // setTimeout(() => {
            //     window.location.href = window.location.href;
            // }, 1000);
            setIsOpen(false);
            toast.success("Usuario registrado correctamente");
            redirect('/admin/usuarios');
            reloadUsers()
          } else if (response.tipo === 'error') {
            const message = response.message + " " + response.errors;
            toast.error(message);
          } else {
            toast(response.message);
          }
        } catch (error) {
          const errorMessage = `Error al registrar usuario: ${error.message || error}`;
          toast.error(errorMessage);
        }
    };


  return (
    <>
        <Modal open={isOpen} onClose={setIsOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <div className="relative ml-5" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                
                <div className="fixed inset-0 px-40  bg-gray-500 bg-opacity-75 transition-opacity rounded-xl ">
                    <div className="mx-12  p-5 rounded backdrop-blur-md bg-white/100 mt-40 ">
                        <div className="flex flex-row mb-10 justify-between align-middle rounded">
                            <div className="flex flex-row justify-center items-center">
                                <h1 className="font-semibold pt-6 pb-8 px-10 align-middle text-xl ">Registro de usuarios</h1>
                                <div className="border-cyan-200 p-1 shadow-md rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="cursor-pointer ">
                                <button onClick={() => setIsOpen(false)}>
                                    <svg className="w-8 h-8 text-indigo-600 hover:text-indigo-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-8  rounded">
                            <div className="relative z-0 w-full mb-5 group">
                                <input  value={username} onChange={e => setUsername(e.target.value)} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute  text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input  value={password1} onChange={e => setPassword1(e.target.value)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contraseña</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input value={password2} onChange={e => setPassword2(e.target.value)} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirmar contraseña</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input value={first_name} onChange={e => setFirstName(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Primer nombre</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input value={last_name} onChange={e => setLastName(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido </label>
                            </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input value={rut} onChange={e => setRut(e.target.value)} type="text" name="rut" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor="rut" className="peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-800 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rut</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="Cargo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-7 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Selecciona el cargo</label>
                                <select  value={cargo} onChange={e => { setCargo(e.target.value); }}  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 rounded dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                <option value="">Selecciona un cargo</option>
                                <option value="is_administrador">Administrador</option>
                                <option value="is_supervisor">Supervisor</option>
                                <option value="is_quimico">Químico</option>
                                <option value="is_cliente">Cliente</option>
                                </select>
                            </div>
                                
                            </div>
                            <button type="submit" className="text-white bg-indigo-600 mx-10 mt-4 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg sm:w-auto px-10  h-9 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        
        </Modal>
    </>
  )
}

export default ModalUser
