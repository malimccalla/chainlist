pragma solidity ^0.4.11;

contract ChainList {
  address public seller;
  string public name;
  string public description;
  uint256 public price;

  // sell an article
  function sellArticle(string _name, string _description, uint256 _price) public {
    seller = msg.sender;
    name = _name;
    description = _description;
    price = _price;
  }

  // get the article
  function getArticle() constant public returns (
    address _seller, string _name, string _description, uint _price
  )
  {
    return (seller, name, description, price);
  }
}
