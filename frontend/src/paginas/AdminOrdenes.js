import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function AOrdenes() {
  const navigate = useNavigate();
  const [Apedidos, setApedidos] = useState([]);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const isLoggedIn = !!localStorage.getItem('adminToken');

  useEffect(() => {
    axios.get('http://localhost:8082/adminordenes')
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

    axios.delete(`http://localhost:8082/adminordenes/${pedidoSeleccionado.id}`)
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

  if (!isLoggedIn) {
    navigate('/loginadmin');
    return null;
  }

  return (
    <>
      <ANavbar />
      <>
        <h1 className='titulo_dash'>Ordenes</h1>
        <div className='but'>
          <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">usuario_id</th>
              <th scope="col">fecha de compra</th>
              <th scope="col">estado</th>
              <th scope="col">total</th>
              <th scope="col">botones</th>
            </tr>
          </thead>
          <tbody>
            {Apedidos.map((ausers, index) => (
              <tr>
                <th scope="row">{ausers.id}</th>
                <td>{ausers.usuario_id}</td>
                <td>{ausers.fecha_compra}</td>
                <td>{ausers.estado}</td>
                <td>{ausers.total}</td>
                <td>
                  <div className='pedidos'>
                    <button onClick={() => handleEliminarModalOpen(ausers)}>
                      <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        {/* ... (código del icono) */}
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
            <p>¿Estás seguro de que quieres eliminar el pedido con número de orden <strong>{pedidoSeleccionado ? pedidoSeleccionado.id : ''}</strong>?</p>
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

export default AOrdenes;
