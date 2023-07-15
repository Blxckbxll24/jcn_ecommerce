import React, { useEffect } from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Inicio.css';
import Navbar from "../componentes/Navbar";

function Inicio() {
  useEffect(() => {
    // Código personalizado de animación o interactividad
    const images = document.querySelectorAll('.imagenes img');
    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].style.opacity = 0;

      currentIndex = (currentIndex + 1) % images.length;

      images[currentIndex].style.opacity = 1;
    }, 3000);
  }, []);

  return (
    <>
      <Encabezado />
      <Navbar />
      <div className="container11">
        <main>
          <div className="imagenes">
            <img src={require('../imagenes/imagen 1.jpg')} alt="Imagen 1" />
            <img src={require('../imagenes/imagen 2.jpg')} alt="Imagen 2" />
            <img src={require('../imagenes/imagen 3.jpg')} alt="Imagen 3" />
          </div>
          <div className="container_1">
            <img className="image" src={require('../imagenes/imagen 1.jpg')} alt="imagen principal" />
            <p className="dos">
              En King Kang Veterinary Clinic, nos apasiona proporcionar cuidado de alta calidad y compasión a las mascotas que son parte de su familia. Somos una clínica veterinaria de vanguardia ubicada en el corazón de la ciudad, y nos enorgullece ofrecer una amplia gama de servicios médicos y de bienestar para gatos, perros, aves y pequeños mamíferos.
              Nuestro equipo de médicos veterinarios altamente capacitados y amantes de los animales está comprometido con la salud y el bienestar de sus mascotas. Con años de experiencia en medicina veterinaria, nos esforzamos por mantenernos actualizados con los avances más recientes en la atención veterinaria para brindarle el mejor tratamiento posible.
            </p>
          </div>
          <div className="container_2">
            <p className="dos">
              En King Kang, entendemos que cada mascota es única, y nos tomamos el tiempo para conocer a cada una de ellas individualmente. Nos enfocamos en una medicina preventiva sólida para mantener a sus mascotas sanas y felices durante toda su vida. Desde chequeos anuales y vacunaciones hasta cirugías y tratamiento de enfermedades, nuestro equipo está aquí para brindarle el mejor cuidado posible.

              Además de nuestra atención médica, creemos en educar y empoderar a los dueños de mascotas para que tomen decisiones informadas sobre la salud y el bienestar de sus animales. Nuestro personal está siempre disponible para responder a sus preguntas y brindar orientación sobre nutrición, cuidados en el hogar y comportamiento animal.

              En King Kang Veterinary Clinic, tratamos a todas las mascotas como si fueran de nuestra propia familia. Nos esforzamos por establecer relaciones duraderas y construir confianza con nuestros clientes y sus queridos compañeros peludos.

              ¡Gracias por elegir a King Kang Veterinary Clinic para el cuidado de su mascota! Esperamos poder brindarle una experiencia excepcional y mantener a su compañero feliz y saludable.
            </p>
            <img className="image_2" src={require('../imagenes/imagen 1.jpg')} alt="imagen principal" />
          </div>
        </main>

      </div>
      <Footer />
    </>
  );
}

export default Inicio;
