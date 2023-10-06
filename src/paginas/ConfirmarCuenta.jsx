/* 
Nombre: ConfirmarCuenta.js
Funcionalidad: Componente para confirmar una cuenta de usuario.
*/

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

// Estado para manejar las alertas
const [alerta, setAlerta] = useState({})
// Estado para indicar si la cuenta se ha confirmado
const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

// Obtener el parámetro de la URL
const params = useParams();
const { id } = params

useEffect(() => {
  /*
  Funcionalidad: Realiza la solicitud de confirmación de la cuenta al servidor.
  Entradas: Ninguna explícita.
  Salidas: Actualiza el estado de la alerta y la confirmación de la cuenta.
*/
  const confirmarCuenta = async () => {
    try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)


        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)

    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }
  // Llamar a la función de confirmación al cargar el componente
  confirmarCuenta();
}, [])

const { msg } = alerta

return (
  <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirma tu cuenta y Comienza a crear tus {''}
          <span className="text-slate-700">proyectos</span>
      </h1>

      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link 
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to="/"
          >Inicia Sesión</Link>
        )}
      </div>
  </>
)


export default ConfirmarCuenta
