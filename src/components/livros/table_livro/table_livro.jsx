import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarLivroModal from '../modal_editar_livro/modal_editar_livro';
import { fetchLivros } from '../../../services/livrosServices';

const TableLivros = ({ searchTerm, refresh }) => {
  const [livro, setLivro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (livro) => {
    setSelectedLivro(livro);
    setShowEdit(true);
  };
  const handleShowDelete = (livro) => {
    setSelectedLivro(livro);
    setShowDelete(true);
  };

  const loadLivros = async () => {
    try {
      const data = await fetchLivros();

      setLivro(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLivros();
  }, [refresh]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Capa</th>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>ISBN</th>
            <th>Gêneros</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livro
            .filter(livros => 
              livros.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(livros => (
              <tr key={livros.id}>
                <td className='col-md-0 text-center align-middle'>{livros.id}</td>
                <td className='col-md-0 text-center  align-middle'>
                  <img width='50px' src={livros.cover} alt="Capa do livro" />
                </td>
                <td className='col-md-5 align-middle'>{livros.titulo}</td>
                <td className='col-md-2 align-middle'>{livros.autor.nome}</td>
                <td className='col-md-1 align-middle'>{livros.editora.nome}</td>
                <td className='col-md-1 align-middle'>{livros.isbn}</td>
                <td className='col-md-1 align-middle'>{livros.generos.map(generos => (`${generos.genero},`))}</td>
                <td className='col-md-0 align-middle'>
                  <Button variant="primary" onClick={() => handleShowEdit(livros)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(livros)}>
                    <FontAwesomeIcon icon={faTrash} />    
                  </Button>{' '}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DeleteModal 
        show={showDelete} 
        handleClose={handleCloseDelete} 
        onSuccess={loadLivros}
        type='livro'
        data={selectedLivro}
      />

      <EditarLivroModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadLivros}
        data={selectedLivro}
      />
    </div>
  );
};

export default TableLivros;
