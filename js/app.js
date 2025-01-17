import { fetchDeliveries, scheduleDelivery, createDrone, addDelivery, markCompleted } from './api.js';

const deliveryList = document.getElementById('deliveryList');
const createDroneBtn = document.getElementById('createDroneBtn');
const createDeliveryBtn = document.getElementById('createDeliveryBtn')

// Render deliveries in the list
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

// Assign a drone to a delivery
window.assignDrone = async (deliveryId) => {
    await scheduleDelivery(deliveryId);
    await renderDeliveries(); // Refresh the list after scheduling
};
window.markCompleted = async (deliveryId) => {
    await markCompleted(deliveryId);
    await renderDeliveries(); // Refresh the list after completing delivery
};

// Create a new drone
createDroneBtn.addEventListener('click', async () => {
    await createDrone();
    alert('Drone created successfully!');
});


// Create a new drone
createDeliveryBtn.addEventListener('click', async () => {
    await addDelivery();
    alert('Delivery created successfully!');
    await renderDeliveries();
});

// Auto-refresh the delivery list every 60 seconds
setInterval(renderDeliveries, 10000);

// Initial render
renderDeliveries();
