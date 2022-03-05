import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getVideoMovie,
  IgetMovieDetail,
  IgetVideo,
} from "../api";
import { makeVideoPath } from "../utils";
import { motion } from "framer-motion";

const Cover = styled.div`
  position: relative;
`;

const TitleBox = styled.div`
  background-color: transparent;
  margin: 1.5vh 1vw;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const DetailTitle = styled.h1`
  font-size: 2vmax;
  background-color: inherit;
  width: 100%;
`;

const IconBox = styled.div`
  margin-top: 2vh;
  position: relative;
  svg {
    margin-right: 1vmax;
    height: 3.8vh;
    width: 3.8vh;
    border: 1px solid white;
    padding: 5px;
    border-radius: 50%;
    fill: ${(props) => props.theme.white.darker};
    &:hover {
      fill: ${(props) => props.theme.white.lighter};
    }
  }
`;

const InfoContainer = styled.div`
  margin: 1.5vh 1vw;
`;

const SubInfoContainer = styled.div`
  margin-bottom: 2vmax;
`;

const GenreContainer = styled.div`
  margin-bottom: 1vmax;
  display: flex;
  align-items: center;
`;

const Genre = styled.span`
  font-size: 1vmax;
  margin-right: 1vmax;
`;

const SubInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TagLine = styled.p`
  width: 50%;
  font-size: 1.1vmax;
`;

const RunTime = styled.div`
  width: 8vmax;
  border: 1px solid ${(props) => props.theme.white.darker};
  padding: 0.7vmax 0.8vmax;
  text-align: center;
  font-size: 0.8vmax;
`;

const Vote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8vmax;
  border: 1px solid ${(props) => props.theme.white.darker};
  padding: 0.7vmax 0.8vmax;
  font-size: 0.8vmax;
  svg {
    height: 0.8vmax;
    margin-right: 0.5vmax;
    fill: yellow;
  }
`;

const DetailOverview = styled.p`
  font-size: 1.2vmax;
  line-height: 1.2;
  height: 15vh;
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

function Detail() {
  const { movieId } = useParams();
  const { data: videoData } = useQuery<IgetVideo>(["Movies", "Videos"], () =>
    getVideoMovie(Number(movieId))
  );
  const { data } = useQuery<IgetMovieDetail>(["Movies", "Detail"], () =>
    getMovieDetail(String(movieId))
  );
  return (
    <>
      <Cover>
        <ReactPlayer
          muted={true}
          playing={true}
          loop={true}
          width="100%"
          height="40vh"
          controls={false}
          light={false}
          url={makeVideoPath(String(videoData?.results[0].key))}
        />
      </Cover>
      <TitleBox>
        <DetailTitle>{data?.title}</DetailTitle>
        <IconBox>
          <motion.svg
            whileHover={{ y: "-0.8vh" }}
            transition={{ type: "linear", delay: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
          </motion.svg>

          <motion.svg
            whileHover={{ y: "-0.8vh" }}
            transition={{ type: "linear", delay: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
          </motion.svg>
        </IconBox>
      </TitleBox>
      <InfoContainer>
        <SubInfoContainer>
          <GenreContainer>
            {data?.genres.map((gen, index) => (
              <Genre key={index}>#{gen.name}</Genre>
            ))}
          </GenreContainer>
          <SubInfo>
            <TagLine>{data?.tagline}</TagLine>
            <RunTime>{data?.runtime} min</RunTime>
            <Vote>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
              </svg>
              {data?.vote_average}
            </Vote>
          </SubInfo>
        </SubInfoContainer>
        <DetailOverview>{data?.overview}</DetailOverview>
      </InfoContainer>
    </>
  );
}

export default Detail;
