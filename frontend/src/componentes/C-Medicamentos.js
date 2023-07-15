
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";

function CMedicamentos() {

    const [Curas, setCuras] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/obtenermedicamentos')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setCuras(respuesta.data.contenido);
                    console.log(respuesta.data);
                } else {
                    console.log("Error");
                }
                console.log(respuesta);
            })

            .catch(error => console.log(error));
    }, []);
    return (
        <div className="carta">
        <>
           
                {Curas.map((curas, index) => {
                    
                    return <>

                       
<div className="card">
  <img src={require('../imagenes/productos/'+curas.fotos)} alt="Nombre del producto" />
  <div className="card-body">
    <h5 className="card-title">{curas.Nombre_Producto}</h5>
    <p className="card-text">{curas.Descripcion}</p>
    <h6 className="card-price">${curas.Precio}</h6>
    <button className="btn btn-primary">Agregar al carrito</button>
  </div>
</div>

                       
                       
                       
                        {/* <div className="card w-25 px-2">
                            <Link src="../imagenes/sin-portada.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{accesorios.Nombre_Producto}</h5>
                                <p className="card-text">
                                    {accesorios.Descripcion}
                                </p>
                                <Link to="#" className="btn btn-primary">
                                     {accesorios.Precio}
                                </Link>
                            </div>
                        </div> */}

                    </>
                    
                })}
                
        </>
        </div>
    );
}
export default CMedicamentos;
