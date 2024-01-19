
class Pet {
    constructor(name, image, actionImages) {
        this.name = name;
        this.energy = 20;
        this.image = image;
        this.actionImages = actionImages || {};
    }

    respondToClick() {
        console.log(`Hello! I'm ${this.name} the pet. You clicked on me!`);
    }

    performAction(action) {
        const imageElement = document.getElementById("selected-pet");

        if (this.actionImages[action]) {
            imageElement.src = this.actionImages[action];

            // reset image after 3 seconds
            setTimeout(() => {
                imageElement.src = this.image;
            }, 4500);
        }

        // health changes based on the action
        switch (action.toLowerCase()) {
            // Convert action to lowercase for case-insensitive comparison
            case 'play':
                this.energy -= 40;
                break;
            case 'poop':
                this.energy += 10;
                break;
            case 'drink':
                this.energy += 15;
                break;
            case 'sleep':
                this.energy += 25;
                break;
            case 'warmup':
            case 'feed':
                this.energy += 30;
                break;
            default:
                break;
        }

        this.energy = Math.min(100, Math.max(0, this.energy));
        console.log(`${this.name} performed ${action}! Energy level: ${this.energy}`);
    }
}

const pets = {
    dino1: new Pet('Dino 1', 'images/dino1.gif', {
        feed: "images/dino1.1.gif",
        drink: "images/dino1.1.gif",
        sleep: "images/dino1.3.gif",
        play: "images/dino1.2.gif",
        poop: "images/dino1.4.gif"
    }),
    dino2: new Pet('Dino 2', 'images/star1.gif', {
        feed: "images/starfeed.gif",
        drink: "images/starfeed.gif",
        sleep: "images/starsleep.gif",
        play: "images/starplay.gif",
        poop: "images/starpoop.gif"
    }),
    dino3: new Pet('Dino 3', 'images/brac1.gif', {
        feed: "images/bracfeed.gif",
        drink: "images/bracfeed.gif",
        sleep: "images/bracsleep.gif",
        play: "images/bracplay.gif",
        poop: "images/bracpoop.gif"
    }),
    dino4: new Pet('Dino 4', 'images/pcock1.gif', {
        feed: "images/pcockfeed.gif",
        drink: "images/pcockfeed.gif",
        sleep: "images/pcocksleep.gif",
        play: "images/pcockplay.gif",
        poop: "images/pcockpoop.gif"
    }),
};

const petDropdown = document.getElementById('pet-dropdown');
const selectedPetImage = document.getElementById('selected-pet');
const healthStatus = document.getElementById('health-status');

petDropdown.addEventListener('change', function() {
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

function updateHealthStatus() {
    const selectedPetKey = petDropdown.value || randomPetKey;
    healthStatus.textContent = `${pets[selectedPetKey].name} Pet's Health: ${pets[selectedPetKey].energy}`;
}

function performAction(action) {
    const selectedPetKey = petDropdown.value;
    pets[selectedPetKey].performAction(action);
    updateHealthStatus();
}

function changePet() {
    const selectedPet = document.getElementById("pet-dropdown").value;
    const placeholderImagePath = "images/egghatch.gif"; 

    // image selected for timeout
    selectedPetImage.src = placeholderImagePath;

    // 5 seconds timeout after selecting pet
    setTimeout(() => {
        let imagePath;

        if (selectedPet === "dino1") {
            imagePath = "images/dino1.gif";
        } else if (selectedPet === "dino2") {
            imagePath = "images/star1.gif";
        } else if (selectedPet === "dino3") {
            imagePath = "images/brac1.gif";
        } else if (selectedPet === "dino4") {
            imagePath = "images/pcock1.gif";
        }
        selectedPetImage.src = imagePath;
        updateHealthStatus();
    }, 5000);
}
