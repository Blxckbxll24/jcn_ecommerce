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
       {/* GOOGLE FONTs */}
       <>
  <link
    href="https://fonts.googleapis.com/css?family=Quicksand"
    rel="stylesheet"
  />
  {/* FONT AWESOME */}
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossOrigin="anonymous"
  />
  {/* ANIMATE CSS */}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"
  />
  <div className="content">
    <h1 className="logo">Contáctanos</h1>
    <div className="contact-wrapper animated bounceInUp">
      <div className="contact-form">
        <h3 className="spi">Contactanos</h3>
        <form action="https://formsubmit.co/kingkangwebsite@gmail.com" method="POST">
          <p className="worth">
            <label className="tele">Nombre</label>
            <input className="speak" type="text" name="Nombre" />
          </p>
          <p className="worth">
            <label className="tele">Correo Electronico</label>
            <input className="speak" type="email" name="Correo Electronico" />
          </p>
          <p className="worth">
            <label className="tele">Telefono</label>
            <input className="speak" type="tel" name="Telefono" />
          </p>
          <p className="worth">
            <label className="tele">Asunto</label>
            <input className="speak" type="text" name="Asunto" />
          </p>
          <p className="worth">
            <label className="tele">Mensaje</label>
            <textarea
              className="gurls"
              name="Mensaje"
              rows={3}
              defaultValue={""}
            />
          </p>
          <p className="block">
            <button className="nabe">Enviar</button>
            <input type="hidden" name="_next" id="viewAlerta" value={"http://localhost:3000/ContactoProcesado"} />
            <input type="hidden" name="_captcha" value={"false"} />
            <input type="hidden" name="_template" value={"table"}/>
            <input type="hidden" name="_autoresponse" value={"tu mensaje personalizado"}/>
          </p>
        </form>
      </div>
      <div className="contact-info">
        <h4 className="mov">Informacion</h4>
        <ul className="more">
          <li className="key">
            <i className="fas fa-map-marker-alt" />
            Carretera Cancún-Aeropuerto, S.M 299-Km. 11.5, 77565 Q.R.
          </li>
          <li className="key">
            <i className="fas fa-phone" /> (+52) 999 023 7654
          </li>
          <li className="key">
            <i className="fas fa-envelope-open-text" /> kingkang@website.com
          </li>
        </ul>
        <p className="wanna">
          Un gusto atenderte, seras atendido en una horas, nuestro equipo se
          pondra en contacto con usted{" "}
        </p>
        <p className="wanna">King Kang.com</p>
      </div>
    </div>
  </div>
</>
        <Footer />
    </>
  );
}

export default Contacto;
