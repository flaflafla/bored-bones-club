import styled from "styled-components";

const Container = styled.div`
  background-color: #0a0a0a;
  color: #fff;
  font-family: "Karla", sans-serif;
  font-size: 15px;
`;

const BackgroundImage = styled.div`
  background-image: url(/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 789px;
  margin-top: -126px;
`;

const AboutVideo = styled.video`
  width: 550px;
  height: 550px;
  grid-column: 1;
`;

const Head = styled.h1`
  font-family: "Rubik", sans-serif;
  font-size: 80px;
  position: absolute;
  top: 120px;
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
`;

const SocialContainer = styled.div`
  width: 480px;
  display: flex;
  margin: 30px auto;
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto auto 18px;
  text-align: center;
`;

const TopBarLink = styled.a`
  padding: 35px 12px;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #fa036b;
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

const MintSection = styled.div`
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
`;

const Account = styled.div`
  width: 100%;
  color: #2b161b;
  font-size: 21px;
  font-weight: bold;

  & a {
    text-decoration: none;
    color: inherit;
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
  margin: 20px auto 0 auto;

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
  grid-template-columns: 600px auto 450px auto;
  margin-bottom: 60px;
`;

const RoadmapContainer = styled.div`
  display: grid;
  grid-template-columns: 600px auto 450px auto;
  margin-bottom: 120px;
`;

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-right: 12px;
  padding-left: 12px;
  margin-bottom: 80px;
`;

const StoryContainer = styled.div``;

const PreviewVideo = styled.video`
  width: 550px;
  height: 550px;
  position: absolute;
  animation-duration: 10.05s;
  animation-name: slide;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;

  @keyframes slide {
    from {
      right: -600px;
    }

    to {
      right: calc(100% + 50px);
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
  grid-column: 3;
`;

const AboutHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
`;

const AboutText = styled.div`
  color: #645659;
  font-size: 18px;
  line-height: 23px;
  :hover {
    color: #fff;
  }
`;

const MissionHeader = styled.h3`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: #fa036b;
  margin-bottom: 16px;
  margin-top: 34px;
`;

const MissionText = styled.div`
  color: #645659;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 24px;
`;

const MissionSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  color: #2b161b;
  font-weight: bold;
  margin-bottom: 14px;
`;

const MissionItem = styled.div`
  :hover {
    ${MissionText} {
      color: #fff;
    }

    ${MissionSubHeader} {
      color: #fa036b;
    }
  }
`;

const RoadmapHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 48px;
  text-align: center;
  grid-column: 1/-1;
`;

const RoadmapImageContainer = styled.div`
  text-align: center;
  grid-column: 3;
`;

const RoadmapContent = styled.div`
  grid-column: 1;
  margin-left: 38px;
  max-height: 1038px;
  overflow-y: scroll;
`;

const RoadmapSubHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  color: #fa036b;
  font-weight: bold;
  margin-bottom: 14px;
`;

const RoadmapItemHeader = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  color: #2b161b;
  font-weight: bold;
  margin-bottom: 4px;
  display: inline;
  margin-right: 8px;
`;

const RoadmapText = styled.div`
  color: #645659;
  font-size: 16px;
  line-height: 22px;
  display: inline;
`;

const RoadmapItem = styled.div`
  margin-bottom: 14px;
  :hover {
    ${RoadmapText} {
      color: #fff;
    }
    ${RoadmapItemHeader} {
      color: #fa036b;
    }
  }
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
  color: #2b161b;
`;

const TeamMemberCountry = styled.div`
  font-size: 18px;
  color: #2b161b;
  text-align: center;
  margin-bottom: 14px;
`;

const TeamMemberBio = styled.div`
  padding-right: 18px;
  padding-left: 18px;
  font-size: 18px;
  color: #645659;
`;

const TeamMemberName = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: #645659;
  text-align: center;
  margin-bottom: 20px;
`;

const TeamMember = styled.div`
  :hover {
    ${TeamMemberName} {
      color: #fff;
    }
    ${TeamMemberTitle} {
      color: #fa036b;
    }
    ${TeamMemberCountry} {
      color: #fa036b;
    }
    ${TeamMemberBio} {
      color: #fff;
    }
  }
`;

const TeamMemberImage = styled.img`
  width: 80%;
  margin: 0 10% 18px 10%;
`;

export {
  Container,
  BackgroundImage,
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
  RoadmapContent,
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
};
