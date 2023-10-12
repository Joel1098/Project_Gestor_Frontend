/*
Funcionalidad: Proveedor de contexto para gestionar el estado de los proyectos, tareas, alertas, etc. Proporciona funciones para interactuar con la API del servidor y el servidor de sockets.
Entradas: children (Componentes hijos que serán envueltos por el proveedor de contexto).
Salidas: Proporciona un contexto de proyectos (ProyectosContext) y un proveedor de proyectos (ProyectosProvider) para su uso en otros componentes de la aplicación.
Comportamientos:
- Importa los hooks y componentes necesarios de React, clienteAxios para las solicitudes HTTP y el contexto AuthContext para la autenticación.
- Crea el contexto de proyectos (ProyectosContext) utilizando createContext().
- Define el componente proveedor de proyectos (ProyectosProvider) que maneja el estado de los proyectos, tareas, alertas, etc. Proporciona funciones para interactuar con la API del servidor y el servidor de sockets.
- Utiliza el hook useEffect para obtener los proyectos del servidor al cargar la página o al cambiar el estado de autenticación. Almacena los proyectos en el estado "proyectos".
- Establece la conexión con el servidor de sockets cuando se monta el componente.
- Proporciona funciones para mostrar alertas, gestionar proyectos, tareas, colaboradores, etc.
- Proporciona el contexto y sus valores a los componentes hijos utilizando el componente Provider de ProyectosContext.Provider.
- Exporta el proveedor de proyectos (ProyectosProvider) y el contexto de proyectos (ProyectosContext) para su uso en otros archivos.
*/

// Importa los hooks y componentes necesarios de React, clienteAxios para las solicitudes HTTP y el contexto AuthContext para la autenticación
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";

let socket;

// Crea el contexto de proyectos
const ProyectosContext = createContext();

// Define el componente proveedor de proyectos (ProyectosProvider)
const ProyectosProvider = ({ children }) => {
  // Estados para almacenar los datos del proyecto, alertas, estado de carga, etc.
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);
  const [buscador, setBuscador] = useState(false);
  // Hooks para la autenticación y navegación
  const navigate = useNavigate();
  const { auth } = useAuth();

  // Efecto para obtener los proyectos del servidor al cargar la página o al cambiar el estado de autenticación
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, [auth]); // El efecto se ejecuta cuando cambia el estado de autenticación

  // Efecto para establecer la conexión con el servidor de sockets cuando se monta el componente
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      // Sincronizar el state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);

      setAlerta({
        msg: "Proyecto Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);

      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto Creado Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
      setAlerta({});
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      // Sincronizar el state
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);

      setAlerta({});
      setModalFormularioTarea(false);

      // SOCKET IO
      socket.emit("nueva tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      setAlerta({});
      setModalFormularioTarea(false);

      // SOCKET
      socket.emit("actualizar tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setModalEliminarTarea(false);

      // SOCKET
      socket.emit("eliminar tarea", tarea);

      setTarea({});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/proyectos/colaboradores",
        { email },
        config
      );

      setColaborador(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoActualizado = { ...proyecto };

      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );

      setProyecto(proyectoActualizado);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completarTarea = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );
      setTarea({});
      setAlerta({});

      // socket
      socket.emit("cambiar estado", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Socket io
  const submitTareasProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
    setProyecto(proyectoActualizado);
  };
  const eliminarTareaProyecto = (tarea) => {
    console.log(tarea);
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    console.log(proyectoActualizado);
    setProyecto(proyectoActualizado);
  };

  const actualizarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };
  const cambiarEstadoTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cerrarSesionProyectos = () => {
    setProyectos([]);
    setProyecto({});
    setAlerta({});
  };

  // Proporciona el contexto y sus valores a los componentes hijos
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        handleModalEliminarColaborador,
        modalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
        cerrarSesionProyectos,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

// Exporta el proveedor de proyectos (ProyectosProvider) y el contexto de proyectos (ProyectosContext) para su uso en otros archivos
export { ProyectosProvider };
export default ProyectosContext;
