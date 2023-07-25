import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilos/Carrito.css';
import Encabezado from '../componentes/Encabezado';

const PAYPAL_CLIENT_ID = 'AdwObl8zvI4sB0iG1UJi85kaIBMaL8wQkh6obtqTqNIrS-z7gVfM7KZB61jlnzC_w9zMzuIJDDeO-DuS';

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [contador, setContador] = useState(0);
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica si hay un token en el almacenamiento local para determinar el estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos del carrito desde el local storage al montar el componente
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    // Calcular el total de la compra
    const total = storedCartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    // Actualizar el contador total al cargar la página
    setContador(storedCartItems.reduce((total, item) => total + item.quantity, 0));
  }, []);

  // Función para actualizar el carrito y guardar los cambios en el local storage
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
    // Actualizar el contador cada vez que se elimine un producto
    setContador(prevContador => prevContador - 1);
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
    // Actualizar el contador cada vez que se aumente la cantidad de un producto
    setContador(prevContador => prevContador + 1);
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
      // Actualizar el contador cada vez que se disminuya la cantidad de un producto
      setContador(prevContador => prevContador - 1);
    }
  };

  // Función para vaciar todo el carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalPrice(0);
    setContador(0);
  };

  const handlePaymentApproval = (data, actions) => {
    // Verificar si el usuario está logueado
    if (!isLoggedIn) {
      // Redirigir al usuario a la página de inicio de sesión si no está logueado
      navigate('/login');
      return;
    }

    const nuevaOrden = {
      usuarioId: 1, // Reemplazar con el ID del usuario que realizó la compra
      fechaCompra: new Date().toISOString(),
      estado: 'pendiente',
      total: totalPrice,
      productos: cartItems.map(item => ({
        id: item.id, // El ID del producto en tu base de datos
        nombre: item.productName,
        precio: item.price,
        cantidad: item.quantity
      }))
    };

    axios.post('http://localhost:8082/crearorden', nuevaOrden)
      .then(response => {
        console.log(response.data); // Respuesta del backend
        clearCart();
        setPagoCompletado(true);
        setContador(0);
      })
      .catch(error => {
        console.error('Error al crear la orden:', error);
      });
  };

  useEffect(() => {
    if (pagoCompletado) {
      navigate('/pagoexitoso');
    }
  }, [pagoCompletado, navigate]);

  return (
    <>
      <Encabezado />
      <>
        <div className='smoky'>
          {!isLoggedIn && navigate('/login')}
          <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, "currency": "MXN" }}>
            <div className='quinta '>
              <div className='solid'>
            <img src={require('../imagenes/carrito-de-supermercado.png')} className='flash' alt="" />
            <br></br>
            <h1 className='wisi'>Carrito de Compras</h1>
            </div>
              
              <table className='tab'>
                <thead className='thea'>
                  <tr className='wsx1'>
                    <th className='nayer'>Producto</th>
                    <th className='nayer'>Precio</th>
                    <th className='nayer'>Cantidad</th>
                    <th className='nayer'>Total</th>
                    <th className='nayer'>Función</th>
                  </tr>
                </thead>

                <tbody className='tbody2'>
                  {cartItems.map((item, index) => (
                    <tr className='key' key={index}>
                      <td className='item'>{item.productName}</td>
                      <td className='item'>{item.price}</td>
                      <td className='item'>
                        <button className='this' onClick={() => decreaseQuantity(index)}>-</button>
                        {item.quantity}
                        <button className='this' onClick={() => increaseQuantity(index)}>+</button>
                      </td>
                      <td className='item'>{item.price * item.quantity}</td>
                      <td className='item'>
                        <button className='eliminar' onClick={() => removeFromCart(index)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='ms'>
                <h2 className='compra'>Total de la compra: {totalPrice}</h2>
                <div className='paypal'>
                  <button className='vaciar' onClick={clearCart}>Vaciar Carrito</button>
                

                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalPrice,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handlePaymentApproval}
                  onError={(error) => {
                    console.error("Error al procesar el pago:", error);
                  }}
                />
              </div>
            </div>
            </div>
          </PayPalScriptProvider>
        </div>
      </>
    </>
  );
};
export default Carrito;