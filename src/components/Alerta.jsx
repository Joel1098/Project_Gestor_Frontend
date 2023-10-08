/*
Funcionalidad: Componente para mostrar alertas en la interfaz de usuario.
Entradas:
  - alerta: Un objeto que contiene información sobre la alerta a mostrar, incluyendo:
   Salidas: Renderiza una alerta con formato condicional dependiendo del tipo de alerta (error o éxito).
*/
const Alerta = ({ alerta }) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}>
      {alerta.msg}
    </div>
  );
}

export default Alerta;
