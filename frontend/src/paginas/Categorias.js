import React from "react";
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Categorias.css';
import { Link } from "react-router-dom";

function Categorias() {
    return (
        <>
            <Encabezado />
            <Navbar />

                <h2>Categorias</h2>
                <main>
                    <div className="container1">
                        <div className="top-images">
                           <Link to={"/producto"}> <img src={require('../imagenes/gato.jpg')} href="" alt="gato" /></Link>
                            <p className="link">Accesorios</p>
                            <img src={require('../imagenes/foca.jpg')} alt="foca" />
                            <p className="link">Medicamentos</p>
                        </div>
                        <div className="bottom-images">
                            <img src={require('../imagenes/perro chido.jpg')} alt="perro" />
                            <p className="link">Higiene</p>
                            <img src={require('../imagenes/perro_doctor.jpg')} alt="perro doctor" />
                            <p className="link">Otros...</p>
                        </div>
                    </div>
                </main>
                <Footer />

        </>
    );
}
export default Categorias;