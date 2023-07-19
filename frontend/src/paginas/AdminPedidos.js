import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Importamos el componente Modal y Button de react-bootstrap
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function APedidos() {
  const [Apedidos, setApedidos] = useState([]);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

    axios.delete(`http://localhost:8082/adminpedidos/${pedidoSeleccionado.Num_Pedido}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const updatedApedidos = Apedidos.filter(item => item.Num_Pedido !== pedidoSeleccionado.Num_Pedido);
          setApedidos(updatedApedidos);
          handleEliminarModalClose();
        } else {
          console.log('Error al eliminar el pedido');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredApedidos = Apedidos.filter((pedido) =>
    pedido.Num_Pedido.toString().includes(searchTerm) ||
    pedido.Cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.Direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.Telefono.toString().includes(searchTerm) ||
    pedido.Productos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <ANavbar/>
    <>
      <h1 className='titulo_dash'>Usuarios</h1>
      <div className='but'>
        <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar pedido..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">N_Orden</th>
            <th scope="col">Cliente</th>
            <th scope="col">Direccion</th>
            <th scope="col">Telefono</th>
            <th scope="col">productos</th>
            <th scope="col">Total_productos</th>
            <th scope="col">Total_Precio</th>
            <th scope="col">Botones</th>
          </tr>
        </thead>
        <tbody>
          {filteredApedidos.map((ausers, index) => (
            <tr key={ausers.id}>
              <th scope="row">{ausers.Num_Pedido}</th>
              <td>{ausers.Cliente}</td>
              <td>{ausers.Direccion}</td>
              <td>{ausers.Telefono}</td>
              <td>{ausers.Productos}</td>
              <td>{ausers.Total_Productos}</td>
              <td>{ausers.Total_Precio}</td>
              <td> 
                <div className='pedidos'>
                <button onClick={() => handleEliminarModalOpen(ausers)}>                  <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg></button>
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
          <p>¿Estás seguro de que quieres eliminar el pedido con número de orden <strong>{pedidoSeleccionado ? pedidoSeleccionado.Num_Pedido : ''}</strong>?</p>
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
