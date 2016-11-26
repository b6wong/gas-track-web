import gasLogStore from '../../stores/gasLogStore';

export function clearGasLog() {
    gasLogStore.reset();
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
