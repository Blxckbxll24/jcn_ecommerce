import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";
import Carrito from '../paginas/Carrito';
import swal from 'sweetalert';

function CTodos() {
    const [Todos, setTodos] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en el almacenamiento local para determinar el estado de autenticación

    useEffect(() => {
        axios.get('http://localhost:8082/variedad')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setTodos(respuesta.data.contenido);
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
          alert("Por favor, inicia sesión antes de agregar elementos al carrito.");
          return;
        }
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === id);
    
        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          const cartItem = { id, productName, price, quantity: 1 };
          cart.push(cartItem);
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        swal("Agregado al carrito","El producto ha sido agregado al carrito correctamente.");
      };

    return (
        <div>
            <div className="carta">
                {Todos.map((todos, index) => (
                    <div className="card" key={todos.id_Producto}>
                        <img src={require('/Users/emmag/Desktop/trabajo/jcn_ecommerce/backend/public/imagenes/'+todos.fotos)} alt="Nombre del producto" />
                        <div className="card-body">
                            <h5 className="card-title">{todos.Nombre_Producto}</h5>
                            <p className="card-text">{todos.Descripcion}</p>
                            <h6 className="card-price">${todos.Precio}</h6>
                            {isLoggedIn ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(todos.id_Producto, todos.Nombre_Producto, todos.Precio)}
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
                ))}
            </div>
        </div>
    );
}

export default CTodos;