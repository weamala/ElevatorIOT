const express = require('express');
const cors = require('cors');
const app = express();
const {port, host} = require('./config/app');
const acme = require('./services/acme');
const { dataContainerName } = require('./config/acme');

const AE_NAME = 'Stadistics';

const stadisticContainer = `${dataContainerName}_stadistics`;


app.use(express.json());
app.use(cors());

app.listen(port, host, () => {
    acme.registerModule(AE_NAME, false, `NAME=${AE_NAME}`,'0', () => {
        acme.registerSubscription('Stadistics', 'App', stadisticContainer, () => console.log(`Subscription of ${AE_NAME} to App created!`));
    });
});


const getValue = req => req.body['m2m:sgn']['nev']['rep']['m2m:cin']['con'];
const data = {}


app.post(`/${AE_NAME}`, (req, res) => {
    const now = new Date();
    const hour = `${now.getHours()}`
    const minutes = now.getMinutes() < 30 ? "00" : "30";
    const value = `${getValue(req)}`;
    if (data[hour] && data[hour][minutes]){
        data[hour][minutes][value]++;
    }else {
        data[hour] = new Object();
        data[hour][minutes] = new Object();
        data[hour][minutes][value] = 0;
    }
    console.log(data);

    processData(data);

    res.send(200);
});


const NUM_FLOORS = 2;
const processData = async data => {
    const now = new Date();
    const hour = `${now.getHours()}`
    const minutes = now.getMinutes() < 30 ? "00" : "30";
    if (data[hour] && data[hour][minutes]){
        const bigger = 0;
        const idx = 0;
        for(let i = 0; i <= NUM_FLOORS; i++){
            const v = data[hour][minutes][`${i}`];
            if(v > bigger){
                idx = i;
                bigger = v;
            }
        }
    }

    if(bigger > 120) {
        // We could call the elevator to the floor idx because have been called more than 120 times at this specific time...
        // We would create a container at this AE and subscribe the motor to that container.
    }
}