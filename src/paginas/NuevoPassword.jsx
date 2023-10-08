/* 
Nombre: NuevoPassword.js
Funcionalidad: Componente para permitir a los usuarios restablecer su contraseña olvidada.

Entradas: No recibe parámetros explícitos.
Salidas: Interfaz para restablecer la contraseña y redirigir al usuario a la página de inicio de sesión.

Comportamiento:
  - Utiliza los hooks `useState` y `useEffect` de React para gestionar el estado de la contraseña, validar el token y mostrar alertas.
  - Comprueba la validez del token al cargar el componente y actualiza el estado en consecuencia.
  - Permite al usuario restablecer su contraseña si el token es válido y la nueva contraseña cumple con ciertos requisitos.
  - Muestra mensajes de alerta en caso de errores o éxito en el restablecimiento de contraseña.
*/

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        /*
        Funcionalidad: Comprueba la validez del token al cargar el componente.
        Entradas: Ninguna.
        Salidas: Actualiza el estado para indicar si el token es válido.
        */
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
        };
        comprobarToken();
    }, []);
    /*
    Funcionalidad: Maneja el envío del formulario para restablecer la contraseña.
    Entradas: Evento de formulario (e).
    Salidas: Realiza una solicitud al servidor para restablecer la contraseña y muestra mensajes de alerta apropiados.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password debe ser mínimo de 6 caracteres',
                error: true,
            });
            return;
        }

        try {
            const url = `/usuarios/olvide-password/${token}`;
            // Realizar una solicitud POST para restablecer la contraseña
            const { data } = await clienteAxios.post(url, { password });
            setAlerta({
                msg: data.msg,
                error: false,
            });
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Restablece tu contraseña y no pierdas acceso a tus{' '}
                <span className="text-slate-700">proyectos</span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (
                <form
                    className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >
                            Nuevo Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </form>
            )}

            {passwordModificado && (
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="/"
                >
                    Inicia Sesión
                </Link>
            )}
        </>
    );
};

export default NuevoPassword;
