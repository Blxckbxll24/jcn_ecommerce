import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilos/Carrito.css';
import Encabezado from '../componentes/Encabezado';
import Footer from '../componentes/Pie_de_pagina';

const PAYPAL_CLIENT_ID = 'AdwObl8zvI4sB0iG1UJi85kaIBMaL8wQkh6obtqTqNIrS-z7gVfM7KZB61jlnzC_w9zMzuIJDDeO-DuS';

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [contador, setContador] = useState(0);
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    const total = storedCartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    setContador(storedCartItems.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
    setContador(prevContador => prevContador - 1);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
    setContador(prevContador => prevContador + 1);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
      setContador(prevContador => prevContador - 1);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalPrice(0);
    setContador(0);
  };

  const handlePaymentApproval = (data, actions) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const nuevaOrden = {
      usuarioId: 1,
      fechaCompra: new Date().toISOString(),
      estado: 'pendiente',
      total: totalPrice,
      productos: cartItems.map(item => ({
        id: item.id,
        nombre: item.productName,
        precio: item.price,
        cantidad: item.quantity
      }))
    };

    axios.post('http://localhost:8082/crearorden', nuevaOrden)
      .then(response => {
        console.log(response.data);
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
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, "currency": "MXN" }}>
        <div className='solid'>
          <h1 className='wisi'>Carrito de Compras</h1>
        </div>
        <div className='coca'>
          <table className='tab'>
            <thead className='thea'>
              <tr className='wsx1'>
                <th className='nayer'>Productos</th>
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
                  <td className='item'>${item.price}</td>
                  <td className='item'>
                    <button className='this' onClick={() => decreaseQuantity(index)}>-</button>
                    {item.quantity}
                    <button className='this' onClick={() => increaseQuantity(index)}>+</button>
                  </td>
                  <td className='item'>${item.price * item.quantity}</td>
                  <td className='item'>
                    <button className='eliminar' onClick={() => removeFromCart(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='shop'>
          <h2 className='compra'>Total de la compra </h2>
          <h2 className='compra'>${totalPrice}</h2>
          <div className='paypal'>
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
      </PayPalScriptProvider>
      <button className='vaciar' onClick={clearCart}>Vaciar Carrito</button>
      <Footer />
    </>
  );
};

export default Carrito;
