import { fetchDeliveries, scheduleDelivery, createDrone, addDelivery, markCompleted } from './api.js';

const deliveryList = document.getElementById('deliveryList');
const createDroneBtn = document.getElementById('createDroneBtn');
const createDeliveryBtn = document.getElementById('createDeliveryBtn')

async function renderDeliveries() {
    const deliveries = await fetchDeliveries();
    if (!deliveries) return;

    deliveryList.innerHTML = ''; // Clear the list

    deliveries.forEach((delivery) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        listItem.innerHTML = `
            <div class="col-sm">
                ${delivery.address} - ${delivery.drone ? 'Drone Assigned' : 'No Drone Assigned'} - ${ new Date(delivery.expectedDeliveryTime).toLocaleString()}
            </div>
            <div class="col-sm">
                <button 
                    class="btn btn-sm btn-success ${delivery.drone ? 'disabled' : ''}" 
                    onclick="assignDrone(${delivery.id})"
                >
                    Assign Drone
                </button> 
            </div>
            <div>
                <button 
                    class="btn btn-sm btn-success ${delivery.drone ? '' : 'disabled'}" 
                    onclick="markCompleted(${delivery.id})"
                >
                    Finish Drone
                </button>
            </div>
        `;

        deliveryList.appendChild(listItem);


    });
}

window.assignDrone = async (deliveryId) => {
    await scheduleDelivery(deliveryId);
    await renderDeliveries(); // Refresh the list after scheduling
};
window.markCompleted = async (deliveryId) => {
    await markCompleted(deliveryId);
    await renderDeliveries(); // Refresh the list after completing delivery
};

createDroneBtn.addEventListener('click', async () => {
    await createDrone();
    alert('Drone created successfully!');
});


createDeliveryBtn.addEventListener('click', async () => {
    await addDelivery();
    alert('Delivery created successfully!');
    await renderDeliveries();
});

setInterval(renderDeliveries, 10000);

renderDeliveries();
