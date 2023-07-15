import React from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Contacto.css';
import Navbar from "../componentes/Navbar";

import facebookImage from '../imagenes/facebook.png';
import instagramImage from '../imagenes/instagram.png';
import twitterImage from '../imagenes/gorjeo.png';
import whatsappImage from '../imagenes/whatsapp.png';


function Contacto() {
  return (
    <>
      <Encabezado />
      <Navbar />
        <main>
          <h2 className="nom">Contactanos</h2>

          <div className="cont">
            <div className="iconos">
              <img src={facebookImage} alt="facebook" />
              <img src={instagramImage} alt="instagram" />
              <img src={twitterImage} alt="twitter" />
              <img src={whatsappImage} alt="whatsapp" />
            </div>
            <div className="ask-cont">
              <input type="text" className="input-text" placeholder="Escribe aquí" />
              <button className="send-button">Enviar</button>
            </div>
          </div>
        </main>
        <Footer />
    </>
  );
}

export default Contacto;
