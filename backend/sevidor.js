import express from "express";
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path';


//crear la instancia de express

const app = express();
app.use(express.json());
app.use(cors());
const conexion = mysql.createConnection({
    server: 'localhost',
    user: 'root',
    password: '',
    database: 'King_Kang'
});

conexion.connect(function (error) {
    if (error) {
        console.log("Error en la bd")
    } else {
        console.log("conectado exitosamente")
    }
});

//consultar la lista de mascotas
app.get('/obtenercategorias', (peticion, respuesta) => {
    const sql = "select * from Categoria where estatus=1";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

// acceso
app.post('/login', (peticion, respuesta) => {
    const sql = "SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasenia = ? AND estatus = 1";
    console.log(peticion.body);
    conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia], (error, resultado) => {
        if (error) return respuesta.json({ mensaje: "error" });

        if (resultado.length > 0) {
            // Generar el token JWT con la información del usuario
            const token = jwt.sign({ usuario: 'administrador' }, 'coto', { expiresIn: '1d' });
            
            // Enviar el token en la respuesta en el campo 'token'
            return respuesta.json({ Estatus: "CORRECTO", token });
        } else {
            return respuesta.json({ Estatus: "ERROR", Error: "Usuario o contraseña incorrecta" });
        }
    });
});
// registro
app.post('/registro', (peticion, respuesta) => {
    const sql = "insert into usuarios(nombre_usuario, correo_electronico,contrasenia,n_telefono) values(?,?,?,?) ";
    console.log(peticion.body);
    conexion.query(sql, [peticion.body.nombre_usuario, peticion.body.correo_electronico, peticion.body.contrasenia,
    peticion.body.n_telefono],
        (error, resultado) => {
            if (error) return respuesta.json({ mensaje: "error" })
            return respuesta.json({ Estatus: "CORRECTO" });
        });
});

