// import styled from "styled-components";

// import Header from "./Header.js";
// import { useContext } from "react";
// import Context from "../../Context.js";
// import Footer from "../Footer.js";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0px;
//   overflow: hidden;
//   height: 100dvh;
//   height: 100dvh;
//   width: 100vw;
//   overflow: hidden;
//   background-size: cover;
//   padding-bottom: 0;

//   @media (max-width: 900px) {
//     flex-direction: column-reverse;
//   }
// `;

// const Scrollable = styled.div`
//   padding: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between; //so that footer does not jumps on loading stuff
//   align-items: center;

//   width: 100%;
//   height: calc(100dvh - var(--headerHeight));
//   padding: 0;
//   overflow: hidden;
//   overflow-y: scroll;
//   padding-top: 70px;

//   /* min-height: 120vh; //so that footer does not jumps on loading stuff */
// `;

// const Main = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: var(--coreWidth);
//   height: auto;
// `;

// export default function WithHeader({ children }) {
//   return (
//     <Container>
//       <Header />
//       <Scrollable>
//         <Main>{children}</Main>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br /> <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         {/* <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br /> */}
//         {/* <Footer /> */}
//       </Scrollable>
//     </Container>
//   );
// }
