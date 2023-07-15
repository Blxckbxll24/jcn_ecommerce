import React from "react";
import { Link } from "react-router-dom";
import '../estilos/Encabezado.css';

function Encabezado() {
    return (
        <>
            <header className="header">
                <div className="logo">
                   <Link to="/"> <img src={require('../imagenes/image.png')} alt="Logo de la tienda." /></Link>
                </div>
                <div className="busqueda">
                    <input type=" text" placeholder="Buscar" />
                </div>
                <div className="perfil_carrito">
                <Link to="/carrito">   <img src={require('../imagenes/carrito-de-compras.png')} alt="" /></Link>
                    <Link to="/login">
                        <img src={require('../imagenes/usuario.png')} alt="" />
                    </Link>
                </div>
            </header>
        </>
    )
}
export default Encabezado;
