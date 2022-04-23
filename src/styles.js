import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  font-family: "Karla", sans-serif;
  font-size: 15px;
`;

const HeroImage = styled.div`
  background-image: url(/hero1.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 789px;
  margin-top: -80px;
`;

const AboutVideo = styled.video`
  width: 550px;
  height: 550px;
  grid-column: 1;
  padding-left: 30px;

  @media (max-width: 950px) {
    text-align: center;
    margin: 0 auto 36px auto;
    padding: 0;
  }

  @media (max-width: 650px) {
    width: 360px;
  }
`;

const Head = styled.h1`
  font-family: "Rubik", sans-serif;
  font-size: 80px;
  position: absolute;
  top: 80px;
  text-align: center;
  width: calc(100% - 40px);
  padding: 0 20px;
`;

const Icon = styled.div`
  width: 120px;
  height: 120px;
`;

const SocialIcon = styled.a`
  width: 120px;
  height: 120px;
  text-align: center;

  :hover img {
    border: 2px solid #fa036b;
    border-radius: 100%;
    margin-top: -2px;
  }

  @media (max-width: 650px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 450px) {
    width: 80px;
    height: 80px;
  }
`;

const SocialContainer = styled.div`
  width: 480px;
  display: flex;
  margin: 30px auto;

  @media (max-width: 650px) {
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 320px;
  }
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto auto 18px;
  text-align: center;
  height: 126px;
  background-color: #000;
  position: relative;
`;

const TopBarLink = styled.a`
  padding: 35px 12px;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #fa036b;
  }

  @media (max-width: 450px) {
    font-size: 10px;
    margin-top: 10px;
  }
`;

const ConnectButton = styled.button`
  display: grid;
  grid-template-rows: 10px 14px 10px;
  grid-template-columns: 1fr auto;
  text-align: center;
  padding: 10px;
  border-radius: 50px;
  border: 1px solid #fff;
  background-color: #0a0a0a;
  padding: 10px 26px 10px 26px;

  margin: 0 auto 12px auto;
  font-weight: bold;
  color: #fff;
  width: 200px;
  cursor: pointer;

  &:hover,
  &:active {
    color: #fa036b;
    border-color: #fa036b;
  }
`;

const ConnectButtonLabel = styled.span`
  grid-column: 1;
  grid-row: 2;
`;

const ConnectButtonImg = styled.img`
  grid-column: 2;
  height: 36px;
  width: 36px;
`;

const Account = styled.div`
  width: 100%;
  font-size: 21px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 30px;
  max-width: 180px;
  margin: 40px auto 0 auto;

  & a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 950px) {
    margin-top: 0;
  }

  @media (max-width: 650px) {
    margin-top: 40px;
  }
`;

const MintError = styled.div`
  color: #fa036b;
  width: calc(100% - 56px);
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 32px;
  padding: 0 28px;
`;

const MintButton = styled.button`
  background-color: #000;
  border: 4px solid #fa036b;
  position: relative;
  cursor: pointer;
  margin: 36px auto 0 auto;
  border-radius: 100%;
  width: 230px;
  height: 230px;
  padding: 10px;
