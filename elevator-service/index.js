const express = require('express');
const cors = require('cors');
const app = express();
const {port, host} = require('./config/app');
const acme = require('./services/acme');
const { dataContainerName } = require('./config/acme');

const AE_NAME = 'App';

const floorContainer = `${dataContainerName}_floor`;
const correctPasswordContainer = `${dataContainerName}_correctPassword`
const stadisticContainer = `${dataContainerName}_stadistics`;


app.use(express.json());
app.use(cors());

app.listen(port, host, () => {
    acme.registerModule(AE_NAME, true, `NAME=${AE_NAME}`,'0', () => {
        acme.registerSubscription(AE_NAME, 'Screen', dataContainerName, () => console.log(`Subscription of ${AE_NAME} to Screen created!`));
        acme.registerSubscription('Screen', AE_NAME, correctPasswordContainer, () => console.log(`Subscription of Screen to ${AE_NAME} correctPassword container created!`));
        acme.registerSubscription('Motor', AE_NAME, floorContainer,  () => console.log(`Subscription of Motor to ${AE_NAME} floor container created!`));
    });

});

app.post('/getOut', (req, res) => {
    if(req.body == undefined || req.body.floor == undefined) {
            res.status("400").end();
        return;
    }    
    console.log("USTED", req.body.floor);
    acme.instanciate(AE_NAME, floorContainer, `${req.body.floor}`, () => {
        console.log(`CIN created at ${AE_NAME}/${floorContainer}: value=${req.body.floor}`);            
    })
    res.status("201").end();
})

app.post('/password', (req,res) => {
    if(req.body == undefined || req.body.otp == undefined
        || req.body.floor == undefined) {
            res.status("400").end();
        return;
    }

    if(currentOTP == undefined) {
        res.status("500").end();
        return;
    }

    if(req.body.otp == currentOTP) {
        acme.instanciate(AE_NAME, correctPasswordContainer, "true", () => {
            console.log(`CIN created at ${AE_NAME}/${correctPasswordContainer}: value=true`);
        })
        acme.instanciate(AE_NAME, floorContainer, req.body.floor, () => {
            console.log(`CIN created at ${AE_NAME}/${floorContainer}: value=${req.body.floor}`);            
        })
        acme.instanciate(AE_NAME, floorContainer, req.body.floor, () => {
            console.log(`CIN created at ${AE_NAME}/${stadisticContainer}: value=${req.body.floor}`);            
        })
        res.status("201").end();
    } else {
        acme.instanciate(AE_NAME, correctPasswordContainer, "false", () => {
            console.log(`CIN created at ${AE_NAME}/${correctPasswordContainer}: value=false`);
        })
        res.status("500").end();
    }
});

const getValue = req => req.body['m2m:sgn']['nev']['rep']['m2m:cin']['con'];
let currentOTP;

app.post(`/${AE_NAME}`, (req, res) => {
    currentOTP = getValue(req);
});
