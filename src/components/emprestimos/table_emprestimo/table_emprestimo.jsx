import React, { useEffect, useState } from 'react';
import { fetchEmprestimos } from '../../../services/emprestimosServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import ModalDevolucaoEmprestimo from '../modal_devolver_emprestimo/modal_devolver_emprestimo';
import ModalAtrasarEmprestimo from '../modal_atrasar_emprestimo/modal_atrasar_emprestimo';

const TableEmprestimos = ({ searchTerm, refresh }) => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showAtraso, setShowAtraso] = useState(false);
  const [showDevolucao, setShowDevolucao] = useState(false);
  const [selectedEmprestimo, setSelectedEmprestimo] = useState(null);

  const handleCloseDevolucao = () => setShowDevolucao(false);
  const handleCloseAtraso = () => setShowAtraso(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDevolucao = (emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setShowDevolucao(true);
  };
  const handleShowAtraso = (emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setShowAtraso(true);
  };
  const handleShowDelete = (emprestimo) => {
    setSelectedEmprestimo(emprestimo);
    setShowDelete(true);
  };

  const loadEmprestimo = async () => {
    try {
      const data = await fetchEmprestimos();
      setEmprestimos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmprestimo();
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
            <th>Nome do Cliente</th>
            <th>Data do Emprestimo</th>
            <th>Data da Estipulada</th>
            <th>Data da Devolução</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos
            .filter(emprestimo => 
              emprestimo.estoque.livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              || emprestimo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(emprestimo => (
              <tr key={emprestimo.id}>
                <td className='align-middle col-md-0 text-center'>{emprestimo.id}</td>
                <td className='align-middle col-md-1 text-center  align-middle'>
                  <img width='50px' src={emprestimo.estoque.livro.cover} alt="Capa do livro" />
                </td>
                <td className='align-middle col-md-4'>{emprestimo.estoque.livro.titulo}</td>
                <td className='align-middle col-md-3'>{emprestimo.cliente.nome}</td>
                <td className='align-middle col-md-0'>{emprestimo.data_emprestimo}</td>
                <td className='align-middle col-md-0'>{emprestimo.data_limite}</td>
                <td className='align-middle col-md-0'>{emprestimo.data_devolucao}</td>
                <td className='align-middle col-md-1'>
                  <Button variant="success" onClick={() => handleShowDevolucao(emprestimo)}>
                    <FontAwesomeIcon icon={faCheck} />    
                  </Button>{' '}
                  <Button variant="warning" onClick={() => handleShowAtraso(emprestimo)}>
                    <FontAwesomeIcon icon={faClock} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(emprestimo)}>
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
        onSuccess={loadEmprestimo}
        type='emprestimo'
        data={selectedEmprestimo}
      />

      <ModalDevolucaoEmprestimo
        show={showDevolucao} 
        handleClose={handleCloseDevolucao} 
        onSuccess={loadEmprestimo}
        data={selectedEmprestimo}
      />

      <ModalAtrasarEmprestimo
        show={showAtraso} 
        handleClose={handleCloseAtraso} 
        onSuccess={loadEmprestimo}
        data={selectedEmprestimo}
      />
    </div>
  );
};

export default TableEmprestimos;