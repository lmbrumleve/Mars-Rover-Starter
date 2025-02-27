const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  it("constructor sets command type", function() {
    let testCommandClass = new Command("a", "b");
      expect(testCommandClass.commandType).toBe("a");
    });

    it("constructor sets value", function() {
      let testCommandClass = new Command("a", "b");
        expect(testCommandClass.value).toBe("b");
      });

});