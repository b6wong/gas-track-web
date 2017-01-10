import gasLogStore from '../../stores/gasLogStore';
import sessionStore from '../../stores/sessionStore';

export function clearGasLog() {
    gasLogStore.reset();
}

export function selectVehicle(vehicleId) {
    gasLogStore.selectVehicle(vehicleId);
    if (gasLogStore.getGasLogs().length === 0) {
        this.fetchGasLogByVehicle(vehicleId);
    }
}

export function toggleNewEntryMode() {
    gasLogStore.toggleNewEntryMode();
}

export function toggleNewVehicleMode() {
    gasLogStore.toggleNewVehicleMode();
}

export function fetchGasLogByVehicle(vehicleId) {
    const initUrl = 'gasLogs/' + vehicleId;
    const url = '//gas-track-server.herokuapp.com/' + initUrl;

    sessionStore.startRequest();

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            gasLogStore.mergeGasLogs(data);
            sessionStore.finishRequest();
        });
}

export function fetchVehicles(email) {
    const initUrl = 'vehicles/' + email;
    const url = '//gas-track-server.herokuapp.com/' + initUrl;

    sessionStore.startRequest();

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            gasLogStore.reset();
            gasLogStore.mergeVehicles(data);
            sessionStore.finishRequest();
        })
}

export function addNewEntry(odometer, volume, octane, cost, isFillUp, tireType) {
    const initUrl = 'gasLog';
    const url = '//gas-track-server.herokuapp.com/' + initUrl;
    const dateTime = new Date();
    const data = 
        {
        "vehicleId": parseInt(gasLogStore.getSelectedVehicle(), 10),
        "odometer": odometer,
        "volume": volume,
        "octane": octane,
        "cost": cost,
        "isFillUp": isFillUp,
        "dateTime": dateTime.getTime(),
        "tireType": tireType
        };

    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseJson => {
        gasLogStore.mergeGasLogs([responseJson]);
        gasLogStore.toggleNewEntryMode();
    })
    .catch(err => {
        console.log(err);
    });
}

export function addNewVehicle(vehicleName, odometer) {
    const initUrl = 'vehicle';
    const url = '//gas-track-server.herokuapp.com/' + initUrl;
    const data = 
        {
        "email": sessionStore.getUserEmail(),    
        "description": vehicleName,
        "odometer": odometer
        };

    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseJson => {
        gasLogStore.mergeVehicles([responseJson]);
        gasLogStore.toggleNewVehicleMode();
    })
    .catch(err => {
        console.log(err);
    });
}
