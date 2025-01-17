const API_BASE_URL = 'http://localhost:8080';

export async function fetchDeliveries() {
    try {
        const response = await fetch(`${API_BASE_URL}/deliveries`);
        if (!response.ok) throw new Error('Failed to fetch deliveries');
        return await response.json();
    } catch (error) {
        console.error('Error fetching deliveries:', error);
    }
}

export async function scheduleDelivery(deliveryId) {
    try {
        const response = await fetch(`${API_BASE_URL}/deliveries/schedule?deliveryId=${deliveryId}`,
            { method: 'POST' });
        if (!response.ok) throw new Error('Failed to schedule delivery');
        return await response.json();
    } catch (error) {
        console.error('Error scheduling delivery:', error);
    }
}
export async function markCompleted(deliveryId) {
    try {
        const response = await fetch(`${API_BASE_URL}/deliveries/finish?deliveryId=${deliveryId}`,
            { method: 'POST' });
        if (!response.ok) throw new Error('Failed to complete delivery');
        return await response.json();
    } catch (error) {
        console.error('Error completing delivery:', error);
    }
}

export async function createDrone() {
    try {
        const response = await fetch(`${API_BASE_URL}/drones/add`, { method: 'POST' });
        if (!response.ok) throw new Error('Failed to create drone');
        return await response.json();
    } catch (error) {
        console.error('Error creating drone:', error);
    }
}
export async function addDelivery(){
    try {
        const requestBody = {
            "pizzaId": 1,
            "address": "Simulationroad 10"
        }
        const response = await fetch(
            `${API_BASE_URL}/deliveries/add`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(requestBody)});
        if (!response.ok) throw new Error('Failed to create delivery');
        return await response.json();
    } catch (error) {
        console.error('Error creating delivery:', error);
    }
}