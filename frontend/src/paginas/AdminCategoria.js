// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
// import '../estilos/AdminCategorias.css';

// function ACategorias() {
//   const [ACategorias, setACategorias] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/admincategorias')
//       .then(respuesta => {
//         if (respuesta.data.ESTATUS === "EXITOSO") {
//           setACategorias(respuesta.data.contenido);
//         } else {
//           console.log("Error");
//         }
//         console.log(respuesta);
//       })
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <>

//       <h1 className='titulo_dash'>Categorias</h1>
//       <div className='but'>
//         <Link to='/'><button id='verde'>Agregar</button></Link>
//         <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
//       </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">id</th>
//             <th scope="col">Categoria</th>
//             <th scope="col">Descripcion</th>
//             <th scope="col">Botones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ACategorias.map((acategoria, index) => (
//             <tr key={acategoria.id_Categoria}>
//               <th scope="row">{acategoria.id_Categoria}</th>
//               <td>{acategoria.Nombre_Categoria}</td>
//               <td>{acategoria.Descripcion}</td>
//               <td>
//                 <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
//   <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
// </svg></button>
//                 <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
//                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
//                   <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
//                 </svg></button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default ACategorias;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function ACategorias() {
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/admincategorias')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          setCategorias(respuesta.data.contenido);
          setFilteredCategorias(respuesta.data.contenido);
        } else {
          console.log("Error");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredCategorias = categorias.filter((categoria) => {
      return categoria.Nombre_Categoria.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCategorias(filteredCategorias);
  }, [categorias, searchTerm]);

  const handleAgregarModalOpen = () => {
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => {
    setShowAgregarModal(false);
    setNombreCategoria('');
    setDescripcionCategoria('');
  };

  const handleGuardarClick = () => {
    const nuevaCategoria = {
      Nombre_Categoria: nombreCategoria,
      Descripcion: descripcionCategoria,
    };

    axios.post('http://localhost:8082/admincategorias', nuevaCategoria)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          const updatedCategorias = [...categorias, respuesta.data.contenido];
          setCategorias(updatedCategorias);
          setFilteredCategorias(updatedCategorias);
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
  };

  const handleEditarClick = () => {
    const categoriaEditada = {
      Nombre_Categoria: nombreCategoria,
      Descripcion: descripcionCategoria
    };

    axios.put(`http://localhost:8082/admincategorias/${categoriaId}`, categoriaEditada)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          const updatedCategorias = categorias.map((categoria) => {
            if (categoria.id_Categoria === categoriaId) {
              return { ...categoria, ...categoriaEditada };
            }
            return categoria;
          });
          setCategorias(updatedCategorias);
          setFilteredCategorias(updatedCategorias);
          handleEditarModalClose();
        } else {
          console.log("Error al editar la categoría");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };

  const handleEliminarModalOpen = (categoria) => {
    setShowEliminarModal(true);
    setCategoriaId(categoria.id_Categoria);
  };

  const handleEliminarModalClose = () => {
    setShowEliminarModal(false);
    setCategoriaId('');
  };

  const handleEliminarClick = () => {
    axios.delete(`http://localhost:8082/admincategorias/${categoriaId}`)
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          const updatedCategorias = categorias.filter((categoria) => categoria.id_Categoria !== categoriaId);
          setCategorias(updatedCategorias);
          setFilteredCategorias(updatedCategorias);
          handleEliminarModalClose();
        } else {
          console.log("Error al eliminar la categoría");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <ANavbar />
      <>
        <h1 className='titulo_dash'>Categorias</h1>
        <div className='but'>
          <Button id='verde' onClick={handleAgregarModalOpen}>Agregar</Button>
          <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
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
              <th scope="col">id</th>
              <th scope="col">Categoria</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Botones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategorias.map((categoria, index) => (
              <tr key={categoria.id_Categoria}>
                <th scope="row">{categoria.id_Categoria}</th>
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
            ))}
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
                  value={nombreCategoria}
                  onChange={(e) => setNombreCategoria(e.target.value)}
                />
              </div>
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
                <label htmlFor="descripcionCategoria">Imagen</label>
                <form action="/profile" method="post" enctype="multipart/form-data">
                  <input type="file" name="avatar" />
                </form>
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
        {/* Fin del modal Agregar */}

        {/* Modal Editar */}
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditarModalClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleEditarClick}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Fin del modal Editar */}

        {/* Modal Eliminar */}
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
