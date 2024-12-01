import timer from '../client/components/timer.js';

// Initialize the timer
new timer(
    document.querySelector(".timer-container")
);

const bossModeToggle = document.getElementById("bossModeToggle");

// Retrieve the initial state of Boss Mode from Chrome storage
chrome.storage.sync.get("bossMode", (data) => {
    bossModeToggle.checked = data.bossMode || false;
    updateSwitchUI(bossModeToggle.checked);
});

// Add an event listener for the toggle switch
bossModeToggle.addEventListener("change", async () => {
    const isBossModeOn = bossModeToggle.checked;

    // Save the new state to Chrome storage
    chrome.storage.sync.set({ bossMode: isBossModeOn });
    updateSwitchUI(isBossModeOn);

    if (isBossModeOn) {
        try {
            // Request camera access (triggers browser's native allow/block prompt)
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            console.log("Camera access granted");

            // Create a video element to display the camera feed
            const videoElement = document.createElement("video");
            videoElement.autoplay = true;
            videoElement.srcObject = stream;
            videoElement.style.width = "300px";
            videoElement.style.border = "2px solid black";

            // Append the video element to the document body
            document.body.appendChild(videoElement);
        } catch (error) {
            // Handle permission denial or other errors
            console.error("Error accessing camera:", error);

            // Suggest checking browser permissions
            alert("Camera access is required for Boss Mode. Please check your browser permissions.");
        }
    } else {
        console.log("Boss Mode is OFF. Camera access not required.");
    }
});

// Update the UI based on the toggle state
function updateSwitchUI(isOn) {
    console.log(`Boss Mode is now ${isOn ? "ON" : "OFF"}`);
    const label = document.querySelector("label[for='bossModeToggle']");
    label.textContent = isOn ? "Boss Mode: ON" : "Boss Mode: OFF";
}
