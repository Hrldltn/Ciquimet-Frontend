import {useState} from 'react'
import logo from '../../static/logo.png';

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const usuario = localStorage.getItem('Nombre');
  return (
    <>
      <div className="flex text-gray-900 p-5 pt-10 backdrop-blur-md bg-white/20 ">
        <aside className={`transition-all ${open ? "w-80" : "w-36"} flex h-screen w-20 flex-col items-center border-r border-gray-100`}>
          <div className="flex flex-col items-center  justify-center w-full h-32 border-b border-gray-100">
            <div className={`${open ? "gap-10" : "gap-2"} flex h-20  w-full items-center justify-center border-b pb-3 border-gray-100`}>
              <img src={logo} alt="Logo" className={`${open ? "w-36 h-28" : "w-28 h-20 pl-4"} pb-5`} />

              <div className={`sidebar-toggle ${open ? "visible" : "hidden"}`} onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden="true"
                  className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6"></path>
                </svg>
              </div>
              <div className={`sidebar ${open ? "hidden" : "visible"}`} onClick={() => setOpen(!open)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden="true"
                  className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer mr-6" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"></path>
                </svg>
              </div>
            </div>
            <div className={`sidebar ${open ? "visible" : "hidden"} flex flex-row gap-5 py-4 justify-center items-center`}>
              
              <p className='font-semibold'>Bienvenido <span className="font-bold">{usuario}</span></p>

              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-y-5 pt-5  w-full">
              {/* USUARIOS */}
            
              <div className="group/main inline-block relative pr-2">
                  <a href="../../admin/usuarios" className={`${open ? "w-full" : "w-32"}  backdrop-blur-xl bg-white/10 hover:bg-white flex flex-row flex-wrap gap-2 py-4 justify-center items-center group relative rounded-t-lg text-black-700 font-bold  "`}>
                      
                      <svg className={`${open ? "w-5 h-5" : "h-4 w-4"} flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                      </svg>
                    <p className={`${open ? "visible" : "hidden"}`}>Gestion usuarios</p>
                  
                    <div className={`${open ? "invisible" : "hidden"} absolute inset-y-0 left-28 items-center group-hover:flex`}>
                      <div className="relative whitespace-nowrap rounded-md bg-white z-50 hover:bg-gray-200 px-4 py-2 text-sm font-normal text-gray-900 drop-shadow-lg">
                        <div className="absolute inset-0 -left-1 flex items-center">
                          <div className="h-2 w-2 rotate-45 backdrop-blur-xl bg-white/40 hover:bg-gray-200"></div>
                        </div>
                        Usuarios <span className="text-gray-400"></span>
                      </div>
                    </div>
                  </a>
                
              </div>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Sidebar
