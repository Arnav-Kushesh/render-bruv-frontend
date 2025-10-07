import styled from "styled-components";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
`;

const Lhs = styled.div`
  font-weight: 700;
`;

const Rhs = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--element);
  padding: 35px;
`;

export default function ContactInfo({ item }) {
  let component = <CustomLabel>No contact info available</CustomLabel>;

  component = (
    <Line>
      <Rhs>{item.phoneNumber}</Rhs>
    </Line>
  );

  return <Container>{component}</Container>;
}
