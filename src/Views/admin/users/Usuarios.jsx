import {useEffect , useState} from 'react'
import {useAuth} from '../../../../api/userContext'
import Spinner from '../../../Components/Spinner'
import MUIDataTable from "mui-datatables";
import ModalUser from './ModalUser';
import '../../../../static/Toast.css';

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const [newUser, setNewUsers] = useState(0)
    const [cantidadUser, setCantidadUser] = useState(0)
    const [porcentajeUser, setPorcentajeUser] = useState(0)
    const [porcentajeTotal, setPorcentajeTotal] = useState(0)
    const [isOpen , setIsOpen] = useState(false)
 
    const {usersList} = useAuth()

    useEffect(() => {
        get_users_data()

    }, [])

    
    const get_users_data = async () => {
        const response = await usersList();
        const data = response.users;
        const now = new Date();
  

        if (Array.isArray(data)) {
            setUsers(data);
            const newUsers = data.filter(user => user.is_new_user && user.is_new_user.toLowerCase() === 'true').length;
            const activeUsers = data.filter(user => {
                const lastLoginDate = new Date(user.last_login);
                const timeDiff = now - lastLoginDate;
                return timeDiff <= 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
            }).length;
            const totalUsers = data.length;
            const porcentaje = (newUsers / totalUsers) * 100;
            const porcentajeUser = (activeUsers/totalUsers) * 100;

            setCantidadUser(totalUsers);
            setNewUsers(newUsers);
            setPorcentajeUser(porcentaje);
            setPorcentajeTotal(porcentajeUser);
            console.log(porcentajeUser)
        } else {
            console.error('Error en los datos:', data);
        }
    };
    
    
    const columns = [
        { name:"id",label:"ID"},
        { name:"username",label:"Correo electronico"},
        { name:"first_name",label:"Nombre"},
        { name:"last_name",label:"Apellido"},

    ]
    
    const reloadUsers = () => {
        get_users_data();
    };
    return (
        <>
            <div className="border flex flex-col min-h-screen w-full backdrop-blur-md  rounded-xl p-8 bg-white/30">
                <div className="flex flex-row mb-10 justify-between backdrop-blur-md  bg-white/40  align-top   rounded">
                    <div className="flex flex-row justify-center items-center p-2">
                        
                        <h1 className="h1 font-semibold pt-6 pb-8 px-5 align-middle text-xl">Gestion de usuarios</h1>
                        
                        <div className="border-cyan-200 p-1 shadow-md rounded ">
                            <svg className="w-6 h-6 text-gray-800 pb-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    
                    </div>
                    <div className="p-4 flex flex-row">
                        <button onClick={() => setIsOpen(true)} className="flex flex-row gap-4 justify-center items-center py-2 text-white bg-indigo-600 mx-10 mt-4 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300  rounded my-5 px-4 whitespace-no-wrap" href="../../admin/usuarios">
                            <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clipRule="evenodd"/>
                            </svg>

                            <p className="font-bold text-white text-sm">Agregar usuario</p>
                        </button>
                        
                    </div>
                </div>
                <div className="flex items-center justify-center  text-gray-800 p-10 backdrop-blur-sm bg-white/30  mb-10">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-6xl">
                        <div className="flex items-center p-4  bg-white rounded">
                            {porcentajeUser > 0 ? (
                                <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded bg-green-200">
                                    <svg className="w-6 h-6 fill-current text-green-700 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded bg-red-200">
                                    <svg className="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-grow flex flex-col ml-4">
                                <div>
                                    <span className="text-md font-bold">Total nuevos usuarios:</span>
                                    <span className="text-xl pl-2 font-bold">{newUser}</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="text-gray-500 font-semibold">Porcentaje de nuevos usuarios:</span>
                                    <span className={porcentajeUser > 0 ? "text-green-500" : "text-red-500"}>{porcentajeUser.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-4  bg-white rounded">
                            {porcentajeTotal > 50 ? (
                                <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded bg-green-200">
                                    <svg className="w-6 h-6 fill-current text-green-700 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="flex flex-shrink-0 items-center justify-center h-16 w-16 rounded bg-red-200">
                                    <svg className="w-6 h-6 fill-current text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            <div className="flex-grow flex flex-col ml-4">
                                <div>
                                    <span className="text-md font-bold">Total:</span>
                                    <span className="text-xl pl-2 font-bold">{cantidadUser}</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="text-gray-500 font-semibold">porcentaje total de actividad usuaria:</span>
                                    <span className={porcentajeTotal > 50 ? "text-green-500" : "text-red-500"}>{porcentajeTotal.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    {users.length > 0 ? ( 
                        <MUIDataTable
                            title={"Lista de usuarios"}
                            data={users}
                            columns={columns}
                        />
                    ) : (
                        <Spinner />
                    )}
                </div>
                
            </div>
            <ModalUser isOpen={isOpen} setIsOpen={setIsOpen} reloadUsers={reloadUsers}/>
        </>   
    );
    
}

export default Usuarios
