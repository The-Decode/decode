// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Question.sol";
contract QuestionFactory {
    struct Bounty{
        Question questionAddress;
        string name;
        string description;
    }
    uint16 private count = 0;
    uint256 rant;
    uint256 thresholdFees;
    address webHandler;
    uint16 noOfValidators=0;
    address[] validators;
    
    mapping(string => Bounty) private bounties; 
    event BountyLive(uint16 indexed index, address QuestionAddress);
    
    modifier isValidated(){
        bool isValid = false;
        for(uint16 i = 0; i < noOfValidators; i++){
            if(validators[i] == msg.sender){
                isValid = true;
                break;
            }
        }
        require(isValid, "Not a validator");
        _;
    }
    
    constructor(uint256 _rant, uint256 _thresholdFees, address _webHandler){
        webHandler = _webHandler;
        rant = _rant;
        thresholdFees = _thresholdFees;
    }
    
    function generateBounty(string memory _name, string memory _quesData, uint16 _difficulty, address _chatHash, uint256 bountyValue, string memory _shortDesc)public isValidated payable{
        require((bountyValue+rant) <= msg.value, "not enough value sent");
        Question temp = (new Question){value:msg.value}(_name,_quesData,msg.sender,_difficulty,_chatHash, webHandler);
        Bounty memory theBounty = Bounty(temp, _name, _shortDesc);
        //saving the bounty....
        bounties[_name] = theBounty;
        emit BountyLive(count, address(temp));
        count++;
    }
    function registerAsValidator()public payable{
        require(!isAMember(msg.sender),"allready a member.");
        require(msg.value >= thresholdFees, "insuffiecient value sent");
        validators.push(msg.sender);
        noOfValidators++;
    }
    function isAMember(address _toCheck)public view returns(bool){
        for(uint16 i = 0; i < noOfValidators; i++){
            if(validators[i] == _toCheck){
                return true;
            }
        }
        return false;
    }
    function bountyFetch(string memory _name)view public returns(Bounty memory){
        return bounties[_name];
    }
}