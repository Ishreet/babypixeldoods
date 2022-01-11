// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import statements
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// contract class
// TODO BabyPixelDoodz
contract BabyPixelDoods is ERC721Enumerable, Ownable {
    // utilities
    using Strings for uint256;
    using SafeMath for uint256;

    // uint256
    uint256 public nftPrice = 30000000000000000;
    uint256 public maxNftPurchase = 12;
    uint256 public maxSupply = 3750;

    // booleans
    bool public saleIsActive = false; // false
    bool public revealed = false;

    // strings
    // TODO change baseURI to private?
    string public baseURI;
    string public revealedURI;

    // mappings
    mapping(uint256 => string) _tokenURIs;

    // contract constructor
    constructor() ERC721("BabyPixelDoods", "BPD") {}

    // get functions
    function getBaseURI() internal view virtual returns (string memory) {
        return baseURI;
    }

    // set functions
    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function setRevealedURI(string memory revealedURI_) external onlyOwner {
        revealedURI = revealedURI_;
    }

    function setMaxNftPurchase(uint256 _maxNftPurchase) public onlyOwner {
        maxNftPurchase = _maxNftPurchase;
    }

    function setNftPrice(uint256 _nftPrice) public onlyOwner {
        nftPrice = _nftPrice;
    }

    function setMaxSupply(uint256 _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = _tokenURI;
    }

    // unnecessarily long mint function
    function mint(uint256 numberOfTokens) public payable {
        require(
            numberOfTokens > 0,
            "The number of tokens can not be less than or equal to 0"
        );
        require(
            totalSupply().add(numberOfTokens) <= maxSupply,
            "The purchase would exceed the max supply of BabyPixelDoods"
        );

        if (msg.sender != owner()) {
            if (totalSupply() > 750) {
                require(
                    nftPrice.mul(numberOfTokens) <= msg.value,
                    "The contract did not receive enough Ethereum"
                );
            }

            require(
                numberOfTokens <= maxNftPurchase,
                "The contract can only mint up to 12 tokens at a time"
            );

            require(saleIsActive, "The contract sale is not active");

            for (uint256 i = 0; i < numberOfTokens; i++) {
                uint256 newId = totalSupply();
                if (totalSupply() < maxSupply) {
                    _safeMint(msg.sender, newId);
                    _setTokenURI(newId, tokenURI(newId));
                }
            }
        } else {
            for (uint256 i = 0; i < numberOfTokens; i++) {
                uint256 newId = totalSupply();
                if (totalSupply() < maxSupply) {
                    _safeMint(msg.sender, newId);
                    _setTokenURI(newId, tokenURI(newId));
                }
            }
        }
    }

    // token URI retriever
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");
        if (revealed == false) {
            return revealedURI;
        }

        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }

    // classic withdraw function
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}