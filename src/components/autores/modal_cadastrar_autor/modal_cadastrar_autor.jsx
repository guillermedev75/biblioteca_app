import React, { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { createAutores } from '../../../services/autoresServices';

const CadastrarAutoresModal = ({ show, handleClose, onSuccess }) => {
    const [autorNome, setAutorNome] = useState('');
    const [autorAno, setAutorAno] = useState('');
    const [autorSexo, setAutorSexo] = useState('');
    const [autorPais, setAutorPais] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const autorData = {
                nome: autorNome,
                ano_nascimento: autorAno,
                sexo: autorSexo,
                pais_origem: autorPais,
            }

            await createAutores(autorData);
            setToastMessage('Autor cadastrado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            setAutorNome('');
            setAutorAno('');
            setAutorSexo('');
            setAutorPais('');
            onSuccess();
            handleClose();
        } catch (error) {
            console.error("Erro ao cadastrar o autor:", error);
            setToastMessage("Erro ao cadastrar autor.");
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ zIndex: '10000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Autor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: José, Pedro, Antonio"
                                value={autorNome}
                                onChange={(e) => setAutorNome(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Ano de Nascimento</Form.Label>
                            <Form.Control
                                type="Text"
                                placeholder="Ex.: 2001, 1971, 1882..."
                                value={autorAno}
                                onChange={(e) => setAutorAno(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
                            aria-label="Default select example"
                            value={autorSexo}
                            onChange={(e) => setAutorSexo(e.target.value)}
                            autoFocus
                            > 
                                <option value="" disabled selected>Selecione o sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </Form.Select>
                            <Form.Label>Pais de Origem</Form.Label>
                            <Form.Select
                            aria-label="Default select example"
                            value={autorPais}
                            onChange={(e) => setAutorPais(e.target.value)}
                            autoFocus
                            >
                                <option value="" disabled selected>Selecione um país</option>
                                <option value="AF">Afeganistão</option>
                                <option value="AL">Albânia</option>
                                <option value="DE">Alemanha</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AG">Antígua e Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armênia</option>
                                <option value="AU">Austrália</option>
                                <option value="AT">Áustria</option>
                                <option value="AZ">Azerbaijão</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrein</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Bielorrússia</option>
                                <option value="BE">Bélgica</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BT">Butão</option>
                                <option value="BO">Bolívia</option>
                                <option value="BA">Bósnia e Herzegovina</option>
                                <option value="BW">Botsuana</option>
                                <option value="BR">Brasil</option>
                                <option value="BN">Brunei</option>
                                <option value="BG">Bulgária</option>
                                <option value="BF">Burquina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="CV">Cabo Verde</option>
                                <option value="KH">Camboja</option>
                                <option value="CM">Camarões</option>
                                <option value="CA">Canadá</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CY">Chipre</option>
                                <option value="CO">Colômbia</option>
                                <option value="KM">Comores</option>
                                <option value="CG">Congo</option>
                                <option value="CD">Congo, República Democrática do</option>
                                <option value="CR">Costa Rica</option>
                                <option value="HR">Croácia</option>
                                <option value="CU">Cuba</option>
                                <option value="DK">Dinamarca</option>
                                <option value="DJ">Djibuti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">República Dominicana</option>
                                <option value="EG">Egito</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Guiné Equatorial</option>
                                <option value="ER">Eritreia</option>
                                <option value="EE">Estônia</option>
                                <option value="SZ">Eswatini</option>
                                <option value="US">Estados Unidos</option>
                                <option value="ET">Etiópia</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finlândia</option>
                                <option value="FR">França</option>
                                <option value="GA">Gabão</option>
                                <option value="GM">Gâmbia</option>
                                <option value="GE">Geórgia</option>
                                <option value="DE">Alemanha</option>
                                <option value="GH">Gana</option>
                                <option value="GR">Grécia</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guiné</option>
                                <option value="GW">Guiné-Bissau</option>
                                <option value="GY">Guiana</option>
                                <option value="HT">Haiti</option>
                                <option value="HN">Honduras</option>
                                <option value="HU">Hungria</option>
                                <option value="IS">Islândia</option>
                                <option value="IN">Índia</option>
                                <option value="ID">Indonésia</option>
                                <option value="IR">Irã</option>
                                <option value="IQ">Iraque</option>
                                <option value="IE">Irlanda</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Itália</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japão</option>
                                <option value="JO">Jordânia</option>
                                <option value="KZ">Cazaquistão</option>
                                <option value="KE">Quênia</option>
                                <option value="KI">Quiribati</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Quirguistão</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Letônia</option>
                                <option value="LB">Líbano</option>
                                <option value="LS">Lesoto</option>
                                <option value="LR">Libéria</option>
                                <option value="LY">Líbia</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lituânia</option>
                                <option value="LU">Luxemburgo</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malásia</option>
                                <option value="MV">Maldivas</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Ilhas Marshall</option>
                                <option value="MR">Mauritânia</option>
                                <option value="MU">Maurício</option>
                                <option value="MX">México</option>
                                <option value="FM">Micronésia</option>
                                <option value="MD">Moldávia</option>
                                <option value="MC">Mônaco</option>
                                <option value="MN">Mongólia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MA">Marrocos</option>
                                <option value="MZ">Moçambique</option>
                                <option value="MM">Birmânia</option>
                                <option value="NA">Namíbia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Países Baixos</option>
                                <option value="NZ">Nova Zelândia</option>
                                <option value="NI">Nicarágua</option>
                                <option value="NE">Níger</option>
                                <option value="NG">Nigéria</option>
                                <option value="KP">Coreia do Norte</option>
                                <option value="NO">Noruega</option>
                                <option value="OM">Omã</option>
                                <option value="PK">Paquistão</option>
                                <option value="PW">Palau</option>
                                <option value="PA">Panamá</option>
                                <option value="PG">Papua-Nova Guiné</option>
                                <option value="PY">Paraguai</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Filipinas</option>
                                <option value="PL">Polônia</option>
                                <option value="PT">Portugal</option>
                                <option value="QA">Catar</option>
                                <option value="RE">Reunião</option>
                                <option value="RO">Romênia</option>
                                <option value="RU">Rússia</option>
                                <option value="RW">Ruanda</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">São Tomé e Príncipe</option>
                                <option value="SA">Arábia Saudita</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Sérvia</option>
                                <option value="SC">Seicheles</option>
                                <option value="SL">Serra Leoa</option>
                                <option value="SG">Cingapura</option>
                                <option value="SK">Eslováquia</option>
                                <option value="SI">Eslovênia</option>
                                <option value="SB">Ilhas Salomão</option>
                                <option value="SO">Somália</option>
                                <option value="ZA">África do Sul</option>
                                <option value="KR">Coreia do Sul</option>
                                <option value="ES">Espanha</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudão</option>
                                <option value="SR">Suriname</option>
                                <option value="SE">Suécia</option>
                                <option value="CH">Suíça</option>
                                <option value="SY">Síria</option>
                                <option value="TJ">Tajiquistão</option>
                                <option value="TZ">Tanzânia</option>
                                <option value="TH">Tailândia</option>
                                <option value="TG">Togo</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad e Tobago</option>
                                <option value="TN">Tunísia</option>
                                <option value="TR">Turquia</option>
                                <option value="TM">Turcomenistão</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ucrânia</option>
                                <option value="AE">Emirados Árabes Unidos</option>
                                <option value="GB">Reino Unido</option>
                                <option value="US">Estados Unidos</option>
                                <option value="UY">Uruguai</option>
                                <option value="UZ">Uzbequistão</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnã</option>
                                <option value="YE">Iémen</option>
                                <option value="ZM">Zâmbia</option>
                                <option value="ZW">Zimbábue</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1000000' }} 
                bg={toastVariant}
                autohide
                delay={3000}
                className='text-white'
            >
                <Toast.Header>
                    <strong className="me-auto">Notificação</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    );
};

export default CadastrarAutoresModal;