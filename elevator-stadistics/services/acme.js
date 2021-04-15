const model = require('../models/acme');
const {dataContainerName, descContainerName, commandContainerName, ACP_NAME} = require('../config/acme');

const registerModule = (module, isActuator, intialDescription, initialData, callback) => {
    // 1. Create the ApplicationEntity (AE) for this sensor
    model.createAE(module, result => {
        console.log(`AE ${module} created!`);

        model.createACP(module, ACP_NAME, result => {
            console.log(`ACP ${module} created!`);

            // 2. Create a first container (CNT) to store the description(s) of the sensor
            model.createCNT(module, descContainerName, _result => {

                console.log(`CNT ${module}/${descContainerName} created!`);
                // Create a first description under this container in the form of a ContentInstance (CI)
                model.createCI(module, descContainerName, intialDescription, _result => {
                    console.log(`CI ${module}/${descContainerName}/{initial_description} created!`);

                    // 3. Create a second container (CNT) to store the data  of the sensor
                    model.createCNT(module, dataContainerName, () => {
                        console.log(`CNT ${module}/${dataContainerName} created!`);
                        // Create a first data value under this container in the form of a ContentInstance (CI)
                        model.createCI(module, dataContainerName, initialData, ()=> {
                            console.log(`CI ${module}/${dataContainerName}/{initial_data} created!`);
                            // 4. if the module is an actuator, create a third container (CNT) to store the received commands
                            if (isActuator) {
                                model.createCNT(module, commandContainerName, () => {
                                    console.log("CNT " + module + "/" + commandContainerName + " created !");
                                    // subscribe to any command put in this container
                                    model.createSUB(module, module, commandContainerName, () => {
                                        console.log("SUB " + module + "/" + commandContainerName + "/SUB_" + module + " created !");
                                        if(callback) callback();
                                    });
                                })
                            }
                        });
                    });
                })
            })
        })
    });
}

const registerSubscription = (subscription, broadcaster, container ,callback) => {
    model.createSUB(subscription, broadcaster, container, callback);
}

const instanciate = (ae, cnt, value, callback) => {
    model.createCI(ae, cnt, value, callback)
}
module.exports = {
    registerModule, registerSubscription, instanciate
}