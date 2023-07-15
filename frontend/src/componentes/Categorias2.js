
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";

function Categorias2() {

    const [Categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/obtenercategorias')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setCategorias(respuesta.data.contenido);
                    //console.log(respuesta.data);
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

                {Categorias.map((categoria, index) => {

                    return <>

                        <div className="card" key={categoria.id_Categoria}>
                            <img src={require('../imagenes/'+categoria.fotos)} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">{categoria.Nombre_Categoria}</h5>
                                <p className="card-text">{categoria.Descripcion}</p>
                                {/* <h6 className="card-price">${accesorios.Precio}</h6> */}
                                <Link to={"/"+categoria.Nombre_Categoria}><button className="btn btn-primary">ir a {categoria.Nombre_Categoria}</button></Link>
                            </div>
                        </div>

                        {/* <div className="card w-25 px-2">
                            <Link src="../imagenes/sin-portada.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{categoria.Nombre_Categoria}</h5>
                                <p className="card-text">
                                    {categoria.Descripcion}
                                </p>
                                <Link to="#" className="btn btn-primary">
                                    ir a {categoria.Nombre_Categoria}
                                </Link>
                            </div>
                        </div> */}

                    </>

                })}

            </>
        </div>
    );
}
export default Categorias2;
