
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import "../estilos/PagCategorias.css";

// function CAccesorios() {

//     const [Accesorios, setAccesorios] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8082/obteneraccesorios')
//             .then(respuesta => {
//                 if (respuesta.data.ESTATUS === "EXITOSO") {
//                     setAccesorios(respuesta.data.contenido);
//                     console.log(respuesta.data);
//                 } else {
//                     console.log("Error");
//                 }
//                 console.log(respuesta);
//             })

//             .catch(error => console.log(error));
//     }, []);

//     const addToCart = (productName, price) => {
//         const cartItem = { productName, price, quantity: 1 };

//         let cart = JSON.parse(localStorage.getItem('cart')) || [];
//         cart.push(cartItem);
//         localStorage.setItem('cart', JSON.stringify(cart));
//     };
//     return (

//         <div className="carta">
//             <>

//                 {Accesorios.map((accesorios, index) => {

//                     return (


//                         <div className="card"
//                             key={accesorios.id_Producto}>
//                             <img src={require('../imagenes/productos/' + accesorios.fotos)} alt="Nombre del producto" />
//                             <div className="card-body">
//                                 <h5 className="card-title">{accesorios.Nombre_Producto}</h5>
//                                 <p className="card-text">{accesorios.Descripcion}</p>
//                                 <h6 className="card-price">${accesorios.Precio}</h6>
//                                 <button className="btn btn-primary" onClick={() => addToCart(accesorios.Nombre_Producto, accesorios.Precio)}>Agregar al carrito</button>
//                             </div>
//                         </div>

                       
                       
                       


//                     );
                    
//                 })}

//             </>
//         </div>
//     );
// }
// export default CAccesorios;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";
import Carrito from '../paginas/Carrito';
import swal from 'sweetalert';

function CAccesorios() {
    const [Accesorios, setAccesorios] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en el almacenamiento local para determinar el estado de autenticación

    useEffect(() => {
        axios.get('http://localhost:8082/obteneraccesorios')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setAccesorios(respuesta.data.contenido);
                    console.log(respuesta.data);
                } else {
                    console.log("Error");
                }
                console.log(respuesta);
            })
            .catch(error => console.log(error));
    }, []);

    // Función para agregar un producto al carrito
    const addToCart = (id, productName, price) => {
        if (!isLoggedIn) {
          // Si el usuario no está autenticado, mostrar una alerta o redirigir a la página de inicio de sesión
          swal("Por favor, inicia sesión antes de agregar elementos al carrito.");
          // O redirigir a la página de inicio de sesión con useHistory
          // history.push('/login');
          return;
        }
    
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === id);
    
        if (existingItemIndex !== -1) {
          // El producto ya está en el carrito, aumentar la cantidad
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
          // El producto no está en el carrito, agregarlo
          const cartItem = { id, productName, price, quantity: 1 };
          const updatedCart = [...cart, cartItem];
          localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    
        swal("Agregado al carrito","El producto ha sido agregado al carrito correctamente.");
      };
    

    return (
        <div className="carta">
            <>
                {Accesorios.map((accesorios, index) => {
                    return (
                        <div className="card" key={accesorios.id_Producto}>
                            <img src={require('/Users/emmag/Desktop/trabajo/jcn_ecommerce/backend/public/imagenes/'+accesorios.fotos)} alt="Nombre del producto" />
                            <div className="card-body">
                                <h5 className="card-title">{accesorios.Nombre_Producto}</h5>
                                <p className="card-text">{accesorios.Descripcion}</p>
                                <h6 className="card-price">${accesorios.Precio}</h6>
                                {isLoggedIn ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => addToCart(accesorios.id_Producto, accesorios.Nombre_Producto, accesorios.Precio)}
                                        
                                    >
                                        Agregar al carrito
                                    </button>
                                ) : (
                                    <Link to="/login" className="btn btn-primary">
                                        Iniciar sesión para agregar
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </>
        </div>
    );
}

export default CAccesorios;
