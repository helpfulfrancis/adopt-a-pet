let petType = "";
let petName = "";
let coins = 0;
let feedsLeft = 7; // Cap updated to 7

let ownedItems = {
    hat: false,
    crown: false,
    glasses: false,
    bowtie: false,
    grass: false,
    house: false
};

// Selection Configuration Mapping
function selectType(e, type) {
    petType = type;
    document.getElementById('chosen-type-text').innerText = `Selected: ${type}`;
    
    const buttons = document.querySelectorAll('.type-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
}

// Spawns Complete Custom Body Elements
function startGame() {
    const nameInput = document.getElementById('pet-name-input').value.trim();
    
    if (!petType) {
        alert("Please choose a pet companion first!");
        return;
    }
    if (nameInput === "") {
        alert("Please name your pet!");
        return;
    }

    petName = nameInput;
    document.getElementById('pet-display-name').innerText = `${petName}`;

    // Target individual base segments
    const head = document.getElementById('pet-head');
    const body = document.getElementById('pet-body');
    const legs = document.getElementById('pet-legs');

    if (petType === "Dog") {
        head.innerText = "🐶"; body.innerText = "🐕"; legs.innerText = "🐾";
    } else if (petType === "Cat") {
        head.innerText = "🐱"; body.innerText = "🐈"; legs.innerText = "🐾";
    } else if (petType === "Hamster") {
        head.innerText = "🐹"; body.innerText = "🥥"; legs.innerText = "🐾";
    }

    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

function feedPet() {
    if (feedsLeft > 0) {
        feedsLeft--;
        coins += 10;
        
        document.getElementById('coin-count').innerText = coins;
        document.getElementById('feed-count').innerText = feedsLeft;

        const pet = document.getElementById('pet-container');
        pet.style.transform = "scale(1.15)";
        setTimeout(() => pet.style.transform = "scale(1.0)", 200);

        if (feedsLeft === 0) {
            document.getElementById('feed-btn').disabled = true;
            document.getElementById('feed-btn').innerText = "Full for Today!";
        }
    }
}

/* New Interaction Features */
function petNoise() {
    const pet = document.getElementById('pet-container');
    pet.style.transform = "scaleX(1.2)";
    setTimeout(() => pet.style.transform = "scaleX(1.0)", 200);

    if (petType === "Dog") alert(`${petName} says: WOOOF! 🐾`);
    else if (petType === "Cat") alert(`${petName} says: MEOW! 🐈`);
    else alert(`${petName} says: SQUEAK! 🐹`);
}

function petJump() {
    const pet = document.getElementById('pet-container');
    pet.style.transform = "translateY(-60px)";
    setTimeout(() => pet.style.transform = "translateY(0px)", 250);
}

// Cuddle Hearts Engine Loop (5-Second Expiration Timer)
function petCuddle() {
    const container = document.getElementById('heart-container');
    
    // Spawn heart elements at randomized side vectors
    let heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 60 + 20 + "%"; 
        container.appendChild(heart);
        
        // Clear data node from memory after animation finishes
        setTimeout(() => heart.remove(), 1500);
    }, 200);

    // Turn off generation precisely at 5 seconds
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 500);
}

// Purchase and Mount Hardware Layer Elements
function buyItem(item, type, cost) {
    if (ownedItems[item]) {
        activateItem(item);
        return;
    }

    if (coins >= cost) {
        coins -= cost;
        ownedItems[item] = true;
        
        document.getElementById('coin-count').innerText = coins;
        
        let elementId = type === 'acc' ? `item-${item}` : `env-${item}`;
        let element = document.getElementById(elementId);
        element.classList.add('owned');
        element.innerText = `${item.toUpperCase()} (Owned)`;
        
        activateItem(item);
    } else {
        alert("Not enough coins! Feed your pet to earn some!");
    }
}

function activateItem(item) {
    if (item === 'hat') {
        document.getElementById('acc-hat').classList.remove('hidden');
        document.getElementById('acc-crown').classList.add('hidden');
    } else if (item === 'crown') {
        document.getElementById('acc-crown').classList.remove('hidden');
        document.getElementById('acc-hat').classList.add('hidden');
    } else if (item === 'glasses') {
        document.getElementById('acc-glasses').classList.remove('hidden');
    } else if (item === 'bowtie') {
        document.getElementById('acc-bowtie').classList.remove('hidden');
    } else if (item === 'grass') {
        document.getElementById('environment-area').className = "env-grass";
    } else if (item === 'house') {
        document.getElementById('environment-area').className = "env-house";
    }
}
