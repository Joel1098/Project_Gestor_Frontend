/*
Funcionalidad: Cliente Axios para realizar solicitudes HTTP a un servidor API.
Entradas: Ninguna.
Salidas: Un objeto Axios configurado con una URL base para realizar solicitudes HTTP a la API del servidor.
Comportamientos:
- Importa la biblioteca Axios para realizar solicitudes HTTP.
- Crea una instancia de Axios con una URL base configurada desde las variables de entorno.
- Exporta la instancia de Axios (clienteAxios) para que pueda ser utilizado en otros archivos de la aplicación.
*/

// Importa la biblioteca Axios para realizar solicitudes HTTP
import axios from "axios";

// Crea una instancia de Axios con una URL base configurada desde las variables de entorno
const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Exporta el clienteAxios para que pueda ser utilizado en otros archivos de la aplicación
export default clienteAxios;
