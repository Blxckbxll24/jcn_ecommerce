import React from "react";
import '../estilos/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Clock from "./Reloj";





function ANavbar() {
  const login = localStorage.getItem('adminToken');
  const navegacion = useNavigate();

  const salir = () => {
    localStorage.clear();
    navegacion('/');
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ir a
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link class="dropdown-item" to='/admincategorias'>Categorias</Link></li>
                  <li><Link class="dropdown-item" to='/adminpedidos'>Pedidos</Link></li>
                  <li><Link class="dropdown-item" to='/adminproductos'>Productos</Link></li>
                  <li><Link class="dropdown-item" to='/adminusers'>Usuarios</Link></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sesion
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                {login ? (
                    <>
                      <a className="dropdown-item" onClick={salir}>Salir</a>
                    </>
                  ) : null}
                </ul>
              </li>
            </ul>
            <Clock />
          </div>
        </div>
      </nav>

    </>
  )
}
export default ANavbar; 