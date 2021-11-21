// SPDX-License-Identifier: Unlicensed

// An exercise to manually implement metadata for a ERC721 token
// rather than using OpenZepplin Metadata ERC721 add-on contract ERC721URIStorage

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract volcanoToken is ERC721, Ownable {
    uint256 tokenId;    // used as a counter
    struct metadata{
        uint256 timestamp;
        uint256 tokenId;
        string tokenUID;
    }
    // mapping tokenId => tokenURI 
    mapping (uint256 => string) tokenURIs;

    // Create a public record for token ownership with a mapping of the users address to an array of structs.
    mapping (address => metadata[]) ownership;
    
    constructor () ERC721("VolcanoToken", "VT") {
    }


    // Let anyone mint a token for any address. Start from tokenId=1
    function mint(address _to, string memory _tokenURI) public {
        tokenId += 1;
        metadata memory tokenMetadata = metadata({timestamp: block.timestamp, tokenId: tokenId, tokenUID: ""});
        tokenURIs[tokenId] = _tokenURI;
        _safeMint(_to, tokenId);
        ownership[_to].push(tokenMetadata);
    }

    
    function burn(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "cannot burn a token which isn't owned by sender");
        _burn(_tokenId);
        removeOwnership(msg.sender, _tokenId);
    }


    // TODO unsure about the usage of delete not reducing length of array.
    function removeOwnership(address _owner, uint256 _tokenId) internal {
        for (uint i=0; i< ownership[_owner].length; i++) {
            if (ownership[_owner][i].tokenId == _tokenId) {
                delete ownership[_owner][i];
                break;
            }
        }
        // also remove from mapping
        delete tokenURIs[_tokenId];
    }

    // Fetch tokenURI by looping over metaData list
    function tokenURI(address _owner, uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        for (uint i=0; i< ownership[_owner].length; i++) {
            if (ownership[_owner][i].tokenId == _tokenId){
                return ownership[_owner][i].tokenUID;
            }
        }
        require(false, "tokenId not found");
        return "";
    }

    // Fetch tokenURI by mapping tokenID => URI (more efficient than looping)
    function tokenURISimple(uint256 _tokenId) public view returns ( string memory) {
        return tokenURIs[_tokenId];
    }

}