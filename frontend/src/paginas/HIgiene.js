import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import CHigiene from "../componentes/C-Higiene";

function Higiene() {
    return (
        <>
        <>
            <Encabezado />
            <Navbar />
            <h1>-Higiene-</h1>
            <CHigiene />
           
        </>
         <Footer /> </>
    )
}
export default Higiene;