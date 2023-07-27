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

  const handleEliminarClick = (numOrden) => {
    console.log("Valor de numOrden:", numOrden);
    axios.delete(`http://localhost:8082/adminordenes/${numOrden}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const updatedApedidos = Apedidos.filter(item => item.Num_orden !== numOrden);
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
              <th scope="col">usuario</th>
              <th scope="col">correo_electronico</th>
              <th scope="col">fecha de compra</th>
              <th scope="col">estado</th>
              <th scope="col">total</th>
              <th scope="col">orden</th>
              <th scope="col">botones</th>
            </tr>
          </thead>
          <tbody>
  {Apedidos && Apedidos.map((ausers, index) => {
    if (!ausers || !ausers.nombre_usuario) {
      return null;
    }
    return (
      <tr>
        <th scope="row">{ausers.nombre_usuario}</th>
        <td>{ausers.correo_electronico}</td>
        <td>{ausers.fecha_compra}</td>
        <td>{ausers.estado}</td>
        <td>{ausers.total}</td>
        <td>{ausers.Num_orden}</td>
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
            <p>¿Estás seguro de que quieres eliminar el pedido con número de orden <strong>{pedidoSeleccionado ? pedidoSeleccionado.numOrden: ''}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEliminarModalClose}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => handleEliminarClick(pedidoSeleccionado.Num_orden)}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default AOrdenes;
