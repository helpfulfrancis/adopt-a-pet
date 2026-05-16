let score = 0;
let autoClickers = 0;
let upgradeCost = 10;

const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const upgradeBtn = document.getElementById('upgrade-btn');
const autoCountDisplay = document.getElementById('auto-count');

// Click the main button
clickBtn.addEventListener('click', () => {
    score++;
    updateDisplay();
});

// Buy an auto-clicker
upgradeBtn.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        autoClickers++;
        upgradeCost = Math.floor(upgradeCost * 1.5); // Make the next one more expensive
        updateDisplay();
    }
});

// Function to update the numbers on the screen
function updateDisplay() {
    scoreDisplay.innerText = score;
    autoCountDisplay.innerText = autoClickers;
    upgradeBtn.innerText = `Buy Auto-Clicker (Cost: ${upgradeCost})`;
    
    // Enable/disable upgrade button based on score
    if (score >= upgradeCost) {
        upgradeBtn.disabled = false;
    } else {
        upgradeBtn.disabled = true;
    }
}

// Game loop: Auto-clickers add points every 1 second
setInterval(() => {
    if (autoClickers > 0) {
        score += autoClickers;
        updateDisplay();
    }
}, 1000);