app.get('/obteneraccesorios', (peticion, respuesta) => {
    const sql = "select * from Productos where id_Categoria=1";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

app.get('/obtenerhigiene', (peticion, respuesta) => {
    const sql = "select * from Productos where id_Categoria=2";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});
app.get('/obtenermedicamentos', (peticion, respuesta) => {
    const sql = "select * from Productos where id_Categoria=3";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

//login admin
app.post('/loginadmin', (peticion, respuesta) => {
    const sql = "select * from usuarios where correo_electronico= ? and contrasenia= ? and estatus= 2";
    console.log(peticion.body);
    conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia],
        (error, resultado) => {
            if (error) return respuesta.json({ mensaje: "error" });
            if (resultado.length > 0) {
                const token = jwt.sign({ usuario: 'administrador' }, 'admin', { expiresIn: '1d' });
                // Establecer la cookie del token en la respuesta
                respuesta.cookie('adminToken', token, { httpOnly: true, maxAge: 86400000 }); // 1 día en milisegundos
                return respuesta.json({ Estatus: "CORRECTO", token: token });
            } else {
                return respuesta.json({ Estatus: "ERROR", Error: "usuario o contraseña incorrecta" });
            }
        });
});


app.get('/admincategorias', (peticion, respuesta) => {
    const sql = "select * from Categoria where estatus=1";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});


app.get('/adminproductos', (peticion, respuesta) => {
    const sql = "select * from Productos ";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});
app.get('/adminusers', (peticion, respuesta) => {
    const sql = "select * from Usuarios ";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

// Editar una categoría
app.put('/admincategorias/:id', (peticion, respuesta) => {
    const idCategoria = peticion.params.id;
    const { Nombre_Categoria, Descripcion } = peticion.body;

    const sql = "UPDATE Categoria SET Nombre_Categoria = ?, Descripcion = ? WHERE id_Categoria = ?";
    conexion.query(sql, [Nombre_Categoria, Descripcion, idCategoria], (error, resultado) => {
        if (error) {
            return respuesta.json({ ESTATUS: "ERROR", Error: "Error al editar la categoría" });
        }
        return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
    });
});

// Eliminar una categoría
app.delete('/admincategorias/:id', (peticion, respuesta) => {
    const idCategoria = peticion.params.id;

    const sql = "DELETE FROM Categoria WHERE id_Categoria = ?";
    conexion.query(sql, [idCategoria], (error, resultado) => {
        if (error) {
            return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar la categoría" });
        }
        return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
    });
});


 app.post('/admincategorias', (peticion, respuesta) => {
     const { Nombre_Categoria, Descripcion } = peticion.body;

     const sql = "INSERT INTO Categoria (Nombre_Categoria, Descripcion) VALUES (?, ?)";
     conexion.query(sql, [peticion.body.Nombre_Categoria, peticion.body.Descripcion], (error, resultado) => {
       if (error) {
             return respuesta.json({ ESTATUS: "ERROR", Error: "Error al agregar la categoría" });
        }
         const nuevaCategoria = { id: resultado.insertId, Nombre_Categoria, Descripcion };
         return respuesta.json({ ESTATUS: "EXITOSO", contenido: nuevaCategoria });
     });
});


app.get('/variedad', (peticion, respuesta) => {
    const sql = "select * from Productos ";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});


app.post('/admincategorias', (peticion, respuesta) => {
    const { Nombre_Categoria, Descripcion } = peticion.body;

    const sql = "INSERT INTO Categoria (Nombre_Categoria, Descripcion) VALUES (?, ?)";
    conexion.query(sql, [peticion.body.Nombre_Categoria, peticion.body.Descripcion], (error, resultado) => {
      if (error) {
            return respuesta.json({ ESTATUS: "ERROR", Error: "Error al agregar la categoría" });
       }
        const nuevaCategoria = { id: resultado.insertId, Nombre_Categoria, Descripcion };
        return respuesta.json({ ESTATUS: "EXITOSO", contenido: nuevaCategoria });
    });
});

app.post('/adminproductos', (peticion, respuesta) => {
    const { Nombre_Producto, Precio, id_Categoria } = peticion.body;
  
    const sql = "INSERT INTO Productos (Nombre_Producto, Precio, id_Categoria) VALUES (?, ?, ?)";
    conexion.query(sql, [Nombre_Producto, Precio, id_Categoria], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al agregar el producto" });
      }
      const nuevoProducto = { id: resultado.insertId, Nombre_Producto, Precio, id_Categoria };
      return respuesta.json({ ESTATUS: "EXITOSO", contenido: nuevoProducto });
    });
  });

  app.delete('/adminproductos/:id', (peticion, respuesta) => {
    const idProducto = peticion.params.id;
  
    const sql = "DELETE FROM Productos WHERE id_Producto = ?";
    conexion.query(sql, [idProducto], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar el producto" });
      }
      return respuesta.json({ ESTATUS: "EXITOSO", mensaje: "Producto eliminado correctamente" });
    });
  });



  app.post('/adminusers', (peticion, respuesta) => {
    const { nombre_usuario, correo_electronico, contrasenia, n_telefono, estatus } = peticion.body;
    const sql = 'INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasenia, n_telefono, estatus) VALUES (?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre_usuario, correo_electronico, contrasenia, n_telefono, estatus], (error, resultado) => {
      if (error) {
        console.log(error);
        resrespuesta.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al agregar un usuario' });
      } else {
        respuesta.json({ ESTATUS: "EXITOSO", MENSAJE: 'Usuario agregado exitosamente' });
      }
    });
  });

  app.put('/adminusers/:id', (peticion, respuesta) => {
    const idUsuario = peticion.params.id;
    const { nombre_usuario, correo_electronico, contrasenia, n_telefono, estatus } = peticion.body;
  
    const sql = "UPDATE Usuarios SET nombre_usuario = ?, correo_electronico = ?, contrasenia = ?, n_telefono = ?, estatus = ? WHERE id = ?";
    conexion.query(sql, [nombre_usuario, correo_electronico, contrasenia, n_telefono, estatus, idUsuario], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al actualizar el usuario" });
      }
      return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
    });
  });

  app.delete('/adminusers/:id', (peticion, respuesta) => {
    const idUsuario = peticion.params.id;
    const sql = 'DELETE FROM usuarios WHERE id = ? and estatus= 1';
  
    conexion.query(sql, [idUsuario], (error, resultado) => {
      if (error) {
        console.log(error);
        respuesta.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al eliminar el usuario' });
      } else {
        respuesta.json({ ESTATUS: "EXITOSO", MENSAJE: 'Usuario eliminado exitosamente' });
      }
    });
  });

  app.post('/adminproductos', (req, res) => {
    const { Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus } = req.body;
    const sql = 'INSERT INTO Productos (Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conexion.query(sql, [Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus], (error, resultado) => {
      if (error) {
        console.log(error);
        res.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al agregar un producto' });
      } else {
        const nuevoProducto = {
          id: resultado.insertId,
          Nombre_Producto,
          Precio,
          Cantidad_Stock,
          id_Proveedor,
          id_Categoria,
          Descripcion,
          Estatus,
        };
        res.json({ ESTATUS: 'EXITOSO', contenido: nuevoProducto });
      }
    });
  });

  app.put('/adminproductos/:id', (peticion, respuesta) => {
    const idProducto = peticion.params.id;
    const { Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus } = peticion.body;
  
    const sql = 'UPDATE Productos SET Nombre_Producto = ?, Precio = ?, Cantidad_Stock = ?, id_Proveedor = ?, id_Categoria = ?, Descripcion = ?, Estatus = ? WHERE id_Producto = ?';
    conexion.query(sql, [Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus, idProducto], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al actualizar el producto' });
      }
      return respuesta.json({ ESTATUS: 'EXITOSO', mensaje: 'Producto actualizado correctamente' });
    });
  });
  
  app.delete('/adminproductos/:id', (peticion, respuesta) => {
    const idProducto = peticion.params.id;
  
    const sql = "DELETE FROM Productos WHERE id_Producto = ?";
    conexion.query(sql, [idProducto], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar el producto" });
      }
      return respuesta.json({ ESTATUS: "EXITOSO", mensaje: "Producto eliminado correctamente" });
    });
  });
  
  //consultar la lista de mascotas
app.get('/adminpedidos', (peticion, respuesta) => {
    const sql = "select * from Pedidos";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

app.delete('/adminpedidos/:num_pedido', (peticion, respuesta) => {
    const numPedido = peticion.params.num_pedido;
  
    const sql = "DELETE FROM Pedidos WHERE Num_Pedido = ?";
    conexion.query(sql, [numPedido], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar el pedido" });
      }
      return respuesta.json({ ESTATUS: "EXITOSO", mensaje: "Pedido eliminado correctamente" });
    });
  });

//iniciar el servidor

app.listen(8082, () => {
    console.log("servidor iniciado");
});
