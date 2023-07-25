import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import CAccesorios from "../componentes/C-Accesorios";

function Accesorios() {
    return (
        <>
        <>
            <Encabezado />
            <h1 className="klan">Accesorios</h1>  
            <CAccesorios />
           
        </>
         <Footer /> </>
    )
}
export default Accesorios;