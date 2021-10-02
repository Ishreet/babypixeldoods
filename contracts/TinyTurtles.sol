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

    string public TT_PROVENANCE = "";
    uint256 public constant NFT_PRICE = 60000000000000000; // 0.06 ETH
    uint256 public constant MAX_NFT_PURCHASE = 20;
    uint256 public MAX_SUPPLY = 10000;
    bool public saleIsActive = true;

    string private _baseURIExtended;
    mapping(uint256 => string) _tokenURIs;
    Counters.Counter _tokenIds;

    uint256 fee = 0.06 ether;

    struct RenderToken {
        uint256 id;
        string uri;
    }

    constructor() ERC721("Tiny Turtles", "TT") {}

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
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

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIExtended;
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

        // string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // // If there is no base URI, return the token URI.
        // if (bytes(base).length == 0) {
        //     return _tokenURI;
        // }
        // // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        // if (bytes(_tokenURI).length > 0) {
        //     return string(abi.encodePacked(base, _tokenURI));
        // }
        // // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return
            string(
                abi.encodePacked(
                    "https://tinyturtles.s3.us-east-2.amazonaws.com/metadata/",
                    tokenId.toString(),
                    ".json"
                )
            );
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply();
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

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_msgSender()).transfer(balance);
    }

    function reserveTokens() public onlyOwner {
        uint256 supply = totalSupply();
        uint256 i;
        for (i = 0; i < MAX_NFT_PURCHASE; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    // return uint256? // onlyOwner()
    // supply + i == identifier/index of NFT you're minting
    // supply + i reserved for reserving
    function mint(uint256 numberOfTokens) public payable {
        require(saleIsActive, "Sale is not active at the moment");
        require(
            numberOfTokens > 0,
            "Number of tokens can not be less than or equal to 0"
        );
        require(
            totalSupply().add(numberOfTokens).add(1) <= MAX_SUPPLY,
            "Purchase would exceed max supply of Bulls"
        );
        require(
            numberOfTokens <= MAX_NFT_PURCHASE,
            "Can only mint up to 20 per purchase"
        );
        require(
            NFT_PRICE.mul(numberOfTokens) == msg.value,
            "Sent ether value is incorrect"
        );

        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 newId = totalSupply();
            if (totalSupply() < MAX_SUPPLY) {
                _safeMint(msg.sender, newId);
                _setTokenURI(newId, tokenURI(newId));
            }
        }
    }
}
