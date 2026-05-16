let petType = "";
let petName = "";
let coins = 0;
let feedsLeft = 4;

let ownedItems = {
    hat: false,
    glasses: false,
    grass: false,
    house: false
};

// Fixed: Added "e" param to explicitly handle the browser target click
function selectType(e, type) {
    petType = type;
    document.getElementById('chosen-type-text').innerText = `Selected: ${type}`;
    
    const buttons = document.querySelectorAll('.type-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
}

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

    petName = nameInput;

    document.getElementById('pet-display-name').innerText = `${petName} the ${petType.split(' ')[1]}`;
    document.getElementById('pet-avatar').innerText = petType.split(' ')[0];

    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

function feedPet() {
    if (feedsLeft > 0) {
        feedsLeft--;
        coins += 10;
        
        document.getElementById('coin-count').innerText = coins;
        document.getElementById('feed-count').innerText = feedsLeft;

        const pet = document.getElementById('pet-avatar');
        pet.style.transform = "scale(1.2) translateY(-10px)";
        setTimeout(() => pet.style.transform = "scale(1.0) translateY(0)", 200);

        if (feedsLeft === 0) {
            document.getElementById('feed-btn').disabled = true;
            document.getElementById('feed-btn').innerText = "Full for Today!";
        }
    }
}

// Fixed: Rewrote how elements are grabbed dynamically using item Type strings
function buyItem(item, type, cost) {
    if (ownedItems[item]) {
        activateItem(item);
        return;
    }

    if (coins >= cost) {
        coins -= cost;
        ownedItems[item] = true;
        
        document.getElementById('coin-count').innerText = coins;
        
        // Target exact prefix based on element structure
        let elementId = type === 'item' ? `item-${item}` : `env-${item}`;
        let element = document.getElementById(elementId);
        
        element.classList.add('owned');
        element.innerText = `${item.toUpperCase()} (Owned)`;
        
        activateItem(item);
    } else {
        alert("Not enough coins! Feed your pet to earn more.");
    }
}

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
        envArea.className = "env-grass";
    } else if (item === 'house') {
        envArea.className = "env-house";
    }
}
