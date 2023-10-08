/* 
Nombre: OlvidePassword.js
Funcionalidad: Componente para restablecer la contraseña de un usuario a través de un token válido.

Comportamiento:
  - Utiliza los hooks `useState` y `useEffect` de React para gestionar el estado de la contraseña, validar el token y mostrar alertas.
  - Comprueba la validez del token al cargar el componente y actualiza el estado en consecuencia.
  - Permite al usuario restablecer su contraseña si el token es válido y la nueva contraseña cumple con ciertos requisitos.
  - Muestra mensajes de alerta en caso de errores o éxito en el restablecimiento de contraseña.
*/
import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
/* 
    Funcionalidad: Maneja el envío del formulario para restablecer la contraseña.
    Entradas: Evento del formulario.
    Salidas: Realiza una solicitud al servidor para actualizar la contraseña.
    */
    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Email es obligatorio',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })

            setAlerta({
                msg: data.msg,
                error: false
            })
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }


    }

    const { msg } = alerta

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso y no pierdas tus {''}
                <span className="text-slate-700">proyectos</span>
            </h1>

            { msg && <Alerta alerta={alerta} />}

            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
        

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                

                <input 
                    type="submit"
                    value="Enviar Instrucciones"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
                
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? Regístrate</Link>
            </nav>

        </>
    )
}

export default OlvidePassword