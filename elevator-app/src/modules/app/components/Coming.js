import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';
import {  FormattedMessage } from 'react-intl';
import Alert from '../../utils/components/Alert';
import Floors from './Floors';

const Coming = ({floors}) => {
    const [pressed, setPressed] = useState();

    return pressed ? <div><Floors floors={floors}/></div> 
    : <div>
        <Alert heading="project.alerts.elevator.coming" />
        <FormattedMessage id="project.buttons.coming">{msg =>
            <Button className="col-12" onClick={() => {setPressed(true)}}>
            {msg}
            </Button>
        }</FormattedMessage>

    </div>
}
export default Coming;