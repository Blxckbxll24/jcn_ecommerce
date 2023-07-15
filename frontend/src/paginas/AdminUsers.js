import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../estilos/AdminCategorias.css';

function Ausers() {
  const [Ausers, setAusers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/adminusers')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          setAusers(respuesta.data.contenido);
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
            <th scope="col">nombre</th>
            <th scope="col">email</th>
            <th scope="col">Botones</th>
          </tr>
        </thead>
        <tbody>
          {Ausers.map((ausers, index) => (
            <tr key={ausers.id}>
              <th scope="row">{ausers.id}</th>
              <td>{ausers.nombre_usuario}</td>
              <td>{ausers.correo_electronico}</td>
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

export default Ausers;
