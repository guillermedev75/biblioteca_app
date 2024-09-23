import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarEditoraModal from '../modal_editar_editora/modal_editar_editora';
import { fetchEditoras } from '../../../services/editorasServices';

const TableEditoras = ({ searchTerm, refresh }) => {
  const [editoras, setEditoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedEditoras, setSelectedEditora] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (editora) => {
    setSelectedEditora(editora);
    setShowEdit(true);
  };
  const handleShowDelete = (editora) => {
    setSelectedEditora(editora);
    setShowDelete(true);
  };

  const loadEditoras = async () => {
    // setLoading(true);
    try {
      const data = await fetchEditoras();
      setEditoras(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEditoras();
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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editoras
            .filter(editoras => 
              editoras.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(editoras => (
              <tr key={editoras.id}>
                <td className='col-md-1'>{editoras.id}</td>
                <td className='col-md-10'>{editoras.nome}</td>
                <td className='col-md-1'>
                  <Button variant="primary" onClick={() => handleShowEdit(editoras)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(editoras)}>
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
        onSuccess={loadEditoras}
        type='editora'
        data={selectedEditoras}
      />

      <EditarEditoraModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadEditoras}
        data={selectedEditoras}
      />
    </div>
  );
};

export default TableEditoras;
