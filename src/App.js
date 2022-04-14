import logo from "./logo.svg";
import "./App.css";
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
`;

const Video = styled.video`
  width: 550px;
  height: 550px;
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
`;

function App() {
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
      <BackgroundImage></BackgroundImage>
      <SocialContainer>
        <SocialIcon
          href="https://discord.com/invite/boredbonesclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/discord.png" width="80px" />
        </SocialIcon>
        <SocialIcon
          href="https://www.instagram.com/boredbonesclub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/insta.png" width="80px" />
        </SocialIcon>
        <SocialIcon href="/#" target="_blank" rel="noopener noreferrer">
          <img src="/opensea.png" width="80px" />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com/BoredBonesClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/twitter.png" width="80px" />
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
