import styled from "styled-components";
import HomeHeader from "../components/HomeHeader";
import { useNavigate } from "react-router-dom";

const HomeMainTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.8)
    ),
    url(https://assets.nflxext.com/ffe/siteui/vlv3/8607d312-c4d0-4ce2-955d-50d728ae845f/f5aa75a9-2c6e-4f3a-a83e-4624365cb04c/KR-ko-20220226-popsignuptwoweeks-perspective_alpha_website_large.jpg);
`;

const HomeMainTopContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0 auto;
  padding: 0 5vh;
  h1 {
    background-color: inherit;
    width: 70%;
    font-size: 4vmax;
    font-weight: 600;
    text-align: center;
  }
  h2 {
    width: 100%;
    font-size: 2vmax;
    text-align: center;
    margin-top: 5vh;
    background-color: inherit;
    line-height: 1.2;
  }
`;

const GoButton = styled.div`
  margin-top: 5vh;
  font-size: 1.7vmax;
  background-color: ${(props) => props.theme.red};
  padding: 1.8vmax 2.5vmax;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.white.darker};
  }
`;

const HomeMainMiddle = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 59vh;
  margin: 0.8vh auto;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  background-color: #000000;
  width: 30vw;
  @media screen and (max-width: 500px) {
    width: 30vmax;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    width: 100%;
    background-color: inherit;
    font-size: 3vmax;
    font-weight: 600;
    @media screen and (max-width: 500px) {
      text-align: center;
    }
  }
  p {
    width: 90%;
    font-size: 1vmax;
    background-color: inherit;
    margin-top: 3vh;
    @media screen and (max-width: 500px) {
      text-align: center;
      width: 100%;
    }
  }
`;
const MovieImageContainer = styled.div`
  height: 20vmax;
  width: 25vmax;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Img = styled.img`
  width: 100%;
  height: 20vmax;
`;
const HomeMainBottom = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
`;

const ImgContainer = styled.img`
  width: 30vmax;
  height: 25vmax;
`;

const TextBottomContainer = styled.div`
  background-color: black;
  h1 {
    width: 20vw;
    font-size: 2vmax;
    background-color: inherit;
    @media screen and (max-width: 500px) {
      width: 100%;
      text-align: center;
      margin-top: 2vmax;
      padding: 0 2vmax;
    }
  }
  p {
    margin-top: 2vh;
    font-size: 1.5vmax;
    background-color: inherit;
    @media screen and (max-width: 500px) {
      width: 100%;
      text-align: center;
      padding: 0 2vmax;
    }
  }
`;

function Home() {
  const navigation = useNavigate();
  const onClick = () => navigation("/movie");
  return (
    <>
      <HomeMainTop>
        <HomeHeader />
        <HomeMainTopContent>
          <h1>영화와 시리즈를 무제한으로.</h1>
          <h2>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</h2>
          <GoButton onClick={onClick}>시작하기</GoButton>
        </HomeMainTopContent>
      </HomeMainTop>
      <HomeMainMiddle>
        <ContentContainer>
          <TextContainer>
            <h1>TV로 즐기세요.</h1>
            <p>
              스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
              플레이어 등 다양한 디바이스에서 시청하세요.
            </p>
          </TextContainer>
          <MovieImageContainer>
            <Img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" />
          </MovieImageContainer>
        </ContentContainer>
      </HomeMainMiddle>
      <HomeMainBottom>
        <ContentContainer>
          <ImgContainer src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"></ImgContainer>
          <TextBottomContainer>
            <h1>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</h1>
            <p>간편하게 저장하고 빈틈없이 즐겨보세요.</p>
          </TextBottomContainer>
        </ContentContainer>
      </HomeMainBottom>
    </>
  );
}

export default Home;
