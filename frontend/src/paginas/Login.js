// import React, { useState } from "react";
// import Encabezado from "../componentes/Encabezado";
// import Navbar from "../componentes/Navbar";
// import Footer from "../componentes/Pie_de_pagina";
// import '../estilos/Login.css'
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// function Login() {
//     const [campos, setCampos] = useState({
//         correo_electronico: "",
//         contrasenia: ""
//     });
//     const [error, setError] = useState('');
//     //redireccionamiento
//     const navegacion = useNavigate();


//     const acceder = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:8082/login', campos)
//             .then(respuesta => {
//                 if (respuesta.data.Estatus === "CORRECTO") {
//                     localStorage.setItem('usuario', respuesta.data.token);
//                     navegacion('/');
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

//             <>
//   {/* <div className="titulo">
//     <p>¡Un gusto recibirte!</p>
//     <img src={require('../imagenes/mascotas2.jpg')} className="portada" alt="Portada Canina" />
//   </div>
//   <form onSubmit={acceder}>
//   <div className="caja">
//     <div className="content">
//       <p className="texto">King Kang</p>
//       <div className="form-floating mb-3">
//         <input
//           type="email"
//           className="form-control"
//           id="floatingInput"
//           placeholder="Correo Electronico"
//           required=""
//           onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
//         />
//       </div>
//       <div className="form-floating mb-3">
//         <input
//           type="password"
//           className="form-control"
//           id="floatingPassword"
//           placeholder="Contraseña"
//           required=""
//           onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
//         />
//       </div>
//       <button type="submit" className="boton">
//         <a href="" className="link">
//           Entrar
//         </a>
//       </button>
//       <div className="contenedor2">
//         <a href="" className="">
//           <p className="texto1">¿Olvidaste tu contraseña?</p>
//         </a>
//         <hr />
//         <a href="">
//           <p className="texto2">Registrarse</p>
//         </a>
//       </div>
//     </div>
//   </div>
//   </form>
// </> */}
// <div className="box">
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
//   </>





//                 {/* <div className="titulo">
//                     <p>!Con gusto te recibimos¡</p>
//                     <img src={require('../imagenes/mascotas2.jpg')} className="portada" alt="Portada Canina" />
//                 </div>
//                 <div className="caja">
//                     <form onSubmit={acceder}>
//                         <div className="content">
//                             <p className="texto">King Kang</p>

//                             <div className="clase1">
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="floatingInput"
//                                     placeholder="Correo Electronico"
//                                     required=""
//                                     onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
//                                 />
//                             </div>
//                             <div className="clase1">
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id="floatingPassword"
//                                     placeholder="Contraseña"
//                                     required=""
//                                     onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
//                                 />
//                             </div>
//                             <button type="submit" className="boton">
//                                 <a href="" className="link">
//                                     Entrar
//                                 </a>
//                             </button>
//                             <div className="contenedor2">
//                                 <a href="" className="">
//                                     <p className="texto1">¿Olvidaste tu contraseña?</p>
//                                 </a>
//                                 <hr />
//                                 <a href="">
//                                     <p className="texto2">Registrarse</p>
//                                 </a>
//                             </div>
//                         </div>
//                     </form>
//                 </div> */}

//             </>


//             <Footer />
//         </>
//     );
// }
// export default Login;

import React, { useState } from "react";
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Login.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode'

function Login() {
    const [campos, setCampos] = useState({
        correo_electronico: "",
        contrasenia: ""
    });
    const [error, setError] = useState('');
    //redireccionamiento
    const navegacion = useNavigate();
    const [rol_id,setRolId]= useState(null)

    const redireccionar=(rol_id)=>{
        if (rol_id===1){
            navegacion('1');
        }else if(rol_id===2) {
            navegacion('/dashboard')
        }else{
            setError('usuario desconocido')
        }
    }

    const acceder = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/login', campos)
            .then(respuesta => {
                if (respuesta.data.Estatus === "CORRECTO") {
                    // Almacenar el token en el almacenamiento local del navegador
                    localStorage.setItem('token', respuesta.data.Usuario);
                    // Redirigir a la página de inicio después de iniciar sesión exitosamente
                    console.log(respuesta.data.Usuario);
                    navegacion('/');
                } else {
                    setError(respuesta.data.Error);
                }
            })
            .catch(error => console.log("hay un error"));
    }

    return (
        <>
            <Encabezado />
<>
            <div className="box">
                <form onSubmit={acceder}>
                    <h2>Inicio Sesión</h2>
                    <div className="inputBox">
                        <input
                            type="email"
                            className="net"
                            required="required"
                            onChange={(e) => setCampos({ ...campos, correo_electronico: e.target.value })}
                        />
                        <span>Correo Electronico</span>
                        <i />
                    </div>
                    <div className="inputBox">
                        <input
                            type="password"
                            className="net"
                            required="required"
                            onChange={(e) => setCampos({ ...campos, contrasenia: e.target.value })}
                        />
                        <span>Contraseña</span>
                        <i />
                    </div>
                    <div className="links">
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <Link to='/registro'>Registrarse</Link>
                    </div>
                    <button type="submit" className="boton1">
                        <a href="/" className="link">
                            Entrar
                        </a>
                    </button>
                </form>
            </div>

            </>



            <Footer/>
        </>
    );
}

export default Login;
