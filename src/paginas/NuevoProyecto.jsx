/*
Nombre: NuevoProyecto.js
Funcionalidad: Componente para crear un nuevo proyecto.
Permite al usuario ingresar detalles de un nuevo proyecto, como nombre, descripción, etc.

Comportamiento:
  - Renderiza un formulario (`FormularioProyecto.js`) para permitir al usuario ingresar detalles del proyecto.
*/
import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
    return (
      <>
          <h1 className="text-4xl font-black">Crear Proyecto</h1>
  
          <div className="mt-10 flex justify-center">
              <FormularioProyecto />
          </div>
      </>
    )
  }
  
  export default NuevoProyecto