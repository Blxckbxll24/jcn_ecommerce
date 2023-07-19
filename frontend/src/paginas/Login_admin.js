// import React, { useState } from "react";
// import Encabezado from "../componentes/Encabezado";
// import Navbar from "../componentes/Navbar";
// import Footer from "../componentes/Pie_de_pagina";
// import '../estilos/Login.css'
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// function LoginAdmin() {
//     const [campos, setCampos] = useState({
//         correo_electronico: "",
//         contrasenia: ""
//     });
//     const [error, setError] = useState('');
//     //redireccionamiento
//     const navegacion = useNavigate();


//     const acceder = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:8082/loginadmin', campos)
//             .then(respuesta => {
//                 if (respuesta.data.Estatus === "CORRECTO") {
//                     localStorage.setItem('admin', respuesta.data.token);
//                     navegacion('/dashboard');
//                 } else {
//                     setError(respuesta.data.Error);
//                 }
//             })
//             .catch(error => console.log("hay un error"));
//     }
//     return (
//         <>
//             <Encabezado />
//             <Navbar />

//             <>

//             <div className="box">
//     <form onSubmit={acceder}>
//       <h2>Inicio Sesion</h2>
//       <div className="inputBox">
//       <input type="email" className="net" required="required" onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
//         />
//         <span>Correo Electronico</span>
//         <i />
//       </div>
//       <div className="inputBox">
//       <input type="password" className="net" required="required" onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
//         />
//         <span>Contraseña</span>
//         <i />
//       </div>
//       <div className="links">
//         <a href="#">¿Olvidaste tu contraseña?</a>
//         <a href="#">Registrarse</a>
//       </div>
//       <button type="submit" className="boton">
//       <a href="" className="link">
//       Entrar
//       </a>
//       </button>
//     </form>
//   </div>


//             </>


//             <Footer />
//         </>
//     );
// }
// export default LoginAdmin;


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
    // Redireccionamiento
    const navigate = useNavigate();

    const acceder = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/loginadmin', campos)
            .then(respuesta => {
              console.log(respuesta.data);
                if (respuesta.data.Estatus === "CORRECTO") {
                    // Almacenar el token en el almacenamiento local
                    localStorage.setItem('adminToken', respuesta.data.token);
                    // Redireccionar al dashboard
                    navigate('/dashboard');
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log("hay un error"));
    }

    return (
        <>
            <Encabezado />
            <div className="box">
                <form onSubmit={acceder}>
                    <h2>Inicio Sesion</h2>
                    <div className="inputBox">
                        <input type="email" className="net" required="required" onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })} />
                        <span>Correo Electronico</span>
                        <i />
                    </div>
                    <div className="inputBox">
                        <input type="password" className="net" required="required" onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })} />
                        <span>Contraseña</span>
                        <i />
                    </div>
                    <div className="links">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <a href="#">Registrarse</a>
                    </div>
                    <button type="submit" className="boton">
                        Entrar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default LoginAdmin;
