/*
Funcionalidad: Proveedor de contexto de autenticación que maneja el estado de autenticación del usuario y proporciona funciones para autenticar al usuario y cerrar sesión.
Entradas: children (Componentes hijos que serán envueltos por el proveedor de contexto).
Salidas: Proporciona un contexto de autenticación (AuthContext) y un proveedor de autenticación (AuthProvider) para su uso en otros componentes de la aplicación.
Comportamientos:
- Importa los hooks y componentes necesarios de React y React Router DOM, así como el cliente Axios configurado para hacer solicitudes a la API.
- Crea el contexto de autenticación (AuthContext) utilizando createContext().
- Define el componente proveedor de autenticación (AuthProvider) que maneja el estado de autenticación del usuario y proporciona funciones para autenticar al usuario y cerrar sesión.
- Utiliza el hook useEffect para autenticar al usuario cuando el componente se monta. Si hay un token almacenado en localStorage, hace una solicitud a la API para obtener el perfil del usuario autenticado y actualiza el estado de autenticación. Si no hay token, establece el estado de carga como falso y termina la función.
- Proporciona el contexto y sus valores (auth, setAuth, cargando, cerrarSesionAuth) a los componentes hijos utilizando el componente Provider de AuthContext.Provider.
- Exporta el proveedor de autenticación (AuthProvider) y el contexto de autenticación (AuthContext) para su uso en otros archivos.
*/

// Importa los hooks y componentes necesarios de React y React Router DOM, así como el cliente Axios configurado
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Define el componente proveedor de autenticación (AuthProvider)
const AuthProvider = ({ children }) => {
  // Estados para almacenar los datos de autenticación y el estado de carga
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  // Hook de navegación para redirigir a diferentes rutas
  const navigate = useNavigate();

  // Efecto que se ejecuta cuando el componente se monta
  useEffect(() => {
    const autenticarUsuario = async () => {
      // Obtiene el token de localStorage
      const token = localStorage.getItem("token");

      // Si no hay token, establece cargando como falso y termina la función
      if (!token) {
        setCargando(false);
        return;
      }

      // Configuración de encabezados con el token para las solicitudes a la API
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Hace una solicitud para obtener el perfil del usuario autenticado
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data); // Establece los datos de autenticación en el estado
        // navigate('/proyectos') // Puedes redirigir a una ruta específica después de la autenticación si es necesario
      } catch (error) {
        setAuth({}); // Si hay un error, establece los datos de autenticación como un objeto vacío
      }

      setCargando(false); // Establece cargando como falso después de la autenticación o error
    };

    autenticarUsuario(); // Llama a la función de autenticación al montar el componente
  }, []); // El efecto se ejecuta solo una vez después de que el componente se monta

  // Función para cerrar sesión y establecer los datos de autenticación como un objeto vacío
  const cerrarSesionAuth = () => {
    setAuth({});
  };

  // Proporciona el contexto y sus valores a los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exporta el proveedor de autenticación (AuthProvider) y el contexto de autenticación (AuthContext) para su uso en otros archivos
export { AuthProvider };
export default AuthContext;
