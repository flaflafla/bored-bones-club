import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  font-family: "Karla", sans-serif;
  font-size: 15px;
`;

const HeroImage = styled.div`
  background-image: url(/hero.png);
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

  & .underline {
    border-radius: 3px;
    height: 2px;
    width: 30px;
    visibility: hidden;
    background-color: #fa036b;
    margin: -9px auto;
  }

  &:hover .underline {
    visibility: visible;
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
  color: #fa036b;
  font-size: 21px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 30px;
  max-width: 180px;
  margin: 80px auto 0 auto;

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
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
`;

const MintButton = styled.button`
  background-color: #000;
  border-radius: 10000px;
  border: 3px solid #fff;
  position: relative;
  cursor: pointer;
  margin: 20px auto 26px auto;

  &:hover {
    border-color: #fa036b;

    div {
      color: #fa036b;
    }
  }
`;

const MintButtonTextTop = styled.div`
  font-family: "Rubik", sans-serif;
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  top: 25px;
  width: 100%;
  text-align: center;
  margin-left: -4px;
`;

const MintButtonTextBottom = styled.div`
  font-family: "Rubik", sans-serif;
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  top: 145px;
  width: 100%;
  color: #fff;
  text-align: center;
  margin-left: -4px;
`;

const Message = styled.div`
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 28px;

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
  margin-bottom: 80px;

  @media (max-width: 950px) {
    margin-bottom: 32px;
  }
`;

const StoryContainer = styled.div`
  text-align: center;
  height: 800px;
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
  animation-direction: alternate;
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
  margin-bottom: 18px;
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

  ${RoadmapItem} {
    margin-bottom: 48px;
  }

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
  @media (max-width: 950px) {
    grid-column: 1/-1;
  }
`;

const TeamMemberTwitter = styled.a`
  img {
    vertical-align: bottom;
  }
`;

const PrevNextButton = styled.button`
  display: block;
  font-family: "Rubik", sans-serif;
  color: #fff;
  font-size: 48px;
  background-color: #0a0a0a;
  border: none;
  position: absolute;
  top: 630px;
  left: calc(50% - 50px);
  width: 100px;
  cursor: pointer;

  :hover {
    color: #fa036b;
  }

  @media (max-width: 950px) {
    top: 460px;
  }

  @media (max-width: 650px) {
    top: 330px;
  }

  @media (max-width: 450px) {
    top: 380px;
  }
`;

const StoryVideo = styled.video`
  width: 880px;
  margin: 0 auto 60px auto;

  @media (max-width: 950px) {
    width: 600px;
  }

  @media (max-width: 650px) {
    width: 400px;
  }
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
`;

const MintSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #fa036b;
  text-align: center;
  margin-top: 60px;
  padding: 0 20px;

  @media (max-width: 950px) {
    margin-top: 30px;
    font-size: 30px;
  }
`;

const MintLink = styled.div`
  font-size: 62px;
  font-weight: bold;
  font-family: "Rubik", sans-serif;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 340px;

  a {
    margin: 0 auto;
    text-decoration: none;
    color: #fa036b;
    cursor: pointer;
    background-color: #000;
    border-radius: 12px;
    border: 3px solid #fa036b;
    padding: 4px 45px;
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
  PrevNextButton,
  StoryVideo,
  MintOuterContainer,
  MintSubHeader,
  MintLink,
};
