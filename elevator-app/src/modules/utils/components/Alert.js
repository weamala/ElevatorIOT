import React from 'react';
import { Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const myAlert = ({heading, text, onClose, style, variant="primary"}) => {

    return <div style={style}><Alert variant={variant} onClose={onClose} dismissible={onClose ? true : false}>
            {heading && <FormattedMessage id={heading}>{heading => <Alert.Heading>{heading}</Alert.Heading>}</FormattedMessage>}
            {text && <FormattedMessage id={text}>{text => <p>{text}</p>}</FormattedMessage>}
        </Alert>
    </div>
}

export default myAlert;