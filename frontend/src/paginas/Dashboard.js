
import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";
import Encabezado from '../componentes/Encabezado';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Pie_de_pagina';
import "../estilos/Dashboard.css";
import ANavbar from '../componentes/Navdash';

function Dashboard() {

    return (
        <>        
        <ANavbar/>
                <>

                <main className='ximena'>

                    <div className='logoimgs'>
                    <img src={require('../imagenes/logo.png')}/>
                    </div>
                    <div className='coto'>
                    <h1>King Kang Admin</h1>
                    </div>
                <div className="dashboard">
                    <>
    
                        <div className="card" >
                        <img src={require('../imagenes/categorias.png')} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">Categorias</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/admincategorias"><button className="btn btn-primary">Ver categoria </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            <img src={require('../imagenes/1170679.png')} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">Productos</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminproductos"><button className="btn btn-primary">Ver producto </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            <img src={require('../imagenes/cesta2.png')} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">Pedidos</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminpedidos"><button className="btn btn-primary">Ver pedidos </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            <img src={require('../imagenes/users.png')} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">Usuarios</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminusers"><button className="btn btn-primary">Ver usuarios </button></Link>
                            </div>
                        </div>

        
                    </>
                     </div>
                    </main>
                </>

           

        </>
         
    );
}

export default Dashboard;
