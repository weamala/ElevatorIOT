import { Button, FormControl, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Coming from './Coming';
import backend from '../../../backend';
import ErrorAlert from '../../utils/components/ErrorAlert';
import { FormattedMessage } from 'react-intl';
import Alert from '../../utils/components/Alert';

const floors = [0,1,2];

const Password = () => {
    const {floor} = useParams();
    const [token, setToken] = useState();
    const [pass, setPass] = useState();
    const [coming, setComing] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [noPassword, setNoPassword] = useState(false);


    return coming ? <Coming token={token} floors={floors}/> : <form>

        <Alert heading="project.text.password"/>

        <InputGroup>
        <FormattedMessage id="project.placeholder.password">{placeholder =>
                <FormControl
                placeholder={placeholder}
                pattern="\d{4}"
                onChange={e => setPass(e.target.value)}
            />
        }</FormattedMessage>

            <InputGroup.Append>
                <Button variant="outline-primary" onClick={() => {
                    backend.sendPassword(pass, floor, response => {
                        setComing(true);
                    }, response => {
                        if(response.status === 400) {
                            setNoPassword(true);
                        } else if(response.status === 500) {
                            setInvalidPass(true);
                        }
                    });
                }}>submit</Button>
            </InputGroup.Append>
        </InputGroup>

        {invalidPass && <ErrorAlert
            heading="project.alerts.password.incorrect.header" 
            text="project.alerts.password.incorrect.body" 
            onClose={() => setInvalidPass(false)}
            style={{marginTop:"20px"}}/>
        }

        {noPassword && <ErrorAlert
            heading="project.alerts.password.noPassword.header" 
            text="project.alerts.password.noPassword.body" 
            onClose={() => setNoPassword(false)}
            style={{marginTop:"20px"}}/>
        }

    </form>
};

export default Password;