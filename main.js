// Define Pet class
class Pet {
    constructor(name, image) {
      this.name = name;
      this.energy = 20; // Initial Pet energy level
      this.image = image;
    }
  
    respondToClick() {
      console.log(`Hello! I'm ${this.name} the pet. You clicked on me!`);
    }
  
    performAction(action) {
      switch (action) {
        case 'play':
          this.energy += 10;
          break;
        case 'poop':
          this.energy -= 20;
          break;
        case 'drink':
          this.energy += 15;
          break;
        case 'sleep':
          this.energy += 5;
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
  
  // Initialize pets object
  const pets = {
    dino1: new Pet('Dino 1', 'images/dino1.gif'),
    dino2: new Pet('Dino 2', 'images/dino2.gif'),
    dino3: new Pet('Dino 3', 'images/dino3.gif'),
    dino4: new Pet('Dino 4', 'images/dino4.gif'),
  };
  
  // Select DOM elements
  const petDropdown = document.getElementById('pet-dropdown');
  const selectedPetImage = document.getElementById('selected-pet');
  const healthStatus = document.getElementById('health-status');
  
  // Display a random pet image and update health status initially
  const randomPetKey = Object.keys(pets)[Math.floor(Math.random() * Object.keys(pets).length)];
  selectedPetImage.src = pets[randomPetKey].image;
  updateHealthStatus();
  
  // Update selected pet image on dropdown change
  petDropdown.addEventListener('change', function () {
    const selectedPetKey = this.value;
    selectedPetImage.src = pets[selectedPetKey].image;
    updateHealthStatus();
  });
  
  // Update health status based on the selected pet
  function updateHealthStatus() {
    const selectedPetKey = petDropdown.value || randomPetKey; // Use random key if dropdown not set
    healthStatus.textContent = `${pets[selectedPetKey].name} Pet's Health: ${pets[selectedPetKey].energy}`;
  }
  
  // Handle action button clicks
  function performAction(action) {
    const selectedPetKey = petDropdown.value;
    pets[selectedPetKey].performAction(action);
    updateHealthStatus();
  }
  
  // Set up click event listeners for action buttons (can be done in `index.html` as well)
  const actionButtons = document.querySelectorAll('.action-button');
  for (const button of actionButtons) {
    button.addEventListener('click', function () {
      performAction(this.textContent.toLowerCase());
    });
  }
  
  // Additional functionalities can be added here (e.g., win conditions, animations, etc.)
  