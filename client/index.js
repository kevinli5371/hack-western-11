// Get the toggle switch element
const bossModeToggle = document.getElementById("bossModeToggle");

// Load the saved state of Boss Mode when the popup is opened
chrome.storage.sync.get("bossMode", (data) => {
    bossModeToggle.checked = data.bossMode || false; // Set the checkbox state
    updateSwitchUI(bossModeToggle.checked); // Update the switch UI on load
});

// Add an event listener for the toggle switch
bossModeToggle.addEventListener("change", () => {
    const isBossModeOn = bossModeToggle.checked; // Get the current state
    chrome.storage.sync.set({ bossMode: isBossModeOn }); // Save the state
    updateSwitchUI(isBossModeOn); // Update the switch UI dynamically
});

// Function to update the switch UI based on its state
function updateSwitchUI(isOn) {
    console.log(`Boss Mode is now ${isOn ? "ON" : "OFF"}`); // Debugging log
    const label = document.querySelector("label[for='bossModeToggle']");
    label.textContent = isOn ? "Boss Mode: ON" : "Boss Mode: OFF"; // Update label text
}
