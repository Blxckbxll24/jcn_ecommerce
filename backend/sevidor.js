import express from "express";
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";
import path from 'path';
import multer from "multer";


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
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const almacenamiento = multer.diskStorage({
  destination: (peticion, archivo, funcion) => {
    funcion(null, 'public/imagenes'); // Asegúrate de que la carpeta 'public/imagenes' exista
  },

  filename: (peticion, archivo, funcion) => {
    funcion(null, archivo.originalname);
  }
});
const subirfoto =multer({
  storage:almacenamiento
})


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
            const usuarios =resultado[0];
            const token = jwt.sign({ usuario: 'administrador' }, 'coto', { expiresIn: '1d' });
            
            // Enviar el token en la respuesta en el campo 'token'
            respuesta.setHeader('Set-Cookie', `token=${token}`)
            return respuesta.json({ 
              Estatus: "CORRECTO",
               Usuario: token,
              usuariosId:usuarios.id });
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
app.put('/admincategorias/:id', subirfoto.single('imagen'), (req, res) => {
  const idCategoria = req.params.id;
  const { Nombre_Categoria, Descripcion } = req.body;
  const imagen = req.file ? req.file.filename : null; // Check if an image was uploaded

  const sql = "UPDATE Categoria SET Nombre_Categoria = ?, Descripcion = ?, fotos = ? WHERE id_Categoria = ?";
  conexion.query(sql, [Nombre_Categoria, Descripcion, imagen, idCategoria], (error, resultado) => {
      if (error) {
          return res.json({ ESTATUS: "ERROR", Error: "Error al editar la categoría" });
      }
      return res.json({ ESTATUS: "EXITOSO", contenido: resultado });
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





app.post('/admincategorias',subirfoto.single('imagen'),(peticion,respuesta)=>{
  const sql='insert into categoria(Nombre_Categoria,Descripcion,fotos) values(?)';
  const datos=[
      peticion.body.Nombre_Categoria,
      peticion.body.Descripcion,
      peticion.file.filename,

  ]
  conexion.query(sql,[datos],(error,resultado)=>{
      if (error) return respuesta.json({'Estatus':'ERROR'});
      return respuesta.json({'ESTATUS':'EXITOSO'})
  })
})


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

  app.post('/adminproductos', subirfoto.single('imagen'), (peticion, respuesta) => {
    const { Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus } = peticion.body;
    const imagen = peticion.file ? peticion.file.filename : null; // Check if an image was uploaded
  
    const sql = 'INSERT INTO Productos (Nombre_Producto, Precio, Cantidad_Stock, id_Proveedor, id_Categoria, Descripcion, Estatus, fotos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const datos = [
      Nombre_Producto,
      Precio,
      Cantidad_Stock,
      id_Proveedor,
      id_Categoria,
      Descripcion,
      Estatus,
      imagen,
    ];
  
    conexion.query(sql, datos, (error, resultado) => {
      if (error) {
        console.log(error);
        return respuesta.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al agregar un producto' });
      } else {
        const nuevoProducto = {
          id: resultado.insertId,
          Nombre_Producto,
          Precio,
          Cantidad_Stock,
          id_Categoria,
          Descripcion,
          Estatus,
          fotos: imagen,
        };
        return respuesta.json({ ESTATUS: 'EXITOSO', contenido: nuevoProducto });
      }
    });
  });

  app.put('/adminproductos/:id', subirfoto.single('imagen'), (peticion, respuesta) => {
    const idProducto = peticion.params.id;
    const { Nombre_Producto, Precio, Cantidad_Stock, id_Categoria, Descripcion, Estatus } = peticion.body;
    const imagen = peticion.file ? peticion.file.filename : null; // Check if an image was uploaded
  
    // If an image was uploaded, update the "fotos" column in the database as well
    let sql = '';
    let datos = [];
    if (imagen) {
      sql = 'UPDATE Productos SET Nombre_Producto = ?, Precio = ?, Cantidad_Stock = ?, id_Categoria = ?, Descripcion = ?, Estatus = ?, fotos = ? WHERE id_Producto = ?';
      datos = [Nombre_Producto, Precio, Cantidad_Stock, id_Categoria, Descripcion, Estatus, imagen, idProducto];
    } else {
      // If no image was uploaded, skip updating the "fotos" column
      sql = 'UPDATE Productos SET Nombre_Producto = ?, Precio = ?, Cantidad_Stock = ?, id_Categoria = ?, Descripcion = ?, Estatus = ? WHERE id_Producto = ?';
      datos = [Nombre_Producto, Precio, Cantidad_Stock, id_Categoria, Descripcion, Estatus, idProducto];
    }
  
    conexion.query(sql, datos, (error, resultado) => {
      if (error) {
        console.log(error);
        return respuesta.json({ ESTATUS: 'ERROR', MENSAJE: 'Error al actualizar el producto' });
      }
      return respuesta.json({ ESTATUS: 'EXITOSO', mensaje: 'Producto actualizado correctamente' });
    });
  });

  
  //consultar la lista de mascotas
app.get('/adminpedidos', (peticion, respuesta) => {
    const sql = "SELECT * FROM orden_productos";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

app.delete('/adminpedidos/:id', (peticion, respuesta) => {
    const id = peticion.params.id;
  
    const sql = "DELETE FROM orden_productos WHERE id = ?";
    conexion.query(sql, [id], (error, resultado) => {
      if (error) {
        return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar el pedido" });
      }
      return respuesta.json({ ESTATUS: "EXITOSO", mensaje: "Pedido eliminado correctamente" });
    });
  });
  app.get('/adminordenes', (peticion, respuesta) => {
    const sql = "select * from ordenes_usuarios";
    conexion.query(sql, (error, resultado) => {
        // if (error) return respuesta.json({ Respuesta: "Error" })
        // return respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        const json = respuesta.json({ ESTATUS: "EXITOSO", contenido: resultado });
        return json;
        //console.log(json); 
    });
});

app.delete('/adminordenes/:numOrden', (peticion, respuesta) => {
  const numOrden = peticion.params.numOrden;
  console.log(numOrden);

  const sql = "DELETE FROM ordenes WHERE Num_orden = ?";
  conexion.query(sql, [numOrden], (error, resultado) => {
    if (error) {
      return respuesta.json({ ESTATUS: "ERROR", Error: "Error al eliminar el pedido" });
    }
    return respuesta.json({ ESTATUS: "EXITOSO", mensaje: "Pedido eliminado correctamente" });
  });
});


  app.post('/crearorden', (req, res) => {
    // Obtener los datos de la orden desde el cuerpo de la solicitud
    const { usuarioId, fechaCompra, estado, total, productos } = req.body;
  
    // Insertar la orden en la base de datos
    const sqlOrden = 'INSERT INTO Ordenes (usuario_id, fecha_compra, estado, total) VALUES (?, ?, ?, ?)';
    conexion.query(sqlOrden, [usuarioId, fechaCompra, estado, total], (error, resultado) => {
      if (error) {
        console.error('Error al crear la orden en la base de datos:', error);
        return res.status(500).json({ mensaje: 'Error al crear la orden en la base de datos' });
      }
  
      // Obtener el ID de la orden recién creada
      const ordenId = resultado.insertId;
  
      // Insertar los productos de la orden en la base de datos
      const sqlProductoOrden = 'INSERT INTO orden_productos (orden_id, producto_id, Nombre_producto, Precio, Cantidad) VALUES (?, ?, ?, ?, ?)';
      productos.forEach(producto => {
        conexion.query(sqlProductoOrden, [ordenId, producto.id, producto.nombre, producto.precio, producto.cantidad], (error, resultado) => {
          if (error) {
            console.error('Error al agregar los productos de la orden en la base de datos:', error);
            return res.status(500).json({ mensaje: 'Error al agregar los productos de la orden en la base de datos' });
          }
        });
      });
  
      // Respuesta exitosa
      return res.json({ mensaje: 'Orden creada exitosamente' });
    });
  });

//iniciar el servidor

app.listen(8082, () => {
    console.log("servidor iniciado");
});
