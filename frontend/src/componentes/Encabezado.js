import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../estilos/Encabezado.css';

function Encabezado() {
  const login=localStorage.getItem('token');
  const navegacion=useNavigate();

  
  const salir=()=>{
      localStorage.clear();
      navegacion('/');
  }
    return (
        <>
  <header>
    <div class="headerimg">
     <Link to='/'> <img src={require('../imagenes/logo.png')} /></Link>
    </div>
    <div class="header">
    <Link to='/'>  <h1>
        KingKang
      </h1></Link>
    </div>




    <div class="busqueda">
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to='/'>Inicio</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='/categorias2'>Categorías</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='/nosotros'>Nosotros</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opciones
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link class="dropdown-item" to='/contacto'>Contactanos</Link>
                <a class="dropdown-item" href="#"></a>
                {/* <Link class="dropdown-item" to='/'>Cerrar Sesión</Link> */}
                
                {
                        login ?

                            <>
                                <a class="dropdown-item" onClick={salir}>Salir</a>
                            </>
                        :
                            <>
                                <Link class="dropdown-item" to="/registro">Acceder</Link>
                            </>
                    }
                    
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="perfil">
      <Link to='/login'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-person-circle" viewBox="0 0 16 16">
          <path
            d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg></Link>
    </div>
    <div class="carrito">
      <Link to='/carrito'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-basket2-fill" viewBox="0 0 16 16">
          <path
            d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
        </svg></Link>
    </div>
  </header>
        </>
    )
}
export default Encabezado;
