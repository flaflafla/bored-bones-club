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
  PrevNextButton,
  StoryVideo,
  MintLink,
} from "./styles";

const PREVIEW_CONFIG = [
  "/silver.mp4",
  "/gold.mp4",
  "/platinum.mp4",
  "/diamond.mp4",
];

const STORY_VIDEO_CONFIG = ["/story-0.mp4", "/story-1.mp4"];

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
      <MintLink>
        <a href="/mint">MINT NOW</a>
      </MintLink>
      <SocialContainer>
        <SocialIcon
          href="https://discord.com/invite/boredbonesclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/discord.png" width="80px" alt="discord" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon
          href="https://www.instagram.com/boredbonesclub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/insta.png" width="80px" alt="instagram" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon href="/#" target="_blank" rel="noopener noreferrer">
          <img src="/opensea.png" width="80px" alt="opensea" />
          <div className="underline" />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com/BoredBonesClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/twitter.png" width="80px" alt="twitter" />
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
          <img src="/roadmap.png" alt="roadmap" />
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
          <TeamMemberImage src="/predep.png" alt="predep" />
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
          <TeamMemberImage src="/boro.png" alt="boro" />
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
          <TeamMemberImage src="/posty.png" alt="posty" />
          <TeamMemberName>
            PostyXBT{" "}
            <TeamMemberTwitter
              href="https://twitter.com/PostyXBT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.png" width="31px" alt="posty-twitter" />
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
};

export default Main;
