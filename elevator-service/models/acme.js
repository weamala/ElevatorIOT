const fetch = require('node-fetch');
const {ACP_NAME, CSE_RELEASE, CSE_NAME, originator} = require('../config/acme');
const {port, host} = require('../config/app');

const ENDPOINT = "http://127.0.0.1:8080";
const MY_IP = `http://127.0.0.1:${port}`
const ty = {
    ACP:1, AE: 2, CNT:3, CI:4, SUB: 23
}

let req = 0;
const getReq = () => ++req;

const fetchACME = (url, ty, body, onSuccess=console.log, onErrors, originator) => fetch(`${ENDPOINT}/${CSE_NAME}${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': `application/json;ty=${ty}`,
        'X-M2M-Origin':originator,
        'X-M2M-RVI': CSE_RELEASE,
        'X-M2M-RI': `req${getReq()}`,
        'Connection': 'close'
    }, 
    body: body ? JSON.stringify(body) : null
}).then(response => {
    if (response.ok) onSuccess(response) 
    else if(onErrors) onErrors(response) 
    else console.log(response)
    }).catch(onErrors);

const createAE = (ae, onSuccess, onErrors) => {

    fetchACME('',ty.AE,{
        'm2m:ae': {
            'api': `N.org.demo.${ae}`,
            'rn': ae,
            'srv':[`${CSE_RELEASE}`],
            'rr':true, 
            'poa': [`${MY_IP}/${ae}`]
        }
    },onSuccess,onErrors, originator);
}

const createACP = (ae, acp, onSuccess, onErrors) => {
    fetchACME(`/${ae}`, ty.ACP, {
        'm2m:acp': {
            'rn': acp,
            'pv': {
                'acr': [{
                    'acor': ['all'],
                    'acop':63
                }]
            },
            'pvs': {
                'acr': [{
                    'acor': ['all'],
                    'acop': 63
                }]
            }
        }
    }, onSuccess, onErrors, originator);
}

const createCNT = (ae, cnt, onSuccess, onErrors) => {
    fetchACME(`/${ae}`, ty.CNT, {
        'm2m:cnt': {
            'mni':10, // Max number of instances
            'rn': cnt,
            'acpi':[`${CSE_NAME}/${ae}/${ACP_NAME}`]
        }
    },onSuccess,onErrors, originator);
}

const createCI = (ae, cnt, ciContent, onSuccess, onErrors) => {
    fetchACME(`/${ae}/${cnt}`,ty.CI, {
        'm2m:cin': {
            'con': ciContent
        }
    },onSuccess,onErrors, originator)
}

const createSUB = (subscriptor, broadcaster, container, onSuccess, onErrors) => {
    fetchACME(`/${broadcaster}/${container}`, ty.SUB, {
        'm2m:sub': {
            'rn': `SUB_${subscriptor}`,
            'nu': [`${CSE_NAME}/${subscriptor}`],
            'enc': {
                'net':[3]
            }
        }
    },onSuccess,onErrors, `Cae-${subscriptor}`);
}

module.exports = {
    createAE, createCNT, createCI, createSUB, createACP
}