import gasLogStore from '../../stores/gasLogStore';

export function clearGasLog() {
    gasLogStore.reset();
}

export function selectVehicle(vehicleId) {
    gasLogStore.selectVehicle(vehicleId);
}

export function selectVehicleAtIndex(index) {
    gasLogStore.selectVehicleAtIndex(index);
}

export function setNewEntryMode(newEntryMode) {
    gasLogStore.setNewEntryMode(newEntryMode);
}

export function fetchGasLogByVehicle(vehicleId) {
    const initUrl = 'gasLogs'; // Probably need to add endpoint to lookup by vehicleId
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
        {"id": "3", "description":"Car 3"}
    ];
    gasLogStore.mergeVehicles(data);
}


