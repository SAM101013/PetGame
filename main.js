class Pet {
    constructor(name, image, actionImages) {
        this.name = name;
        this.energy = 30;
        this.image = image;
        this.actionImages = actionImages;
    }

    respondToClick() {
        console.log(`Hello! I'm ${this.name} the pet. You clicked on me!`);
    }

    performAction(action) {
        const actionImageList = this.actionImages[action];

        if (actionImageList) {
            const selectedPetElement = document.getElementById("selected-pet");
            // Clear existing images
            selectedPetElement.innerHTML = "";

            // Add new images to the container
            actionImageList.forEach(imageSrc => {
                const image = document.createElement("img");
                image.src = imageSrc;
                selectedPetElement.appendChild(image);
            });

            // Reset images after 3 seconds
            setTimeout(() => {
                selectedPetElement.innerHTML = "";
                const defaultImage = document.createElement("img");
                defaultImage.src = this.image;
                selectedPetElement.appendChild(defaultImage);
            }, 3000);
        }

        const actionAudio = {
            feed: "./sounds/feed.mp3",
            drink: "./sounds/drink.mp3",
            sleep: "./sounds/sleep.mp3",
            poop: "./sounds/poop.mp3",
            play: "./sounds/play.mp3",
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
    }
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
    popupImage.src = 'fullhealth.gif';
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

    // Play the sound when the popup is displayed
    popupSound.play();

    // Remove the start popup after 5 seconds
    setTimeout(() => {
        startPopup.remove();
    }, 5000);
}


showStartPopup();

function updateHealthStatus() {
    const selectedPetKey = petDropdown.value || randomPetKey;
    const pet = pets[selectedPetKey];
    
    // Update the width of the health bar based on pet's energy
    const healthBar = document.getElementById('health-bar');
    const normalizedEnergy = Math.min(100, Math.max(0, pet.energy));
    const healthPercentage = (normalizedEnergy / 100) * 100;
    healthBar.style.width = `${healthPercentage}%`;

    // Create or update the health status text
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

function showGameEndImage() {
    const imageName = 'gameover.gif';
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const popupContent = document.createElement('img');
    popupContent.src = `images/${imageName}`;
    popupContent.classList.add('game-end-image');

// Add restart message
    const restartMessage = document.createElement('p');
    restartMessage.textContent = 'Game Over! Click the dropdown to restart.';
    popupContent.appendChild(restartMessage);

    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    // Remove the popup after 5 seconds
    setTimeout(() => {
        popup.remove();
        updateHealthStatus();
    }, 5000);
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
    const selectedPet = document.getElementById};
