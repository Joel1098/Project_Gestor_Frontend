/*
Funcionalidad: Hook personalizado para acceder al contexto de autenticación (AuthContext).
Entradas: Ninguna.
Salidas: El contexto de autenticación que contiene el estado de autenticación y funciones relacionadas.
Comportamientos:
- Importa el hook useContext de React y el contexto AuthContext desde los archivos correspondientes.
- Utiliza useContext para acceder al contexto AuthContext y devuelve el estado de autenticación y funciones relacionadas.
- Exporta el hook personalizado useAuth para su uso en otros archivos.
*/

// Importa el hook useContext de React y el contexto AuthContext desde los archivos correspondientes
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Define el hook personalizado useAuth
const useAuth = () => {
  // Utiliza useContext para acceder al contexto AuthContext
  return useContext(AuthContext);
};

// Exporta el hook personalizado useAuth para su uso en otros archivos
export default useAuth;
