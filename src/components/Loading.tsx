import ReactLoading from "react-loading";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  div {
    background-color: transparent;
  }
`;

const Text = styled.h1`
  font-size: 1.5vmax;
  margin-top: 1vmax;
`;

function Loading() {
  return (
    <Wrapper>
      <ReactLoading
        type={"spin"}
        color={"#fff"}
        width="5vmax"
        height="5vmax"
      ></ReactLoading>
      <Text>Loading...</Text>
    </Wrapper>
  );
}

export default Loading;
