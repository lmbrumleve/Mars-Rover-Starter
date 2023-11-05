const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      //message is a Message(name, commands) object. 
      //commands is a Command(commandType, value) object.
      
      let results = [];

      for (let i=0; i < message.commands.length; i++) {
         let completeObject = {
            completed: true
         }
         if (message.commands[i].commandType === "MODE_CHANGE") {
            if (message.commands[i].value === "NORMAL" || message.commands[i].value === "LOW_POWER") {
               this["mode"] = message.commands[i].value;
            } else {
               this["mode"] = message.commands[i].value;
               completeObject["completed"] = false;
             }
            results.push(completeObject);
         } else if (message.commands[i].commandType === "MOVE") {
            if (this.mode === "LOW_POWER") {
               completeObject["completed"] = false;
            } else {
            this["position"] = message.commands[i].value;
            }
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

//Code Review 
let rover = new Rover(100);    // Passes 100 as the rover's position.

//Check initial rover status.
// let commands = [new Command("STATUS_CHECK")];
// let messageForRover = new Message('Check rover status.', commands);
// let response = rover.receiveMessage(messageForRover);

// console.log(response);
// console.log(response.results);

//Move rover, check status again.
// let commands = [
//    new Command ("MOVE", 200), 
//    new Command ("STATUS_CHECK")
// ];
// let messageForRover = new Message('Move rover then check status.', commands);
// let response = rover.receiveMessage(messageForRover);

// console.log(response.results);

//Change mode to low power, check status.
// let commands = [
//    new Command('MODE_CHANGE', 'LOW_POWER'), 
//    new Command('STATUS_CHECK')
// ];
// let messageForRover = new Message('Mode change to low power, check status.', commands);
// let response = rover.receiveMessage(messageForRover);

// console.log(response.results);

//Change mode to low power, move rover, check status. 
//Change mode to normal, move rover, check status.
// let commands = [
//    new Command('MODE_CHANGE', 'LOW_POWER'), 
//    new Command("MOVE", 200), 
//    new Command('STATUS_CHECK'),
//    new Command('MODE_CHANGE', 'NORMAL'), 
//    new Command("MOVE", 200), 
//    new Command('STATUS_CHECK')];
// let messageForRover = new Message('Mode change to low power, move rover, check status. Change mode to normal, move rover, check status.', commands);
// let response = rover.receiveMessage(messageForRover);

// console.log(response.results);

// Student grader test case.
// Move rover, status check. Mode change to low power, move rover, status check.
   //  let commands = [
   //     new Command('MOVE', 4321),
   //     new Command('STATUS_CHECK'),
   //     new Command('MODE_CHANGE', 'LOW_POWER'),
   //     new Command('MOVE', 3579),
   //     new Command('STATUS_CHECK')
   //  ];
   //  let message = new Message('TA power', commands);
   //  let response = rover.receiveMessage(message);

   //  console.log(response.results)

module.exports = Rover;