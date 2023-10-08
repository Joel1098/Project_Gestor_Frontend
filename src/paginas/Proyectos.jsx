/*
Funcionalidad: Componente para mostrar una lista de proyectos.
Entradas: Ninguna.
Salidas: Renderiza una lista de proyectos y una alerta si la hay.
Comportamientos:
- Obtiene la lista de proyectos desde el contexto.
- Muestra una alerta si la hay.
- Si existen proyectos, los muestra en una lista de vistas previas de proyectos.
- Si no hay proyectos, muestra un mensaje indicando que no hay proyectos aún.
*/
import { useEffect } from 'react'
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos()
  const { msg } = alerta

  return (
    <>
        <h1 className="text-4xl font-black">Proyectos</h1>

        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg ">
            {proyectos.length ? 
              proyectos.map(proyecto => (
                  <PreviewProyecto 
                      key={proyecto._id}
                      proyecto={proyecto}
                  />
              ))
            : <p className=" text-center text-gray-600 uppercase  p-5">No hay proyectos aún</p>}
        </div>
    </>
  )
}

export default Proyectos
