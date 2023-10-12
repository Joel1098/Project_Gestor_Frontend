/*
Funcionalidad: Hook personalizado para determinar si el usuario autenticado es el creador del proyecto.
Entradas: Ninguna.
Salidas: Un valor booleano: true si el creador del proyecto es el mismo que el usuario autenticado, false en caso contrario.
Comportamientos:
- Importa los hooks personalizados useProyectos y useAuth desde los archivos correspondientes.
- Obtiene el objeto proyecto del hook useProyectos y el objeto auth del hook useAuth.
- Retorna true si el ID del creador del proyecto es el mismo que el ID del usuario autenticado, de lo contrario, retorna false.
- Exporta el hook personalizado useAdmin para su uso en otros archivos.
*/

// Importa los hooks personalizados useProyectos y useAuth desde los archivos correspondientes
import useProyectos from "./useProyectos";
import useAuth from "./useAuth";

// Define el hook personalizado useAdmin
const useAdmin = () => {
  // Obtiene el objeto proyecto del hook useProyectos
  const { proyecto } = useProyectos();
  // Obtiene el objeto auth del hook useAuth
  const { auth } = useAuth();

  // Retorna true si el creador del proyecto es el mismo que el usuario autenticado, de lo contrario, retorna false
  return proyecto.creador === auth._id;
};

// Exporta el hook personalizado useAdmin para su uso en otros archivos
export default useAdmin;
