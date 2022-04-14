import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import config from "./config.json";

export const getMerkleTree = () => {
  const leaves = config.merkleData;
  return new MerkleTree(leaves, keccak256, {
    hashLeaves: true,
    sortPairs: true,
  });
};
