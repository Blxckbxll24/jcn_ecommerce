import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function ACategorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryAdded, setCategoryAdded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8082/admincategorias')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          setCategorias(respuesta.data.contenido);
        } else {
          console.log("Error");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, [categoryAdded]); // Add categoryAdded to the dependency array

  const handleAgregarModalOpen = () => {
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => {
    setShowAgregarModal(false);
    setNombreCategoria('');
    setDescripcionCategoria('');
    setCategoryAdded(false); // Reset the categoryAdded state to false
  };

  const handleGuardarClick = (e) => {
    e.preventDefault();
    if (!nombreCategoria || !descripcionCategoria || !selectedImage) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const nuevaCategoria = {
      Nombre_Categoria: nombreCategoria,
      Descripcion: descripcionCategoria,
    };

    const formData = new FormData();
    formData.append('Nombre_Categoria', nuevaCategoria.Nombre_Categoria);
    formData.append('Descripcion', nuevaCategoria.Descripcion);
    formData.append('imagen', selectedImage);

    axios.post('http://localhost:8082/admincategorias', formData)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          const updatedCategorias = [...categorias, respuesta.data.contenido];
          setCategorias(updatedCategorias);
          handleAgregarModalClose();
        } else {
          console.log("Error al guardar la categoría");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };

  const handleEditarModalOpen = (categoria) => {
    setShowEditarModal(true);
    setCategoriaId(categoria.id_Categoria);
    setNombreCategoria(categoria.Nombre_Categoria);
    setDescripcionCategoria(categoria.Descripcion);
  };

  const handleEditarModalClose = () => {
    setShowEditarModal(false);
    setCategoriaId('');
    setNombreCategoria('');
    setDescripcionCategoria('');
    setProductoSeleccionado(null); 
  };

  const handleEditarClick = (e) => {
    e.preventDefault();
    if (!nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const categoriaEditada = {
      Nombre_Categoria: nombreCategoria,
      Descripcion: descripcionCategoria,
    };

    const formData = new FormData();
    formData.append('Nombre_Categoria', categoriaEditada.Nombre_Categoria);
    formData.append('Descripcion', categoriaEditada.Descripcion);
    if (selectedImage) {
      formData.append('imagen', selectedImage);
    }

    axios
      .put(`http://localhost:8082/admincategorias/${categoriaId}`, formData)
      .then((respuesta) => {
        if (respuesta.data.ESTATUS === 'EXITOSO') {
          const updatedCategorias = categorias.map((categoria) => {
            if (categoria.id_Categoria === categoriaId) {
              return { ...categoria, ...categoriaEditada };
            }
            return categoria;
          });
          setCategorias(updatedCategorias);
          handleEditarModalClose();
        } else {
          console.log('Error al editar la categoría');
        }
        console.log(respuesta);
      })
      .catch((error) => console.log(error));
  };

  const handleEliminarModalOpen = (categoria) => {
    setShowEliminarModal(true);
    setCategoriaId(categoria.id_Categoria);
  };

  const handleEliminarModalClose = () => {
    setShowEliminarModal(false);
    setCategoriaId('');
  };
  
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleEliminarClick = () => {
    axios.delete(`http://localhost:8082/admincategorias/${categoriaId}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          const updatedCategorias = categorias.filter((categoria) => categoria.id_Categoria !== categoriaId);
          setCategorias(updatedCategorias);
          handleEliminarModalClose();
        } else {
          console.log("Error al eliminar la categoría");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };
  
  const isLoggedIn = !!localStorage.getItem('adminToken'); //redirigir    copiar y pegar en los demas pags del admin

  if (!isLoggedIn) {
    navigate('/loginadmin');
    return null; 
  }

  return (
    <>
      <ANavbar />
      <>
        <h1 className='titulo_dash'>Categorías</h1>
        <div className='but'>
          <Button id='verde' onClick={handleAgregarModalOpen}>Agregar</Button>
          <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Categoria</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Botones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => {
              if (!categoria || !categoria.id_Categoria) {
                return null;
              }
              return (
                <tr key={categoria.id_Categoria}>
                  <td>{categoria.Nombre_Categoria}</td>
                  <td>{categoria.Descripcion}</td>
                  <td>
                    <div className='pedidos'>
                      <button onClick={() => handleEditarModalOpen(categoria)}>
                        <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </button>
                      <button onClick={() => handleEliminarModalOpen(categoria)}>
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
          </tbody>
        </table>


        {/* Modal Agregar */}
        <Modal show={showAgregarModal} onHide={handleAgregarModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Agregar Categoría</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      <div className="form-group">
        <label htmlFor="nombreCategoria">Nombre de la categoría:</label>
        <input
          type="text"
          className="form-control"
          id="nombreCategoria"
          required=''
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcionCategoria" required=''>Descripción:</label>
        <textarea
          className="form-control"
          id="descripcionCategoria"
          rows="3"
          value={descripcionCategoria}
          onChange={(e) => setDescripcionCategoria(e.target.value)}
          required='' 
        ></textarea>

        <label htmlFor="imagenCategoria">Imagen de la categoría:</label>
        <input
          type="file"
          className="form-control"
          id="imagenCategoria"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleAgregarModalClose}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={handleGuardarClick}>
      Guardar
    </Button>
  </Modal.Footer>
</Modal>



<Modal show={showEditarModal} onHide={handleEditarModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Categoría</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      <div className="form-group">
        <label htmlFor="descripcionCategoria">Descripción:</label>
        <textarea
          className="form-control"
          id="descripcionCategoria"
          rows="3"
          value={descripcionCategoria}
          onChange={(e) => setDescripcionCategoria(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="imagenCategoria">Imagen de la categoría:</label>
        <input
          type="file"
          className="form-control"
          id="imagenCategoria"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={(e) => handleEditarModalClose(e)}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={(e) => handleEditarClick(e)}>
      Guardar
    </Button>
  </Modal.Footer>
</Modal>


<Modal show={showEliminarModal} onHide={handleEliminarModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Eliminar Categoría</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    ¿Estás seguro de que deseas eliminar esta categoría?
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
        {/* Fin del modal Eliminar */}
      </>
    </>
  );
}

export default ACategorias;
