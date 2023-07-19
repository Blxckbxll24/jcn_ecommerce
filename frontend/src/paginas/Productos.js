import React from "react";
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Producto.css'
import { Link } from "react-router-dom";

function Producto() {
    return (
        <>
            <Encabezado />
                <>
                    <div className="producto">
                        <div className="formato">
                           
                            <img
                                src={require('../imagenes/perro_correo.jpg')}
                                className="cuadro"
                                alt="Collares de perritos"
                            />
                            <div className="botones">
                            <Link to={"/compra"}>
                                <button type="submit" className="btn btn-success">
                                    Correas
                                </button>
                                </Link>
                            </div>
                            <img
                                src={require('../imagenes/cama_perritos.jpg')}
                                className="cuadro"
                                alt="Cama para perritos"
                            />
                            <div className="botones">
                                <button type="submit" className="btn btn-success">
                                    Camas
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="cuadricula">
                        <img
                            src={require('../imagenes/juguetes.jpg')}
                            className="find"
                            alt="Juguetes para animalitos"
                        />
                        <div className="botones">
                            <button type="submit" className="btn btn-success">
                                Juguetes
                            </button>
                        </div>
                        <img
                            src={require('../imagenes/mascotas-ropa.jpg')}
                            className="find"
                            alt="Ropa para mascota"
                        />
                        <div className="botones">
                            <button type="submit" className="btn btn-success">
                                Ropa
                            </button>
                        </div>
                    </div>
                </>


            <Footer />
        </>
    );
}
export default Producto;