import styled from "styled-components";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  getTvOnTheAir,
  getTvPopular,
  getTvTopRated,
  IgetTvOnTheAir,
} from "../api";
import TvSliders from "../components/TvSliders";
import Loading from "../components/Loading";

const Banner = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  padding-left: 3vw;
  background-position: center center;
  position: relative;
`;

const BannerTitle = styled.h1`
  background-color: transparent;
  font-size: 4.5vmax;
  font-weight: 600;
  margin-bottom: 4vh;
`;

const BannerOverView = styled.div`
  width: 50%;
  height: 30%;
  background-color: transparent;
  font-size: 1.6vmax;
  line-height: 1.2;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
    opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.white.darker};
    border-radius: 30px;
    background-clip: padding-box;
  }
`;

const InfoBax = styled(motion.div)`
  margin-top: 2vh;
  width: min-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  background-color: transparent;
  padding: 1vw;
  cursor: pointer;
  svg {
    height: 1.3vmax;
    margin-right: 0.5vw;
    fill: ${(props) => props.theme.white.lighter};
  }
  span {
    font-size: 1.2vmax;
    background-color: transparent;
    width: 5vmax;
  }
`;

const SliderWrapper = styled.div`
  padding: 3.5vh 0;
  background-color: black;
`;

function Tv() {
  const [clickSliderNum, setClickSliderNum] = useState(0);
  const navigation = useNavigate();

  const { data: OnTheAirData, isLoading } = useQuery<IgetTvOnTheAir>(
    ["Tv", "OnTheAir"],
    getTvOnTheAir
  );

  const { data: PopularData } = useQuery<IgetTvOnTheAir>(
    ["Tv", "Popular"],
    getTvPopular
  );

  const { data: TopRatedData } = useQuery<IgetTvOnTheAir>(
    ["Tv", "TopRated"],
    getTvTopRated
  );

  const onClickBannerInfo = () =>
    navigation(`/tv/${OnTheAirData?.results[2].id}/detail`);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              String(OnTheAirData?.results[2].backdrop_path),
              "w500"
            )}
          >
            <BannerTitle>{OnTheAirData?.results[2].name}</BannerTitle>
            <BannerOverView>{OnTheAirData?.results[2].overview}</BannerOverView>
            <InfoBax
              whileHover={{ scale: 1.1 }}
              transition={{ type: "linear" }}
              onClick={onClickBannerInfo}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z" />
              </svg>
              <span>상세보기</span>
            </InfoBax>
          </Banner>
          <SliderWrapper onClick={() => setClickSliderNum(1)}>
            <TvSliders
              data={OnTheAirData as IgetTvOnTheAir}
              title="Tv에서 방영 중!"
              sliderNum="1"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
          <SliderWrapper onClick={() => setClickSliderNum(2)}>
            <TvSliders
              data={PopularData as IgetTvOnTheAir}
              title="유명 Tv 시리즈!"
              sliderNum="2"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
          <SliderWrapper onClick={() => setClickSliderNum(3)}>
            <TvSliders
              data={TopRatedData as IgetTvOnTheAir}
              title="최고 인기작!"
              sliderNum="3"
              ClickSliderNum={clickSliderNum}
            />
          </SliderWrapper>
        </>
      )}
    </>
  );
}

export default Tv;
