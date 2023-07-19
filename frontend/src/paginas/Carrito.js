// import React from "react";
// import Encabezado from "../componentes/Encabezado";
// import Footer from "../componentes/Pie_de_pagina";
// import '../estilos/Carrito.css';
// import Navbar from "../componentes/Navbar";

// function Carrito() {
//     return (
//         <>
//             <Encabezado />
//             <Navbar/>
            
//                 <main>
//                     <div className="container">
//                         <div className="tab">Carrito</div>
//                         <div className="content1">
//                             <div className="left-section">
//                                 <h2 className="nomb">Contenido del carrito</h2>
//                                 <ul className="product-list">
//                                     <li>
//                                         <div className="product-item">
//                                             <div className="product-image">
//                                                 <img src={require('../imagenes/correa3.jpg')} alt="Producto 1" />
//                                             </div>
//                                             <div className="product-details">
//                                                 <h3>Correa de perro Roja</h3>
//                                                 <p>Cantidad: 2</p>
//                                                 <button className="remove-button">Eliminar</button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     <li>
//                                         <div className="product-item">
//                                             <div className="product-image">
//                                                 <img src={require('../imagenes/correa2.jpg')} alt="Producto 2" />
//                                             </div>
//                                             <div className="product-details">
//                                                 <h3>Correa para gato</h3>
//                                                 <p>Cantidad: 1</p>
//                                                 <button className="remove-button">Eliminar</button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                     <li className="lip">
//                                         <div className="product-item">
//                                             <div className="product-image">
//                                                 <img src={require('../imagenes/correa1.jpg')} alt="Producto 3" />
//                                             </div>
//                                             <div className="product-details">
//                                                 <h3>Correa para Hurón</h3>
//                                                 <p>Cantidad: 3</p>
//                                                 <button className="remove-button">Eliminar</button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div className="right-section">
//                                 <h2 className="nomb">Detalles del pedido</h2>
//                                 <form className="order-form">
//                                     <label htmlFor="address">Dirección:</label>
//                                     <input type="text" id="address" name="address" required="" />
//                                     <br />
//                                     <label htmlFor="delivery-date">Día de entrega:</label>
//                                     <input
//                                         type="date"
//                                         id="delivery-date"
//                                         name="delivery-date"
//                                         required=""
//                                     />
//                                     <br />
//                                     <br />
//                                     <button type="submit" className="buy-button">
//                                         Comprar
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
                   
//                 </main>
               
//         </>
//     );
// }
// export default Carrito;
// Componente Carrito.js
import React, { useState } from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import "../estilos/Carrito.css";
import Navbar from "../componentes/Navbar";

function Carrito() {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].cantidad += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, cantidad: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <Encabezado />

      <main>
        <div className="container">
          <div className="tab">Carrito</div>
          <div className="content1">
            <div className="left-section">
              <h2 className="nomb">Contenido del carrito</h2>
              <ul className="product-list">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="product-item">
                      <div className="product-image">
                        <img
                          src={require(`../imagenes/productos/${item.fotos}`)}
                          alt={item.nombre}
                        />
                      </div>
                      <div className="product-details">
                        <h3>{item.nombre}</h3>
                        <p>Cantidad: {item.cantidad}</p>
                        <button
                          className="remove-button"
                          onClick={() => removeItemFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="right-section">
              <h2 className="nomb">Detalles del pedido</h2>
              <form className="order-form">
                <label htmlFor="address">Dirección:</label>
                <input type="text" id="address" name="address" required="" />
                <br />
                <label htmlFor="delivery-date">Día de entrega:</label>
                <input
                  type="date"
                  id="delivery-date"
                  name="delivery-date"
                  required=""
                />
                <br />
                <br />
                <button type="submit" className="buy-button">
                  Comprar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Carrito;




