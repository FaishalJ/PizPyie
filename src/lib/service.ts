import { URL } from "./helpers";
import { IPizza } from "./types";

// get pizza *************************.
export async function getPizzaMenu() {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Oops! Something went wrong Error: " + response.status);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// find max number ***************************.
export function findMaxNumber(arr: IPizza[]) {
    if (arr.length === 0) {
        return undefined;
    }
    let max = arr[0].unitPrice;
    arr.forEach(item => {
        if (item.unitPrice > max) {
            max = item.unitPrice;
        }
    })
    return max;
}

// Format currencies*****************************.
export function formatCurrencies(number: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        number,
    );
}

// Generate random ID ********************************.
export function generateRandomID(length: number = 6) {
    const characters = 'A9C8D7E6F5G4H3I2J1K0LB';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Generate date ***************.
export function generateDate() {
    const date = new Date().toLocaleString();
    return date;
}