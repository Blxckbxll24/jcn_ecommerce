import './App.css';
import Compra from './paginas/Compra';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Carrito from './paginas/Carrito';
import Nosotros from './paginas/Nosotros';
import Inicio from './paginas/Inicio';
import Contacto from './paginas/Contacto';
import Categorias from './paginas/Categorias';
import Producto from './paginas/Productos';
import Login from './paginas/Login';
import PagCategorias from './paginas/PagCategorias';
import Accesorios from './paginas/Accesorios';
import Higiene from './paginas/HIgiene';
import Medicamentos from './paginas/Medicamentos';
import Registro from './paginas/Registro';
import Dashboard from './paginas/Dashboard';
import LoginAdmin from './paginas/Login_admin';
import ACategorias from './paginas/AdminCategoria';
import AProductos from './paginas/AdminProductos';
import Ausers from './paginas/AdminUsers';
import Todos from './paginas/Todos';
import PrivateRoute from './componentes/Ruta-Privada';
import APedidos from './paginas/AdminPedidos';
import Protectedroute from './componentes/Ruta-Privada';
import { useLocalStorage } from 'react-use';
import PagoRealizado from './paginas/Pago_Procesado';




function App() {
  const [adminToken, setadminToken]= useLocalStorage('adminToken');
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Inicio/>}></Route>
      <Route path='/compra' element={<Compra/>}></Route>
      <Route path='/carrito' element={<Carrito/>}></Route>
      <Route path='/nosotros' element={<Nosotros/>}></Route>
      <Route path='/contacto' element={<Contacto/>}></Route>
      <Route path='/categorias' element={<Categorias/>}></Route>
      <Route path='/producto' element={<Producto/>}></Route>
      <Route path='/registro' element={<Registro/>}></Route>
      <Route path='/categorias2' element={<PagCategorias/>}></Route>
      <Route path='/Accesorios' element={<Accesorios/>}></Route>
      <Route path='/Higiene' element={<Higiene/>}></Route>
      <Route path='/Medicamentos' element={<Medicamentos/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route element={<Protectedroute canActivate={true} />}>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Route>
      <Route path='/loginadmin' element={<LoginAdmin/>}></Route>
      <Route path='/admincategorias' element={<ACategorias/>}></Route>
      <Route path='/adminproductos' element={<AProductos/>}></Route>
      <Route path='/adminusers' element={<Ausers/>}></Route>
      <Route path='/variedad' element={<Todos/>}></Route>
      <Route path='/adminpedidos' element={<APedidos/>}></Route>
      {/* <Route path="/loginadmin" element={<PrivateRoute element={<LoginAdmin />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
        <Route path='/pagoexitoso' element={<PagoRealizado/>}></Route>
      


    </Routes>
    </BrowserRouter>
  );
}

export default App;
