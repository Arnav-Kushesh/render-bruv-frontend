import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const Main = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingSection({ size = "20px" }) {
  // const { themeState } = useContext(Context);

  return (
    <Main>
      {/* <FadeLoader
        color="var(--accent)"
        height={5}
        width={10}
        speedMultiplier={1.5}
      /> */}

      <BeatLoader color={"var(--element)"} size={size} />

      {/* <MoonLoader color="var(--accent)" size={30} /> */}
    </Main>
  );

  // return (
  //   <Main>
  //     <BarLoader />
  //   </Main>
  // );
}
