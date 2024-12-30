// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// BEGIN EXTRA CODE
const COUNTER_STORE = "idCounter";
let locked = false;
let currentCounter;
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
async function initializeCounter() {
    currentCounter = JSON.parse((await getItem(COUNTER_STORE)) || "-1");
}
async function getItem(key) {
    if (navigator && navigator.product === "ReactNative") {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        return AsyncStorage.getItem(key);
    }
    if (window) {
        return window.localStorage.getItem(key);
    }
    throw new Error("No storage API available");
}
async function setItem(key, value) {
    if (navigator && navigator.product === "ReactNative") {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        return AsyncStorage.setItem(key, value);
    }
    if (window) {
        return window.localStorage.setItem(key, value);
    }
    throw new Error("No storage API available");
}
// END EXTRA CODE
/**
 * Generates a unique ID based on the current session.
 * @returns {Promise.<string>}
 */
async function GenerateUniqueID() {
    // BEGIN USER CODE
    const sessionId = mx.session.getConfig("sessionObjectId");
    const rnd = Math.round(Math.random() * 10000);
    // eslint-disable-next-line no-unmodified-loop-condition
    while (locked) {
        await sleep(10);
    }
    locked = true;
    if (typeof currentCounter === "undefined") {
        await initializeCounter();
    }
    await setItem(COUNTER_STORE, JSON.stringify(++currentCounter));
    locked = false;
    return `${sessionId}:${currentCounter}:${rnd}`;
    // END USER CODE
}

export { GenerateUniqueID };