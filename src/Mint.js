import React, { useCallback, useEffect, useState } from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import keccak256 from "keccak256";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./App.css";
import { getMerkleTree } from "./merkleTree";
import {
  MintContainer,
  MintHead,
  Icon,
  TopBar,
  TopBarLink,
  MintSection,
  ConnectButton,
  ConnectButtonImg,
  ConnectButtonLabel,
  Account,
  MintError,
  MintButton,
  MintButtonTextTop,
  MintButtonTextBottom,
  Message,
  SpinningCoinGuyVideo,
  MintOuterContainer,
  MintSubHeader,
} from "./styles";
import abi from "./abi.json";
import config from "./config.json";

const MINT_PRICE = 100_000_000_000_000_000; // 0.1Ξ
const MAX_SUPPLY = 500;
const GAS_LIMIT = "300000"; // TODO
const MINT_AMOUNT = 1;
const MAX_AMOUNT_KEY = "0x0";

const Mint = () => {
  const [merkleTree, setMerkleTree] = useState(null);
  const [proof, setProof] = useState([]);
  const [account, setAccount] = useState("");
  const [smartContract, setSmartContract] = useState(null);
  const [mintError, setMintError] = useState("");
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSucess] = useState(false);
  const [saleState, setSaleState] = useState(""); // | "early" | "presale" | "public" | "over"
  const [userSaleState, setUserSaleState] = useState(""); // | "__early" | "__wait" | "__waitWhitelisted" | "__premint" | "__mint" | "__minting" | "__mintSuccess" | "__login" | "__over"
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [saleActive, setSaleActive] = useState(undefined);
  const [userBalance, setUserBalance] = useState(0);
  const [merkleRoot, setMerkleRoot] = useState(undefined);
  const [txHash, setTxHash] = useState("");

  const updateTotalSupply = useCallback(async () => {
    let _totalSupply;
    try {
      _totalSupply = await smartContract.methods.totalSupply().call();
    } catch (err) {
      console.error(err);
      // something's wrong, likely they're connected to the wrong network.
      // clear the smart contract, let them connect and diagnose
      // the error that way
      setSmartContract(null);
      setUserSaleState("__login");
      return;
    }
    setTotalSupply(Number(_totalSupply));
  }, [smartContract, setTotalSupply, setUserSaleState, setSmartContract]);

  const updateSaleActive = useCallback(async () => {
    const _saleActive = await smartContract.methods.saleActive().call();
    setSaleActive(_saleActive);
  }, [smartContract, setSaleActive]);

  const updateUserBalance = useCallback(async () => {
    const _balance = await smartContract.methods.balanceOf(account).call();
    setUserBalance(Number(_balance));
  }, [account, smartContract, setUserBalance]);

  const updateMerkleRoot = useCallback(async () => {
    const _merkleRoot = await smartContract.methods.MerkleRoot().call();
    setMerkleRoot(Number(_merkleRoot));
  }, [smartContract, setMerkleRoot]);

  const connectMetaMask = useCallback(
    async (e) => {
      e.preventDefault();
      setMintError("");
      const { ethereum } = window;
      const metamaskIsInstalled = ethereum?.isMetaMask;
      if (metamaskIsInstalled) {
        const { networkId } = config;
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const _networkId = await ethereum.request({
            method: "net_version",
          });
          ethereum.on("accountsChanged", (accounts) => {
            setMintError("");
            setAccount(accounts[0]);
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          if (Number(_networkId) === networkId) {
            setAccount(accounts[0]);
          } else {
            setMintError("Please change the network to Ethereum mainnet");
          }
        } catch (err) {
          console.error(err);
          setMintError(
            "Sorry, something went wrong. Please check your wallet."
          );
        }
      } else {
        setMintError("Please install MetaMask");
      }
    },
    [setAccount, setMintError]
  );

  const connectWalletConnect = useCallback(
    async (e) => {
      e.preventDefault();
      setMintError("");
      const { contractAddress, infuraId, networkId } = config;
      let provider;
      try {
        provider = new WalletConnectProvider({ infuraId });
        await provider.enable();
      } catch (err) {
        console.error(err);
        setMintError("Sorry, something went wrong.");
      }
      Web3EthContract.setProvider(provider);
      const _web3 = new Web3(provider);
      if (!smartContract) {
        const SmartContractObj = new Web3EthContract(abi, contractAddress);
        setSmartContract(SmartContractObj);
      }
      provider.on("accountsChanged", (accounts) => {
        setMintError("");
        setAccount(accounts[0]);
      });
      provider.on("chainChanged", () => {
        window.location.reload();
      });
      try {
        const accounts = await _web3.eth.getAccounts();
        const _networkId = await _web3.eth.net.getId();
        if (Number(_networkId) === networkId) {
          setAccount(accounts[0]);
        } else {
          setMintError("Please change the network to Ethereum mainnet");
        }
      } catch (err) {
        console.error(err);
        setMintError("Sorry, something went wrong. Please check your wallet.");
      }
    },
    [setAccount, setMintError, smartContract, setSmartContract]
  );

  const mint = useCallback(() => {
    const { contractAddress } = config;
    let transaction;
    if (saleState === "presale") {
      transaction = smartContract.methods.mintPresale(
        proof,
        MAX_AMOUNT_KEY,
        MINT_AMOUNT
      );
    } else if (saleState === "public") {
      transaction = smartContract.methods.mint(MINT_AMOUNT);
    } else {
      console.error("could not get transaction type");
      return;
    }
    console.log({ account });
    setMinting(true);
    transaction
      .send({
        gasLimit: GAS_LIMIT,
        to: contractAddress,
        from: account,
        value: MINT_PRICE,
      })
      .once("error", (err) => {
        console.error(err);
        setMintError("Sorry, something went wrong. Please try again later.");
        setMinting(false);
      })
      .then((receipt) => {
        console.log(receipt);
        const { transactionHash } = receipt;
        setTxHash(transactionHash);
        setMintSucess(true);
        setMinting(false);
      });
  }, [
    setMintError,
    setMinting,
    smartContract,
    proof,
    saleState,
    setMintSucess,
    setTxHash,
    account,
  ]);

  useEffect(() => {
    const tree = getMerkleTree();
    setMerkleTree(tree);
    const { contractAddress } = config;
    const { ethereum } = window;
    if (ethereum) {
      Web3EthContract.setProvider(ethereum);
      const SmartContractObj = new Web3EthContract(abi, contractAddress);
      setSmartContract(SmartContractObj);
    } else {
      console.error("ethereum is not defined");
      // let them login with walletconnect (or be prompted to
      // install metamask)
      setUserSaleState("__login");
    }
  }, []);

  useEffect(() => {
    if (!account || !merkleTree) return;
    const whitelistProof = merkleTree.getHexProof(keccak256(`${account}00`));
    if (whitelistProof.length) {
      setProof(whitelistProof);
      setIsWhitelisted(true);
    }
  }, [account, merkleTree, setProof, setIsWhitelisted]);

  useEffect(() => {
    if (!smartContract) return;
    updateTotalSupply();
  }, [smartContract, updateTotalSupply]);

  useEffect(() => {
    if (!smartContract || typeof totalSupply === "undefined") return;
    updateSaleActive();
  }, [smartContract, totalSupply, updateSaleActive]);

  useEffect(() => {
    if (!smartContract || typeof saleActive === "undefined") return;
    updateMerkleRoot();
  }, [smartContract, saleActive, updateMerkleRoot]);

  useEffect(() => {
    if (!smartContract || !account) return;
    updateUserBalance();
  }, [smartContract, account, updateUserBalance]);

  useEffect(() => {
    if (totalSupply >= MAX_SUPPLY) {
      setSaleState("over");
    } else if (saleActive) {
      setSaleState("public");
    } else if (merkleRoot > 0) {
      setSaleState("presale");
    } else if (merkleRoot === 0) {
      setSaleState("early");
    }
  }, [merkleRoot, saleActive, totalSupply, setSaleState]);

  useEffect(() => {
    if (minting) {
      setUserSaleState("__minting");
    } else if (mintSuccess) {
      setUserSaleState("__mintSuccess");
    } else if (saleState === "early") {
      setUserSaleState("__early");
    } else if (account && saleState === "presale" && !isWhitelisted) {
      setUserSaleState("__wait");
    } else if (
      account &&
      saleState === "presale" &&
      isWhitelisted &&
      userBalance > 0
    ) {
      setUserSaleState("__waitWhitelisted");
    } else if (
      account &&
      saleState === "presale" &&
      isWhitelisted &&
      userBalance === 0
    ) {
      setUserSaleState("__premint");
    } else if (account && saleState === "public") {
      setUserSaleState("__mint");
    } else if (!account && ["presale", "public"].includes(saleState)) {
      setUserSaleState("__login");
    } else if (saleState === "over") {
      setUserSaleState("__over");
    }
  }, [
    account,
    saleState,
    isWhitelisted,
    userBalance,
    setUserSaleState,
    minting,
    mintSuccess,
  ]);

  useEffect(() => {
    console.log({ userSaleState });
  }, [userSaleState]);

  return (
    <MintOuterContainer>
      <TopBar>
        <Icon>
          <img src="/icon.png" width={"100%"} alt="" />
        </Icon>
        <div />
        <TopBarLink href="/">
          <h3>MAIN</h3>
        </TopBarLink>
      </TopBar>
      <MintHead>Bored Bones Club</MintHead>
      <MintContainer>
        <SpinningCoinGuyVideo
          src="/spinning-coin-guy.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          playsinline={true}
        />
        {!userSaleState && null}
        {userSaleState === "__minting" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>Minting in progress ...</Message>
          </MintSection>
        )}
        {userSaleState === "__mintSuccess" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>
              Success!{" "}
              {txHash && (
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check it on Etherscan
                </a>
              )}
            </Message>
          </MintSection>
        )}
        {userSaleState === "__login" && (
          <MintSection>
            <MintSubHeader>Connect Your Wallet to Mint</MintSubHeader>
            <ConnectButton onClick={connectMetaMask} paddingLeftRight={"26px"}>
              <ConnectButtonLabel>MetaMask</ConnectButtonLabel>
              <ConnectButtonImg src={"/metamask.svg"} alt="" />
            </ConnectButton>
            <ConnectButton
              onClick={connectWalletConnect}
              paddingLeftRight={"26px"}
            >
              <ConnectButtonLabel>WalletConnect</ConnectButtonLabel>
              <ConnectButtonImg src={"/walletconnect.svg"} alt="" />
            </ConnectButton>
            {mintError && <MintError>{mintError}</MintError>}
          </MintSection>
        )}
        {userSaleState === "__early" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>Get pumped, Bored Bones Club is minting SOON.</Message>
          </MintSection>
        )}
        {userSaleState === "__wait" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>Get pumped, the public mint is SOON.</Message>
          </MintSection>
        )}
        {userSaleState === "__waitWhitelisted" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>
              You've already used your whitelist mint, but no worries, the
              public mint is SOON.
            </Message>
          </MintSection>
        )}
        {userSaleState === "__premint" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <MintButton onClick={mint}>
              <MintButtonTextTop>MINT</MintButtonTextTop>
              <MintButtonTextBottom>NOW</MintButtonTextBottom>
              <img src="/icon.png" width="200px" alt="mint" />
            </MintButton>
            <Message>(Congrats on copping that whitelist!)</Message>
            {mintError && <MintError>{mintError}</MintError>}
          </MintSection>
        )}
        {userSaleState === "__mint" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <MintButton onClick={mint}>
              <MintButtonTextTop>MINT</MintButtonTextTop>
              <MintButtonTextBottom>NOW</MintButtonTextBottom>
              <img src="/icon.png" width="200px" alt="mint" />
            </MintButton>
            {mintError && <MintError>{mintError}</MintError>}
          </MintSection>
        )}
        {userSaleState === "__over" && (
          <MintSection>
            <Account>
              <a
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account}
              </a>
            </Account>
            <Message>
              Bored Bones Club is minted out! Check the collection out on{" "}
              <a href={"#"} target="_blank" rel="noopener noreferrer">
                OpenSea
              </a>
            </Message>
          </MintSection>
        )}
      </MintContainer>
    </MintOuterContainer>
  );
};

export default Mint;
