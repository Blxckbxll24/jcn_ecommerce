import React from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Nosotros.css';
import Navbar from "../componentes/Navbar";

function Nosotros() {
    return (
        <>
            <Encabezado />
            
                <main>
                <h1 class="klan">Nosotros</h1>

<div class="baha">
   <div class="lxp1">
  <p class="subtitulo"> ¿A que nos dedicamos?</p>
  <p class="p1">
    En King Kang, somos un equipo dedicado de profesionales de la
    veterinaria apasionados por el cuidado y el bienestar de los animales.
    Nuestra clínica veterinaria se enorgullece de ofrecer servicios
    compasivos y de alta calidad para garantizar la salud y felicidad de
    las mascotas. ¡Estamos aquí para cuidar de las mascotas y
    proporcionarles una vida llena de salud y alegría! Bienvenidos a King
    Kang, donde los animales son nuestra pasión y prioridad.!
  </p>
  </div>
<div class="feel">
<img src={require('../imagenes/nosotros.jpeg')} href="" className="nosotros"  />
</div>
  </div>


<div class="baha2">
  <div class="feel2">
  <img src={require('../imagenes/nosotros2.jpeg')} href="" className="nosotros2"  />
  </div>
  <div class="lxp2">
      <p class="subtitulo">¿Quienes somos?</p>
      <p class="p2">La empresa fue creada con el prosposito de ver por el bien de los animalitos,
          por lo cual el cuidado es lo primordial, fue creado para que los animalitos
          tengan una mejor atencion medica, todo esto se visualizo con mucha 
          anticipación, la empresa contara con mas de 6 veterinarios y 5 instalaciones,
          asi como este mismo sitio que brinda información suficiente para que ustede tenga 
          un mejor conocimiento de nosotros.
      </p>
   </div>
</div>


  <div class="baha3">
      <div class="lxp3">
          <p class="subtitulo">Misión</p>
          <p class="p3">Conseguir la satisfacción de cada uno de los clientes, para así brindar una mejor
              atención a cada uno de ustedes, de igual manera brindando un estupendo servicio
              para las mascotas y los clientes, por lo que para nosotros es muy vital el cuidarlos y darles amor.
          </p>
      </div>
      <div class="feel3">
      <img src={require('../imagenes/nosotros3.jpeg')} href="" className="nosotros3"  />
      </div>
  </div>

  <div class="baha4">
      <div class="feel4">
      <img src={require('../imagenes/nosotros4.jpeg')} href="" className="nosotros4"  />
      </div>
      <div class="lxp4">
          <p class="subtitulo">Visión</p>
          <p class="p4">Queremos ser una de las empresas mas gransdes y demandadas mundialmente
              llegando al punto de tener 1000 mil clientes visitando nuestra Aplicación Web,
              colocandonos en ser una de las veterinarias donde mejor dan servicios y brindan
              la mejor atencion medica, de igual manera teniendo certificados y reconocimientos.
          </p>
      </div>
    
  </div>      

                    {/* <section className="INFO">
                        <h1> INICIO &gt; ¿QUIENES SOMOS?</h1>
                        <div id="info-correa">
                            <article className="infocorrea-1">
                                <img
                                    src={require('../imagenes/pexels-tima-miroshnichenko-6234627.jpg')}
                                    alt="imagen correa"
                                />
                            </article>
                            <article className="infocorrea-2">
                                <h2>¿QUIENES SOMOS?</h2>
                                <br />
                                <p>
                                    En King Kang, somos un equipo dedicado de profesionales de la
                                    veterinaria apasionados por el cuidado y el bienestar de los animales.
                                    Nuestra clínica veterinaria se enorgullece de ofrecer servicios
                                    compasivos y de alta calidad para garantizar la salud y felicidad de
                                    las mascotas.
                                </p>
                                <br />
                                <p>
                                    ¡Estamos aquí para cuidar de las mascotas y proporcionarles una vida
                                    llena de salud y alegría! Bienvenidos a King Kang, donde los animales
                                    son nuestra pasión y prioridad.!
                                </p>
                                <br />
                                <img
                                    src={require('../imagenes/pexels-international-fund-for-animal-welfare-5486962.jpg')}
                                    alt=""
                                />
                            </article>
                        </div> */}
                        
        
                </main>

                <Footer />
            
        </>
    );
}
export default Nosotros;