const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRoverClass = new Rover("a");
    expect(testRoverClass.position).toBe("a");
    expect(testRoverClass.mode).toBe("NORMAL");
    expect(testRoverClass.generatorWatts).toBe(110);
  })

  it("response returned by receiveMessage contains the name of the message", function() {
    let testCommand = [new Command('MODE_CHANGE', "LOW_POWER")]
    let testMessage = new Message("Check the rover status", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage);
    expect(checkReceiveMessage.message).toBe("Check the rover status");
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let testCommand = [new Command('MODE_CHANGE', "LOW_POWER"), new Command('STATUS_CHECK')];
    let testMessage = new Message("Check the rover status", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage);
    expect(checkReceiveMessage["results"].length).toBe(testCommand.length);
    
  })

  it("responds correctly to the status check command", function () {
    let testCommand = [new Command('STATUS_CHECK')];
    let testMessage = new Message("Check the rover status", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage);

    expect(typeof checkReceiveMessage.results[0].roverStatus).toBe("object");
    expect(checkReceiveMessage.results[0].roverStatus.position).toBe(testRover.position);
    expect(checkReceiveMessage.results[0].roverStatus.mode).toBe(testRover.mode);
    expect(checkReceiveMessage.results[0].roverStatus.generatorWatts).toBe(testRover.generatorWatts);

  })

  it("responds correctly to the mode change command", function () {
    let testCommand = [new Command('MODE_CHANGE', "LOW_POWER"), new Command('MOVE', 3)];
    let testMessage = new Message("Mode changes", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage)
    let completeObject = {
      completed: true
   }

    testRover.receiveMessage(testMessage);

    expect(testRover.mode).toBe(testCommand[0].value);

  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let testCommand = [new Command('MODE_CHANGE', "LOW_POWER"), new Command('MOVE', 3)];
    let testMessage = new Message("Mode changes", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage)
    let completeObject = {
      completed: true
   }

    testRover.receiveMessage(testMessage);

    expect(checkReceiveMessage.results[1].completed).toBe(false);
    expect(testRover.position).toBe(98382);

  })

  it("responds with the position for the move command", function () {
    let testCommand = [new Command('MOVE', 3)];
    let testMessage = new Message("Mode changes", testCommand);
    let testRover = new Rover(98382);
    let checkReceiveMessage = testRover.receiveMessage(testMessage)
    let completeObject = {
      completed: true
   }

    testRover.receiveMessage(testMessage);

    expect(checkReceiveMessage.results[0].completed).toBe(true);
    expect(testRover.position).toBe(testCommand[0].value);

  })

});
