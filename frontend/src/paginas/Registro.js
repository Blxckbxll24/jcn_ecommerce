import React, { useState} from 'react';
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Registro.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registro() {

  const [campos, setCampos] = useState({
    nombre_usuario: "",
    correo_electronico: "",
    contrasenia: "",
    telefono: ""
  });
  const [error, setError] = useState('');
  //redireccionamiento
  const navegacion = useNavigate();


  const registrar = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8082/registro', campos)
      .then(respuesta => {
        if (respuesta.data.Estatus === "CORRECTO") {
          navegacion('/login');
        } else {
          setError(respuesta.data.Error);
      }
      })
      .catch(error => console.log("hay un error"));
  }


  return (
    <>
      <Encabezado />

      <div className="cadenas">
        <form className="login" action="" onSubmit={registrar}>
          <h2>Inicio de Sesión</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Ingresa tu nombre"
              required=""
              name="nombre_usuario"
              onChange={(e) => setCampos({ ...campos, nombre_usuario: e.target.value })}
            />
            <label>Nombre</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Contraseña"
              required=""
              name="correo_electronico"
              onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
            />
            <label>Correo Electronico</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="ejemoplo@gmail.com"
              required=""
              name="contrasenia"
              onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
            />
            <label>Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="ejemoplo@gmail.com"
              required=""
              name="contrasenia"
              onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
            />
            <label>Repetir Contraseña</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="Numero de Telefono"
              required=""
              name="telefono"
              onChange={(e) => setCampos({ ...campos, telefono: e.target.value })}
            />
            <label>Telefono</label>
          </div>
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
          <p className="uno">Puedes iniciar Sesion con:</p>
          <div className="metodos" />
          <div className='redes'>          <Link to="https://es-la.facebook.com/">
            <img src={require('../imagenes/facebook.png')} alt="Facebook" />
          </Link>
          <Link to="https://www.instagram.com/">
            <img src={require('../imagenes/instagram.png')} alt="Instragram" />
          </Link>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
}
export default Registro;