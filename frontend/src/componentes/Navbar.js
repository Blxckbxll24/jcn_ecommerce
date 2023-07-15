import React from "react";
import '../estilos/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';





function Navbar() {
    const login=localStorage.getItem('usuario');
const navegacion=useNavigate();

const salir=()=>{
    localStorage.clear();
    navegacion('/');
}

    return (
        <>
            <nav>
                <ul class="links">
                    <li><Link to="/">INiCIO</Link></li>
                    <li><Link to="/categorias2">CATEGORIAS</Link></li>
                    <li><Link to="/nosotros">NOSOTROS</Link></li>
                    <li><Link to="/contacto">CONTACTO</Link></li>
                    {
                        login ?
                            <>
                                <a onClick={salir}>Salir</a>
                            </>
                            :
                            <>
                                <Link to="/registro">Acceder</Link>
                            </>
                    }

                </ul>
            </nav>
        </>
    )
}
export default Navbar;