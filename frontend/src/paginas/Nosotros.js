import React from "react";
import Encabezado from "../componentes/Encabezado";
import Footer from "../componentes/Pie_de_pagina";
import '../estilos/Nosotros.css';
import Navbar from "../componentes/Navbar";

function Nosotros() {
    return (
        <>
            <Encabezado />
            <Navbar />
            
                <main>
                    <section className="INFO">
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
                        </div>
                    </section>
                </main>

                <Footer />
            
        </>
    );
}
export default Nosotros;