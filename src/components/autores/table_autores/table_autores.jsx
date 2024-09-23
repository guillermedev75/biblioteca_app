import React, { useEffect, useState } from 'react';
import { fetchAutores } from '../../../services/autoresServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarAutorModal from '../modal_editar_autor/modal_editar_autor'; // Atualize o caminho conforme necessário

const TableAutores = ({ searchTerm, refresh }) => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAutor, setSelectedAutor] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (autor) => {
    setSelectedAutor(autor);
    setShowEdit(true);
  };
  const handleShowDelete = (autor) => {
    setSelectedAutor(autor);
    setShowDelete(true);
  };

  const loadAutores = async () => {
    try {
      const data = await fetchAutores();
      setAutores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAutores();
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
            <th>Nome</th>
            <th>Ano de Nascimento</th>
            <th>Sexo</th>
            <th>País de Origem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores
            .filter(autor => 
              autor.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(autor => (
              <tr key={autor.id}>
                <td className='col-md-0 text-center'>{autor.id}</td>
                <td className='col-md-8'>{autor.nome}</td>
                <td className='col-md-1'>{autor.ano_nascimento}</td>
                <td className='col-md-1'>{autor.sexo}</td>
                <td className='col-md-1'>{autor.pais_origem}</td>
                <td className='col-md-1'>
                  <Button variant="primary" onClick={() => handleShowEdit(autor)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(autor)}>
                    <FontAwesomeIcon icon={faTrash} />    
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DeleteModal 
        show={showDelete} 
        handleClose={handleCloseDelete} 
        onSuccess={loadAutores}
        type='autor'
        data={selectedAutor}
      />

      <EditarAutorModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadAutores}
        data={selectedAutor}
      />
    </div>
  );
};

export default TableAutores;