import React from "react";
import Navbar from "../componentes/Navbar";
import Encabezado from "../componentes/Encabezado";
import Categorias2 from "../componentes/Categorias2";
import Footer from "../componentes/Pie_de_pagina";

function PagCategorias() {
    return (
        <>
            <Encabezado />
            <h1 className="klan">Categorias</h1>
            <Categorias2/>
            <Footer/>
        </>
    )
}
export default PagCategorias;