/*
    Funcionalidad: toma una fecha en formato ISO 8601, la divide y la formatea en un formato legible,
    mostrando la fecha en el idioma español y un formato largo que incluye el día de la semana, el año, el mes y el día.
*/
export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
