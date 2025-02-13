// Import required standard module
const readline = require("readline");
const fs = require("fs");

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
  experience: 0,
  level: 1,
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
    item: "rusty key",
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
  // Check for victory condition
  if (gameState.inventory.includes("special item")) {
    console.log(
      "Congratulations! You found the special item and won the game!"
    );
    gameState.gameActive = false;
    rl.close();
  }
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

// Function to pick up an item
function pickUpItem(item) {
  const location = gameMap[gameState.currentRoom];
  if (location.item === item) {
    gameState.inventory.push(item);
    delete location.item;
    console.log(`You picked up a ${item}.`);
  } else {
    console.log("No such item here.");
  }
}

// Function to attack enemy (combat system)
let enemies = {
  library: { name: "Guardian", health: 30 },
};

function attackEnemy() {
  const location = gameMap[gameState.currentRoom];
  if (enemies[gameState.currentRoom]) {
    enemies[gameState.currentRoom].health -= 10; // Example damage
    console.log(
      `Attacked ${enemies[gameState.currentRoom].name}. Health is now ${
        enemies[gameState.currentRoom].health
      }.`
    );
    if (enemies[gameState.currentRoom].health <= 0) {
      console.log(`${enemies[gameState.currentRoom].name} is defeated.`);
      delete enemies[gameState.currentRoom];
    }
  } else {
    console.log("No enemies here.");
  }
}

// Function to gain experience (leveling system)
function gainExperience(points) {
  gameState.experience += points;
  if (gameState.experience >= gameState.level * 10) {
    gameState.level++;
    gameState.experience = 0;
    console.log("Leveled up! Now at level " + gameState.level);
  }
}

// Function to save game
function saveGame() {
  fs.writeFileSync("savegame.json", JSON.stringify(gameState, null, 2));
  console.log("Game saved.");
}

// Function to load game
function loadGame() {
  if (fs.existsSync("savegame.json")) {
    const data = fs.readFileSync("savegame.json");
    gameState = JSON.parse(data);
    console.log("Game loaded.");
    showLocation();
  } else {
    console.log("No saved game found.");
  }
}

// Function to start the game
function startGame() {
  console.log("Welcome to the Text Adventure Game!");
  showLocation();
  rl.on("line", (input) => {
    const [command, ...args] = input.split(" ");
    if (command === "quit") {
      gameState.gameActive = false;
      rl.close();
    } else if (command in gameMap[gameState.currentRoom].directions) {
      moveToNewLocation(command);
    } else if (command === "pick" && args[0] === "up") {
      pickUpItem(args.slice(1).join(" "));
    } else if (command === "inventory") {
      console.log("Inventory:", gameState.inventory.join(", "));
    } else if (command === "help") {
      console.log(
        "Commands: quit, north, south, east, west, pick up [item], inventory, attack, save, load"
      );
    } else if (command === "attack") {
      attackEnemy();
    } else if (command === "save") {
      saveGame();
    } else if (command === "load") {
      loadGame();
    } else {
      console.log("Invalid command.");
    }
  });
}

// Initiate the game
startGame();


// // TODO: Implement a feature to display the player's inventory.
// // TODO: Implement game-saving functionality.
// // TODO: Implement a combat system.
// // TODO: Implement a leveling system.
// // TODO: Implement a victory condition.
