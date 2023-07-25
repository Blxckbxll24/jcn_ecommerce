import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../estilos/Encabezado.css';

function Encabezado() {
  const login = localStorage.getItem('token');
  const navegacion = useNavigate();

  const salir = () => {
    localStorage.clear();
    navegacion('/');
  }

  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); // Estado para el contador

  const handleCartClick = (e) => {
    e.preventDefault();
    navegacion('/carrito');
  };

  // Resto del código...

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    setCartItemCount(storedCartItems.length); // Inicializar el contador al cargar el componente

    // Aquí escuchamos los cambios en el carrito y actualizamos el contador
    const updateCartItemCount = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemCount(updatedCartItems.length);
    };

    // Agregamos el evento 'storage' para escuchar cambios en el almacenamiento local desde otras pestañas o ventanas
    window.addEventListener('storage', updateCartItemCount);

    return () => {
      window.removeEventListener('storage', updateCartItemCount);
    };
  }, []);

  return (
    <>
      <header>
        <div className="headerimg">
          <Link to='/'> <img src={require('../imagenes/logo.png')} alt="Logo" /></Link>
        </div>
        <div className="header">
          <Link to='/'>  <h1>
            KingKang
          </h1></Link>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/categorias2'>Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/nosotros'>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/variedad'>Variedad</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Opciones
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to='/contacto'>Contactanos</Link>
                  <a className="dropdown-item" href="#"></a>
                  {/* <Link className="dropdown-item" to='/'>Cerrar Sesión</Link> */}
                  
                  {
                          login ?

                              <>
                                  <a className="dropdown-item" onClick={salir}>Salir</a>
                              </>
                          :
                              <>
                                  <Link className="dropdown-item" to="/registro">Acceder</Link>
                              </>
                      }
                      <Link className="dropdown-item" to='/loginadmin'>Admin</Link>
                      
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="perfil">
          <Link to='/login'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              className="bi bi-person-circle" viewBox="0 0 16 16">
              <path
                d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg></Link>
        </div>
        <div className="carrito">
          <Link to='/carrito' onClick={handleCartClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              className="bi bi-basket2-fill" viewBox="0 0 16 16">
              <path
                d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />
            </svg></Link>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
