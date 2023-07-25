import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import CTodos from "../componentes/C-todos";

function Todos() {
    return (
        <>
        <>
            <Encabezado />
            <h1 className="klan"> variedad </h1>
            <CTodos />
           
        </>
         <Footer /> </>
    )
}
export default Todos;