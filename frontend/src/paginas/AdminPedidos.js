import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';



function APedidos() {
  const [Apedidos, setApedidos] = useState([]);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8082/adminpedidos')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          setApedidos(respuesta.data.contenido);
        } else {
          console.log('Error');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEliminarModalOpen = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowEliminarModal(true);
  };

  const handleEliminarModalClose = () => {
    setShowEliminarModal(false);
    setPedidoSeleccionado(null);
  };

  const handleEliminarClick = () => {
    if (!pedidoSeleccionado) return;

    axios.delete(`http://localhost:8082/adminpedidos/${pedidoSeleccionado.id}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const updatedApedidos = Apedidos.filter(item => item.id !== pedidoSeleccionado.id);
          setApedidos(updatedApedidos);
          handleEliminarModalClose();
        } else {
          console.log('Error al eliminar el pedido');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };

  // Filtrar los pedidos por ID de orden
  const filteredPedidos = Apedidos.filter(
    (ausers) => ausers.orden_id.toString().includes(searchTerm)
  );
  const isLoggedIn = !!localStorage.getItem('adminToken'); //redirigir    copiar y pegar en los demas pags del admin

  if (!isLoggedIn) {
    // Si el usuario no está logueado, redirigir a la página de inicio de sesión
    navigate('/loginadmin');
    return null; // Puedes retornar algo si deseas mostrar un mensaje o componente mientras redirige
  }


  return (
    <>
      <ANavbar />
      <>
        <h1 className='titulo_dash'>Pedidos</h1>
        <div className='but'>
          <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
        </div>
        {/* Agregar el buscador */}
        <div className="search-bar">
          <input
          className="form-control"
            type="text"
            placeholder="Buscar por ID de orden"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">id_orden</th>
              <th scope="col">id_producto</th>
              <th scope="col">Nombre del producto</th>
              <th scope="col">precio</th>
              <th scope="col">cantidad</th>
              <th scope="col">Botones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.map((ausers, index) => (
              <tr key={ausers.id}>
                <th scope="row">{ausers.id}</th>
                <td>{ausers.orden_id}</td>
                <td>{ausers.producto_id}</td>
                <td>{ausers.nombre_producto}</td>
                <td>{ausers.precio}</td>
                <td>{ausers.cantidad}</td>
                <td>
                  <div className='pedidos'>
                    <button onClick={() => handleEliminarModalOpen(ausers)}>
                    <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Modal para eliminar pedidos */}
      <Modal show={showEliminarModal} onHide={handleEliminarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres eliminar el pedido con número de orden <strong>{pedidoSeleccionado ? pedidoSeleccionado.id: ''}</strong>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEliminarModalClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarClick}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </>
  );
}

export default APedidos;
