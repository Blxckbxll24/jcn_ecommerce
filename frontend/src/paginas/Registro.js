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

      <div class="container5">
    <form class="registration-form" onSubmit={registrar}>
      <h2>Registro de Usuario</h2>
      <div class="form-group">
        <label for="nombre" className='label'>Nombre:</label>
        <input type="text" id="nombre" name="nombre_usuario" required=''
        onChange={(e) => setCampos({ ...campos, nombre_usuario: e.target.value })}
        />
      </div>
      <div class="form-group">
        <label for="email" className='label'>Email:</label>
        <input type="email" id="email" name="correo_electronico" required=''
        onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
        />
      </div>
      <div class="form-group">
        <label for="password" className='label'>Contraseña:</label>
        <input type="password" id="password" name="contrasenia" required=''
        onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
        />
      </div>
      <div class="form-group">
        <label for="confirm-password" className='label'>Confirmar Contraseña:</label>
        <input type="password" id="confirm-password" name="contrasenia" required='' 
        onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
        />
      </div>
      <button type="submit" className='roka'>Registrarse</button>
    </form>
  </div>

      <Footer />
    </>
  );
}
export default Registro;