
class Pet {
    constructor(name, image) {
        this.name = name;
        this.energy = 20;
        this.image = image;
    }

    respondToClick() {
        console.log(`Hello! I'm ${this.name} the pet. You clicked on me!`);
    }

    performAction(action) {
        const actionImages = {
            feed: "images/dino1.1.gif",
            drink: "images/dino1.1.gif",
            sleep: "images/dino1.3.gif",
            play: "images/dino1.2.gif",
        };

        if (actionImages[action]) {
            document.getElementById("selected-pet").src = actionImages[action];
            
            // reset image after 3 seconds
            setTimeout(() => {
                document.getElementById("selected-pet").src = this.image;
            }, 3000);
        }

        // health changes based on the action
        switch (action) {
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
            case 'warmUp':
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
    dino1: new Pet('Dino 1', 'images/dino1.gif'),
    dino2: new Pet('Dino 2', 'images/star1.gif'),
    dino3: new Pet('Dino 3', 'images/brac1.gif'),
    dino4: new Pet('Dino 4', 'images/pcock1.gif'),
};


const petDropdown = document.getElementById('pet-dropdown');
const selectedPetImage = document.getElementById('selected-pet');
const healthStatus = document.getElementById('health-status');

petDropdown.addEventListener('change', function () {
    const selectedPetKey = this.value;
    const selectedPetImage = document.getElementById('selected-pet');

    // image for 5 seconds timeout
    const placeholderImagePath = 'images/egghatch.gif'; 
    selectedPetImage.src = placeholderImagePath;

    // update the selected pet image and health status after 5 second timeout
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
    const selectedPetImage = document.getElementById("selected-pet");

    // image selected for timeout
    const placeholderImagePath = "images/egghatch.gif"; 
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
