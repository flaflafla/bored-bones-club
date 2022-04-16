import React, { useCallback, useEffect, useState } from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./App.css";
import { getMerkleTree } from "./merkleTree";
import {
  Container,
  BackgroundImage,
  Video,
  Head,
  Icon,
  SocialIcon,
  SocialContainer,
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
} from "./styles";
import abi from "./abi.json";
import config from "./config.json";

function App() {
  const [merkleTree, setMerkleTree] = useState(null);
  const [account, setAccount] = useState("");
  const [smartContract, setSmartContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [mintError, setMintError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [minting, setMinting] = useState(false);
  // "early" | "presale" | "public" | "over"
  const [saleState, setSaleState] = useState("early");

  useEffect(() => {
    const tree = getMerkleTree();
    setMerkleTree(tree);
  }, []);

  useEffect(() => {
    console.log({ smartContract });
  }, [smartContract]);

  // useEffect(() => {
  //   const totalSupply = Number(data.totalSupply);
  //   const merkleRoot = Number(data.merkleRoot);

  //   if (totalSupply >= CONFIG.MAX_SUPPLY) {
  //     setSaleState("over");
  //   } else if (data.saleActive) {
  //     setSaleState("public");
  //   } else if (merkleRoot !== 0) {
  //     setSaleState("presale");
  //   } else if (merkleRoot === 0) {
  //     setSaleState("early");
  //   }
  // }, [CONFIG.MAX_SUPPLY, data.merkleRoot, data.saleActive, data.totalSupply]);

  const connectMetaMask = useCallback(
    async (e) => {
      e.preventDefault();
      setMintError("");
      const { ethereum } = window;
      const metamaskIsInstalled = ethereum?.isMetaMask;
      if (metamaskIsInstalled) {
        const { contractAddress } = config;
        Web3EthContract.setProvider(ethereum);
        const _web3 = new Web3(ethereum);
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const networkId = await ethereum.request({
            method: "net_version",
          });
          if (Number(networkId) === 1) {
            const SmartContractObj = new Web3EthContract(abi, contractAddress);
            setAccount(accounts[0]);
            setSmartContract(SmartContractObj);
            setWeb3(_web3);
            ethereum.on("accountsChanged", (accounts) => {
              setMintError("");
              setAccount(accounts[0]);
            });
            ethereum.on("chainChanged", () => {
              window.location.reload();
            });
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
    [setAccount, setSmartContract, setWeb3, setMintError]
  );

  // TODO: check this works
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
      try {
        const accounts = await _web3.eth.getAccounts();
        const _networkId = await _web3.eth.net.getId();
        if (Number(_networkId) === networkId) {
          const SmartContractObj = new Web3EthContract(abi, contractAddress);
          setAccount(accounts[0]);
          setSmartContract(SmartContractObj);
          setWeb3(_web3);
          provider.on("accountsChanged", (accounts) => {
            setMintError("");
            setAccount(accounts[0]);
          });
          provider.on("chainChanged", () => {
            window.location.reload();
          });
        } else {
          setMintError("Please change the network to Ethereum mainnet");
        }
      } catch (err) {
        setMintError("Sorry, something went wrong. Please check your wallet.");
      }
    },
    [setAccount, setSmartContract, setWeb3, setMintError]
  );

  // function mintPresale(bytes32[] memory _proof, bytes1 _maxAmountKey, uint256 _mintAmount)
  // function mint(uint256 _mintAmount)

  // TODO
  const mint = useCallback(() => {
    // const { weiCost } = config;
    // // const gasLimit = TODO;
    // setFeedback(`Minting your Bored Bones ...`);
    // setMinting(true);
    // let transaction;
    // // hardcoded mint amount
    // const mintAmount = 1;
    // if (saleState === "presale") {
    //   const maxAmountKey = "00"; // doesn't matter what it is (?)
    //   transaction = smartContract.methods.mintPresale(
    //     proof,
    //     maxAmountKey,
    //     mintAmount
    //   );
    // } else if (saleState === "public") {
    //   transaction = smartContract.methods.mint(mintAmount);
    // }
    // transaction
    //   .send({
    //     gasLimit: String(totalGasLimit),
    //     to: contractAddress,
    //     from: account,
    //     value: weiCost,
    //   })
    //   .once("error", (err) => {
    //     console.error(err);
    //     setMintError("Sorry, something went wrong. Please try again later.");
    //     setMinting(false);
    //   })
    //   .then((receipt) => {
    //     console.log(receipt);
    //     setFeedback(`Minted successfully, welcome to Bored Bones Club!`);
    //     setMinting(false);
    //   });
  }, [setMintError, setMinting, setFeedback]);

  return (
    <Container>
      <TopBar>
        <Icon>
          <img src="/icon.png" width={"100%"} />
        </Icon>
        <div />
        <TopBarLink href="#about">
          <h3>ABOUT</h3>
        </TopBarLink>
        <TopBarLink href="#roadmap">
          <h3>ROADMAP</h3>
        </TopBarLink>
        <TopBarLink href="#team">
          <h3>TEAM</h3>
        </TopBarLink>
        <TopBarLink href="#story">
          <h3>STORY</h3>
        </TopBarLink>
      </TopBar>
      <Head>Bored Bones Club</Head>
      {/* when mint is over, delete till it says "stop deleting" */}
      <MintSection>
        {!account && (
          <>
            <ConnectButton onClick={connectMetaMask} paddingLeftRight={"26px"}>
              <ConnectButtonLabel>MetaMask</ConnectButtonLabel>
              <ConnectButtonImg src={"/metamask.svg"} />
            </ConnectButton>
            <ConnectButton
              onClick={connectWalletConnect}
              paddingLeftRight={"26px"}
            >
              <ConnectButtonLabel>WalletConnect</ConnectButtonLabel>
              <ConnectButtonImg src={"/walletconnect.svg"} />
            </ConnectButton>
          </>
        )}
        {account && (
          <>
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
              <img src="/icon.png" width="200px" />
            </MintButton>
          </>
        )}
        {mintError && <MintError>{mintError}</MintError>}
      </MintSection>
      {/* stop deleting */}
      <BackgroundImage />
      <SocialContainer>
        <SocialIcon
          href="https://discord.com/invite/boredbonesclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/discord.png" width="80px" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon
          href="https://www.instagram.com/boredbonesclub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/insta.png" width="80px" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon href="/#" target="_blank" rel="noopener noreferrer">
          <img src="/opensea.png" width="80px" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com/BoredBonesClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/twitter.png" width="80px" />
          <div className="underline" />
        </SocialIcon>
      </SocialContainer>
      <Video
        src="/vid.mp4"
        autoPlay={true}
        loop={true}
        muted={true}
        playsinline={true}
      />
    </Container>
  );
}

export default App;
