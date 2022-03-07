import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvSimilar, IgetTvSimilar } from "../api";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SimilarProps {
  tvId: string;
}

const SimilarTitle = styled.h1`
  margin-left: 2vmax;
  font-size: 1.5vmax;
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5vmax;
  padding: 2vmax;
  text-align: center;
`;

const SimilarBox = styled(motion.div)<{ bgphoto: string }>`
  width: 100%;
  height: 10vmax;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-start;
`;

const similarBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.2,
    },
  },
};

const SimilarBoxTitle = styled(motion.div)`
  width: 100%;
  height: 1.2vmax;
  opacity: 0;
  font-size: 1vmax;
`;

const similarBoxTitleVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

function TvSimilar({ tvId }: SimilarProps) {
  const { data } = useQuery<IgetTvSimilar>(["Tv", "Similar"], () =>
    getTvSimilar(tvId)
  );

  return (
    <>
      <SimilarTitle>비슷한 컨텐츠!</SimilarTitle>
      <Container>
        {data?.results.map((tv, index) => (
          <Link to={`${tv.id}/detail`}>
            <SimilarBox
              variants={similarBoxVariants}
              initial="normal"
              whileHover="hover"
              key={index}
              bgphoto={makeImagePath(tv.poster_path, "w500")}
            >
              <SimilarBoxTitle variants={similarBoxTitleVariants} key={index}>
                {tv.name}
              </SimilarBoxTitle>
            </SimilarBox>
          </Link>
        ))}
      </Container>
    </>
  );
}

export default TvSimilar;
