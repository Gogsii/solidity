//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//boolean, uint, int, address, byte
//bool hasFavoriteNumber = true;
//int256 leastFavoriteNumber = 1;
//string favoriteNumberInText = "Eleven";
//bytes32 favoritePet = "cat"; //32 is max size byte can be

contract SimpleStorage {
  uint256 favoriteNumber; // this gets initialized to 0 in solidity

  struct People {
    uint256 favoriteNumber;
    string name;
  }

  People[] public people;

  mapping(string => uint256) public nameToFavoriteNumber;

  function store(uint256 _favoriteNumber) public virtual {
    favoriteNumber = _favoriteNumber;
  }

  //view, pure don't modify the state of a blockchain
  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  //calldata and memory (temporary), storage (permanent)
  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    people.push(People(_favoriteNumber, _name));
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }
}
