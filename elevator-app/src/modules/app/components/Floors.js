import React, { useState } from 'react';
import styled from 'styled-components';
import {Container, Button, Row} from 'react-bootstrap';
import backend from '../../../backend/';
import Alert from '../../utils/components/Alert';

const Box = styled(Button)`${({square}) => `
    display:flex;
    align-items:center;
    justify-content:center;
    ${square ? `    
        position: relative;

        &:before {
            content:"";
            float: left;
            padding-top:100%;
        }
    ` : "" }
`}`

const Content = styled.div`
    font-size:50pt;
`

const Floor = ({floor, square, className, onSucess=console.log, clicked=c=>{}}) => <Box square={square} className={`${className}`} onClick={() => {
        backend.getOut(floor, onSucess);
        clicked(true);
    }}>
        <Content>{floor}</Content>
</Box>

const Square = styled(Row)`
    justify-content:space-evenly;
`
const Floors = ({floors}) =>{
    const [clicked, setClicked] = useState(false);
    return clicked ? <Alert heading="project.alerts.end"></Alert> : <Container className="p-3">{
    floors.map((floor,i,a) => i % 2 === 0 && (
        a[i+1] !== undefined ? 
            <Square key={i} className="mb-3 d-flex">
                <Floor className="col-5" floor={floor}  square clicked={setClicked}/>
                <Floor className="col-5" floor={a[i+1]} square clicked={setClicked}/>
            </Square> 
            : 
            <Square key={i} className="d-flex" >
                <Floor className="col-10" floor={floor} clicked={setClicked}/>
            </Square>
        )
    )
}</Container>}

export default Floors;