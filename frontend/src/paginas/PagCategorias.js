import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Categorias2 from "../componentes/Categorias2";
import Footer from "../componentes/Pie_de_pagina";

function PagCategorias() {
    return (
        <>
            <Encabezado />
            <Navbar />
            <h1>-Categorias-</h1>
            <Categorias2/>
            <Footer/>
        </>
    )
}
export default PagCategorias;