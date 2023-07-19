import React from "react";
import Encabezado from "../componentes/Encabezado";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Compra.css'

function Compra() {
  return (
    <>
      <Encabezado />
        <main>
          <section className="INFO1">
            <h1>CATEGORIAS &gt; ACCESORIOS</h1>
            <div id="info-correa">
              <article className="infocorrea">
                <img src={require('../imagenes/correa1.jpg')} alt="imagen correa" />
              </article>
              <article className="infocorrea2">
                <h2>CORREA PARA PERRO</h2>
                <br />
                <p>
                  ¡Presentamos la correa de perro perfecta! Nuestra correa combina
                  estilo y funcionalidad para paseos seguros y cómodos. Fabricada con
                  materiales duraderos y resistentes, esta correa proporciona un agarre
                  firme y confiable. Además, su diseño ajustable se adapta a perros de
                  diferentes tamaños. ¡Pasea a tu perro con estilo y tranquilidad con
                  nuestra correa de perro!
                </p>
                <p id="precio">$550.00</p>
                <br />
                <button id="b1" className="input-cont">
                  <img src={require('../imagenes/menos.png')} alt="" />
                </button>
                <input id="b2" className="input-cont" type="number" defaultValue={0} />
                <button id="b3" className="input-cont">
                  <img src={require('../imagenes/mas.png')} alt="" />
                </button>
                <br />
                <p />
                <br />
                <button className="agregar-carrito">
                  AGREGAR AL CARRITO
                  <img src={require('../imagenes/carrito-de-compras.png')} alt="" />
                </button>
              </article>
            </div>
          </section>
        </main>
      <Footer />
    </>
     
  );
}
export default Compra;