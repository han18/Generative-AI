// Import required standard module
const readline = require("readline");

// Create readline interface for input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Game state
let gameState = {
  currentRoom: "start",
  inventory: [],
  gameActive: true,
};

// Game map
const gameMap = {
  start: {
    description:
      "You are in a dark, cold room with two doors. One leads to the north and another to the east.",
    directions: {
      north: "library",
      east: "kitchen",
    },
  },
  library: {
    description:
      "You find yourself surrounded by shelves of ancient books. There is a door to the south.",
    directions: {
      south: "start",
    },
    item: "ancient book",
  },
  kitchen: {
    description:
      "A seemingly abandoned kitchen. There’s a door to the west and a strange, glowing portal that seems to lead nowhere.",
    directions: {
      west: "start",
      portal: "secretRoom",
    },
    item: "rusty key", // TODO: Implement item pickup functionality
  },
  secretRoom: {
    description:
      "You step through the portal and enter a secret room filled with treasure.",
    directions: {
      portal: "kitchen",
    },
  },
};

// Function to show current location
function showLocation() {
  const location = gameMap[gameState.currentRoom];
  console.log(location.description);
  if (location.item) {
    console.log(`You see a ${location.item} here.`);
  }
  // TODO: Implement a way to pick up items and add them to the inventory
}

// Function to move to a new location
function moveToNewLocation(newLocation) {
  const currentLocation = gameMap[gameState.currentRoom];
  if (currentLocation.directions[newLocation]) {
    gameState.currentRoom = currentLocation.directions[newLocation];
    showLocation();
  } else {
    console.log("You can't go that way.");
  }
}

// Function to start the game
function startGame() {
  console.log("Welcome to the Text Adventure Game!");
  showLocation();
  rl.on("line", (input) => {
    if (input === "quit") {
      gameState.gameActive = false;
      rl.close();
    } else if (input in gameMap[gameState.currentRoom].directions) {
      moveToNewLocation(input);
    } else {
      console.log("Invalid command.");
    }

    // TODO: Add more commands for player actions, such as taking items.
    // TODO: Implement a help command that lists all possible actions.
  });
}

// Initiate the game
startGame();

// TODO: Implement a feature to display the player's inventory.
// TODO: Implement game-saving functionality.
// TODO: Implement a combat system.
// TODO: Implement a leveling system.
// TODO: Implement a victory condition.
