class Pet {
    constructor(name, image, actionImages) {
        this.name = name;
        this.energy = 30;
        this.image = image;
        this.xp = 0;
        this.actionImages = actionImages;
    }

    performAction(action) {
        const actionImageList = this.actionImages[action];

        if (actionImageList) {
            const selectedPetElement = document.getElementById("selected-pet");
            
            selectedPetElement.innerHTML = "";

           
            actionImageList.forEach(imageSrc => {
                const image = document.createElement("img");
                image.src = imageSrc;
                selectedPetElement.appendChild(image);
            });

            setTimeout(() => {
                selectedPetElement.innerHTML = "";
                const defaultImage = document.createElement("img");
                defaultImage.src = this.image;
                selectedPetElement.appendChild(defaultImage);
            }, 3000);

            // Call gainXP method when performing actions
            this.gainXP(5); // For example, gain 5 XP for each action
        }

        const actionAudio = {
            feed: "./sounds/feed.mp3",
            drink: "./sounds/drink.mp3",
            play: "./sounds/play.mp3",
            poop: "./sounds/poop.mp3",
            play: "./sounds/play.mp3",
            sleep: "./sounds/sleep.mp3",
        };

        const audioSrc = actionAudio[action];
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play();
        }

        switch (action) {
            case 'feed':
            case 'drink':
                this.energy -= 10;
                break;
            case 'play':
            case 'exercise':
                this.energy -= 10;
                break;
            case 'poop':
                this.energy += 20;
                break;
            case 'sleep':
                this.energy += 10;
                break;
            default:
                break;
        }

        this.energy = Math.min(100, Math.max(0, this.energy));
        console.log(`${this.name} performed ${action}! Energy level: ${this.energy}`);

        // Check if the pet's energy is below 5 after the action
        if (this.energy < 5) {
            showGameEndImage();
        }
        updateHealthStatus();
        updateXPBar();
    }

    gainXP(amount) {
        this.xp += amount;
        this.xp = Math.min(100, Math.max(0, this.xp));

        console.log(`${this.name} gained ${amount} XP! Total XP: ${this.xp}`);

        if (this.xp >= 80) {
            showWinnerImage("scene.png");
           
        }
    }
}

function updateXPBar() {
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');

    // Calculate the percentage width based on XP
    const xpPercentage = (pet.xp / 10) * 100;

    // Update the width of the XP bar
    xpBar.style.width = `${xpPercentage}%`;

    // Update the XP text
    xpText.textContent = `XP: ${pet.xp}`;
}

const pets = {
    dino1: new Pet('Dino 1', 'images/dino1.gif', {
        feed: ["images/dino1feed.gif"],
        drink: ["images/dino1drink.gif"],
        sleep: ["images/dino1sleep.gif"],
        play: ["images/dino1play.gif"],
        poop: ["images/dino1poop.gif"]
    }),
    dino2: new Pet('Dino 2', 'images/star1.gif', {
        feed: ["images/starfeed.gif"],
        drink: ["images/stardrink.gif"],
        sleep: ["images/starsleep.gif"],
        play: ["images/starplay.gif"],
        poop: ["images/starpoop.gif"]
    }),
    dino3: new Pet('Dino 3', 'images/brac1.gif', {
        feed: ["images/bracfeed.gif"],
        drink: ["images/bracdrink.gif"],
        sleep: ["images/bracsleep.gif"],
        play: ["images/bracplay.gif"],
        poop: ["images/bracpoop.gif"]
    }),
    dino4: new Pet('Dino 4', 'images/pcock1.gif', {
        feed: ["images/pcockfeed.gif"],
        drink: ["images/pcockdrink.gif"],
        sleep: ["images/pcocksleep.gif"],
        play: ["images/pcockplay.gif"],
        poop: ["images/pcockpoop.gif"]
    }),
};

const petDropdown = document.getElementById('pet-dropdown');
const selectedPetImage = document.getElementById('selected-pet');
const healthStatus = document.getElementById('health-status');

petDropdown.addEventListener('change', function () {
    const selectedPetKey = this.value;
    const placeholderImagePath = 'images/egghatch.gif';

    // image for 5 seconds timeout
    selectedPetImage.src = placeholderImagePath;

    // update the selected pet image and health status after a 5-second timeout
    setTimeout(() => {
        selectedPetImage.src = pets[selectedPetKey].image;
        updateHealthStatus();
    }, 5000);
});

