/*
Funcionalidad: Componente de diseño para las rutas protegidas que requieren autenticación. Envuelve el contenido de las rutas protegidas.
Entradas: Ninguna.
Salidas: Renderiza un diseño de página con un contenedor principal para las rutas protegidas.
Comportamientos:
- Importa el componente Outlet de react-router-dom para renderizar las rutas secundarias anidadas dentro del componente AuthLayout.
- Define el componente AuthLayout que envuelve el contenido de las rutas protegidas en un diseño específico.
- Utiliza clases de Tailwind CSS para estilos responsivos y centrado del contenido.
- Exporta el componente AuthLayout para su uso en otras partes de la aplicación.
*/

import { Outlet } from "react-router-dom";

// Definición del componente AuthLayout
const AuthLayout = () => {
  return (
    // Fragmento de React para envolver elementos adyacentes
    <>
      {/* Contenedor principal con clases de Tailwind CSS */}
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        {/* División con clases de Tailwind CSS para diseño responsivo */}
        <div className="md:w-2/3 lg:w-2/5">
          {/* Renderiza el componente Outlet proporcionado por react-router-dom */}
          <Outlet />
        </div>
      </main>
    </>
  );
};

// Exporta el componente AuthLayout para su uso en otros archivos
export default AuthLayout;
