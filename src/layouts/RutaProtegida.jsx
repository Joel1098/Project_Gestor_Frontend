/*
Funcionalidad: Componente de ruta protegida que muestra contenido protegido si el usuario está autenticado, o redirige al usuario a la página principal si no está autenticado.
Entradas: Ninguna.
Salidas: Renderiza contenido protegido si el usuario está autenticado; redirige al usuario a la página principal si no está autenticado.
Comportamientos:
- Importa los componentes Outlet y Navigate de react-router-dom, así como el hook useAuth desde el archivo '../hooks/useAuth' y los componentes Header y Sidebar desde los archivos correspondientes.
- Utiliza el hook useAuth para obtener el estado de autenticación y carga.
- Si está cargando, muestra un mensaje de carga.
- Condicionalmente renderiza el contenido basado en el estado de autenticación:
  - Si el usuario está autenticado, muestra el contenido protegido con el componente Header, Sidebar y el componente Outlet para manejar rutas anidadas.
  - Si el usuario no está autenticado, redirige al usuario a la página principal.
- Exporta el componente RutaProtegida para su uso en otros archivos.
*/

// Importa los componentes Outlet y Navigate de react-router-dom
import { Outlet, Navigate } from "react-router-dom";
// Importa el hook useAuth desde el archivo '../hooks/useAuth'
import useAuth from "../hooks/useAuth";
// Importa los componentes Header y Sidebar desde los archivos correspondientes
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

// Define el componente funcional RutaProtegida
const RutaProtegida = () => {
  // Utiliza el hook useAuth para obtener el estado de autenticación y carga
  const { auth, cargando } = useAuth();

  // Si está cargando, muestra un mensaje de carga
  if (cargando) return "Cargando...";

  return (
    <>
      {/* Condicionalmente renderiza el contenido basado en el estado de autenticación */}
      {auth._id ? (
        // Si el usuario está autenticado, muestra el contenido protegido
        <div className="bg-gray-100">
          {/* Renderiza el componente Header */}
          <Header />

          {/* Contenedor principal con clases de Tailwind CSS */}
          <div className="md:flex md:min-h-screen">
            {/* Renderiza el componente Sidebar */}
            <Sidebar />

            {/* Área principal de contenido con clases de Tailwind CSS */}
            <main className="p-10 flex-1 ">
              {/* Renderiza el componente Outlet para manejar rutas anidadas */}
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        // Si el usuario no está autenticado, redirige al usuario a la página principal
        <Navigate to="/" />
      )}
    </>
  );
};

// Exporta el componente RutaProtegida para su uso en otros archivos
export default RutaProtegida;
