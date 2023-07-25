import React from "react";
import '../estilos/Pago_procesado.css'
import { Link } from "react-router-dom";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";

function PagoRealizado() {
    return(
<>
<Encabezado/>
<>
        <div class="pago">
        <h1 class="diamonds">KingKang</h1>
        <h2 class="clase1">Tu pago se ha realizado correctamente con:</h2>
        <img src={require('../imagenes/paypal.png')}  class="foto" alt=""/>
        <p class="pedido">Un gusto que hayas comprado con nosotros KingKang</p>
        <p class="pedido">Orden realizada con exito, puede pasar a recogerlo en breve</p>
        <img src={require('../imagenes/entrega-de-paquetes.png')} class="icon" alt="paquete-entrega"/>
    
    </div>
    </>
    <Footer/>
</>
    )
}
export default PagoRealizado;