import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import CMedicamentos from "../componentes/C-Medicamentos";

function Medicamentos() {
    return (
        <>
        <>
            <Encabezado />
            <Navbar />
            <h1>-Medicamentos-</h1>
            <CMedicamentos />
           
        </>
         <Footer /> </>
    )
}
export default Medicamentos;