`;

const Message = styled.div`
  color: #fff;
  width: calc(100% - 60px);
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 68px;
  padding: 0 30px;

  & a {
    text-decoration: none;
    color: #fa036b;
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 580px 1fr;
  margin-bottom: 60px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const RoadmapContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 375px 1fr;
  margin-bottom: 120px;

  @media (max-width: 950px) {
    grid-template-rows: auto auto auto;
  }
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-right: 12px;
  padding-left: 12px;
  margin-bottom: 40px;

  @media (max-width: 950px) {
    margin-bottom: 32px;
  }
`;

const StoryContainer = styled.div`
  text-align: center;
  height: 600px;
  position: relative;

  @media (max-width: 950px) {
    height: 580px;
  }
`;

const PreviewVideo = styled.video`
  width: 550px;
  height: 550px;
  position: absolute;
  animation-duration: 6s;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes slide {
    from {
      right: -700px;
    }

    to {
      right: calc(100% + 150px);
    }
  }
`;

const PreviewText = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 230px;
  color: #2b161b;
  font-weight: bold;
  opacity: 0.1;
  text-align: center;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: hidden;
  height: 600px;
  max-height: 700px;
  margin-bottom: 80px;
`;

const AboutContent = styled.div`
  grid-column: 2;
  padding: 0 30px;

  @media (max-width: 950px) {
    grid-column: 1;
  }
`;

const AboutHeader = styled.div`
  font-family: "Rubik", sans-serif;
  color: #fa036b;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
`;

const AboutText = styled.div`
  font-size: 18px;
  line-height: 23px;
  color: #f9f9fa;
`;

const MissionHeader = styled.h3`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: 34px;
  color: #f9f9fa;
`;

const MissionText = styled.div`
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 24px;
  color: #f9f9fa;
`;

const MissionSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  color: #fa036b;
  font-weight: bold;
  margin-bottom: 14px;
`;

const MissionItem = styled.div``;

const RoadmapHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 48px;
  text-align: center;
  grid-column: 1/-1;

  @media (max-width: 950px) {
    grid-row: 1;
  }
`;

const RoadmapImageContainer = styled.div`
  text-align: center;
  grid-column: 2;

  @media (max-width: 950px) {
    grid-row: 2;
    margin-bottom: 36px;
  }
`;

const RoadmapItem = styled.div`
  margin-bottom: 16px;
`;

const RoadmapSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #f9f9fa;
  text-align: center;
`;

const RoadmapContentLeft = styled.div`
  grid-column: 1;
  padding: 0 30px;

  @media (max-width: 950px) {
    grid-column: 1/-1;
    grid-row: 3;
    margin-bottom: 36px;

    ${RoadmapItem} {
      margin-bottom: 18px;
    }

    ${RoadmapSubHeader} {
      margin-bottom: 24px;
    }
s  }
`;

const RoadmapContentRight = styled.div`
  grid-column: 3;
  padding: 0 30px;

  @media (max-width: 950px) {
    grid-column: 1/-1;
    grid-row: 4;

    ${RoadmapSubHeader} {
      margin-bottom: 24px;
    }
  }
`;

const RoadmapItemHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  color: #fa036b;
  font-weight: bold;
  margin-bottom: 4px;
  display: inline;
  margin-right: 8px;
`;

const RoadmapText = styled.div`
  font-size: 16px;
  line-height: 22px;
  display: inline;
  color: #f9f9fa;
`;

const TeamHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 48px;
  text-align: center;
  grid-column: 1/-1;
`;

const StoryHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 48px;
  text-align: center;
  grid-column: 1/-1;
`;

const TeamMemberTitle = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 2px;
  color: #fa036b;
`;

const TeamMemberCountry = styled.div`
  font-size: 18px;
  color: #fa036b;
  text-align: center;
  margin-bottom: 14px;
`;

const TeamMemberBio = styled.div`
  padding-right: 18px;
  padding-left: 18px;
  font-size: 18px;
  color: #f9f9fa;
  line-height: 24px;

  @media (max-width: 950px) {
    margin-bottom: 48px;
  }
`;

const TeamMemberName = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #f9f9fa;
`;

const TeamMemberImage = styled.img`
  width: calc(100% - 36px);
  margin: 0 18px 18px 18px;

  @media (max-width: 950px) {
    width: calc(100% - 240px);
    margin 0 120px 18px 120px;
  }

  @media (max-width: 650px) {
    width: calc(100% - 80px);
    margin 0 40px 18px 40px;
  }
`;

const TeamMember = styled.div`
  margin-bottom: 48px;

  @media (max-width: 950px) {
    grid-column: 1/-1;
  }
`;

const TeamMemberTwitter = styled.a`
  img {
    vertical-align: bottom;
  }
`;

const StoryVideoButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 80px 80px 1fr;
  width: 100%;
  position: absolute;
  top: 450px;
`;

const StoryVideoButton = styled.button`
  background-color: #000;
  border: none;
  ${({ gridColumn }) => `grid-column: ${gridColumn};`}
  color: #fff;
  ${({ disabled }) =>
    disabled
      ? "opacity: 0.3;"
      : `
    cursor: pointer;
    :hover {
      color: #fa036b;
    }
  `}
  font-family: "Rubik", sans-serif;
  font-size: 26px;
`;

const StoryVideo = styled.iframe`
  margin: 0 auto 60px auto;
`;

const MintOuterContainer = styled.div`
  color: #fff;
  font-family: "Karla", sans-serif;
  font-size: 15px;
  padding-bottom: 40px;
`;

const MintContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 500px 1fr;
  text-align: center;

  @media (max-width: 950px) {
    grid-template-columns: 300px 1fr;
    max-width: 750px;
  }

  @media (max-width: 650px) {
    display: block;
  }
`;

const SpinningCoinGuyVideo = styled.video`
  width: 500px;
  grid-column: 1;

  @media (max-width: 950px) {
    width: 360px;
  }

  @media (max-width: 650px) {
    grid-column: 1/-1;
    margin: 0 auto;
  }
`;

const MintHead = styled.h1`
  font-family: "Rubik", sans-serif;
  text-align: center;
  width: calc(100% - 40px);
  padding: 0 20px;
  font-size: 60px;
  margin-top: 0;
`;

const MintSection = styled.div`
  grid-column: 2;
  text-align: center;

  @media (max-width: 650px) {
    height: 400px;
  }
`;

const MintSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #fa036b;
  text-align: center;
  margin-top: 28px;
  padding: 0 20px;

  @media (max-width: 950px) {
    margin-top: 30px;
    font-size: 30px;
  }
`;

const MintLink = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 340px;
  font-size: 50px;
  font-family: "Rubik", sans-serif;
  color: #fa036b;

  div:nth-of-type(2) {
    font-size: 80px;
  }

  // img {
  //   margin: 0 auto;
  //   text-decoration: none;
  //   cursor: pointer;
  //   background-color: #000;
  //   width: 320px;
  //   border-radius: 30px;
  //   padding: 16px;
  //   border: 4px solid #fa036b;
  // }

  // @media (max-width: 950px) {
  //   top: 370px;

  //   img {
  //     width: 260px;
  //   }
  // }

  // @media (max-width: 650px) {
  //   top: 450px;

  //   img {
  //     width: 200px;
  //   }
  // }
`;

const Counter = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 28px;
  margin-bottom: 14px;
  margin-top: 12px;

  @media (max-width: 650px) {
    margin-top: 60px;
  }
`;

export {
  Container,
  MintContainer,
  MintHead,
  HeroImage,
  AboutVideo,
  Head,
  Icon,
  SocialIcon,
  SocialContainer,
  TopBar,
  TopBarLink,
  ConnectButton,
  ConnectButtonLabel,
  ConnectButtonImg,
  MintSection,
  Account,
  MintError,
  MintButton,
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
  PreviewVideo,
  RoadmapItem,
  MissionItem,
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
  SpinningCoinGuyVideo,
  StoryVideoButton,
  StoryVideoButtons,
  StoryVideo,
  MintOuterContainer,
  MintSubHeader,
  MintLink,
  Counter,
};
