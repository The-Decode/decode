// var MyContract = artifacts.require("./MyContract.sol");
var TRC20 = artifacts.require("./QuestionFactory.sol");

module.exports = function(deployer) {
  const _rant = "1000000";
  const _thresholdFees = "1000000";
  const _webHandler = "TBJfBkWVR9rLdCVuUYWjTcAWEjQpGgrB9v"; // Address of web handler
//uint256 _rant, uint256 _thresholdFees, address _webHandler
  deployer.deploy(TRC20, _rant, _thresholdFees, _webHandler); // Passing value in Ether if the constructor is payable
};