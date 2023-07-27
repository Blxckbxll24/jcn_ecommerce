import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../estilos/PagCategorias.css";
import Carrito from '../paginas/Carrito';
import Encabezado from './Encabezado';
import swal from 'sweetalert';

function CHigiene() {
    const [Higiene, setHigiene] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en el almacenamiento local para determinar el estado de autenticación

    useEffect(() => {
        axios.get('http://localhost:8082/obtenerhigiene')
            .then(respuesta => {
                if (respuesta.data.ESTATUS === "EXITOSO") {
                    setHigiene(respuesta.data.contenido);
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
          alert("Por favor, inicia sesión antes de agregar elementos al carrito.");
          // O redirigir a la página de inicio de sesión con useHistory
          // history.push('/login');
          return;
        }
    
        // Recuperar el carrito actual desde el almacenamiento local o crear uno nuevo si no existe
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Buscar si el producto ya está en el carrito
        const existingItemIndex = cart.findIndex(item => item.id === id);
    
        if (existingItemIndex !== -1) {
          // El producto ya está en el carrito, aumentar la cantidad
          cart[existingItemIndex].quantity += 1;
        } else {
          // El producto no está en el carrito, agregarlo como un nuevo elemento en el carrito
          const cartItem = { id, productName, price, quantity: 1 };
          cart.push(cartItem);
        }
    
        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Actualizar el contador del carrito si es necesario
        if (typeof window !== 'undefined' && window.updateCartItemCount) {
          window.updateCartItemCount();
        }
    
        swal("Agregado al carrito","El producto ha sido agregado al carrito correctamente.");
      };
    

    return (
       
        <div>
            <div className="carta">
                {Higiene.map((higiene, index) => (
                    <div className="card" key={higiene.id_Producto}>
                        <img src={require('/Users/emmag/Desktop/trabajo/jcn_ecommerce/backend/public/imagenes/'+higiene.fotos)}  alt="Nombre del producto" />
                        <div className="card-body">
                            <h5 className="card-title">{higiene.Nombre_Producto}</h5>
                            <p className="card-text">{higiene.Descripcion}</p>
                            <h6 className="card-price">${higiene.Precio}</h6>
                            {isLoggedIn ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(higiene.id_Producto,higiene.Nombre_Producto, higiene.Precio)}
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

export default CHigiene;