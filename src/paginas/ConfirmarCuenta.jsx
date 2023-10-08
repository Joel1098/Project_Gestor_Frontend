/*
Nombre: ConfirmarCuenta.js
Funcionalidad: Componente para confirmar una cuenta de usuario.
Entradas: No recibe parámetros explícitos.
Salidas: Interfaz para confirmar la cuenta de usuario y redirigir a la página de inicio de sesión.
Comportamiento:
  - Utiliza el hook `useParams` de React Router para obtener el identificador único de la cuenta desde la URL.
  - Utiliza el hook `useState` para manejar el estado de la alerta y la confirmación de la cuenta.
  - Realiza una solicitud al servidor para confirmar la cuenta de usuario al cargar el componente utilizando `useEffect`.
*/

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

function ConfirmarCuenta() {
  // Estado para manejar las alertas
  const [alerta, setAlerta] = useState({});
  // Estado para indicar si la cuenta se ha confirmado
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Obtener el parámetro de la URL
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    /*
    Funcionalidad: Realiza la solicitud de confirmación de la cuenta al servidor.
    Entradas: Ninguna.
    Salidas: Actualiza el estado de la alerta y la confirmación de la cuenta.
    */
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });

        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    // Llamar a la función de confirmación al cargar el componente
    confirmarCuenta();
  }, [id]);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y Comienza a crear tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta;