function showStartPopup() {
    const startPopup = document.createElement('div');
    startPopup.id = 'start-popup';

    // Create an img element for the image
    const popupImage = document.createElement('img');
    popupImage.src = '8.png';
    popupImage.alt = 'Start Popup Image';
    popupImage.style.width = '100%';

    const popupSound = new Audio('sounds/startUp.mp3');

    const popupContent = document.createElement('div');
    popupContent.appendChild(popupImage);

    const message = document.createElement('p');
    message.textContent = 'Welcome to Animal Insync! Click a button to interact with your pet.';
    popupContent.appendChild(message);

    startPopup.appendChild(popupContent);
    document.body.appendChild(startPopup);

  
    popupSound.play();

    // Remove the start popup after 3 seconds
    setTimeout(() => {
        startPopup.remove();
    }, 3000);
}

class Ball {
    constructor(element) {
        this.element = element;
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    onClick() {
        this.animateBounce();
    }

    animateBounce() {
        const duration = 0.5; // seconds
        const distance = 50; // pixels

        // Bounce to the right
        this.move('right', distance, duration / 4);

        // Bounce to the left
        this.move('left', distance, duration / 4);

        // Bounce up
        this.move('up', distance, duration / 4);

        // Bounce down
        this.move('down', distance, duration / 4);
    }

    move(direction, distance, duration) {
        let property, value;
        switch (direction) {
            case 'right':
                property = 'right';
                value = `+=${distance}px`;
                break;
            case 'left':
                property = 'right';
                value = `-=${distance}px`;
                break;
            case 'up':
                property = 'bottom';
                value = `+=${distance}px`;
                break;
            case 'down':
                property = 'bottom';
                value = `-=${distance}px`;
                break;
        }

        this.element.style.transition = `all ${duration}s ease-in-out`;
        this.element.style[property] = value;

        setTimeout(() => {
            this.element.style.transition = '';
        }, duration * 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const throwballElement = document.getElementById('throwball');
    const throwball = new Ball(throwballElement);
});

showStartPopup();

function updateHealthStatus() {
    const selectedPetKey = petDropdown.value || randomPetKey;
    const pet = pets[selectedPetKey];

    // Update the width of the health bar based on pet's energy
    const healthBar = document.getElementById('health-bar');
    const normalizedEnergy = Math.min(100, Math.max(0, pet.energy));
    const healthPercentage = (normalizedEnergy / 100) * 100;
    healthBar.style.width = `${healthPercentage}%`;

    // Display game over image when pet's health is below 5
    if (pet.energy < 5) {
        showGameEndImage();
    }
    setInterval(() => {
        // Decrease energy by 2 every 5 seconds
        pet.energy -= 2;
        pet.energy = Math.min(100, Math.max(0, pet.energy));
        updateHealthStatus();
        updateXPBar();
        updateHealthBar(); // Add this line to update the health bar
    }, 5000);

    let healthStatusText = document.getElementById('health-status-text');
    if (!healthStatusText) {
        healthStatusText = document.createElement('div');
        healthStatusText.id = 'health-status-text';
        document.getElementById('health-bar-container').appendChild(healthStatusText);
    }

    healthStatusText.textContent = `${pet.name} Pet's Health: ${pet.energy}`;

    if (pet.energy < 5) {
        showGameEndImage();
    }
}

setInterval(() => {
    // Decrease energy by 2 every 5 seconds
    pet.energy -= 2;
    pet.energy = Math.min(100, Math.max(0, pet.energy));
    updateHealthStatus();
}, 5000);
function changeImage(petKey, action) {
    const pet = pets[petKey];
    const actionImages = pet.actions[action];

    // Assuming you want to display the first image for the action
    const newImage = actionImages[0];

    // Change the source of the displayed image
    document.getElementById('petImage').src = newImage;
}
function showGameEndImage() {
    const pet = pets[petDropdown.value || randomPetKey]; // Get the currently selected pet

    if (pet && pet.energy < 5) {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        // Add game over image
        const gameOverImage = document.createElement('img');
        gameOverImage.src = 'gameover.png'; // Replace with the actual path to your game over image
        gameOverImage.classList.add('game-over-image');
        popup.appendChild(gameOverImage);

        // Add restart message
        const restartMessage = document.createElement('p');
        restartMessage.textContent = 'Game Over! Return Home to restart.';
        popup.appendChild(restartMessage);

        document.body.appendChild(popup);

        // Remove the popup after 5 seconds
        setTimeout(() => {
            popup.remove();
            updateHealthStatus();
        }, 3000);
    }
}


function performAction(action) {
    const selectedPetKey = petDropdown.value;
    if (!pets[selectedPetKey]) {
        console.error("Invalid pet selected");
        return;
    }
    pets[selectedPetKey].performAction(action);
}

function changePet() {
    const selectedPetKey = petDropdown.value;
    const selectedPetImage = document.getElementById('pet');

    if (pets[selectedPetKey]) {
        selectedPetImage.src = pets[selectedPetKey].image;
        updateHealthStatus();
    }
}
