/*
Funcionalidad: Componente que muestra una tarea y permite realizar acciones como editar, completar o eliminar la tarea.
Entradas:
- tarea: Objeto que contiene información de la tarea a mostrar.
Salidas: Renderiza la interfaz de una tarea con sus detalles, como nombre, descripción, prioridad y fecha de entrega. También muestra opciones de editar, completar o eliminar la tarea.
Comportamientos:
- Formatea la fecha de entrega de la tarea utilizando la función formatearFecha.
- Muestra un mensaje de "Completada por" si la tarea está completada.
- Habilita botones de editar, completar o eliminar según el rol de administrador.
*/
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({ tarea }) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col  items-start">
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                { estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
                {admin && (
                    <button
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditarTarea(tarea)}
                    >Editar</button>

                )}

                <button
                    className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}
                >{estado ? 'Completa' : 'Incompleta'}</button>
                
                {admin && ( 
                    <button
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEliminarTarea(tarea)}
                    >Eliminar</button>
                )}
            </div>
        </div>
    )
}

export default Tarea
