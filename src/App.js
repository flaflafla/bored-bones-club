import React, { useCallback, useEffect, useState } from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import keccak256 from "keccak256";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./App.css";
import { getMerkleTree } from "./merkleTree";
import {
  Container,
  HeroImage,
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
  RoadmapContentLeft,
  RoadmapContentRight,
  RoadmapSubHeader,
  RoadmapItemHeader,
  RoadmapText,
  PreviewContainer,
  RoadmapItem,
  MissionItem,
  PreviewVideo,
  PreviewText,
  TeamHeader,
  StoryHeader,
  TeamMember,
  TeamMemberName,
  TeamMemberTitle,
  TeamMemberCountry,
  TeamMemberBio,
  TeamMemberImage,
  TeamMemberTwitter,
  SpinningCoinGuyContainer,
  SpinningCoinGuyVideo,
  PrevNextButton,
  StoryVideo,
} from "./styles";
import abi from "./abi.json";
import config from "./config.json";

const MINT_PRICE = 100_000_000_000_000_000; // 0.1Ξ
const MAX_SUPPLY = 500;
const GAS_LIMIT = "300000"; // TODO
const MINT_AMOUNT = 1;
const MAX_AMOUNT_KEY = "0x0";

const PREVIEW_CONFIG = [
  "/silver.mp4",
  "/gold.mp4",
  "/platinum.mp4",
  "/diamond.mp4",
];

