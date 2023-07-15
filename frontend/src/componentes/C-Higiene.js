
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";

function CHigiene() {

    const [Higiene, setHigiene] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/obtenerhigiene')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setHigiene(respuesta.data.contenido);
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
           
                {Higiene.map((higiene, index) => {
                    
                    return <>

                       
<div className="card">
  <img src={require('../imagenes/productos/'+higiene.fotos)} alt="Nombre del producto" />
  <div className="card-body">
    <h5 className="card-title">{higiene.Nombre_Producto}</h5>
    <p className="card-text">{higiene.Descripcion}</p>
    <h6 className="card-price">${higiene.Precio}</h6>
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
export default CHigiene;
