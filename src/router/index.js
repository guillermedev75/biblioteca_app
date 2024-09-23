import { Routes as RouteReactRoutes, Route } from "react-router-dom";
import Home from "../pages/home";
import Generos from "../pages/generos";
import Autores from "../pages/autores";
import Editoras from "../pages/editoras";
import Estoque from "../pages/estoque";
import Clientes from "../pages/clientes";
import Emprestimos from "../pages/emprestimos";
import Livros from "../pages/livros";

const Routes = () => {
    return (
        <RouteReactRoutes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/livros" element={<Livros/>} />
            <Route path="/generos" element={<Generos/>} />
            <Route path="/autores" element={<Autores/>} />
            <Route path="/editoras" element={<Editoras/>} />
            <Route path="/estoque" element={<Estoque/>} />
            <Route path="/clientes" element={<Clientes/>} />
            <Route path="/emprestimos" element={<Emprestimos/>} />
        </RouteReactRoutes>
    );
}

export default Routes;