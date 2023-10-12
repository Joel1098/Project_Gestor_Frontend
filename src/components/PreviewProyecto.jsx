/*
    Funcionalidad: muestra una vista previa de un proyecto en la interfaz de usuario. 
    Dependiendo de la autenticación del usuario y el rol (creador o colaborador), muestra 
    información adicional, como el cliente y un enlace para ver el proyecto completo.

    - Entradas: El componente utiliza el hook personalizado useAuth para obtener información
    relacionada con la autenticación del usuario (auth). Esta información es una entrada fundamental 
    para determinar si el usuario actual es el creador del proyecto o un colaborador, lo que afecta
    la representación visual del proyecto.
    
*/
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewProyecto = ({proyecto}) => {

    const { auth } = useAuth()

    const { nombre, _id, cliente, creador} = proyecto



    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>

            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {nombre}

                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {cliente}
                    </span>
                </p>
                
                {auth._id !== creador && (
                    <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
                )}
            </div>

            <Link
                to={`${_id}`}
                className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
            >Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto
