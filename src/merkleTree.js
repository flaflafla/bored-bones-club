import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

export const getMerkleTree = (merkleData) => {
  return new MerkleTree(merkleData, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
};
