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

const Cover = styled.div`
  position: relative;
`;
const TitleBox = styled.div`
  position: absolute;
  top: 25vh;
  background-color: transparent;
  margin-left: 1vw;
`;
const DetailTitle = styled.h1`
  font-size: 2.2vmax;
  background-color: inherit;
`;
const InfoBox = styled.div``;
const DetailOverview = styled.p``;

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
      </TitleBox>
      <InfoBox>
        <DetailOverview>{data?.overview}</DetailOverview>
      </InfoBox>
    </>
  );
}

export default Detail;
