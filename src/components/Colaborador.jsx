/*
Funcionalidad: Renderizar la información de un colaborador, incluyendo su nombre y dirección de correo electrónico, 
junto con un botón "Eliminar" que, al hacer clic en él, llama a la función handleModalEliminarColaborador que está destinada
a manejar la eliminación de ese colaborador.

Entradas: El componente Colaborador toma una prop llamada colaborador como entrada. Esta prop contiene información sobre
el colaborador, como su nombre y dirección de correo electrónico.

Salidas: El componente renderiza la información del colaborador y un botón "Eliminar". 
*/
import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {
    const { handleModalEliminarColaborador } = useProyectos()

    const {  nombre, email } = colaborador

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>

            <div>
                <button
                    type="button"
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEliminarColaborador(colaborador)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Colaborador
