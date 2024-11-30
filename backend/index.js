import timer from '../client/components/timer.js';

new timer(
    document.querySelector(".timer-container")
);

const bossModeToggle = document.getElementById("bossModeToggle");

chrome.storage.sync.get("bossMode", (data) => {
    bossModeToggle.checked = data.bossMode || false; 
    updateSwitchUI(bossModeToggle.checked); 
});

bossModeToggle.addEventListener("change", () => {
    const isBossModeOn = bossModeToggle.checked; 
    chrome.storage.sync.set({ bossMode: isBossModeOn }); 
    updateSwitchUI(isBossModeOn); 
});

function updateSwitchUI(isOn) {
    console.log(`Boss Mode is now ${isOn ? "ON" : "OFF"}`); 
    const label = document.querySelector("label[for='bossModeToggle']");
    label.textContent = isOn ? "Boss Mode: ON" : "Boss Mode: OFF"; 
}
