// var MyContract = artifacts.require("./MyContract.sol");
var TRC20 = artifacts.require("./Question.sol");

module.exports = function(deployer) {
  const _name = "Your Name";
  const _quesData = "Your Question Data";
  const _mod = "TBJfBkWVR9rLdCVuUYWjTcAWEjQpGgrB9v"; // Address of moderator
  const _diff = 123; // Difficulty (uint16)
  const _chatHash = "TBJfBkWVR9rLdCVuUYWjTcAWEjQpGgrB9v"; // Address of chat hash
  const _webHandler = "TBJfBkWVR9rLdCVuUYWjTcAWEjQpGgrB9v"; // Address of web handler
//    constructor(string memory _name, string memory _quesData, address _mod, uint16 _diff, address _chatHash, address _webHandler)payable{

  //deployer.deploy(TRC20, _name, _quesData, _mod, _diff, _chatHash, _webHandler); // Passing value in Ether if the constructor is payable
};