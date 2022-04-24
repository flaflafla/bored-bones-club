import React, { useEffect, useState } from "react";
import "./App.css";
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
  StoryVideoButton,
  StoryVideoButtons,
  StoryVideo,
  MintLink,
} from "./styles";

const PREVIEW_CONFIG = [
  "/silver.mp4",
  "/gold.mp4",
  "/platinum.mp4",
  "/diamond.mp4",
  "/rainbow.mp4",
];

const STORY_VIDEO_CONFIG = [
  "https://www.youtube.com/embed/Ef12xk6UNhk",
  "https://www.youtube.com/embed/304qRKrN9Q4",
  "https://www.youtube.com/embed/wtCCdJ-bTJU",
];

const Main = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [storyVideoIndex, setStoryVideoIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPreviewIndex((previewIndex + 1) % PREVIEW_CONFIG.length);
    }, 6 * 1000);
  }, [previewIndex, setPreviewIndex]);

  return (
    <Container>
      <TopBar>
        <Icon>
          <img src="/icon.png" width={"100%"} alt="" />
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
      <HeroImage />
      {/* <MintLink>
        <a href="/mint">
          <img src="/mint-now-wide.png" alt="mint now" />
        </a>
      </MintLink> */}
      <SocialContainer>
        <SocialIcon
          href="https://discord.com/invite/boredbonesclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/discord1.png" width="80px" alt="discord" />
        </SocialIcon>
        <SocialIcon
          href="https://www.instagram.com/boredbonesclub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/insta.png" width="80px" alt="instagram" />
        </SocialIcon>
        <SocialIcon
          href="https://opensea.io/collection/bored-bones-genesis"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/opensea1.png" width="80px" alt="opensea" />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com/BoredBonesClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/twitter.png" width="80px" alt="twitter" />
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
              <div style={{ gridColumn: 1 }}>
                <img
                  src="/3d.png"
                  alt="3d"
                  style={{
                    margin: "0 auto",
                    height: "200px",
                    marginLeft: "-60px",
                  }}
                />
              </div>
              <div style={{ gridColumn: 2 }}>
                <RoadmapItemHeader>3D figurine prints</RoadmapItemHeader>
                <RoadmapText>
                  3D figurines of our Bored Bones have been physically printed
                  into real-life figurines in plans for future real-world
                  utility for users to claim their own figures.
                </RoadmapText>
              </div>
            </div>
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
          <img src="/roadmap.png" alt="roadmap" />
        </RoadmapImageContainer>
        <RoadmapContentRight>
          <RoadmapSubHeader>Roadmap v1.0</RoadmapSubHeader>
          <RoadmapItem>
            <RoadmapItemHeader>Genesis mint</RoadmapItemHeader>
            <RoadmapText>
              500 Bored Bones at 0.1 ETH | April 22nd at 10pm UTC. Reveal 24-48
              hours after sellout.
            </RoadmapText>
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
            <RoadmapItemHeader>Multiplayer Bone Run</RoadmapItemHeader>
            <RoadmapText>
              Multiplayer functionality added to Bone Run. Compete against other
              people live and risk your BONE$ for glory!
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
              For now, we'd like to keep this a bit quiet. This is a massive
              piece of development and will make a difference in the space. More
              to come soon.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>
              <s>REDACTED AIRDROP</s>
            </RoadmapItemHeader>
            <RoadmapText>
              We'll have an airdrop for bored bones club holders ... but what
              could it be?
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Bored Bones Club Mini-Series</RoadmapItemHeader>
            <RoadmapText>
              We'll be making a full-blown Bored Bones Club mini-series
              including a bunch of characters voted by the community AS WELL as
              characters from our partner communities. We're excited to further
              bring our Bored Bones to life!
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Project Accelerator Program</RoadmapItemHeader>
            <RoadmapText>
              Inspired by Voltura's web3 accelerator, we've decided to form a
              dedicated fund from our own pockets, which we will use to support
              founders with innovative ideas. Rather than gatekeeping each
              other, communities need to work TOGETHER to grow in this space.
            </RoadmapText>
          </RoadmapItem>
          <RoadmapItem>
            <RoadmapItemHeader>Metaverse</RoadmapItemHeader>
            <RoadmapText>
              Bored Bones Club fully integrated into 'The DEADLAND$.' What
              mysteries lie beyond...
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
          <TeamMemberImage src="/predep.jpeg" alt="predep" />
          <TeamMemberName>
            Predepression{" "}
            <TeamMemberTwitter
              href="https://twitter.com/Predep7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="predep-twitter" />
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
          <TeamMemberImage src="/boro.jpeg" alt="boro" />
          <TeamMemberName>
            Boro{" "}
            <TeamMemberTwitter
              href="https://twitter.com/borobone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="boro-twitter" />
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
          <TeamMemberImage src="/a1.jpeg" alt="a1" />
          <TeamMemberName>
            A1{" "}
            <TeamMemberTwitter
              href="https://twitter.com/keepingit_a1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="a1-twitter" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Mod</TeamMemberTitle>
          <TeamMemberCountry />
          <TeamMemberBio>
            A1 has been in the crypto trading space for 7 years and NFT space
            for 2 years. Though he may have extensive experience in moderating,
            it's been for smaller projects. Through his moderating experience,
            he's learned that true value is in community development and
            engagement, while keeping the project's integrity flourishing!
          </TeamMemberBio>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src="/country.jpeg" alt="country" />
          <TeamMemberName>
            CountryFresh{" "}
            <TeamMemberTwitter
              href="https://twitter.com/CountryFresh187"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="country-twitter" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Mod</TeamMemberTitle>
          <TeamMemberCountry />
          <TeamMemberBio>
            CountryFresh is nothing but a pool playing BBQ smoking NFT addict.
            He also works full time within student loans, and does real estate
            on the side while still grinding NFTs like it’s a lifestyle. He is
            passionate about helping people and has been involved with NFT's
            since 2021, gaining his first role as MOD at Bored Bones Club.
          </TeamMemberBio>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src="/kurly.jpeg" alt="kurly" />
          <TeamMemberName>
            Kurly{" "}
            <TeamMemberTwitter
              href="https://twitter.com/junchristopher_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="kurly-twitter" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Mod</TeamMemberTitle>
          <TeamMemberCountry />
          <TeamMemberBio>
            Kurly started his NFT career about 4 months ago. Although he is
            fairly new to the space, he has been investing in cryptocurrency and
            the stock market for more than a year and has been successful in
            that space.
          </TeamMemberBio>
        </TeamMember>
        <TeamMember>
          <TeamMemberImage src="/fla.jpeg" alt="fla" />
          <TeamMemberName>
            fla{" "}
            <TeamMemberTwitter
              href="https://twitter.com/fla63551709"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="fla-twitter" />
            </TeamMemberTwitter>
          </TeamMemberName>
          <TeamMemberTitle>Frontend dev</TeamMemberTitle>
          <TeamMemberCountry />
          <TeamMemberBio>
            fla got into crypto in 2015 and was immediately hooked. As a writer,
            developer, investor and degenerate, he's spent the past seven years
            contributing to the financial infrastructure of the future. He
            spends every waking moment writing web3 things, whether it's
            JavaScript, Solidity, or prose.
          </TeamMemberBio>
        </TeamMember>
        <div />
      </TeamContainer>
      <StoryContainer id="story">
        <StoryHeader>THE STORY (SO FAR)</StoryHeader>
        <StoryVideo
          width="560"
          height="315"
          src={STORY_VIDEO_CONFIG[storyVideoIndex]}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <StoryVideoButtons>
          <StoryVideoButton
            disabled={storyVideoIndex === 0}
            onClick={() => setStoryVideoIndex(0)}
            gridColumn={2}
          >
            1
          </StoryVideoButton>
          <StoryVideoButton
            disabled={storyVideoIndex === 1}
            onClick={() => setStoryVideoIndex(1)}
            gridColumn={3}
          >
            2
          </StoryVideoButton>
          <StoryVideoButton
            disabled={storyVideoIndex === 2}
            onClick={() => setStoryVideoIndex(2)}
            gridColumn={4}
          >
            3
          </StoryVideoButton>
        </StoryVideoButtons>
      </StoryContainer>
    </Container>
  );
};

export default Main;
