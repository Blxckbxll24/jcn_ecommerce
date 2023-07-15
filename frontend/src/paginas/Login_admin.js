import React, { useState } from "react";
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Login.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginAdmin() {
    const [campos, setCampos] = useState({
        correo_electronico: "",
        contrasenia: ""
    });
    const [error, setError] = useState('');
    //redireccionamiento
    const navegacion = useNavigate();


    const acceder = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/loginadmin', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    localStorage.setItem('usuario', respuesta.data.token);
                    navegacion('/dashboard');
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log("hay un error"));
    }
    return (
        <>
            <Encabezado />
            <Navbar />

            <>

                <div className="titulo">
                    <p>!Con gusto te recibimos¡</p>
                    <img src={require('../imagenes/mascotas2.jpg')} className="portada" alt="Portada Canina" />
                </div>
                <div className="caja">
                    <form onSubmit={acceder}>
                        <div className="content">
                            <p className="texto">King Kang</p>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Correo Electronico"
                                    required=""
                                    onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Contraseña"
                                    required=""
                                    onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="boton">
                                <a href="" className="link">
                                    Entrar
                                </a>
                            </button>
                            <div className="contenedor2">
                                <a href="" className="">
                                    <p className="texto1">¿Olvidaste tu contraseña?</p>
                                </a>
                                <hr />
                                <a href="">
                                    <p className="texto2">Registrarse</p>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>

            </>


            <Footer />
        </>
    );
}
export default LoginAdmin;