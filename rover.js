const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {//message is a Message(name, commands) Object
      let results = [];

      for (let i=0; i < message.commands.length; i++) {
         let completeObject = {
            completed: true
         }
         if (message.commands[i].commandType === "MODE_CHANGE") {
            this["mode"] = message.commands[i].value;
            results.push(completeObject);
         } else if (message.commands[i].commandType === "MOVE") {
            this["position"] = rover.position + message.commands[i].value;
            results.push(completeObject);
         } else if (message.commands[i].commandType === "STATUS_CHECK") {
            completeObject["roverStatus"] = {
               position: this.position,
               mode: this.mode,
               generatorWatts: this.generatorWatts
            } 
            results.push(completeObject); 
         } else {
            completeObject["completed"] = false;
            results.push(completeObject);
         }
     
      }

      let response = {
         message: message.name,
         results: results
      }

      return response;

   }

};

// let commands = [new Command('STATUS_CHECK')]
// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let messageForRover = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(messageForRover);

// console.log(response);
// console.log(response.results[0])
// console.log(rover);
// console.log(typeof response.results[0].roverStatus);

let testCommand = [new Command('MODE_CHANGE', "LOW_POWER")];
let testMessage = new Message("Mode changes", testCommand);
let testRover = new Rover(98382);
console.log(testRover.receiveMessage(testMessage));

console.log(testRover.mode)
console.log(testCommand[0].value)

module.exports = Rover;