const STORY_VIDEO_CONFIG = ["/story-0.mp4", "/story-1.mp4"];

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
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [saleActive, setSaleActive] = useState(undefined);
  const [userBalance, setUserBalance] = useState(0);
  const [merkleRoot, setMerkleRoot] = useState(undefined);
  const [txHash, setTxHash] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [storyVideoIndex, setStoryVideoIndex] = useState(0);

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
    setTimeout(() => {
      setPreviewIndex((previewIndex + 1) % PREVIEW_CONFIG.length);
    }, 6 * 1000);
  }, [previewIndex, setPreviewIndex]);

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
  }, [smartContract]);

  useEffect(() => {
    if (!smartContract || typeof totalSupply === "undefined") return;
    updateSaleActive();
  }, [smartContract, totalSupply]);

  useEffect(() => {
    if (!smartContract || typeof saleActive === "undefined") return;
    updateMerkleRoot();
  }, [smartContract, saleActive]);

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
            {mintError && <MintError>{mintError}</MintError>}
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
      <HeroImage />
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
          src="/fire.mp4"
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
          <MissionItem>
            <MissionSubHeader>Build Community Together</MissionSubHeader>
            <MissionText>
              We aim to build a strong community around the Bored Bones as we
              slowly bring our figurine based NFT generations forward to the
              real world with physical 3D prints for community members to own.
            </MissionText>
          </MissionItem>
          <MissionItem>
            <MissionSubHeader>Bring NFTs Forward</MissionSubHeader>
            <MissionText>
              We have our own flavour to add to the evolution of NFTs as we
              develop our own metaverse-integrated 3D game with Unreal Engine.
            </MissionText>
          </MissionItem>
        </AboutContent>
      </AboutContainer>
      <RoadmapContainer id="roadmap">
        <RoadmapHeader>ROADMAP</RoadmapHeader>
        <RoadmapContentLeft>
          <RoadmapSubHeader>Completed BEFORE Mint</RoadmapSubHeader>
          <RoadmapItem>
            <RoadmapItemHeader>3D figurine prints</RoadmapItemHeader>
            <RoadmapText>
              3D figurines of our Bored Bones have been physically printed into
              real-life figurines in plans for future real-world utility for
              users to claim their own figures.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>BONE$ currency</RoadmapItemHeader>
            <RoadmapText>
              BONE$ currency development commenced for launch after public
              sales. Owners will earn BONE$ for rewards.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>BONE RUN</RoadmapItemHeader>
            <RoadmapText>
              Full-scale playable video game available to play to earn WL, free
              mints AND more, released BEFORE mint! Available to play now, join
              the Discord to participate!
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Merch distributor organized</RoadmapItemHeader>
            <RoadmapText>
              Merch distributor organised for no delays as well as artist
              designs pitched.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Partnerships</RoadmapItemHeader>
            <RoadmapText>
              At the dawn of our project we have already locked in multiple
              partnerships and collaborations with other notable projects.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Metaverse testing begun</RoadmapItemHeader>
            <RoadmapText>
              Testing of metaverse integration into our game project and other
              pathways.
            </RoadmapText>
          </RoadmapItem>
        </RoadmapContentLeft>
        <RoadmapImageContainer>
          <img src="/roadmap.png" />
        </RoadmapImageContainer>
        <RoadmapContentRight>
          <RoadmapSubHeader>Roadmap v1.0</RoadmapSubHeader>
          <RoadmapItem>
            <RoadmapItemHeader>Genesis mint</RoadmapItemHeader>
            <RoadmapText>
              500 Bored Bones at 0.1 ETH | April 22nd at 10pm UTC
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Reveal</RoadmapItemHeader>
            <RoadmapText>24-48 hours after sellout</RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Charity</RoadmapItemHeader>
            <RoadmapText>Bored Bones 1/1 charity auction.</RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Token</RoadmapItemHeader>
            <RoadmapText>
              48 hours after sale, BONE$ tokens begin generating.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>BONE$ Marketplace</RoadmapItemHeader>
            <RoadmapText>
              BONE$ Marketplace goes live, including WL spots for up and coming
              projects, free mints for the second collection, custom-made Bored
              Bones Club figurines, and MORE!
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Bone run BIG update</RoadmapItemHeader>
            <RoadmapText>
              Adding web browser compatibility to allow more people to play and
              big game updates.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Game preview</RoadmapItemHeader>
            <RoadmapText>
              Further PVP game 'THE BORED BATTLE FOR BONE$' development shown to
              public (metaverse functionality shown as well).
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Merch</RoadmapItemHeader>
            <RoadmapText>
              Merch design vote + merch drop (some genesis holders will get free
              merch).
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Swap tool</RoadmapItemHeader>
            <RoadmapText>
              Bored Bones NFT Swap tool begins dev. (Allows you to swap your
              Bored Bones with a more desirable one of less or equal value from
              the community wallet. This will cost BONE$).
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Metaverse</RoadmapItemHeader>
            <RoadmapText>
              Bored Bones Club dives into the metaverse alongside partners.
            </RoadmapText>
          </RoadmapItem>
        </RoadmapContentRight>
      </RoadmapContainer>
      <PreviewContainer>
        <PreviewVideo
          src={PREVIEW_CONFIG[previewIndex]}
          autoPlay={true}
          loop={true}
          muted={true}
          playsinline={true}
        />
        <PreviewText>BORED BONES</PreviewText>
      </PreviewContainer>
      <TeamContainer id="team">
        <TeamHeader>TEAM</TeamHeader>
        <TeamMember>
          <TeamMemberImage src="/predep.png" />
          <TeamMemberName>
            Predepression{" "}
            <TeamMemberTwitter
              href="https://twitter.com/Predep7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Founder, Software Dev</TeamMemberTitle>
          <TeamMemberCountry>Australia</TeamMemberCountry>
          <TeamMemberBio>
            With a strong IT background and an ever-expanding need to learn
            more, Predepression delved into the crypto space back in 2017 and
            entered the NFT space in 2020. Predepression has been the developer
            for previous projects that have had flawless successful launches,
            gas efficient contract and zero exploits.
          </TeamMemberBio>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src="/boro.png" />
          <TeamMemberName>
            Boro{" "}
            <TeamMemberTwitter
              href="https://twitter.com/borobone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Founder, Artist</TeamMemberTitle>
          <TeamMemberCountry>Australia</TeamMemberCountry>
          <TeamMemberBio>
            Boro begun his freelance journey in 2015 and pursued a bachelor's
            degree in information technology. Boro is now bringing his award
            winning 3D and animation skills into the games industry with Unreal
            Engine and the metaverse.
          </TeamMemberBio>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src="/posty.png" />
          <TeamMemberName>
            PostyXBT{" "}
            <TeamMemberTwitter
              href="https://twitter.com/PostyXBT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Marketing Advisor</TeamMemberTitle>
          <TeamMemberCountry>UK</TeamMemberCountry>
          <TeamMemberBio>
            His marketing and branding credentials consist of building a
            personal Twitter audience from 0-75,000 followers via organic
            content and has helped reputable projects in the crypto space such
            as Utrust and PrimeXBT in a marketing capacity.
          </TeamMemberBio>
        </TeamMember>
      </TeamContainer>
      <SpinningCoinGuyContainer>
        <SpinningCoinGuyVideo
          src="/spinning-coin-guy.mp4"
          autoPlay={true}
          loop={true}
          muted={true}
          playsinline={true}
        />
      </SpinningCoinGuyContainer>
      <StoryContainer id="story">
        <StoryHeader>THE STORY (SO FAR)</StoryHeader>
        <StoryVideo
          src={STORY_VIDEO_CONFIG[storyVideoIndex]}
          autoPlay={false}
          loop={false}
          muted={false}
          playsinline={true}
          controls={true}
        />
        {storyVideoIndex === 0 && (
          <PrevNextButton onClick={() => setStoryVideoIndex(1)}>
            {">>>"}
          </PrevNextButton>
        )}
        {storyVideoIndex === 1 && (
          <PrevNextButton onClick={() => setStoryVideoIndex(0)}>
            {"<<<"}
          </PrevNextButton>
        )}
      </StoryContainer>
    </Container>
  );
}

export default App;
