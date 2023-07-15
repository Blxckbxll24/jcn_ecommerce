
import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";
import Encabezado from '../componentes/Encabezado';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Pie_de_pagina';
import "../estilos/Dashboard.css";

function Dashboard() {

    return (
        <>        
                <>

                <main>
                <div className="dashboard">
                    <>

                        <div className="card" >
                            {/* <img src= alt="Nombre del producto" /> */}
                            <div className="card-body">
                                <h5 className="card-title">Categorias</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/admincategorias"><button className="btn btn-primary">ir </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            {/* <img src= alt="Nombre del producto" /> */}
                            <div className="card-body">
                                <h5 className="card-title">Productos</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminproductos"><button className="btn btn-primary">ir </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            {/* <img src= alt="Nombre del producto" /> */}
                            <div className="card-body">
                                <h5 className="card-title">Pedidos</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminpedidos"><button className="btn btn-primary">ir </button></Link>
                            </div>
                        </div>
                        <div className="card" >
                            {/* <img src= alt="Nombre del producto" /> */}
                            <div className="card-body">
                                <h5 className="card-title">Usuarios</h5>
                                <p className="card-text"></p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to="/adminusers"><button className="btn btn-primary">ir </button></Link>
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
