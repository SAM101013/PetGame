class Pet {
    constructor(name, image) {
        this.name = name;
        this.energy = 50; // Initial Pet energy level
        this.image = image;
    }

    respondToClick() {
        console.log(`Hello! I'm ${this.name} the pet. You clicked on me!`);
// We can customize the responses or perform other actions here
    }
//We will need div id action buttons for each.
// //Eg: (<div id="action-buttons">
// <button class="action-button" onclick="performAction('play')">Play</button>)
    
performAction(action) {
        switch(action) {
            case 'play':
                this.energy += 10;
                break;
            case 'feed':
                this.energy += 20;
                break;
            case 'hunt':
                this.energy -= 15;
                break;
            case 'warmUp':
                this.energy += 10;
                break;
            case 'drink':
                this.energy += 15;
                break;
            case 'sleep':
                this.energy += 30;
                break;
            default:
                break;
        }
        this.energy = Math.min(100, Math.max(0, this.energy)); 
        // Energy is within 0 to 100 range
        console.log(`${this.name} performed ${action}! Energy level: ${this.energy}`);
        updateHealthStatus(); // Update the health status after an action
    }
}

// Initial start message
document.querySelector('h1').innerHTML = 'Pick A pet to Play with';
document.querySelector('h4').innerHTML = "Be careful not to overfeed the pets!!";

const pets = {
    dino1: new Pet('Dino 1', 'images/dino1.gif'),//including my example images in file
    dino2: new Pet('Dino 2', 'images/dino2.gif'),
    dino3: new Pet('Dino 3', 'images/dino3.gif'),
    dino4: new Pet('Dino 4', 'images/dino4.gif'),
};

// Select the elements
const petDropdown = document.getElementById('pet-dropdown');
const selectedPetImage = document.getElementById('selected-pet');
const healthStatus = document.getElementById('health-status');

// Display a random pet image initially
const randomPetKey = Object.keys(pets)[Math.floor(Math.random() * Object.keys(pets).length)];
selectedPetImage.src = pets[randomPetKey].image;

// Event listener for dropdown change
petDropdown.addEventListener('change', function() {
    const selectedPetKey = this.value;
    selectedPetImage.src = pets[selectedPetKey].image;
    updateHealthStatus();
});

// To hide other pet images initially
Object.keys(pets).forEach(petKey => {
    const petImage = document.getElementById(petKey);
    if (petKey !== randomPetKey) {
        petImage.style.display = 'none';
    }
});

// Click event listener for each pet image
{/*We need html div for pet image.Eg with correct names (<div id="game-container">
    <!-- Pet image with corresponding IDs -->
        <img id="selected-pet" class="pet-image" src="" alt="Selected Pet">) */
    }

Object.keys(pets).forEach(petKey => {
    const petImage = document.getElementById(petKey);
    petImage.onclick = function() {
        pets[petKey].respondToClick();
    };
});

// This Function performs actions for all pets/html div id "Action Buttons"
function performAction(action) {
    Object.values(pets).forEach(pet => {
        pet.performAction(action);
    });
}

// Update the health status based on the current selected pet/html div id "Health Status"
function updateHealthStatus() {
    const selectedPetKey = petDropdown.value;
    healthStatus.textContent = `${pets[selectedPetKey].name}'s Health: ${pets[selectedPetKey].energy}`;
}
