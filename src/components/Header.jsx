/*
    Funcionalidad:  representa la cabecera de la aplicación y proporciona opciones de navegación, búsqueda y cierre de sesión.

    Comportamiento:
        - Importa el componente Link desde la biblioteca react-router-dom, que se utiliza para crear enlaces y manejar la
        navegación en la aplicación.
        - Un enlace "Proyectos" que dirige al usuario a la página de proyectos cuando se hace clic.
*/
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos'
import Busqueda from './Busqueda'

const Header = () => {

    const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }


  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                PM
            </h2>

            <div className='flex flex-col md:flex-row items-center gap-4'>
                <button
                    type="button"
                    className='font-bold uppercase'
                    onClick={handleBuscador}
                >Buscar Proyecto</button>
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >Proyectos</Link>

                <button
                    type="button"
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                    onClick={handleCerrarSesion}
                >Cerrar Sesión</button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header
