import express from "express";
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from "body-parser";


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
    const sql = "select * from usuarios where correo_electronico= ? and contrasenia= ? ";
    console.log(peticion.body);
    conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia],
        (error, resultado) => {
            if (error) return respuesta.json({ mensaje: "error" })
            if (resultado.length > 0) {
                const token = jwt.sign({ usuario: 'administrador' }, 'coto', { expiresIn: '1d' });
                respuesta.cookie(token);
                return respuesta.json({ Estatus: "CORRECTO", Usuario: token })
            } else {
                return respuesta.json({ Estatus: "ERROR", Error: "usuario o contraseña incorrecta" });
            }
        })
})
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
    const sql = "select * from administrador where correo_electronico= ? and contrasenia= ? ";
    console.log(peticion.body);
    conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia],
        (error, resultado) => {
            if (error) return respuesta.json({ mensaje: "error" })
            if (resultado.length > 0) {
                const token = jwt.sign({ usuario: 'administrador' }, 'admin', { expiresIn: '1d' });
                respuesta.cookie(token);
                return respuesta.json({ Estatus: "CORRECTO", Usuario: token })
            } else {
                return respuesta.json({ Estatus: "ERROR", Error: "usuario o contraseña incorrecta" });
            }
        })
})

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


//iniciar el servidor

app.listen(8082, () => {
    console.log("servidor iniciado");
});
