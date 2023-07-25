import React from "react";
import '../estilos/Contactopros.css'
import { Link } from "react-router-dom";

function ContactoPros() {
    return(

        <div class="pros">
        <h1 class="diam">KingKang</h1>
        <h2 class="clas">Tu comentario se ha enviado correctamente:</h2>
        <img src={require('../imagenes/enviar-datos.png')}  class="spiderman" alt=""/>
        <p class="batman">Pronto nos comunicaremos con usted</p>
        <Link to='/'>
        <button type="submit" class="regresar"> <img src={require('../imagenes/casa.png')}  class="power" alt="icono regresar"/> Regresar a Pagina Principal</button></Link>
    </div>
    )
}
export default ContactoPros;