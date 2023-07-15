import React from "react";
import { Link } from "react-router-dom";
import '../estilos/Footer.css';
import { useNavigate } from 'react-router-dom';


function Footer() {
    const login=localStorage.getItem('usuario');
    const navegacion=useNavigate();
    
    const salir=()=>{
        localStorage.clear();
        navegacion('/');
    }
    return (
        <>
 <footer>
 <nav className="admin-1">
                <ul className="admin">
                    {
                        login ?
                            <>
                                <a onClick={salir}>Salir</a>
                            </>
                            :
                            <>
                                <Link to="/loginadmin">Admin</Link>
                            </>
                    }

                </ul>
            </nav>

 </footer>
        </>
    )
}
export default Footer  ;
