import React from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Inicio.modules.css';
import Navbar from "../componentes/Navbar";

function Inicio() {
    return (
        <>
            <Encabezado />
            
                <main>
                <h1 class="klan">King Kang Inc.</h1>

<div class="baha">
   <div class="lxp1">
  <p class="subtitulo"></p>
  <p class="p1">
       En King Kang Veterinary Clinic, nos apasiona proporcionar cuidado de alta
       calidad y compasión a las mascotas que son parte de su familia. Somos una
       clínica veterinaria de vanguardia ubicada en el corazón de la ciudad, y
       nos enorgullece ofrecer una amplia gama de servicios médicos y de
       bienestar para gatos, perros, aves y pequeños mamíferos. Nuestro equipo de
       médicos veterinarios altamente capacitados y amantes de los animales está
       comprometido con la salud y el bienestar de sus mascotas. Con años de
       experiencia en medicina veterinaria, nos esforzamos por mantenernos
       actualizados con los avances más recientes en la atención veterinaria para
       brindarle el mejor tratamiento posible.
  </p>
  </div>
<div class="feel">
<img src={require('../imagenes/mages-imagen1.jpg')} href="" className="nosotros11"  />
</div>
  </div>


<div class="baha2">
  <div class="feel2">
  <img src={require('../imagenes/imagendeperro.jpg')} href="" className="nosotros22"  />
  </div>
  <div class="lxp2">

      <p class="p2">       En King Kang, entendemos que cada mascota es única, y nos tomamos el
       tiempo para conocer a cada una de ellas individualmente. Nos enfocamos en
       una medicina preventiva sólida para mantener a sus mascotas sanas y
       felices durante toda su vida. Desde chequeos anuales y vacunaciones hasta
       cirugías y tratamiento de enfermedades, nuestro equipo está aquí para
       brindarle el mejor cuidado posible. Además de nuestra atención médica,
       creemos en educar y empoderar a los dueños de mascotas para que tomen
       decisiones informadas sobre la salud y el bienestar de sus animales.
      </p>
   </div>
</div>


  <div class="baha3">
      <div class="lxp3">
          <p class="p3">       KingKang siempre sera una de las empresas comprometidas en esta nación,
      porque nos importa el cuidado de los animalitos, darles amor y entregarles
       los cuidados, mas eficazes es lo que hacer un empresa exitosa, tener
       resultados exitosos, por eso cada uno de nuestros usuarios seran premiados
       cuando sean frecuentemente en la veterianria, también tendran promociones,
       por lo cual kingkan se enorgullese ser parte de los cuidados de cada uno
       de sus mascotas y tener la confianza de que estaran seguras en nuestras
       manos.
          </p>
      </div>
      <div class="feel3">
      <img src={require('../imagenes/gatitoimagen.jpg')} href="" className="nosotros33"  />
      </div>
  </div>                   
                        </main>

                <Footer />
            
        </>
    );
}
export default Inicio;