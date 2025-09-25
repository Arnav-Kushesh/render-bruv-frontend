import styled from "styled-components";

const Box = styled.div`
  width: 230px;
  height: calc(230px * 1.5);
  box-shadow: var(--lightShadow);

  position: relative;
  overflow: hidden;
  background: #f6f7f8;
  background: linear-gradient(
    to right,
    #f6f7f8 0%,
    #eaeaea 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 200% auto;
  color: #333;
  animation: shimmer 2s linear infinite;
  padding: 20px;
  font-size: 24px;
  border-radius: 8px;

  @media (max-width: 900px) {
  }
`;

export default function getShimmers({ count, height, width }) {
  let items = [];

  for (let i = 0; i < count; i++) {
    items.push(<Box style={{ width: width, height: height }} />);
  }

  return items;
}
