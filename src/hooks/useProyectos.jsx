/*
Funcionalidad: Hook personalizado para acceder al contexto de proyectos (ProyectosContext).
Entradas: Ninguna.
Salidas: El contexto de proyectos que contiene el estado de los proyectos, tareas, alertas, etc., y funciones relacionadas.
Comportamientos:
- Importa la función useContext de React y el contexto ProyectosContext desde los archivos correspondientes.
- Utiliza useContext para acceder al contexto ProyectosContext y devuelve el estado de los proyectos, tareas, alertas, etc., y funciones relacionadas.
- Exporta el hook personalizado useProyectos para su uso en otros archivos.
*/

// Importa la función useContext de React y el contexto ProyectosContext desde los archivos correspondientes
import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";

// Define el hook personalizado useProyectos
const useProyectos = () => {
  // Utiliza useContext para acceder al contexto ProyectosContext
  return useContext(ProyectosContext);
};

// Exporta el hook personalizado useProyectos para su uso en otros archivos
export default useProyectos;
