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
  // Function to display the player's inventory
  function displayInventory() {
    if (gameState.inventory.length === 0) {
      console.log("Your inventory is empty.");
    } else {
      console.log("Your Inventory:");
      gameState.inventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
      });
    }
  }

  // Update the input handling in the rl.on("line") event
  rl.on("line", (input) => {
    if (input === "quit") {
      gameState.gameActive = false;
      rl.close();
    } else if (input === "help") {
      displayHelp();
    } else if (input === "take") {
      console.log("Take what? Specify the item name.");
    } else if (input.startsWith("take ")) {
      const itemName = input.slice(5).trim();
      takeItem(itemName);
    } else if (input === "examine") {
      examineLocation();
    } else if (input === "inventory") {
      displayInventory();
    } else if (input in gameMap[gameState.currentRoom].directions) {
      moveToNewLocation(input);
    } else {
      console.log(
        "Invalid command. Type 'help' to see a list of possible actions."
      );
    }
  });
}

// Function to move to a new location
function moveToNewLocation(newLocation) {
  const currentLocation = gameMap[gameState.currentRoom];
  if (currentLocation.directions[newLocation]) {
    // Check if there is an item in the current location
    if (currentLocation.item) {
      // Add the item to the player's inventory
      gameState.inventory.push(currentLocation.item);
      console.log(`You picked up a ${currentLocation.item}.`);
      // Remove the item from the location
      delete currentLocation.item;
    }
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
    // Function to take an item from the current location
    function takeItem(itemName) {
      const currentLocation = gameMap[gameState.currentRoom];
      if (currentLocation.item && currentLocation.item === itemName) {
        // Add the item to the player's inventory
        gameState.inventory.push(currentLocation.item);
        console.log(`You took the ${currentLocation.item}.`);
        // Remove the item from the location
        delete currentLocation.item;
      } else {
        console.log(`There is no ${itemName} to take here.`);
      }
    }

    // Function to examine the current location
    function examineLocation() {
      const currentLocation = gameMap[gameState.currentRoom];
      console.log(currentLocation.description);
      if (currentLocation.item) {
        console.log(`You see a ${currentLocation.item} here.`);
      }
    }

    // Update the input handling in the rl.on("line") event
    rl.on("line", (input) => {
      if (input === "quit") {
        gameState.gameActive = false;
        rl.close();
      } else if (input === "take") {
        console.log("Take what? Specify the item name.");
      } else if (input.startsWith("take ")) {
        const itemName = input.slice(5).trim();
        takeItem(itemName);
      } else if (input === "examine") {
        examineLocation();
      } else if (input in gameMap[gameState.currentRoom].directions) {
        moveToNewLocation(input);
      } else {
        console.log("Invalid command.");
      }
    });
    // TODO: Implement a help command that lists all possible actions.
    // Function to display a list of possible actions
    function displayHelp() {
      console.log("Possible Actions:");
      console.log("- Type 'take <item>' to pick up a specific item.");
      console.log(
        "- Type 'examine' to get more information about the current location."
      );
      console.log(
        "- Type a direction (e.g., north, south, east, west) to move to a new location."
      );
      console.log("- Type 'help' to see this list of possible actions.");
      console.log("- Type 'quit' to exit the game.");
    }

    // Update the input handling in the rl.on("line") event
    rl.on("line", (input) => {
      if (input === "quit") {
        gameState.gameActive = false;
        rl.close();
      } else if (input === "help") {
        displayHelp();
      } else if (input === "take") {
        console.log("Take what? Specify the item name.");
      } else if (input.startsWith("take ")) {
        const itemName = input.slice(5).trim();
        takeItem(itemName);
      } else if (input === "examine") {
        examineLocation();
      } else if (input in gameMap[gameState.currentRoom].directions) {
        moveToNewLocation(input);
      } else {
        console.log(
          "Invalid command. Type 'help' to see a list of possible actions."
        );
      }
    });
  });

  // Function to handle a puzzle encounter
  function puzzleEncounter() {
    console.log("You encounter a mysterious puzzle...");
    console.log("Solve the puzzle to proceed!");

    // Implement your puzzle logic here
    // For example, you can ask the player to input a specific code or solve a riddle

    // If the player solves the puzzle
    console.log("Congratulations! You solved the puzzle and can proceed.");
  }

  // Update the input handling in the rl.on("line") event
  rl.on("line", (input) => {
    if (input === "quit") {
      gameState.gameActive = false;
      rl.close();
    } else if (input === "help") {
      displayHelp();
    } else if (input === "take") {
      console.log("Take what? Specify the item name.");
    } else if (input.startsWith("take ")) {
      const itemName = input.slice(5).trim();
      takeItem(itemName);
    } else if (input === "examine") {
      examineLocation();
    } else if (input === "inventory") {
      displayInventory();
    } else if (input === "save") {
      saveGame();
    } else if (input === "load") {
      loadGame();
    } else if (input === "solve puzzle") {
      puzzleEncounter();
    } else if (input in gameMap[gameState.currentRoom].directions) {
      moveToNewLocation(input);
    } else {
      console.log(
        "Invalid command. Type 'help' to see a list of possible actions."
      );
    }
  });

  // Function to check for the victory condition
  function checkVictoryCondition() {
    if (
      gameState.currentRoom === "finalRoom" &&
      gameState.inventory.includes("key")
    ) {
      console.log(
        "Congratulations! You have found the key and unlocked the final room."
      );
      console.log("You have successfully completed the game. Well done!");
      gameState.gameActive = false; // Set gameActive to false to end the game
    }
  }

  // Update the input handling in the rl.on("line") event
  rl.on("line", (input) => {
    if (input === "quit") {
      gameState.gameActive = false;
      rl.close();
    } else if (input === "help") {
      displayHelp();
    } else if (input === "take") {
      console.log("Take what? Specify the item name.");
    } else if (input.startsWith("take ")) {
      const itemName = input.slice(5).trim();
      takeItem(itemName);
      checkVictoryCondition(); // Check for victory after taking an item
    } else if (input === "examine") {
      examineLocation();
    } else if (input === "inventory") {
      displayInventory();
    } else if (input === "save") {
      saveGame();
    } else if (input === "load") {
      loadGame();
    } else if (input === "solve puzzle") {
      puzzleEncounter();
      checkVictoryCondition(); // Check for victory after solving a puzzle
    } else if (input in gameMap[gameState.currentRoom].directions) {
      moveToNewLocation(input);
      checkVictoryCondition(); // Check for victory after moving to a new location
    } else {
      console.log(
        "Invalid command. Type 'help' to see a list of possible actions."
      );
    }
  });
}

// Initiate the game
startGame();

// TODO: Implement a feature to display the player's inventory.
// TODO: Implement game-saving functionality.
// TODO: Implement a combat system.
// TODO: Implement a leveling system.
// TODO: Implement a victory condition.
