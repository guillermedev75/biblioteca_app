import { useState, useEffect } from "react";
import { fetchLivros } from "../../services/livrosServices";

const Showroom = ({searchTerm}) => {

    const [livros, setLivros] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLivros = async () => {
        try {
            const data = await fetchLivros();

            setLivros(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLivros();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className="d-flex mt-4">
            {livros
                .filter(livro =>
                    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(livro => (
                    <div className="col-md-2 m-2">
                        <img height='250px' width='175px' src={livro.cover} alt="Capa do livro" />
                        <h5>{livro.titulo}</h5>
                        <h6>{livro.autor.nome}</h6>
                    </div>
                ))}
        </div>
    )
}

export default Showroom;