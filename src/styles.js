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

export {
  Container,
  BackgroundImage,
  Video,
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
};
