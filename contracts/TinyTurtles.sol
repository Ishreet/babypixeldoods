// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TinyTurtles is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using SafeMath for uint256;

    uint256 public constant NFT_PRICE = 60000000000000000; // 0.06 ETH
    uint256 public constant MAX_NFT_PURCHASE = 20;
    uint256 public MAX_SUPPLY = 10000;
    uint256 public nftPerAddressLimit = 3;

    bool public paused = false;
    bool public onlyWhitelisted = true;
    bool public revealed = true;

    address[] public whitelistAddresses;
    mapping(uint256 => string) _tokenURIs;

    string public notRevealedUri;
    string private _baseURIExtended;

    Counters.Counter _tokenIds;

    struct RenderToken {
        uint256 id;
        string uri;
    }
    
    constructor() ERC721("Tiny Turtles", "TT") {}

    function getOwner() public view virtual returns (address) {
        return owner();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getwhitelistAddresses() public view returns (address[] memory) {
        return whitelistAddresses;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
    }

    function getBaseURI() internal view virtual returns (string memory) {
        return _baseURIExtended;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIExtended = baseURI_;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            string(
                abi.encodePacked(
                    "https://tinyturtles.s3.us-east-2.amazonaws.com/metadata/",
                    tokenId.toString(),
                    ".json"
                )
            );
    }

    function getAllTokens() public view returns (RenderToken[] memory) {
        uint256 latestId = totalSupply();
        uint256 counter = 0;
        RenderToken[] memory res = new RenderToken[](latestId);
        for (uint256 i = 0; i < latestId; i++) {
            if (_exists(counter)) {
                string memory uri = tokenURI(counter);
                res[counter] = RenderToken(counter, uri);
            }
            counter++;
        }
        return res;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function reserveTokens() public onlyOwner {
        uint256 supply = totalSupply();
        uint256 i;
        for (i = 0; i < MAX_NFT_PURCHASE; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    function mint(uint256 numberOfTokens) public payable {
        require(!paused, "the contract is paused");
        require(
            numberOfTokens > 0,
            "Number of tokens can not be less than or equal to 0"
        );
        require(
            totalSupply().add(numberOfTokens) <= MAX_SUPPLY,
            "Purchase would exceed max supply of Turtles"
        );
        require(
            numberOfTokens <= MAX_NFT_PURCHASE,
            "Can only mint up to 20 per purchase"
        );
        require(
            NFT_PRICE.mul(numberOfTokens) == msg.value,
            "Sent ether value is incorrect"
        );

        if (msg.sender != owner()) {
            if (onlyWhitelisted == true) {
                require(isWhitelisted(msg.sender), "user is not whitelisted");
                uint256 ownerTokenCount = balanceOf(msg.sender);
                require(ownerTokenCount < nftPerAddressLimit);
            }
        }

        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 newId = totalSupply();
            if (totalSupply() < MAX_SUPPLY) {
                _safeMint(msg.sender, newId);
                _setTokenURI(newId, tokenURI(newId));
            }
        }
    }

    function isWhitelisted(address _user) public view returns (bool) {
        for (uint256 i = 0; i < whitelistAddresses.length; i++) {
            if (whitelistAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function whitelistUsers(address[] calldata _users) public onlyOwner {
        delete whitelistAddresses;
        whitelistAddresses = _users;
    }

    function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
        nftPerAddressLimit = _limit;
    }

    function setOnlyWhitelisted(bool _state) public onlyOwner {
        onlyWhitelisted = _state;
    }
}
