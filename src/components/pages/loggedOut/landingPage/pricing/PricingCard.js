import styled from "styled-components";

const Card = styled.div`
  font-family: "Quicksand", sans-serif;
  padding: 35px;
  /* height: 300px; */
  /* margin: auto; */
  width: 400px;
  display: flex;
  border-radius: 26px;
  flex-direction: column;
  gap: 20px;
  background: linear-gradient(
    125deg,
    #0096ffd6,
    2%,
    rgba(17, 176, 255, 0.1),
    rgba(17, 176, 255, 0)
  );
  box-shadow: 0 2px 0 0 #1c79dd2a;
  background: linear-gradient(
    100deg,
    rgba(17, 176, 255, 0.32),
    2%,
    rgba(17, 176, 255, 0.1),
    rgba(17, 176, 255, 0)
  );

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

const CardTitle = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Features = styled.div`
  display: flex;
  gap: 10px;
  opacity: 0.8;
  flex-direction: column;
`;

const PlanName = styled.span`
  color: var(--accentColor);
  font-size: 25px;
  max-width: 300px;
  font-weight: 900;
  font-family: "Quicksand", sans-serif;
  color: var(--element);
  text-transform: uppercase;
`;

const PlanDescription = styled.span`
  font-size: 14px;
  font-weight: 700;
  max-width: 300px;
  opacity: 0.5;
`;

const PriceTag = styled.div`
  color: var(--accentColor);
  font-size: 16px;
  font-family: "Quicksand", sans-serif;
  font-weight: 900;

  color: var(--element);
  /* margin-bottom: 10px; */
  /* border-bottom: 2px solid; */
`;

const PlanFeatures = styled.div`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 200px;
`;

const PlanFeature = styled.div`
  margin-bottom: 5px;
  display: flex;
  font-family: "Quicksand", sans-serif;
  font-weight: 600;

  &::before {
    height: 25px;
    width: 25px;
    content: "✓";
    background: var(--accent);
    color: #fff;
    border-radius: 100px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: -3px;
  }
`;

const PricingCard = ({ item }) => {
  return (
    <Card>
      <CardTitle>
        <PlanName>{item.secondaryLabel}</PlanName>
        <PriceTag>{item.price / 100}/hr </PriceTag>
      </CardTitle>

      <PlanDescription>{item.label}</PlanDescription>

      <Features>
        <PlanFeatures>
          {item.features.map((data) => (
            <PlanFeature> {data}</PlanFeature>
          ))}
        </PlanFeatures>
      </Features>
    </Card>
  );
};

export default PricingCard;
