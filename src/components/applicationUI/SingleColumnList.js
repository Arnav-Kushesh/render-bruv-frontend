import styled from "styled-components";
import CustomLabel from "./CustomLabel";
import LoadingSection from "../helperComponents/LoadingSection";

const Content = styled.div`
  padding: 15px;
  border: 1px solid var(--borderDim);
  background: var(--surface3);
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: centerScaleReveal 0.6s ease-in-out forwards;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default function SingleColumnList({
  items,
  CardComponent,
  label,
  loading,
}) {
  if (!items) items = [];

  if (loading)
    return (
      <Content>
        <CustomLabel>{label}</CustomLabel>
        <List>
          <LoadingSection />
        </List>
      </Content>
    );

  return (
    <Content>
      <CustomLabel>{label}</CustomLabel>
      <List>
        {items.map((item) => (
          <CardComponent key={item._id} data={item} />
        ))}
      </List>
    </Content>
  );
}
