import gasLogStore from '../../stores/gasLogStore';

export function clearGasLog() {
    gasLogStore.reset();
}

export function selectVehicle(vehicleId) {
    gasLogStore.selectVehicle(vehicleId);
}

export function toggleNewEntryMode() {
    gasLogStore.toggleNewEntryMode();
}

export function fetchGasLogByVehicle(vehicleId) {
    const initUrl = 'gasLogs/' + vehicleId;
    const url = '//gas-track-server.herokuapp.com/' + initUrl;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            gasLogStore.mergeGasLogs(data);
        });
}

export function fetchVehicles() {
    const data = [
        {"id": "1", "description":"2017 VW Tiguan"},
        {"id": "2", "description":"Car 2"},
        {"id": "7", "description":"Car 3"}
    ];
    gasLogStore.mergeVehicles(data);
}

export function addNewEntry(odometer, volume, octane, cost, isFillUp) {
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
        "dateTime": dateTime.getTime()
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

