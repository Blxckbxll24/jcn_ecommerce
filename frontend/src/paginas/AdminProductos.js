

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function AProductos() {
  const [AProductos, setAProductos] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [cantidadStock, setCantidadStock] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categorias, setCategorias] = useState([]);

  
  
  const navigate = useNavigate();



  useEffect(() => {
    axios.get('http://localhost:8082/adminproductos')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          setAProductos(respuesta.data.contenido);
        } else {
          console.log('Error');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, []);

  const handleAgregarModalOpen = () => {
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => {
    setShowAgregarModal(false);
    setNombreProducto('');
    setPrecioProducto('');
    setCantidadStock('');
    setIdCategoria('');
    setDescripcion('');
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };
  function validarCampos() {
    if (!nombreProducto || !precioProducto || !cantidadStock || !idCategoria || !descripcion || !selectedImage) {
      alert("Por favor, completa todos los campos requeridos.");
      return false;
    }
    return true;
  }
  
  const handleGuardarClick = (e) => {
    if (!validarCampos()) {
      return;
    }
    e.preventDefault();
    if (!nombreProducto || !precioProducto || !cantidadStock || !idCategoria || !descripcion || !selectedImage) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    const formData = new FormData();
    formData.append('Nombre_Producto', nombreProducto);
    formData.append('Precio', precioProducto);
    formData.append('Cantidad_Stock', cantidadStock);
    formData.append('id_Categoria', idCategoria);
    formData.append('Descripcion', descripcion);
    formData.append('Estatus', 1);
    formData.append('imagen', selectedImage); // Agregar la imagen al FormData

    axios.post('http://localhost:8082/adminproductos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido
      },
    })
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          setAProductos([...AProductos, respuesta.data.contenido]);
          handleAgregarModalClose();
        } else {
          console.log('Error al guardar el producto');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };

  const handleEditarModalOpen = (producto) => {
    setProductoSeleccionado(producto);
    setIdCategoria(producto.id_Categoria);
    setShowEditarModal(true);
  };

  const handleEditarModalClose = () => {
    setShowEditarModal(false);
    setProductoSeleccionado(null);
  };

  const handleGuardarEdicionClick = (e) => {
    e.preventDefault();
    if (!productoSeleccionado) return;

    const formData = new FormData();
    formData.append('Nombre_Producto', productoSeleccionado.Nombre_Producto);
    formData.append('Precio', productoSeleccionado.Precio);
    formData.append('Cantidad_Stock', productoSeleccionado.Cantidad_Stock);
    formData.append('id_Categoria', productoSeleccionado.id_Categoria);
    formData.append('Descripcion', productoSeleccionado.Descripcion);
    formData.append('Estatus', productoSeleccionado.Estatus);
    formData.append('imagen', selectedImage || productoSeleccionado.imagen); // Usar la imagen seleccionada o la existente

    axios.put(`http://localhost:8082/adminproductos/${productoSeleccionado.id_Producto}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido
      },
    })
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const index = AProductos.findIndex(item => item.id_Producto === productoSeleccionado.id_Producto);
          if (index !== -1) {
            const updatedAProductos = [...AProductos];
            updatedAProductos[index] = productoSeleccionado;
            setAProductos(updatedAProductos);
          }
          handleEditarModalClose();
        } else {
          console.log('Error al actualizar el producto');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };
  
  const handleEliminarModalOpen = (producto) => {
    setProductoSeleccionado(producto);
    setShowEliminarModal(true);
  };

  const handleEliminarModalClose = () => {
    setShowEliminarModal(false);
    setProductoSeleccionado(null);
  };

  const handleEliminarClick = () => {
    if (!productoSeleccionado) return;

    axios.delete(`http://localhost:8082/adminproductos/${productoSeleccionado.id_Producto}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const updatedAProductos = AProductos.filter(item => item.id_Producto !== productoSeleccionado.id_Producto);
          setAProductos(updatedAProductos);
          handleEliminarModalClose();
        } else {
          console.log('Error al eliminar el producto');
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };
  // Función para manejar el cambio en el buscador
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar productos que coincidan con el término de búsqueda
  const filteredProductos = AProductos.filter(aproductos =>
    aproductos.Nombre_Producto.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isLoggedIn = !!localStorage.getItem('adminToken'); //redirigir    copiar y pegar en los demas pags del admin


  if (!isLoggedIn) {
    // Si el usuario no está logueado, redirigir a la página de inicio de sesión
    navigate('/login');
    return null; // Puedes retornar algo si deseas mostrar un mensaje o componente mientras redirige
  }

  const categoriasOptions = [
    { value: '1', label: 'Accesorios' },
    { value: '2', label: 'Higiene' },
    { value: '3', label: 'Medicamentos' },
  ];

  return (
    <>
        <ANavbar/>
    <>
      <h1 className="titulo_dash">Productos</h1>
      <div className="but">
        <button id="verde" onClick={handleAgregarModalOpen}>Agregar</button>
        <Link to="/dashboard"><button id="azul">Regresar</button></Link>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar categoría..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>

            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad en Stock</th>
            <th scope="col">ID de la Categoría</th>
            <th scope="col">Descripción</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((aproductos, index) => (

            <tr key={aproductos.id_producto}>
              <td>{aproductos.Nombre_Producto}</td>
              <td>${aproductos.Precio}.00</td>
              <td>{aproductos.Cantidad_Stock}</td>
              <td>{aproductos.id_Categoria}</td>

              <td>{aproductos.Descripcion}</td>
              <td>
                <div className='pedidos'>
                  <button onClick={() => handleEditarModalOpen(aproductos)}>                  <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg></button>
                  <button onClick={() => handleEliminarModalOpen(aproductos)}>                  <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg></button>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <Modal show={showAgregarModal} onHide={handleAgregarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="nombreProducto">Nombre del Producto:</label>
            <input
              type="text"
              className="form-control"
              id="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="precioProducto">Precio:</label>
            <input
              type="number"
              className="form-control"
              id="precioProducto"
              value={precioProducto}
              onChange={(e) => setPrecioProducto(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cantidadStock">Cantidad en Stock:</label>
            <input
              type="number"
              className="form-control"
              id="cantidadStock"
              value={cantidadStock}
              onChange={(e) => setCantidadStock(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label htmlFor="idCategoria">Categoría:</label>
  <select
    className="form-control"
    id="idCategoria"
    value={idCategoria}
    onChange={(e) => setIdCategoria(e.target.value)}
  >
  
    <option value={0}>Seleccionar</option>
      
        {categoriasOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
         </select>
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              className="form-control"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label htmlFor="imagenProducto">Imagen del Producto:</label>
          <input
            type="file"
            className="form-control"
            id="imagenProducto"
            onChange={handleImageChange}
          />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAgregarModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarClick}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar productos */}
      <Modal show={showEditarModal} onHide={handleEditarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="nombreProducto">Nombre del Producto:</label>
            <input
              type="text"
              className="form-control"
              id="nombreProducto"
              value={productoSeleccionado ? productoSeleccionado.Nombre_Producto : ''}
              onChange={(e) => setProductoSeleccionado({
                ...productoSeleccionado,
                Nombre_Producto: e.target.value,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="precioProducto">Precio:</label>
            <input
              type="number"
              className="form-control"
              id="precioProducto"
              value={productoSeleccionado ? productoSeleccionado.Precio : ''}
              onChange={(e) => setProductoSeleccionado({
                ...productoSeleccionado,
                Precio: e.target.value,
              })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cantidadStock">Cantidad en Stock:</label>
            <input
              type="number"
              className="form-control"
              id="cantidadStock"
              value={productoSeleccionado ? productoSeleccionado.Cantidad_Stock : ''}
              onChange={(e) => setProductoSeleccionado({
                ...productoSeleccionado,
                Cantidad_Stock: e.target.value,
              })}
            />
          </div>
          <div className="form-group">
          <label htmlFor="idCategoria">Categoría:</label>
          <select
        className="form-control"
        id="idCategoria"
        value={productoSeleccionado ? productoSeleccionado.id_Categoria : ''}
        onChange={(e) =>
          setProductoSeleccionado({
            ...productoSeleccionado,
            id_Categoria: e.target.value,
          })
        }
      >
   <option value={0}>Seleccionar</option>
  {categoriasOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
         </select>
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              className="form-control"
              id="descripcion"
              value={productoSeleccionado ? productoSeleccionado.Descripcion : ''}
              onChange={(e) => setProductoSeleccionado({
                ...productoSeleccionado,
                Descripcion: e.target.value,
              })}
            />
          </div>
          <div className="form-group">
          <label htmlFor="imagenProducto">Imagen del Producto:</label>
          <input
            type="file"
            className="form-control"
            id="imagenProducto"
            onChange={handleImageChange}
          />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditarModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarEdicionClick}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEliminarModal} onHide={handleEliminarModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres eliminar el producto <strong>{productoSeleccionado ? productoSeleccionado.Nombre_Producto : ''}</strong>?</p>
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

export default AProductos;
