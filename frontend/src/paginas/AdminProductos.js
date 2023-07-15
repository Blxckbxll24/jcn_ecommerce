import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../estilos/AdminCategorias.css';

function AProductos() {
  const [AProductos, setAProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/adminproductos')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          setAProductos(respuesta.data.contenido);
        } else {
          console.log("Error");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>

    <h1 className='titulo_dash'>Categorias</h1>
    <div className='but'>
    <Link to='/'><button id='verde'>Agregar</button></Link>
    <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
    </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {AProductos.map((aproductos, index) => (
            <tr key={aproductos.id_producto}>
              <th scope="row">{aproductos.id_Producto}</th>
              <td>{aproductos.Nombre_Producto}</td>
              <td>{aproductos.Precio}</td>
              <td>{aproductos.id_Categoria}</td>
              <td>
                <button>modificar</button>
                <button>eliminar</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AProductos;
