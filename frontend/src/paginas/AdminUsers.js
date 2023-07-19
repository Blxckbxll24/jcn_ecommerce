// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";
// import '../estilos/AdminCategorias.css';

// function Ausers() {
//   const [Ausers, setAusers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/adminusers')
//       .then(respuesta => {
//         if (respuesta.data.ESTATUS === "EXITOSO") {
//           setAusers(respuesta.data.contenido);
//         } else {
//           console.log("Error");
//         }
//         console.log(respuesta);
//       })
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <>

//     <h1 className='titulo_dash'>Usuarios</h1>
//     <div className='but'>
//     <Link to='/'><button id='verde'>Agregar</button></Link>
//     <Link to='/dashboard'><button id='azul'>Regresar</button></Link>
//     </div>
//       <table className="table">
//         <thead>
//           <tr>
//             <th scope="col">id</th>
//             <th scope="col">nombre</th>
//             <th scope="col">email</th>
//             <th scope="col">Botones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Ausers.map((ausers, index) => (
//             <tr key={ausers.id}>
//               <th scope="row">{ausers.id}</th>
//               <td>{ausers.nombre_usuario}</td>
//               <td>{ausers.correo_electronico}</td>
//               <td>
//                 <button>modificar</button>
//                 <button>eliminar</button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Ausers;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Modal, Button, Table, Form } from 'react-bootstrap';
import '../estilos/AdminCategorias.css';
import ANavbar from '../componentes/Navdash';

function Ausers() {
  const [Ausers, setAusers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/adminusers')
      .then(respuesta => {
        if (respuesta.data.ESTATUS === "EXITOSO") {
          setAusers(respuesta.data.contenido);
        } else {
          console.log("Error");
        }
        console.log(respuesta);
      })
      .catch(error => console.log(error));
  }, []);
  const statusOptions = [
    { value: 0, label: 'Seleccionar' }, 
    { value: 1, label: 'Usuario' },
    { value: 2, label: 'Administrador' },
  ];

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('1');

  const handleAddUser = () => {
    const newUser = {
      nombre_usuario: username,
      correo_electronico: email,
      contrasenia: password,
      n_telefono: phoneNumber,
      estatus: status === 0 ? 1 : status,
    };

    axios.post('http://localhost:8082/adminusers', newUser)
      .then(response => {
        if (response.data.ESTATUS === 'EXITOSO') {
          console.log('Usuario agregado exitosamente');
          setUsername('');
          setEmail('');
          setPhoneNumber('');
          setPassword('');
          setStatus(0);
          setShowAddModal(false);
        } else {
          console.log('Error al agregar el usuario');
        }
      })
      .catch(error => {
        console.log('Error en la solicitud:', error);
      });
  };

  const handleUpdateUser = () => {
    axios.put(`http://localhost:8082/adminusers/${selectedUser.id}`, selectedUser)
      .then(response => {
        if (response.data.ESTATUS === 'EXITOSO') {
          console.log('Usuario actualizado exitosamente');
          setSelectedUser(null);
          setShowEditModal(false);

          axios.get('http://localhost:8082/adminusers')
            .then(respuesta => {
              if (respuesta.data.ESTATUS === "EXITOSO") {
                setAusers(respuesta.data.contenido);
              } else {
                console.log("Error");
              }
            })
            .catch(error => console.log(error));
        } else {
          console.log('Error al actualizar el usuario');
        }
      })
      .catch(error => {
        console.log('Error en la solicitud:', error);
      });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null); // Restablecer el usuario seleccionado al cerrar el modal
  };

  const handleDeleteUser = (idUsuario) => {
    axios.delete(`http://localhost:8082/adminusers/${idUsuario}`)
      .then(response => {
        if (response.data.ESTATUS === 'EXITOSO') {
          console.log('Usuario eliminado exitosamente');
          // Actualizar la lista de usuarios para mostrar los cambios
          axios.get('http://localhost:8082/adminusers')
            .then(respuesta => {
              if (respuesta.data.ESTATUS === "EXITOSO") {
                setAusers(respuesta.data.contenido);
              } else {
                console.log("Error");
              }
            })
            .catch(error => console.log(error));

          handleCloseDeleteModal(); // Cerrar el modal una vez que se ha eliminado el usuario
        } else {
          console.log('Error al eliminar el usuario');
        }
      })
      .catch(error => {
        console.log('Error en la solicitud:', error);
      });
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredAusers = Ausers.filter((user) =>
    user.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo_electronico.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
    <ANavbar/>
    <>
      <h1 className='titulo_dash'>Usuarios</h1>
      <div className='but'>
        <Button onClick={handleShowAddModal} id='verde'>Agregar</Button>
        <Link to='/dashboard'><Button id='azul'>Regresar</Button></Link>

      </div>
      <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      <Table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">nombre</th>
            <th scope="col">email</th>
            <th scope="col">Botones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAusers.map((ausers) => (
            <tr key={ausers.id}>
              <th scope="row">{ausers.id}</th>
              <td>{ausers.nombre_usuario}</td>
              <td>{ausers.correo_electronico}</td>
              <td>
              <div className='pedidos'>
                <button onClick={() => handleShowEditModal(ausers)}><svg width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg></button>
                <button onClick={() => handleShowDeleteModal(ausers)}> <svg width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
    <Modal.Header closeButton>
      <Modal.Title>Agregar Usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Estatus</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseAddModal}>Cancelar</Button>
      <Button variant="primary" onClick={handleAddUser}>Agregar</Button>
    </Modal.Footer>
  </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.nombre_usuario}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, nombre_usuario: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.correo_electronico}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, correo_electronico: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.n_telefono}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, n_telefono: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={selectedUser.contrasenia}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, contrasenia: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
              <Form.Label>Estatus</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedUser.estatus === 1 ? 'usuario' : 'administrador'}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, estatus: e.target.value === 'usuario' ? 1 : 2 })
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleUpdateUser}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>¿Está seguro que desea eliminar al usuario {selectedUser.nombre_usuario}?</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
          <Button variant="danger" onClick={() => handleDeleteUser(selectedUser.id)}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
    </>
  );
}

export default Ausers;

