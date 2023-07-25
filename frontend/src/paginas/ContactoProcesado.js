import React from "react";
import '../estilos/Contactopros.css'
import { Link } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";

function ContactoPros() {
    return(
        <>
        <Encabezado/>
<>        <div class="pros">
        <h1 class="diam">KingKang</h1>
        <h2 class="clas">Tu comentario se ha enviado correctamente:</h2>
        <img src={require('../imagenes/enviar-datos.png')}  class="spiderman" alt=""/>
        <p class="batman">Pronto nos comunicaremos con usted</p>
    </div>
    </>
    <Footer/>
    </>
    )
}
export default ContactoPros;