import React, { useEffect, useState } from 'react';
import { fetchGeneros } from '../../../services/generosServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarGeneroModal from '../modal_editar_genero/modal_editar_genero';

const TableGeneros = ({ searchTerm, refresh }) => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (genero) => {
    setSelectedGenero(genero);
    setShowEdit(true);
  };
  const handleShowDelete = (genero) => {
    setSelectedGenero(genero);
    setShowDelete(true);
  };

  const loadGeneros = async () => {
    // setLoading(true);
    try {
      const data = await fetchGeneros();
      setGeneros(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGeneros();
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
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {generos
            .filter(genero => 
              genero.genero.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(genero => (
              <tr key={genero.id}>
                <td className='col-md-0 text-center'>{genero.id}</td>
                <td className='col-md-11'>{genero.genero}</td>
                <td className='col-md-1'>
                  <Button variant="primary" onClick={() => handleShowEdit(genero)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(genero)}>
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
        onSuccess={loadGeneros}
        type='gênero'
        data={selectedGenero}
      />

      <EditarGeneroModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadGeneros}
        data={selectedGenero}
      />
    </div>
  );
};

export default TableGeneros;
