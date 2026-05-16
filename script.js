// Game Variables
let petType = "";
let petName = "";
let coins = 0;
let feedsLeft = 4;

// Inventory Tracking
let ownedItems = {
    hat: false,
    glasses: false,
    grass: false,
    house: false
};

// 1. Select Pet Type (Setup screen)
function selectType(type) {
    petType = type;
    document.getElementById('chosen-type-text').innerText = `Selected: ${type}`;
    
    // Highlight selected button
    const buttons = document.querySelectorAll('.type-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

// 2. Lock in Choices & Start Game
function startGame() {
    const nameInput = document.getElementById('pet-name-input').value.trim();
    
    if (!petType) {
        alert("Please choose a pet type first!");
        return;
    }
    if (nameInput === "") {
        alert("Please give your pet a name!");
        return;
    }

    // Set permanent variables
    petName = nameInput;

    // Apply variables to UI elements
    document.getElementById('pet-display-name').innerText = `${petName} the ${petType.split(' ')[1]}`;
    document.getElementById('pet-avatar').innerText = petType.split(' ')[0]; // Grabs just the emoji

    // Swap screens
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

// 3. Feeding Logic (Max 4 per day/session)
function feedPet() {
    if (feedsLeft > 0) {
        feedsLeft--;
        coins += 10;
        
        // Update interface numbers
        document.getElementById('coin-count').innerText = coins;
        document.getElementById('feed-count').innerText = feedsLeft;

        // Visual bounce animation for pet eating
        const pet = document.getElementById('pet-avatar');
        pet.style.transform = "scale(1.2)";
        setTimeout(() => pet.style.transform = "scale(1.0)", 200);

        // Turn off button if out of food
        if (feedsLeft === 0) {
            document.getElementById('feed-btn').disabled = true;
            document.getElementById('feed-btn').innerText = "Full for Today!";
        }
    }
}

// 4. Shop Purchasing Logic
function buyItem(item, cost) {
    // If they already own it, just equip/activate it
    if (ownedItems[item]) {
        activateItem(item);
        return;
    }

    // If they don't own it, check if they have enough money
    if (coins >= cost) {
        coins -= cost;
        ownedItems[item] = true;
        
        // Update display data
        document.getElementById('coin-count').innerText = coins;
        document.getElementById(`item-${item}` || `env-${item}`).classList.add('owned');
        document.getElementById(`item-${item}` || `env-${item}`).innerText = `${item.toUpperCase()} (Owned)`;
        
        activateItem(item);
    } else {
        alert("Not enough coins! Feed your pet to earn more.");
    }
}

// 5. Equip Clothes or Environments
function activateItem(item) {
    const clothAvatar = document.getElementById('clothing-avatar');
    const envArea = document.getElementById('environment-area');

    if (item === 'hat') {
        clothAvatar.innerText = "🎩";
        clothAvatar.classList.remove('hidden');
    } else if (item === 'glasses') {
        clothAvatar.innerText = "🕶️";
        clothAvatar.classList.remove('hidden');
    } else if (item === 'grass') {
        envArea.className = ""; // Reset layout styles
        envArea.classList.add('env-grass');
    } else if (item === 'house') {
        envArea.className = ""; 
        envArea.classList.add('env-house');
    }
}
