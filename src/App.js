import React, { useCallback, useEffect, useState } from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import keccak256 from "keccak256";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./App.css";
import { getMerkleTree } from "./merkleTree";
import {
  Container,
  BackgroundImage,
  AboutVideo,
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
  Message,
  AboutContainer,
  RoadmapContainer,
  TeamContainer,
  StoryContainer,
  AboutContent,
  AboutHeader,
  AboutText,
  MissionHeader,
  MissionText,
  MissionSubHeader,
  RoadmapHeader,
  RoadmapImageContainer,
  RoadmapContent,
  RoadmapSubHeader,
  RoadmapItemHeader,
  RoadmapText,
  PreviewContainer,
} from "./styles";
import abi from "./abi.json";
import config from "./config.json";

const MINT_PRICE = 100_000_000_000_000_000; // 0.1Ξ
const MAX_SUPPLY = 500;
const GAS_LIMIT = "300000"; // TODO
const MINT_AMOUNT = 1;
const MAX_AMOUNT_KEY = "0x0";

function App() {
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
  const [totalSupply, setTotalSupply] = useState(0);
  const [saleActive, setSaleActive] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [merkleRoot, setMerkleRoot] = useState(0);
  const [txHash, setTxHash] = useState("");

  const updateTotalSupply = useCallback(async () => {
    const _totalSupply = await smartContract.methods.totalSupply().call();
    setTotalSupply(Number(_totalSupply));
  }, [smartContract, setTotalSupply]);

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
          if (Number(_networkId) === networkId) {
            setAccount(accounts[0]);
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
    [setAccount, setSmartContract, setMintError]
  );

  const connectWalletConnect = useCallback(
    async (e) => {
      e.preventDefault();
      setMintError("");
      const { infuraId, networkId } = config;
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
          setAccount(accounts[0]);
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
        console.error(err);
        setMintError("Sorry, something went wrong. Please check your wallet.");
      }
    },
    [setAccount, setSmartContract, setMintError]
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
  ]);

  useEffect(() => {
    const tree = getMerkleTree();
    setMerkleTree(tree);
    const { contractAddress } = config;
    const { ethereum } = window;
    Web3EthContract.setProvider(ethereum);
    const SmartContractObj = new Web3EthContract(abi, contractAddress);
    setSmartContract(SmartContractObj);
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
    updateSaleActive();
    updateMerkleRoot();
  }, [smartContract]);

  useEffect(() => {
    if (!smartContract || !account) return;
    updateUserBalance();
  }, [smartContract, account, updateUserBalance]);

  useEffect(() => {
    if (totalSupply >= MAX_SUPPLY) {
      setSaleState("over");
    } else if (saleActive) {
      setSaleState("public");
    } else if (merkleRoot !== 0) {
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
  ]);

  useEffect(() => {
    console.log({ userSaleState });
  }, [userSaleState]);

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
      {!userSaleState && null}
      {userSaleState === "__minting" && (
        <MintSection>
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
            <Message>Minting in progress ...</Message>
          </>
        </MintSection>
      )}
      {userSaleState === "__mintSuccess" && (
        <MintSection>
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
          </>
        </MintSection>
      )}
      {userSaleState === "__login" && (
        <MintSection>
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
        </MintSection>
      )}
      {userSaleState === "__early" && (
        <MintSection>
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
            <Message>Get pumped, Bored Bones Club is minting SOON.</Message>
          </>
        </MintSection>
      )}
      {userSaleState === "__wait" && (
        <MintSection>
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
            <Message>Get pumped, the public mint is SOON.</Message>
          </>
        </MintSection>
      )}
      {userSaleState === "__waitWhitelisted" && (
        <MintSection>
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
            <Message>
              You've already used your whitelist mint, but no worries, the
              public mint is SOON.
            </Message>
          </>
        </MintSection>
      )}
      {userSaleState === "__premint" && (
        <MintSection>
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
          <Message>(Congrats on copping that whitelist!)</Message>
          {mintError && <MintError>{mintError}</MintError>}
        </MintSection>
      )}
      {userSaleState === "__mint" && (
        <MintSection>
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
          {mintError && <MintError>{mintError}</MintError>}
        </MintSection>
      )}
      {userSaleState === "__over" && (
        <MintSection>
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
            <Message>
              Bored Bones Club is minted out! Check the collection out on{" "}
              <a href={"#"} target="_blank" rel="noopener noreferrer">
                OpenSea
              </a>
            </Message>
          </>
        </MintSection>
      )}
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
      <AboutContainer>
        <AboutVideo
          src="/vid.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          playsinline={true}
        />
        <AboutContent id="about">
          <AboutHeader>ABOUT BORED BONES CLUB</AboutHeader>
          <AboutText>
            Bored Bones Club is a collection of 500 ERC-721 NFTs rattling around
            on the ETH blockchain. The primary goal of Bored Bones Club is to
            provide stunning, unique art, as well as utility for each individual
            NFT. This includes real-world utility.
          </AboutText>
          <MissionHeader>Our Mission</MissionHeader>
          <MissionSubHeader>Build Community Together</MissionSubHeader>
          <MissionText>
            We aim to build a strong community around the Bored Bones as we
            slowly bring our figurine based NFT generations forward to the real
            world with physical 3D prints for community members to own.
          </MissionText>
          <MissionSubHeader>Bring NFTs Forward</MissionSubHeader>
          <MissionText>
            We have our own flavour to add to the evolution of NFTs as we
            develop our own metaverse-integrated 3D game with Unreal Engine.
          </MissionText>
        </AboutContent>
      </AboutContainer>
      <RoadmapContainer id="roadmap">
        <RoadmapHeader>ROADMAP</RoadmapHeader>
        <RoadmapContent>
          <RoadmapSubHeader>COMPLETED</RoadmapSubHeader>
          <RoadmapItemHeader>3D figurine prints</RoadmapItemHeader>
          <RoadmapText>
            3D figurines of our Bored Bones have been physically printed into
            real-life figurines in plans for future real-world utility for users
            to claim their own figures.
          </RoadmapText>
          <RoadmapItemHeader>BONE$ currency</RoadmapItemHeader>
          <RoadmapText>
            BONE$ currency development commenced for launch after public sales.
            Owners will earn BONE$ for rewards.
          </RoadmapText>
          <RoadmapItemHeader>BBC gamedev</RoadmapItemHeader>
          <RoadmapText>
            Early development of the BBC video game begun using Unreal Engine.
          </RoadmapText>
          <RoadmapItemHeader>Merch distributor organized</RoadmapItemHeader>
          <RoadmapText>
            Merch distributor organised for no delays as well as artist designs
            pitched.
          </RoadmapText>
          <RoadmapItemHeader>Partnerships</RoadmapItemHeader>
          <RoadmapText>
            At the dawn of our project we have already locked in multiple
            partnerships and collaborations with other notable projects.
          </RoadmapText>
          <RoadmapItemHeader>Gas-efficient contract</RoadmapItemHeader>
          <RoadmapText>
            Our developer has created an amazing gas-efficient contract capable
            of minting for 0.005 ETH @ 100 gwei.
          </RoadmapText>
          <RoadmapItemHeader>Metaverse testing begun</RoadmapItemHeader>
          <RoadmapText>
            Testing of metaverse integration into our game project and other
            pathways.
          </RoadmapText>
          <div style={{ height: "32px" }} />
          <RoadmapSubHeader>SOON</RoadmapSubHeader>
          <RoadmapItemHeader>Mint</RoadmapItemHeader>
          <RoadmapText>
            Mint price: 0.1. We're all about including everyone, instead of
            pricing out the majority.
          </RoadmapText>
          <RoadmapItemHeader>Reveal</RoadmapItemHeader>
          <RoadmapText>
            48 hours after public sale, Bored Bones revealed.
          </RoadmapText>
          <RoadmapItemHeader>Charity</RoadmapItemHeader>
          <RoadmapText>Bored Bones 1/1 charity auction.</RoadmapText>
          <RoadmapItemHeader>Token</RoadmapItemHeader>
          <RoadmapText>
            72 hours after sale, BONE$ tokens begin generating.
          </RoadmapText>
          <RoadmapItemHeader>Shop</RoadmapItemHeader>
          <RoadmapText>
            BONE$ Shop ENABLED, with 3D Bored Bones Club figurines purchasable
            for BONE$ added to the shop!
          </RoadmapText>
          <RoadmapItemHeader>Game preview</RoadmapItemHeader>
          <RoadmapText>
            Further PVP game 'THE BORED BATTLE FOR BONE$' development shown to
            public (metaverse functionality shown as well).
          </RoadmapText>
          <RoadmapItemHeader>Merch</RoadmapItemHeader>
          <RoadmapText>Merch design voting and merch drop.</RoadmapText>
          <RoadmapItemHeader>Swap tool</RoadmapItemHeader>
          <RoadmapText>
            Bored Bones NFT Swap tool begins dev. (Allows you to swap your Bored
            Bones with a more desirable one of less or equal value from the
            community wallet. This will cost BONE$).
          </RoadmapText>
          <RoadmapItemHeader>Metaverse</RoadmapItemHeader>
          <RoadmapText>
            Continuation of BBC game development into the metaverse until
            release.
          </RoadmapText>
        </RoadmapContent>
        <RoadmapImageContainer>
          <img src="/roadmap.png" />
        </RoadmapImageContainer>
      </RoadmapContainer>
      <PreviewContainer></PreviewContainer>
      <TeamContainer></TeamContainer>
      <StoryContainer></StoryContainer>
    </Container>
  );
}

export default App;
