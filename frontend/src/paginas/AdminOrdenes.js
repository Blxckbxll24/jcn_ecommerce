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
        console.log(respuesta); // Agrega esta línea para verificar la respuesta en la consola
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
          console.log(respuesta);
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
  {Apedidos && Apedidos.map((ausers, index) => {
    if (!ausers || !ausers.id) {
      return null;
    }
    return (
      <tr key={ausers.id}>
        <th scope="row">{ausers.id}</th>
        <td>{ausers.usuario_id}</td>
        <td>{ausers.fecha_compra}</td>
        <td>{ausers.estado}</td>
        <td>{ausers.total}</td>
        <td>
          <div className='pedidos'>
            <button onClick={() => handleEliminarModalOpen(ausers)}>
              <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    );
  })}
  {!Apedidos || Apedidos.length === 0 && (
    <tr>
      <td colSpan="6">No hay órdenes disponibles.</td>
    </tr>
  )}
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
