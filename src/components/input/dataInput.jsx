import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const DataInput = (props) => {
    
    const { onDataChange } = props;

    const [dia, setDia] = useState(1);
    const [mes, setMes] = useState(1);
    const [ano, setAno] = useState(2000);
    const [diasNoMes, setDiasNoMes] = useState([]);

    const calcularDiasDoMes = (mes, ano) => {
        if ([1, 3, 5, 7, 8, 10, 12].includes(mes)) return 31;
        if (mes === 2) return ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0) ? 29 : 28;
        return 30;
    };

    useEffect(() => {
        const numDias = calcularDiasDoMes(mes, ano);
        const diasArray = Array.from({ length: numDias }, (_, i) => i + 1);
        setDiasNoMes(diasArray);
        if (dia > numDias) setDia(1);
    }, [dia, mes, ano]);

    useEffect(() => {
        onDataChange(`${ano}-${mes}-${dia}`);
    }, [dia, mes, ano, onDataChange]);

    useEffect(() => {
        if(props.today) {
            const currentDate = new Date();
            setDia(currentDate.getDate()); 
            setMes(currentDate.getMonth() + 1);
            setAno(currentDate.getFullYear());
        }
    },[props.today])

    useEffect(() => {
        if(props.nextMonth) {
            const currentDate = new Date();
            setDia(currentDate.getDate()); 
            setMes(currentDate.getMonth() + 2);
            setAno(currentDate.getFullYear());
        }
    },[props.nextMonth])

    useEffect(() => {
        if(props.data){
            const dataArray = props.data.split('-');
            setDia(Number(dataArray[2]));
            setMes(Number(dataArray[1]) + 1);
            setAno(Number(dataArray[0]));
        }
    },[props.data])

    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{props.label}</Form.Label>
            <div className="d-flex">
                <Form.Select
                    aria-label="Selecione o dia"
                    value={dia}
                    onChange={(e) => setDia(Number(e.target.value))}
                    autoFocus
                    style={{maxWidth:'15%', marginRight: '5px'}}
                >
                    <option value="" disabled>Dia</option>
                    {diasNoMes.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select
                    aria-label="Selecione o mês"
                    value={mes}
                    onChange={(e) => setMes(Number(e.target.value))}
                    style={{maxWidth:'15%', marginRight: '5px'}}
                >
                    <option value="" disabled>Mês</option>
                    {[...Array(12).keys()].map((m) => (
                        <option key={m + 1} value={m + 1}>
                            {m + 1}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select
                    aria-label="Selecione o ano"
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                    style={{maxWidth:'30%'}}
                >
                    <option value="" disabled>Ano</option>
                    {Array.from({ length: 9 }, (_, i) => ano - 4 + i).map((ano) => (
                        <option key={ano} value={ano}>
                            {ano}
                        </option>
                    ))}
                </Form.Select>
            </div>

        </Form.Group>
    );
};

export default DataInput;
